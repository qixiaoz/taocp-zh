#!/usr/bin/env python3
"""Expand local formula readings into PRIVATE, explicitly unverified page drafts.

Never writes verified/, a master manuscript, public assets or review sign-offs.
Source images and original-page/bilingual checks remain mandatory.
"""
from pathlib import Path
import argparse, hashlib, json, re, sqlite3


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--work',type=Path,required=True)
    parser.add_argument('--pages',required=True)
    parser.add_argument('--max-formula-chars',type=int,default=2000,
        help='Flag overlong machine outputs without deleting original database readings')
    args=parser.parse_args()
    root=Path(__file__).resolve().parents[1]
    work=args.work.resolve()
    if not work.is_relative_to(root/'.work'):
        parser.error('Working drafts must stay in the private .work directory')
    pages=set()
    for part in args.pages.split(','):
        m=re.fullmatch(r'(\d+)(?:-(\d+))?',part.strip())
        if not m or int(m[1])<1 or int(m[2]or m[1])<int(m[1]):parser.error('Invalid physical-page range')
        pages.update(range(int(m[1]),int(m[2]or m[1])+1))
    readings={}
    for model in ['s','m']:
        database=work/f'math-{model}.sqlite'
        if not database.exists():continue
        db=sqlite3.connect(f'file:{database}?mode=ro',uri=True,timeout=60)
        for key,latex in db.execute('SELECT key,latex FROM formula'):
            readings[key]=(model,latex)
        db.close()
    target=work/'working';target.mkdir(exist_ok=True)
    records=[]
    for n in sorted(pages):
        stem=f'{n:03}';source=work/'layout'/f'{stem}.md'
        if not source.exists():continue
        raw=source.read_bytes();used=[];missing=[];flagged=[]
        def formula(match):
            key=match[1]
            if key not in readings:
                missing.append(key)
                return match[0]
            model,latex=readings[key]
            if len(latex)>args.max_formula_chars:
                missing.append(key)
                flagged.append({'cropKey':key,'model':model,'characters':len(latex),
                    'latexSha256':hashlib.sha256(latex.encode()).hexdigest(),
                    'reason':'Overlong machine candidate; inspect original crop and unchanged database reading'})
                return match[0]
            used.append({'cropKey':key,'model':model,'latexSha256':hashlib.sha256(latex.encode()).hexdigest()})
            return latex
        body=re.sub(r'TAOCP([0-9a-f]{18})',formula,raw.decode())
        body=re.sub(r'(?<=[(\"\'])images/([^\s)\"\']+)',r'../layout/images/\1',body)
        output=target/f'{stem}.md'
        output.write_text(body)
        record={'schemaVersion':1,'physicalPage':n,'status':'unverified-machine-working-draft',
            'ocrMarkdownSha256':hashlib.sha256(raw).hexdigest(),
            'workingMarkdownSha256':hashlib.sha256(body.encode()).hexdigest(),
            'formulaReadings':used,'missingFormulaCropKeys':sorted(set(missing)),
            'flaggedMachineCandidates':flagged,
            'qualification':'Machine OCR and selected recognizer outputs only. No source-page or bilingual acceptance. Do not copy to a published master without actual review.'}
        output.with_suffix('.machine.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n')
        records.append({'physicalPage':n,'formulaOccurrences':len(used),'missingDistinctCrops':len(set(missing))})
    print(json.dumps({'status':'private-unverified-drafts-only','pages':records}))


if __name__=='__main__':main()
