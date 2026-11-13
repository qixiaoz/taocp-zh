#!/usr/bin/env node
// Diagnostic only: no Pandoc, OCR cache, Python environment or source PDF needed.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { createMarkdownRenderer, resolveConfig, disposeMdItInstance } from 'vitepress';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const book = '计算机程序设计艺术·卷1·基本算法.md';
const source = await fs.readFile(path.join(root, book), 'utf8');
const sourceLines = source.split('\n');
const sha = s => createHash('sha256').update(s).digest('hex');
const pages = [];
let currentPage = null;
for (const line of sourceLines) {
  const match = line.match(/<a id="pdf-(\d+)"/);
  if (match) currentPage = Number(match[1]);
  pages.push(currentPage);
}

export function inspectTokens(tokens, linePages = []) {
  const formulas = [], unconsumed = [], rawHtml = [];
  function walk(list, inherited = [0, 0]) {
    for (const t of list) {
      const map = t.map ?? inherited;
      const position = { sourceLine: map[0] + 1, cnPdfPage: linePages[map[0]] ?? null };
      if (/^math_(?:inline|block)$/.test(t.type)) formulas.push({ ...position, display: t.type === 'math_block', tex: t.content, sha256: sha(t.content.trim()) });
      if (t.type === 'text' && /\$/.test(t.content)) unconsumed.push({ ...position, text: t.content, likelyUnparsedTex: /\$[^\n]*\\[A-Za-z]|\\[A-Za-z][^\n]*\$/.test(t.content) });
      if (t.type === 'html_block' && /\$/.test(t.content)) rawHtml.push({ ...position, text: t.content });
      if (t.children) walk(t.children, map);
    }
  }
  walk(tokens);
  return { counts: { total: formulas.length, inline: formulas.filter(x => !x.display).length, display: formulas.filter(x => x.display).length, unconsumedDollarText: unconsumed.length, likelyUnparsedTex: unconsumed.filter(x => x.likelyUnparsedTex).length, rawHtmlBlocksWithDollar: rawHtml.length }, formulas, unconsumed, rawHtml };
}

const standard = await createMarkdownRenderer(root, { math: true });
const baseline = inspectTokens(standard.parse(source, {}), pages);
disposeMdItInstance();
let configured = null;
try {
  const config = await resolveConfig(path.join(root, 'docs'), 'build');
  const renderer = await createMarkdownRenderer(config.srcDir, config.markdown, config.site.base);
  configured = inspectTokens(renderer.parse(source, {}), pages);
} catch (e) {
  console.warn('Configured renderer unavailable:', e.message);
}
function difference(a, b) {
  const available = new Map();
  for (const f of b) available.set(f.sha256, (available.get(f.sha256) ?? 0) + 1);
  return a.filter(f => {
    const n = available.get(f.sha256) ?? 0;
    if (n) { available.set(f.sha256, n - 1); return false; }
    return true;
  });
}
const result = { source: { file: book, sha256: sha(source) }, baseline, configured,
  differences: configured ? { removedFromDefault: difference(baseline.formulas, configured.formulas), addedByConfiguration: difference(configured.formulas, baseline.formulas) } : null,
  note: 'Token counts are diagnostic, not human verification. HTML-block math rendered by a custom renderer may be absent from parser tokens; final HTML must also be inspected.' };
const output = path.resolve(root, process.argv[2] ?? 'docs/.vitepress/math-input-audit.json');
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ output: path.relative(root, output), baseline: baseline.counts, configured: configured?.counts,
  differences: result.differences && Object.fromEntries(Object.entries(result.differences).map(([k, v]) => [k, v.length])) }, null, 2));
