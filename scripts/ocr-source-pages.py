#!/usr/bin/env python3
"""Resumable local layout OCR; mathematical crops remain separate readings.

Optional transcription dependencies: rapid-doc==0.9.10, rapidocr==3.9.2,
onnxruntime==1.32.0, Pillow. Models must already be available locally.
This tool writes private machine outputs only, never a book or review sign-off.
"""
from pathlib import Path
import argparse
import hashlib
import importlib.metadata
import json
import re
import time


def digest(file):
    return hashlib.sha256(file.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--work', type=Path, required=True)
    parser.add_argument('--pages', required=True, help='Physical pages: 1-10,17,68')
    parser.add_argument('--threads', type=int, default=2)
    args = parser.parse_args()
    work = args.work.resolve()
    pages = []
    seen_pages = set()
    for part in args.pages.split(','):
        match = re.fullmatch(r'(\d+)(?:-(\d+))?', part.strip())
        if not match or int(match[1]) < 1 or int(match[2] or match[1]) < int(match[1]):
            parser.error('Invalid positive physical-page range')
        for page in range(int(match[1]), int(match[2] or match[1]) + 1):
            if page not in seen_pages:
                pages.append(page)
                seen_pages.add(page)
    if not 1 <= args.threads <= 8:
        parser.error('Use from 1 to 8 CPU threads')
    from PIL import Image
    from rapidocr import EngineType as OCREngine
    from rapid_doc import RapidDoc
    from rapid_doc.model.table.rapid_table_self import ModelType as TableModel, EngineType as TableEngine
    from rapid_doc.model.custom import CustomBaseModel
    import rapid_doc

    for folder in ['layout', 'layout/images', 'math-crops', 'layout-bindings']:
        (work / folder).mkdir(parents=True, exist_ok=True)

    class FormulaCrops(CustomBaseModel):
        def batch_predict(self, images, batch_size=1):
            keys = []
            for im in images:
                im = Image.fromarray(im).convert('L') if not isinstance(im, Image.Image) else im.convert('L')
                key = hashlib.sha256(f'{im.size}'.encode() + im.tobytes()).hexdigest()[:18]
                target = work / 'math-crops' / f'{key}.png'
                if not target.exists():
                    im.save(target)
                keys.append('TAOCP' + key)
            return keys

    cpu = {'intra_op_num_threads': args.threads, 'inter_op_num_threads': 1}
    engine = RapidDoc(parse_method='ocr', lang='ch', pdf_pages_batch=1,
        formula_config={'custom_model': FormulaCrops()},
        layout_config={'engine_cfg': cpu, 'markdown_ignore_labels': ['header', 'footer', 'header_image', 'footer_image', 'number']},
        ocr_config={'engine_type': OCREngine.ONNXRUNTIME,
            'EngineConfig.onnxruntime.intra_op_num_threads': args.threads,
            'EngineConfig.onnxruntime.inter_op_num_threads': 1, 'seal_enable': False},
        table_config={'model_type': TableModel.SLANET1M, 'engine_type': TableEngine.ONNXRUNTIME,
            'engine_cfg': cpu, 'model_dir_or_path': str(Path(rapid_doc.__file__).parent / 'resources/slanet-1m.onnx')})
    versions = {package: importlib.metadata.version(package) for package in ['rapid-doc', 'rapidocr', 'onnxruntime', 'pillow']}
    for n in pages:
        stem = f'{n:03}'
        page_pdf = work / 'single' / f'{stem}.pdf'
        prepared = json.loads((work / 'page-assets' / f'{stem}.json').read_text())
        if digest(page_pdf) != prepared['pagePdfSha256']:
            raise ValueError(f'Stale prepared source page {n}')
        raw = work / 'layout' / f'{stem}.json'
        markdown = raw.with_suffix('.md')
        binding = work / 'layout-bindings' / f'{stem}.json'
        if binding.exists():
            old = json.loads(binding.read_text())
            if old['pagePdfSha256'] != digest(page_pdf) or old['layoutJsonSha256'] != digest(raw) or old['ocrMarkdownSha256'] != digest(markdown):
                raise ValueError(f'Stale OCR source binding on physical page {n}')
            continue
        if raw.exists() or markdown.exists():
            raise ValueError(f'Unbound OCR output exists on page {n}; inspect before replacing')
        started = time.monotonic()
        result = engine(page_pdf)
        for name, data in result.images.items():
            (work / 'layout/images' / Path(name).name).write_bytes(data)
        markdown.write_text(result.markdown)
        temporary = raw.with_suffix('.tmp')
        temporary.write_text(json.dumps(result.middle_json, ensure_ascii=False))
        temporary.replace(raw)
        evidence = {
            'schemaVersion': 1, 'status': 'machine-layout-only', 'physicalPage': n,
            'sourceSha256': prepared['sourceSha256'], 'pagePdfSha256': digest(page_pdf),
            'layoutJsonSha256': digest(raw), 'ocrMarkdownSha256': digest(markdown),
            'packages': versions, 'seconds': time.monotonic() - started,
            'qualification': 'OCR output and formula crop tokens are unverified. No original-page or bilingual acceptance is assigned.'
        }
        binding.write_text(json.dumps(evidence, ensure_ascii=False, indent=2) + '\n')
        print('BOOK_PAGE', n, round(evidence['seconds'], 2), flush=True)


if __name__ == '__main__':
    main()
