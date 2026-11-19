#!/usr/bin/env python3
"""Checkpoint local formula recognizer readings, never editorial sign-offs.

Uses the optional rapid-doc/onnxruntime environment of ocr-source-pages.py.
The S and M databases are independent machine readings; agreement is not proof.
"""
from pathlib import Path
import argparse
import hashlib
import json
import re
import sqlite3
import time


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--work', type=Path, required=True)
    parser.add_argument('--model', choices=['m', 's'], required=True)
    parser.add_argument('--provider', choices=['cpu', 'coreml'], default='coreml')
    parser.add_argument('--cache', type=Path)
    parser.add_argument('--watch', action='store_true')
    parser.add_argument('--limit', type=int)
    args = parser.parse_args()
    work = args.work.resolve()
    import numpy as np
    from PIL import Image
    import onnxruntime as ort
    from rapid_doc.model.formula.rapid_formula_self import RapidFormula, RapidFormulaInput, ModelType, EngineType
    from rapid_doc.model.formula.rapid_formula_self.model_handler.utils import ModelProcessor

    kind = ModelType.PP_FORMULANET_PLUS_S if args.model == 's' else ModelType.PP_FORMULANET_PLUS_M
    local_model = ModelProcessor.DEFAULT_MODEL_DIR / f'pp_formulanet_plus_{args.model}.onnx'
    if not local_model.is_file():
        raise FileNotFoundError('Formula model is not cached locally; automatic model download is not part of this tool.')
    model = RapidFormula(RapidFormulaInput(model_type=kind, engine_type=EngineType.ONNXRUNTIME,
        engine_cfg={'intra_op_num_threads': 1, 'inter_op_num_threads': 1}))
    cache = None
    if args.provider == 'coreml':
        if 'CoreMLExecutionProvider' not in ort.get_available_providers():
            raise RuntimeError('CoreML is unavailable; select --provider cpu explicitly.')
        options = ort.SessionOptions()
        options.intra_op_num_threads = 1
        options.inter_op_num_threads = 1
        options.log_severity_level = 3
        options.add_free_dimension_override_by_name('DynamicDimension.0', 1)
        cache = (args.cache or work / 'coreml-cache').resolve() / args.model
        cache.mkdir(parents=True, exist_ok=True)
        model.model_handler.model_processors.session.session = ort.InferenceSession(str(local_model), sess_options=options,
            providers=[('CoreMLExecutionProvider', {'ModelFormat': 'NeuralNetwork', 'MLComputeUnits': 'ALL', 'ModelCacheDirectory': str(cache)}), 'CPUExecutionProvider'])
    database = work / f'math-{args.model}.sqlite'
    db = sqlite3.connect(database, timeout=60)
    db.execute('PRAGMA journal_mode=WAL')
    db.execute('CREATE TABLE IF NOT EXISTS formula(key TEXT PRIMARY KEY,latex TEXT NOT NULL,seconds REAL)')
    db.commit()
    count = 0
    started = time.monotonic()
    while True:
        seen = {row[0] for row in db.execute('SELECT key FROM formula')}
        todo = []
        for page in sorted((work / 'layout').glob('*.md')):
            for key in re.findall(r'TAOCP([0-9a-f]{18})', page.read_text()):
                if key not in seen and (work / 'math-crops' / f'{key}.png').is_file():
                    todo.append(key)
                    seen.add(key)
        if not todo:
            if not args.watch or (work / 'layout.complete.json').is_file():
                break
            time.sleep(2)
            continue
        for key in todo:
            before = time.monotonic()
            pixels = np.asarray(Image.open(work / 'math-crops' / f'{key}.png').convert('RGB'))
            reading = model([pixels], batch_size=1, tqdm_enable=False)[0].rec_formula
            db.execute('INSERT OR IGNORE INTO formula VALUES(?,?,?)', (key, reading, time.monotonic() - before))
            db.commit()
            count += 1
            if count < 5 or count % 50 == 0:
                print('FORMULAS', args.model, count, round(time.monotonic() - started, 1), flush=True)
            if args.limit and count >= args.limit:
                break
        if args.limit and count >= args.limit:
            break
    evidence = {
        'schemaVersion': 1, 'status': 'machine-formula-readings-only',
        'model': args.model, 'provider': args.provider,
        'modelSha256': hashlib.sha256(local_model.read_bytes()).hexdigest(),
        'newReadings': count, 'totalReadings': db.execute('SELECT COUNT(*) FROM formula').fetchone()[0],
        'seconds': time.monotonic() - started,
        'qualification': 'Local recognizer outputs. No original-page or bilingual review is assigned.'
    }
    db.close()
    (work / f'math-{args.model}-machine-status.json').write_text(json.dumps(evidence, ensure_ascii=False, indent=2) + '\n')
    print('FORMULAS_COMPLETE', json.dumps(evidence), flush=True)


if __name__ == '__main__':
    main()
