#!/usr/bin/env node
/** Check the actual generated book and built site, using only publishable inputs.
 * Run after book:prepare + vitepress build. --source-only diagnoses generation.
 * The report is generated under docs/.vitepress, never in the editorial master.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { load } from 'cheerio';
import { unzipSync } from 'fflate';
import { createMarkdownRenderer, resolveConfig } from 'vitepress';
import { normalizeMathSyntax } from './book-markdown.mjs';
import { volumes, enabledVolumes, volumeManifestFile } from './book-volumes.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const sourceOnly = process.argv.includes('--source-only');
const newReport = () => ({ version: 2, mode: sourceOnly ? 'source-only' : 'built-site', errors: [], warnings: [], pages: [], math: {}, checks: {} });
let report = newReport();
const hash = data => createHash('sha256').update(data).digest('hex');
const read = file => fs.readFile(path.resolve(ROOT, file), 'utf8');
const json = async file => JSON.parse(await read(file));
const fail = (kind, details) => report.errors.push({ kind, ...details });
const warn = (kind, details) => report.warnings.push({ kind, ...details });
const check = (ok, kind, details = {}) => { if (!ok) fail(kind, details); return !!ok; };
async function readEditorial(file) {
  const bytes = await fs.readFile(path.resolve(ROOT, file)), invalid = [];
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    if (byte < 32 && byte !== 9 && byte !== 10 && !(byte === 13 && bytes[i + 1] === 10)) invalid.push({ offset: i, byte });
  }
  check(!invalid.length, 'editorial-control-character', { file, count: invalid.length, bytes: invalid.slice(0, 10) });
  return bytes.toString('utf8');
}
const rel = file => path.relative(ROOT, file).split(path.sep).join('/');
const ids = text => [...text.matchAll(/<a\s+id="([^"]+)"[^>]*>/g)].map(x => x[1]);
const counts = values => { const m = new Map(); for (const v of values) m.set(v, (m.get(v) ?? 0) + 1); return m; };
const compact = value => value.replace(/\s+/gu, '');
const textExtensions = /\.(?:html?|css|[cm]?js|jsonl?|svg|txt|xml|md|map)$/i;
const absoluteLocal = /(?:file:\/\/|\/(?:Users|home)\/[^\s"'<>]+|\/private\/(?:tmp|var)\/[^\s"'<>]+|[A-Za-z]:[\\/]Users[\\/])/g;
const privateSegment = /(?:^|\/)(?:\.work|source_cn|source_en|\.env(?:\.[^/]*)?)(?:\/|$)/i;
function multisetDifference(expected, actual) {
  const rest = counts(actual), missing = [];
  for (const item of expected) {
    const n = rest.get(item) ?? 0;
    if (n) rest.set(item, n - 1); else missing.push(item);
  }
  return { missing, extra: [...rest].flatMap(([item, n]) => Array(n).fill(item)) };
}
function equalList(expected, actual, kind, context) {
  const diff = multisetDifference(expected, actual);
  check(!diff.missing.length && !diff.extra.length, kind, { ...context, ...diff });
}
function equalSequence(expected, actual, kind, context) {
  const index = expected.findIndex((value, i) => value !== actual[i]);
  check(index === -1 && expected.length === actual.length, kind, {
    ...context, expectedCount: expected.length, actualCount: actual.length,
    ...(index < 0 ? {} : { index, expected: expected[index], actual: actual[index] })
  });
}
async function walk(directory, skip = new Set()) {
  const output = [];
  for (const item of await fs.readdir(directory, { withFileTypes: true })) {
    if (skip.has(item.name)) continue;
    const file = path.join(directory, item.name);
    if (item.isSymbolicLink()) { fail('publication-symlink', { file: rel(file) }); continue; }
    if (item.isDirectory()) output.push(...await walk(file, skip));
    else if (item.isFile()) output.push(file);
  }
  return output;
}
function extractFootnotes(text) {
  const lines = text.match(/[^\n]*\n|[^\n]+$/g) ?? [], notes = new Map();
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^\[\^([^\]]+)\]:/);
    if (!match) continue;
    let end = i + 1;
    while (end < lines.length) {
      if (/^(?: {4}|\t)\S/.test(lines[end])) { end++; continue; }
      if (!lines[end].trim() && /^(?: {4}|\t)\S/.test(lines[end + 1] ?? '')) { end += 2; continue; }
      break;
    }
    check(!notes.has(match[1]), 'duplicate-footnote-definition', { id: match[1] });
    notes.set(match[1], lines.slice(i, end).join(''));
    for (let j = i; j < end; j++) lines[j] = '';
  }
  return { body: lines.join(''), notes };
}
function stripFrontmatter(s) { return s.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, ''); }
function sourceCanonical(s) {
  // These are precisely presentation changes; text, TeX, code and table cells
  // remain in the comparison. Links and explicit IDs are audited separately.
  return compact(stripFrontmatter(s)
    .replace(/<a\s+id="[^"]+"[^>]*><\/a>/g, '')
    .replace(/^ {0,3}#{1,6}\s+/gm, '')
    .replace(/\]\(([^\s)]+)\)/g, (_, target) => {
      if (/^[a-z][a-z\d+.-]*:/i.test(target)) return `](${target})`;
      if (target.includes('#')) return `](#${target.split('#').slice(1).join('#')})`;
      const i = target.indexOf('assets/');
      return i >= 0 ? `](${target.slice(i)})` : `](${target})`;
    })
    .replace(/(?:href|src)="([^"\n]+)"/g, (all, target) => {
      if (/^[a-z][a-z\d+.-]*:/i.test(target)) return all;
      if (target.includes('#')) return all.replace(target, '#' + target.split('#').slice(1).join('#'));
      const i = target.indexOf('assets/');
      return i >= 0 ? all.replace(target, target.slice(i)) : all;
    }));
}
function firstDifference(a, b) {
  let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return { offset: i, expected: a.slice(Math.max(0, i - 90), i + 180), actual: b.slice(Math.max(0, i - 90), i + 180), expectedLength: a.length, actualLength: b.length };
}
function mathKey(formula) { return `${formula.display ? 'display' : 'inline'}:${formula.tex.trim()}`; }
function visibleText($, scope) {
  const clone = scope.clone();
  clone.find('mjx-container,.book-math,[data-qa-math],.header-anchor,.copy,.lang,.line-numbers-wrapper,.footnote-backref,script,style').remove();
  return compact(clone.text());
}
function allImages($, scope) { return scope.find('img').toArray().map(el => $(el).attr('src')); }
function renderedCode($, scope) {
  const newline = text => text.replace(/\r\n/g, '\n');
  return {
    blocks: scope.find('pre').toArray().map(el => {
      const node = $(el), code = node.children('code');
      // Shiki's copy button, language badge and line numbers are outside code.
      return newline((code.length ? code : node).text());
    }),
    inline: scope.find('code').toArray().filter(el => !$(el).closest('pre').length)
      .map(el => newline($(el).text()))
  };
}
function equalRenderedCode(expected, actual, context) {
  for (const kind of ['blocks', 'inline']) {
    check(expected[kind].length === actual[kind].length, 'rendered-code-count-changed', { ...context, codeKind: kind, expected: expected[kind].length, actual: actual[kind].length });
    expected[kind].forEach((text, index) => {
      const found = actual[kind][index];
      check(text === found, 'rendered-code-content-changed', { ...context, codeKind: kind, index,
        ...(text === found ? {} : firstDifference(text, found ?? '')) });
    });
  }
}
function disabledPublicationOwner(name) {
  const relative = name.replace(/^public\//, '');
  const routeId = relative.match(/^(volume\d+)(?:\/|\.(?:html|md)$)/)?.[1];
  if (routeId && !volumes.some(volume => volume.id === routeId && volume.enabled)) return routeId;
  const matches = [];
  for (const volume of volumes) {
    const prefixes = [...volume.assetRoots,
      volume.reviewPublicPrefix.slice(1),
      ...volume.assetRoots.map(root => 'linked-assets/' + root.slice('assets/'.length))];
    for (const prefix of prefixes) if (relative.startsWith(prefix + '/')) matches.push({ volume, length: prefix.length });
    if ([`${volume.reportRoute.slice(1)}.md`, `${volume.reportRoute.slice(1)}.html`, `downloads/${volume.zipName}`].includes(relative)) matches.push({ volume, length: relative.length });
  }
  // The legacy /review root contains /review/volume2: its longer owner wins.
  matches.sort((a, b) => b.length - a.length);
  return matches[0] && !matches[0].volume.enabled ? matches[0].volume.id : null;
}
function privateLiveLink(href) {
  let decoded = href;
  try { decoded = decodeURIComponent(href); } catch {}
  const externalHttp = /^(?:https?:)?\/\//i.test(decoded);
  return /(?:file:|(?:^|\/)\.work\/|(?:^|\/)source_(?:cn|en)\/)/i.test(decoded)
    || !externalHttp && /\.pdf(?:[?#]|$)/i.test(decoded);
}
function resolveSourceLink(fromFile, href) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) return null;
  const [pathname, fragment] = href.split('#');
  let pathnameDecoded;
  try { pathnameDecoded = decodeURIComponent(pathname.split('?')[0]); } catch { return null; }
  const resolved = pathnameDecoded ? path.resolve(path.dirname(fromFile), pathnameDecoded) : fromFile;
  return { file: resolved, fragment: fragment ? decodeURIComponent(fragment) : null };
}

async function checkVolume(volume, manifest, navigation) {
  const sourceFile = manifest.source.file;
  check(!path.isAbsolute(sourceFile) && !sourceFile.includes('..'), 'unsafe-source-manifest-path', { sourceFile });
  const source = await readEditorial(sourceFile);
  report.source = { file: sourceFile, sha256: hash(source) };
  check(hash(source) === manifest.source.sha256, 'stale-source-manifest');
  const originalReport = await readEditorial(volume.report);
  check(hash(originalReport) === manifest.editorialReport.sha256, 'stale-editorial-report-manifest');
  check(manifest.editorialReport.websiteFile === `docs${volume.reportRoute}.md`, 'configured-report-file-mismatch');
  const websiteReport = await read(`docs${volume.reportRoute}.md`);
  check(hash(websiteReport) === manifest.editorialReport.websiteSha256, 'generated-report-hash-mismatch');
  check(navigation.source.sha256 === hash(source), 'stale-navigation');
  const pages = manifest.sectionRoutes;
  check(Array.isArray(pages) && pages.length > 0, 'missing-page-manifest');
  const originalIds = ids(source);
  check(originalIds.filter(id => /^pdf-\d+$/.test(id)).length === volume.expectedSourcePages, 'source-page-count-mismatch', { expected: volume.expectedSourcePages, actual: originalIds.filter(id => /^pdf-\d+$/.test(id)).length });
  const missingSourcePages = Array.from({ length: volume.expectedSourcePages }, (_, index) => `pdf-${String(index + 1).padStart(3, '0')}`).filter(id => !originalIds.includes(id));
  check(!missingSourcePages.length, 'missing-physical-page-anchors', { anchors: missingSourcePages });
  check(new Set(originalIds).size === originalIds.length, 'duplicate-source-ids');
  const globalFootnotes = extractFootnotes(source).notes;
  const allGeneratedIds = [], routeFiles = new Map(), generatedPages = [];
  let cursor = 0;
  const config = await resolveConfig(DOCS, 'build');
  const base = config.site.base;
  report.base = base;
  const md = await createMarkdownRenderer(config.srcDir, config.markdown, base);
  // Instrument the configured math token renderers, leaving the production
  // parser and HTML-cell handlers intact. This avoids rendering 13k SVGs twice.
  let captured = [];
  for (const [type, display] of [['math_inline', false], ['math_block', true]]) {
    md.renderer.rules[type] = (tokens, index) => {
      captured.push({ display, tex: tokens[index].content });
      return display ? '<div data-qa-math="1"></div>' : '<span data-qa-math="1"></span>';
    };
  }
  function expectedRender(raw, file) {
    captured = [];
    const env = { path: file, relativePath: path.relative(DOCS, file) };
    const tokens = md.parse(stripFrontmatter(raw), env);
    const html = md.renderer.render(tokens, md.options, env);
    const $ = load(html);
    // Production Vue SSR expands only these JSON string literals. Restore the
    // same text for the direct Markdown-render expectation, without eval.
    $('code[data-book-code-literal="1"][v-text]').each((_, node) => {
      const literal = JSON.parse($(node).attr('v-text'));
      if (typeof literal !== 'string') throw new Error('Inline code literal must be a JSON string');
      $(node).text(literal);
    });
    const formulas = [...captured];
    const code = [];
    function collectCode(items) {
      for (const token of items) {
        if (['fence', 'code_block', 'code_inline'].includes(token.type)) code.push(`${token.type}:${token.content}`);
        if (token.children) collectCode(token.children);
      }
    }
    collectCode(tokens);
    const sourceLinks = $('a[href]').toArray().map(el => $(el).attr('href'));
    const images = allImages($, $('body'));
    return { html, formulas, code, renderedCode: renderedCode($, $('body')), text: visibleText($, $('body')), links: sourceLinks, images };
  }
  md.core.ruler.disable('book_math_syntax');
  const priorMath = expectedRender(source, path.resolve(ROOT, sourceFile)).formulas;
  md.core.ruler.enable('book_math_syntax');
  const normalized = normalizeMathSyntax(source);
  check(compact(normalized).replaceAll('$', '') === compact(source).replaceAll('$', ''), 'math-compatibility-changes-content');
  const normalizedLines = normalized.split('\n'), sourceLines = source.split('\n');
  const mathSyntaxChanges = [];
  let sourcePage = null;
  for (let i = 0; i < sourceLines.length; i++) {
    const anchor = sourceLines[i].match(/id="pdf-(\d+)"/);
    if (anchor) sourcePage = Number(anchor[1]);
    if (sourceLines[i] === normalizedLines[i]) continue;
    const dollarDelta = (sourceLines[i].match(/\$/g) ?? []).length - (normalizedLines[i]?.match(/\$/g) ?? []).length;
    mathSyntaxChanges.push({ sourceLine: i + 1, pdfPage: sourcePage,
      kind: dollarDelta === 2 ? 'nested-dollar-delimiters' : dollarDelta === 0 ? 'closing-dollar-whitespace' : 'other',
      original: sourceLines[i], normalized: normalizedLines[i] });
  }
  const expectedMathAll = [], sourceMathAll = [];
  for (const page of pages) {
    const ctx = { route: page.route };
    check(page.route.startsWith(volume.routePrefix + '/') && /^\/volume\d+\/[a-z\d/-]+$/.test(page.route), 'invalid-route', ctx);
    check(page.file === `docs${page.route}.md`, 'route-file-mismatch', ctx);
    check(!routeFiles.has(page.route), 'duplicate-route', ctx);
    const range = page.sourceRange;
    check(range && range.start === cursor && range.end > range.start && range.end <= source.length, 'source-range-gap-or-overlap', { ...ctx, previousEnd: cursor, range });
    if (!range) continue;
    cursor = range.end;
    const original = source.slice(range.start, range.end);
    const file = path.resolve(ROOT, page.file), markdown = await fs.readFile(file, 'utf8');
    routeFiles.set(page.route, file);
    check(hash(markdown) === page.sha256, 'generated-markdown-hash-mismatch', ctx);
    const generatedIds = ids(markdown); allGeneratedIds.push(...generatedIds.filter(id => originalIds.includes(id)));
    equalList(ids(original), generatedIds.filter(id => originalIds.includes(id)), 'source-anchor-changed', ctx);
    for (const id of ids(original)) check(navigation.anchorRoutes[id] === page.route, 'wrong-anchor-route', { ...ctx, id });
    const originalWithoutNotes = extractFootnotes(original).body;
    const generated = extractFootnotes(stripFrontmatter(markdown));
    const refs = [...new Set([...originalWithoutNotes.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(m => m[1]))];
    equalList(refs, [...generated.notes.keys()], 'footnote-distribution-changed', ctx);
    for (const [id, value] of generated.notes) check(compact(value) === compact(globalFootnotes.get(id) ?? ''), 'footnote-text-changed', { ...ctx, id });
    let comparable = generated.body;
    if (page.kind === 'answers' && comparable.includes(`# ${page.title}\n`) && !originalWithoutNotes.includes(page.title)) comparable = comparable.replace(`# ${page.title}\n`, '');
    const a = sourceCanonical(originalWithoutNotes), b = sourceCanonical(comparable);
    check(a === b, 'section-text-changed', { ...ctx, ...(a === b ? {} : firstDifference(a, b)) });
    const expected = expectedRender(markdown, file);
    const sourceWithNotes = originalWithoutNotes + '\n' + refs.map(id => globalFootnotes.get(id) ?? '').join('\n');
    const sourceRender = expectedRender(sourceWithNotes, path.resolve(ROOT, sourceFile));
    equalList(sourceRender.formulas.map(mathKey), expected.formulas.map(mathKey), 'formula-changed-during-split', ctx);
    equalSequence(sourceRender.code, expected.code, 'code-content-changed-during-split', ctx);
    expectedMathAll.push(...expected.formulas); sourceMathAll.push(...sourceRender.formulas);
    const data = { ...page, markdown, file, expected, originalIds: ids(original), footnoteRefs: [...originalWithoutNotes.matchAll(/\[\^([^\]]+)\](?!:)/g)].length };
    generatedPages.push(data);
    report.pages.push({ route: page.route, sourceRange: range, explicitIds: ids(original).length, formulas: expected.formulas.length, images: expected.images.length, sourceTextPreserved: a === b });
  }
  check(cursor === source.length, 'source-tail-not-covered', { end: cursor, expected: source.length });
  equalList(originalIds, allGeneratedIds, 'whole-book-anchor-changed', {});
  report.checks.sourcePartition = { characters: source.length, pages: pages.length, explicitAnchors: originalIds.length,
    pdfPageAnchors: originalIds.filter(x => /^pdf-\d+$/.test(x)).length, exercises: originalIds.filter(x => x.startsWith('ex-')).length,
    answers: originalIds.filter(x => x.startsWith('ans-')).length, figures: originalIds.filter(x => x.startsWith('fig-')).length, footnotes: globalFootnotes.size };
  const reportFile = path.resolve(ROOT, `docs${volume.reportRoute}.md`);
  const reportExpected = expectedRender(websiteReport, reportFile);
  const originalReportExpected = expectedRender(originalReport, path.resolve(ROOT, volume.report));
  check(originalReportExpected.text === reportExpected.text, 'report-prose-changed-during-cleanup',
    originalReportExpected.text === reportExpected.text ? {} : firstDifference(originalReportExpected.text, reportExpected.text));
  equalSequence(originalReportExpected.formulas.map(mathKey), reportExpected.formulas.map(mathKey), 'report-formula-changed-during-cleanup', {});
  equalRenderedCode(originalReportExpected.renderedCode, reportExpected.renderedCode, { report: volume.reportRoute, stage: 'report-cleanup' });
  const reportPage = { route: volume.reportRoute, file: reportFile, expected: reportExpected, originalIds: ids(websiteReport), isReport: true };

  for (const page of generatedPages) {
    for (const href of [...page.expected.links, ...page.expected.images]) {
      const target = resolveSourceLink(page.file, href);
      if (!target) continue;
      // VitePress changes .md to .html in its renderer; validate against .md.
      if (target.file.endsWith('.html')) target.file = target.file.slice(0, -5) + '.md';
      if (!path.extname(target.file)) target.file += '.md';
      if (href.startsWith('/')) continue; // Runtime base links are checked in dist.
      let exists = await fs.stat(target.file).then(s => s.isFile()).catch(() => false);
      if (!exists && target.file.startsWith(DOCS + path.sep)) {
        const publicFile = path.join(DOCS, 'public', path.relative(DOCS, target.file));
        if (await fs.stat(publicFile).then(s => s.isFile()).catch(() => false)) { target.file = publicFile; exists = true; }
      }
      check(exists, 'missing-generated-link-target', { route: page.route, href });
      if (target.fragment && target.fragment.startsWith('fn')) continue; // Plugin-generated IDs are audited in dist.
      if (target.fragment && exists && target.file.endsWith('.md')) {
        const targetText = await fs.readFile(target.file, 'utf8');
        check(ids(targetText).includes(target.fragment) || !originalIds.includes(target.fragment), 'broken-generated-anchor-link', { route: page.route, href });
      }
    }
  }
  const assetHashes = new Map();
  for (const asset of manifest.assets) {
    const original = await fs.readFile(path.resolve(ROOT, asset.path));
    const copy = await fs.readFile(path.resolve(DOCS, asset.path));
    check(hash(original) === asset.sha256 && hash(copy) === asset.sha256, 'copied-asset-changed', { asset: asset.path });
    assetHashes.set(asset.path, asset.sha256);
  }
  for (const asset of manifest.linkedAssets ?? []) {
    const publicFile = path.join(DOCS, 'public', asset.publicPath.replace(/^\//, ''));
    check(hash(await fs.readFile(publicFile)) === assetHashes.get(asset.source) && asset.sha256 === assetHashes.get(asset.source), 'linked-asset-copy-changed', { asset: asset.source });
  }
  const zipPath = path.resolve(DOCS, 'public', manifest.download.path.replace(/^\//, ''));
  const zipData = await fs.readFile(zipPath);
  check(hash(zipData) === manifest.download.sha256, 'download-hash-mismatch');
  const zip = unzipSync(zipData);
  check(zip[sourceFile] && hash(zip[sourceFile]) === hash(source), 'download-book-changed');
  check(zip[volume.report] && hash(zip[volume.report]) === manifest.editorialReport.downloadSha256, 'download-report-changed');
  const expectedZipEntries = [sourceFile, volume.report, '阅读说明.txt', ...manifest.assets.map(asset => asset.path)];
  equalList(expectedZipEntries, Object.keys(zip), 'download-entry-set-changed', {});
  for (const asset of manifest.assets) check(zip[asset.path] && hash(zip[asset.path]) === asset.sha256, 'download-asset-changed', { asset: asset.path });
  for (const [name, bytes] of Object.entries(zip)) {
    check(!privateSegment.test(name) && !/\.pdf$/i.test(name) && !path.isAbsolute(name) && !name.split('/').includes('..'), 'private-download-entry', { name });
    if (textExtensions.test(name)) {
      const leaks = [...Buffer.from(bytes).toString('utf8').matchAll(absoluteLocal)].map(m => m[0]);
      check(!leaks.length, 'local-path-in-download', { name, leaks });
    }
  }
  report.checks.download = { files: Object.keys(zip).length, bytes: zipData.length, bookIdentical: !!zip[sourceFile] && hash(zip[sourceFile]) === hash(source) };
  const ignore = await read('.gitignore');
  for (const rule of ['.work/', 'source_cn/', 'source_en/']) check(ignore.split(/\r?\n/).includes(rule), 'missing-source-exclusion-rule', { rule });
  const publicationFiles = await walk(DOCS, new Set(['.vitepress']));
  for (const file of publicationFiles) {
    check(!privateSegment.test(path.relative(DOCS, file)) && !/\.pdf$/i.test(file), 'private-source-in-docs', { file: rel(file) });
    const disabled = disabledPublicationOwner(path.relative(DOCS, file).split(path.sep).join('/'));
    check(!disabled, 'disabled-volume-in-docs', { file: rel(file), volume: disabled });
  }

  report.math = { originalEditorialCount: volume.evidence.math ? (await json(volume.evidence.math)).checked : null,
    configuredSource: { total: sourceMathAll.length, inline: sourceMathAll.filter(x => !x.display).length, display: sourceMathAll.filter(x => x.display).length },
    generatedMarkdown: { total: expectedMathAll.length, inline: expectedMathAll.filter(x => !x.display).length, display: expectedMathAll.filter(x => x.display).length },
    inputCompatibility: { unnormalizedParserAndHtml: priorMath.length,
      changesByKind: Object.fromEntries(counts(mathSyntaxChanges.map(x => x.kind))), sourceLines: mathSyntaxChanges,
      formulaDifference: multisetDifference(priorMath.map(mathKey), sourceMathAll.map(mathKey)),
      nonDelimiterContentPreserved: compact(normalized).replaceAll('$', '') === compact(source).replaceAll('$', '') },
    countNote: volume.evidence.mathCountNote ?? 'Formula syntax and rendered-source equality are checked individually. These machine checks do not establish original-page or bilingual editorial review.' };
  const numbered = volume.evidence.numbered ? (await read(volume.evidence.numbered)).trim().split('\n').filter(Boolean).map(JSON.parse) : [];
  for (const entry of numbered) for (const part of entry.parts) check(part.matches_final && originalIds.includes(part.page_anchor), 'numbered-item-evidence-anchor-missing', { id: entry.id, anchor: part.page_anchor });
  report.checks.numberedItems = { evidenceConfigured: !!volume.evidence.numbered, recordedItems: numbered.length, sourcePageAnchorsPresent: numbered.every(entry => entry.parts.every(part => originalIds.includes(part.page_anchor))),
    scope: 'Existing editorial evidence is preserved with the unchanged master and its page anchors. Website QA does not claim a new manual bilingual review.' };
  if (sourceOnly) return;

  const dist = config.outDir;
  const files = await walk(dist);
  const distFiles = new Set(files.map(file => path.relative(dist, file).split(path.sep).join('/')));
  const htmlPages = new Map(), links = [], builtMath = [];
  let annotationWhitespaceCondensed = 0;
  const pageByHtml = new Map(generatedPages.map(p => [p.route.slice(1) + '.html', p]));
  pageByHtml.set(volume.reportRoute.slice(1) + '.html', reportPage);
  const builtZipFile = path.join(dist, 'downloads', volume.zipName);
  const builtZipData = await fs.readFile(builtZipFile);
  check(builtZipData.equals(zipData) && hash(builtZipData) === manifest.download.sha256, 'built-download-bytes-changed', { file: rel(builtZipFile) });
  let builtZip = null;
  try { builtZip = unzipSync(builtZipData); } catch (error) { fail('invalid-built-download-archive', { file: rel(builtZipFile), message: error.message }); }
  if (builtZip) {
    equalList(expectedZipEntries, Object.keys(builtZip), 'built-download-entry-set-changed', {});
    check(builtZip[sourceFile] && hash(builtZip[sourceFile]) === hash(source), 'built-download-book-changed');
    check(builtZip[volume.report] && hash(builtZip[volume.report]) === manifest.editorialReport.downloadSha256, 'built-download-report-changed');
    for (const asset of manifest.assets) check(builtZip[asset.path] && hash(builtZip[asset.path]) === asset.sha256, 'built-download-asset-changed', { asset: asset.path });
  }
  report.checks.download.builtArchiveIdentical = builtZipData.equals(zipData);
  const fileHash = new Map();
  async function imageDigest(url, from) {
    if (url.startsWith('data:')) {
      const match = url.match(/^data:([^,]*),(.*)$/s);
      return match ? hash(match[1].includes(';base64') ? Buffer.from(match[2], 'base64') : Buffer.from(decodeURIComponent(match[2]))) : null;
    }
    const target = resolveBuilt(url, from);
    if (!target || !distFiles.has(target.file)) return null;
    if (!fileHash.has(target.file)) fileHash.set(target.file, hash(await fs.readFile(path.join(dist, target.file))));
    return fileHash.get(target.file);
  }
  function resolveBuilt(href, from) {
    if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) return null;
    let url;
    try { url = new URL(href, 'https://site.invalid' + base + from); } catch { return null; }
    let name = decodeURIComponent(url.pathname);
    if (!name.startsWith(base)) return { file: null, fragment: decodeURIComponent(url.hash.slice(1)), outsideBase: name };
    name = name.slice(base.length);
    if (!name || name.endsWith('/')) name += 'index.html';
    else if (!path.posix.extname(name)) name += '.html';
    return { file: name, fragment: decodeURIComponent(url.hash.slice(1)) };
  }
  for (const file of files) {
    const name = path.relative(dist, file).split(path.sep).join('/');
    check(!privateSegment.test(name) && !/\.pdf$/i.test(name), 'private-built-file', { file: name });
    const disabled = disabledPublicationOwner(name);
    check(!disabled, 'disabled-volume-in-dist', { file: name, volume: disabled });
    if (!textExtensions.test(file)) continue;
    const content = await fs.readFile(file, 'utf8');
    const leaks = [...content.matchAll(absoluteLocal)].map(m => m[0]);
    check(!leaks.length, 'local-path-in-dist', { file: name, leaks: [...new Set(leaks)].slice(0, 10) });
    if (!file.endsWith('.html')) continue;
    const $ = load(content), scope = $('.vp-doc').first(), foundIds = $('[id]').toArray().map(el => $(el).attr('id'));
    const duplicates = [...counts(foundIds)].filter(([, n]) => n > 1).map(([id, count]) => ({ id, count }));
    check(!duplicates.length, 'duplicate-built-ids', { file: name, duplicates });
    htmlPages.set(name, new Set(foundIds));
    for (const el of $('[href],[src]').toArray()) {
      for (const attr of ['href', 'src']) {
        const href = $(el).attr(attr); if (!href) continue;
        check(!privateLiveLink(href), 'private-live-link', { file: name, href });
        check(!/^https?:\/\/(?:localhost|127\.\d+\.\d+\.\d+|0\.0\.0\.0|\[::1\]|[^/]+\.local)(?::\d+)?(?:\/|$)/i.test(href), 'local-service-live-link', { file: name, href });
        links.push({ from: name, href, image: el.name === 'img' });
      }
    }
    const page = pageByHtml.get(name);
    if (!page) continue;
    check(scope.length === 1, 'missing-book-content-container', { file: name });
    const contentIds = scope.find('[id]').toArray().map(el => $(el).attr('id'));
    for (const id of page.originalIds) check(contentIds.includes(id), 'missing-built-source-anchor', { file: name, id });
    equalSequence(page.originalIds, contentIds.filter(id => (page.isReport ? page.originalIds : originalIds).includes(id)), 'built-source-anchor-order-changed', { file: name });
    equalRenderedCode(page.expected.renderedCode, renderedCode($, scope), { file: name });
    const actualText = visibleText($, scope);
    check(actualText === page.expected.text, 'rendered-prose-changed', { file: name, ...(actualText === page.expected.text ? {} : firstDifference(page.expected.text, actualText)) });
    const malformed = scope.find('merror,[data-mml-node="merror"],[data-mjx-error],.MathJax_Error,.katex-error').toArray().map(el => ({ message: $(el).attr('data-mjx-error') ?? $(el).text(), html: $.html(el).slice(0, 500) }));
    check(!malformed.length, 'math-renderer-errors', { file: name, errors: malformed });
    const unknown = scope.find('mtext,[data-mml-node="mtext"]').toArray().filter(el => /\\[A-Za-z]+/.test($(el).text())).map(el => $(el).text());
    check(!unknown.length, 'mathjax-unexpanded-command', { file: name, commands: [...new Set(unknown)] });
    const formulaContainers = scope.find('mjx-container,.book-math').toArray();
    check(formulaContainers.length === page.expected.formulas.length, 'rendered-math-count-changed', { file: name, expected: page.expected.formulas.length, actual: formulaContainers.length });
    const annotated = scope.find('[data-tex]').toArray().map(el => ({ tex: $(el).attr('data-tex'), display: ['true', 'display'].includes($(el).attr('data-math-display')) || $(el).attr('display') === 'true' || $(el).is('div') }));
    if (annotated.length) {
      equalSequence(page.expected.formulas.map(mathKey), annotated.map(mathKey), 'rendered-tex-changed', { file: name });
      for (const el of scope.find('.book-math').toArray()) {
        check($(el).find('.katex > .katex-mathml math').length === 1 && $(el).find('.katex > .katex-html').length === 1, 'incomplete-katex-output', { file: name, tex: $(el).attr('data-tex') });
        const annotation = $(el).find('annotation[encoding="application/x-tex"]').text().trim();
        const tex = $(el).attr('data-tex').trim();
        // Vue condenses text-node whitespace, including the accessible source
        // annotation. The data-tex attribute above remains byte-exact.
        const equivalent = annotation.replace(/\s+/g, ' ') === tex.replace(/\s+/g, ' ');
        if (annotation !== tex && equivalent) annotationWhitespaceCondensed++;
        check(equivalent, 'rendered-math-annotation-mismatch', { file: name, tex, annotation });
      }
    } else if (formulaContainers.length) fail('missing-math-source-annotations', { file: name, formulas: formulaContainers.length });
    if (!page.isReport) builtMath.push(...annotated);
    const plain = scope.clone(); plain.find('mjx-container,.book-math,code,pre,script,style').remove();
    const unparsed = [];
    function scan(node) {
      if (node.type === 'text' && /\$[^\n]*\\[A-Za-z]|\\[A-Za-z][^\n]*\$/.test(node.data)) unparsed.push(node.data.slice(0, 600));
      for (const child of node.children ?? []) scan(child);
    }
    for (const node of plain.toArray()) scan(node);
    check(!unparsed.length, 'unrendered-tex-in-prose', { file: name, text: unparsed });
    check(!/\[\^[^\]]+\]/.test(plain.text()), 'unrendered-footnote', { file: name });
    const actualImages = allImages($, scope);
    check(actualImages.length === page.expected.images.length, 'rendered-image-count-changed', { file: name, expected: page.expected.images.length, actual: actualImages.length });
    const expectedDigests = [];
    for (const src of page.expected.images) {
      const target = resolveSourceLink(page.file, src);
      if (target) expectedDigests.push(hash(await fs.readFile(target.file)));
    }
    const actualDigests = [];
    for (const src of actualImages) actualDigests.push(await imageDigest(src, name));
    equalSequence(expectedDigests, actualDigests, 'rendered-image-content-changed', { file: name });
    for (const id of page.originalIds.filter(x => /^(?:ex|ans)-/.test(x))) {
      const counterpart = id.startsWith('ex-') ? id.replace(/^ex-/, 'ans-') : id.replace(/^ans-/, 'ex-');
      if (!originalIds.includes(counterpart)) continue;
      const anchor = scope.find('[id]').filter((_, el) => $(el).attr('id') === id).first();
      const block = anchor.closest('p,li,td,th,h1,h2,h3,h4,h5,h6');
      const hasBacklink = node => node.find('a[href]').toArray().some(el => decodeURIComponent($(el).attr('href')).endsWith('#' + counterpart));
      const hasContent = node => !!node.text().trim() || !!node.find('img,math,pre,code,table').length;
      let found = hasBacklink(block), contentStarted = hasContent(block), next = block.next();
      // An original item can contain several paragraphs, formulas and listings.
      // Its empty leading anchors may also identify a joint answer. Search the
      // actual item, stopping before the next item or a section heading.
      while (!found && next.length && !next.is('h1,h2,h3')) {
        const peer = next.find('[id]').toArray().some(el => /^(?:ex|ans)-/.test($(el).attr('id') ?? ''));
        if (peer && (contentStarted || hasContent(next))) break;
        found = hasBacklink(next);
        contentStarted ||= hasContent(next);
        next = next.next();
      }
      check(found, 'missing-built-exercise-backlink', { file: name, id, counterpart });
    }
  }
  for (const page of generatedPages) check(htmlPages.has(page.route.slice(1) + '.html'), 'missing-built-book-page', { route: page.route });
  check(htmlPages.has(volume.reportRoute.slice(1) + '.html'), 'missing-built-report-page', { route: volume.reportRoute });
  for (const link of links) {
    const target = resolveBuilt(link.href, link.from);
    if (!target) continue;
    check(!target.outsideBase, 'link-outside-github-pages-base', { ...link, target: target.outsideBase });
    if (target.outsideBase) continue;
    check(distFiles.has(target.file), 'missing-built-link-target', { ...link, target: target.file });
    if (target.fragment && htmlPages.has(target.file)) check(htmlPages.get(target.file).has(target.fragment), 'broken-built-fragment', { ...link, target: target.file, fragment: target.fragment });
  }
  const figureIndex = volume.evidence.figures ? await json(volume.evidence.figures) : [];
  for (const fig of figureIndex) {
    const id = `fig-${fig.chapter}-${fig.number}`, route = navigation.anchorRoutes[id];
    check(!!route && htmlPages.get(route.slice(1) + '.html')?.has(id), 'missing-numbered-figure', { id });
  }
  report.math.builtAnnotated = builtMath.length;
  report.math.annotationWhitespaceCondensed = annotationWhitespaceCondensed;
  report.math.editorialCountDelta = report.math.originalEditorialCount === null ? null : builtMath.length - report.math.originalEditorialCount;
  report.math.perPage = report.pages.map(p => ({ route: p.route, count: p.formulas }));
  report.checks.built = { htmlPages: htmlPages.size, bookPages: generatedPages.length, localLinksExamined: links.filter(x => resolveBuilt(x.href, x.from)).length,
    numberedFigures: figureIndex.length, assets: manifest.assets.length, files: distFiles.size };
}

const aggregate = newReport();
aggregate.volumes = [];
const outputError = error => fail('check-could-not-complete', { message: error.message, stack: error.stack?.split('\n').slice(0, 5).map(value => value.replaceAll(ROOT, '<repo>')) });
try {
  const selected = enabledVolumes();
  const navigation = await json('docs/.vitepress/book-navigation.json');
  const registry = await json('docs/.vitepress/books-manifest.json');
  report = aggregate;
  equalSequence(selected.map(volume => volume.id), (registry.volumes ?? []).map(volume => volume.id), 'enabled-volume-registry-mismatch', {});
  equalSequence(selected.map(volume => volume.id), (navigation.volumes ?? []).map(volume => volume.id), 'enabled-volume-navigation-mismatch', {});
  // Each volume owns its anchor namespace. Repeated pdf-/sec- IDs across books
  // are valid, while the route and manuscript still have to match their owner.
  for (const volume of selected) {
    report = { ...newReport(), id: volume.id };
    try {
      const manifest = await json(volumeManifestFile(volume));
      const ownNavigation = navigation.volumes.find(item => item.id === volume.id);
      check(manifest.source.file === volume.book && manifest.editorialReport.file === volume.report, 'configured-source-mismatch');
      check(manifest.volume.id === volume.id && manifest.volume.routePrefix === volume.routePrefix && manifest.volume.reportRoute === volume.reportRoute, 'configured-volume-route-mismatch');
      check(ownNavigation?.routePrefix === volume.routePrefix && ownNavigation?.reportRoute === volume.reportRoute, 'configured-navigation-route-mismatch');
      check(manifest.download.path === `/downloads/${volume.zipName}`, 'configured-download-path-mismatch');
      if (ownNavigation) await checkVolume(volume, manifest, ownNavigation);
    } catch (error) { outputError(error); }
    report.status = report.errors.length ? 'failed' : 'passed';
    aggregate.volumes.push(report);
    aggregate.errors.push(...report.errors.map(error => ({ volume: volume.id, ...error })));
    aggregate.warnings.push(...report.warnings.map(warning => ({ volume: volume.id, ...warning })));
  }
  // Keep the historical top-level volume-one fields for existing consumers.
  const first = aggregate.volumes.find(volume => volume.id === 'volume1') ?? aggregate.volumes[0];
  if (first) for (const key of ['source', 'base', 'pages', 'math', 'checks']) aggregate[key] = first[key];
} catch (error) { report = aggregate; outputError(error); }
report = aggregate;
report.status = report.errors.length ? 'failed' : 'passed';
const reportName = sourceOnly ? 'source-check.json' : 'site-check.json';
const output = path.join(DOCS, '.vitepress', reportName);
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ status: report.status, mode: report.mode,
  volumes: report.volumes.map(volume => ({ id: volume.id, status: volume.status, source: volume.source, checks: volume.checks,
    math: Object.fromEntries(Object.entries(volume.math).filter(([key]) => !['perPage', 'inputCompatibility'].includes(key))),
    mathCompatibility: volume.math.inputCompatibility && { unnormalized: volume.math.inputCompatibility.unnormalizedParserAndHtml, changes: volume.math.inputCompatibility.changesByKind, nonDelimiterContentPreserved: volume.math.inputCompatibility.nonDelimiterContentPreserved }, errors: volume.errors.length, warnings: volume.warnings.length })),
  errors: report.errors.length, errorKinds: Object.fromEntries(counts(report.errors.map(error => error.kind))), warnings: report.warnings.length,
  report: `docs/.vitepress/${reportName}` }, null, 2));
if (report.errors.length) { console.error(JSON.stringify(report.errors.slice(0, 8), null, 2)); process.exitCode = 1; }
