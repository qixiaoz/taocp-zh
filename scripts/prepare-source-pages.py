#!/usr/bin/env python3
"""Prepare source-bound local page PDFs and review images, without transcription.

Requires PyMuPDF and Pillow. Keep the work directory outside the published docs.
Neither extraction nor rasterization assigns editorial review or publication.
"""
from pathlib import Path
import argparse
import hashlib
import json
import re


def sha(file):
    digest = hashlib.sha256()
    with file.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--pdf', type=Path, required=True)
    parser.add_argument('--work', type=Path, required=True)
    parser.add_argument('--pages', required=True, help='Physical pages: 1-10,17,68')
    parser.add_argument('--dpi', type=int, default=300)
    args = parser.parse_args()
    import pymupdf
    from PIL import Image

    source = args.pdf.resolve()
    work = args.work.resolve()
    if not source.is_file() or not 100 <= args.dpi <= 600:
        parser.error('Pass an existing PDF and a DPI from 100 to 600.')
    pages = set()
    for item in args.pages.split(','):
        match = re.fullmatch(r'(\d+)(?:-(\d+))?', item.strip())
        if not match:
            parser.error('Page ranges must contain positive integers.')
        first, last = int(match[1]), int(match[2] or match[1])
        if first < 1 or last < first:
            parser.error('Invalid physical-page range.')
        pages.update(range(first, last + 1))
    digest = sha(source)
    document = pymupdf.open(source)
    if max(pages) > len(document):
        parser.error('A requested page exceeds this PDF page count.')
    for folder in ['single', 'scans', 'page-assets']:
        (work / folder).mkdir(parents=True, exist_ok=True)
    for n in sorted(pages):
        stem = f'{n:03}'
        pdf = work / 'single' / f'{stem}.pdf'
        image = work / 'scans' / f'{stem}.jpg'
        record = work / 'page-assets' / f'{stem}.json'
        if record.exists():
            previous = json.loads(record.read_text())
            if previous['sourceSha256'] != digest or previous['dpi'] != args.dpi:
                raise ValueError(f'Existing source binding differs on physical page {n}')
            if sha(pdf) != previous['pagePdfSha256'] or sha(image) != previous['pageImageSha256']:
                raise ValueError(f'Existing page asset differs on physical page {n}')
            continue
        if pdf.exists() or image.exists():
            raise ValueError(f'Unbound page asset already exists on physical page {n}; inspect before replacing')
        page = document[n - 1]
        single = pymupdf.open()
        single.insert_pdf(document, from_page=n - 1, to_page=n - 1)
        single.save(pdf, garbage=3, deflate=True)
        single.close()
        pix = page.get_pixmap(dpi=args.dpi, alpha=False)
        Image.frombytes('RGB', (pix.width, pix.height), pix.samples).save(image, quality=95, subsampling=0)
        evidence = {
            'schemaVersion': 1, 'status': 'source-assets-only',
            'sourceFile': source.name, 'sourceSha256': digest,
            'sourcePhysicalPages': len(document), 'physicalPage': n,
            'dpi': args.dpi, 'pagePdf': f'single/{stem}.pdf',
            'pagePdfSha256': sha(pdf), 'pageImage': f'scans/{stem}.jpg',
            'pageImageSha256': sha(image), 'imagePixels': [pix.width, pix.height],
            'pageRectPoints': list(page.rect), 'pageRotation': page.rotation,
            'qualification': 'Rendered visible PDF page. No transcription, original-page review or bilingual verification is assigned.'
        }
        temporary = record.with_suffix('.tmp')
        temporary.write_text(json.dumps(evidence, ensure_ascii=False, indent=2) + '\n')
        temporary.replace(record)
        print('SOURCE_PAGE_ASSETS', n, pix.width, pix.height, flush=True)
    document.close()


if __name__ == '__main__':
    main()
