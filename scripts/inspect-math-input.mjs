#!/usr/bin/env node
// Diagnostic only: no Pandoc, OCR cache, Python environment or source PDF needed.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { createMarkdownRenderer, resolveConfig, disposeMdItInstance } from 'vitepress';
import { readChapters } from './book-chapters.mjs';
import { selectVolumes } from './book-volumes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sha = value => createHash('sha256').update(value).digest('hex');

export function sourceLinePages(source, pageLanguage = 'CN', previous = { source: null, cnPdfPage: null, enPdfPage: null }) {
  let current = previous;
  return source.split('\n').map(line => {
    // Source page anchors may follow a section anchor, or occur within prose.
    // EN supplements must clear the last CN page instead of inheriting it.
    // Retain the original first-anchor-per-line convention for collapsed CN
    // anchors; this remains a line/block diagnostic, not exact token offsets.
    const anchor = line.match(/<(?:a|p|table|tbody|tr)\s+id=["'](pdf|sup-en)-(\d+)["']/);
    if (anchor) {
      const [, kind, page] = anchor;
      current = kind === 'pdf' && pageLanguage === 'CN'
        ? { source: 'CN', cnPdfPage: Number(page), enPdfPage: null }
        : { source: 'EN', cnPdfPage: null, enPdfPage: Number(page) };
    }
    return { ...current };
  });
}

export function inspectTokens(tokens, linePages = []) {
  const formulas = [], unconsumed = [], rawHtml = [];
  function walk(list, inherited = [0, 0]) {
    for (const t of list) {
      const map = t.map ?? inherited;
      const page = linePages[map[0]];
      // Keep the exported numeric-array API's original result shape.
      const position = { sourceLine: map[0] + 1, ...(page && typeof page === 'object'
        ? { source: page.source ?? null, cnPdfPage: page.cnPdfPage ?? null, enPdfPage: page.enPdfPage ?? null }
        : { cnPdfPage: page ?? null }) };
      if (/^math_(?:inline|block)$/.test(t.type)) formulas.push({ ...position, display: t.type === 'math_block', tex: t.content, sha256: sha(t.content.trim()) });
      if (t.type === 'text' && /\$/.test(t.content)) unconsumed.push({ ...position, text: t.content, likelyUnparsedTex: /\$[^\n]*\\[A-Za-z]|\\[A-Za-z][^\n]*\$/.test(t.content) });
      if (t.type === 'html_block' && /\$/.test(t.content)) rawHtml.push({ ...position, text: t.content });
      if (t.children) walk(t.children, map);
    }
  }
  walk(tokens);
  return { counts: { total: formulas.length, inline: formulas.filter(x => !x.display).length, display: formulas.filter(x => x.display).length, unconsumedDollarText: unconsumed.length, likelyUnparsedTex: unconsumed.filter(x => x.likelyUnparsedTex).length, rawHtmlBlocksWithDollar: rawHtml.length }, formulas, unconsumed, rawHtml };
}

async function inspectVolume(volume) {
const book = await readChapters(root, volume);
const sources = [];
let previous;
for (const chapter of book.pages) {
  const text = await fs.readFile(path.join(root, chapter.chapterFile), 'utf8');
  const pages = sourceLinePages(text, volume.sourcePageLanguage, previous);
  previous = pages.at(-1);
  sources.push({ file: chapter.chapterFile, text, pages });
}
function inspectSections(renderer) {
  const combined = { counts: {}, formulas: [], unconsumed: [], rawHtml: [] };
  for (const { file, text, pages } of sources) {
    const result = inspectTokens(renderer.parse(text, {}), pages);
    for (const key of Object.keys(result.counts)) combined.counts[key] = (combined.counts[key] ?? 0) + result.counts[key];
    for (const key of ['formulas', 'unconsumed', 'rawHtml']) {
      for (const token of result[key]) combined[key].push({ ...token, sourceFile: file });
    }
  }
  return combined;
}
const standard = await createMarkdownRenderer(root, { math: true });
const baseline = inspectSections(standard);
disposeMdItInstance();
let configured = null;
try {
  const config = await resolveConfig(path.join(root, 'docs'), 'build');
  const renderer = await createMarkdownRenderer(config.srcDir, config.markdown, config.site.base);
  configured = inspectSections(renderer);
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
const result = { source: { index: book.indexFile, chapters: book.pages.map(({ chapterFile, chapterSha256 }) => ({ file: chapterFile, sha256: chapterSha256 })) }, baseline, configured,
  differences: configured ? { removedFromDefault: difference(baseline.formulas, configured.formulas), addedByConfiguration: difference(configured.formulas, baseline.formulas) } : null,
  note: 'Token counts are diagnostic, not human verification. HTML-block math rendered by a custom renderer may be absent from parser tokens; final HTML must also be inspected.' };
disposeMdItInstance();
return { ...result, volume: volume.id };
}

async function main() {
const args = process.argv.slice(2);
let volumeId = null, outputName = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--volume') {
    volumeId = args[++i];
    if (!volumeId || volumeId.startsWith('-')) throw new Error('--volume requires a volume id');
  }
  else if (args[i].startsWith('--volume=')) volumeId = args[i].slice('--volume='.length);
  else if (!args[i].startsWith('-') && !outputName) outputName = args[i];
  else throw new Error(`Unknown argument: ${args[i]}`);
}
const selected = selectVolumes(volumeId);
if (outputName && selected.length !== 1) throw new Error('An explicit output path requires --volume when multiple volumes are enabled');
const audits = [];
for (const volume of selected) {
  const result = await inspectVolume(volume);
  const relativeOutput = outputName ?? `docs/.vitepress/math-input-audit-${volume.id}.json`;
  const output = path.resolve(root, relativeOutput);
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, JSON.stringify(result, null, 2) + '\n');
  // Preserve the existing diagnostic path for volume one.
  if (!outputName && volume.id === 'volume1') await fs.writeFile(path.join(root, 'docs/.vitepress/math-input-audit.json'), JSON.stringify(result, null, 2) + '\n');
  const summary = { volume: volume.id, output: path.relative(root, output), index: result.source.index, sections: result.source.chapters.length,
    baseline: result.baseline.counts, configured: result.configured?.counts,
    differences: result.differences && Object.fromEntries(Object.entries(result.differences).map(([key, value]) => [key, value.length])) };
  audits.push(summary);
  console.log(JSON.stringify(summary, null, 2));
}
if (!volumeId && !outputName) await fs.writeFile(path.join(root, 'docs/.vitepress/math-input-audits.json'), JSON.stringify({ volumes: audits }, null, 2) + '\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
