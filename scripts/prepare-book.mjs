#!/usr/bin/env node
/** Build enabled volumes from their immutable book and report masters.
 * No source PDF, OCR working file or local tool is part of the publication.
 * Run: node scripts/prepare-book.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { zipSync, unzipSync } from 'fflate';
import { volumes, enabledVolumes, volumeManifestFile } from './book-volumes.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const sha = data => createHash('sha256').update(data).digest('hex');
const read = async name => {
  const bytes = await fs.readFile(path.join(ROOT, name));
  const invalid = [];
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    if (byte < 32 && byte !== 9 && byte !== 10 && !(byte === 13 && bytes[i + 1] === 10)) invalid.push({ offset: i, byte });
  }
  if (invalid.length) throw new Error(`Invalid editorial C0 control bytes in ${name}: ${JSON.stringify(invalid.slice(0, 10))}`);
  return bytes.toString('utf8');
};
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const posix = value => value.split(path.sep).join('/');
const write = async (name, data) => {
  const file = path.join(ROOT, name);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, data);
};
async function prepareVolume(volume) {
const BOOK = volume.book;
const REPORT = volume.report;
const prefix = volume.routePrefix;
const source = await read(BOOK);
const report = await read(REPORT);
const sourceHash = sha(source);
const reportHash = sha(report);
const originalLines = source.match(/[^\n]*\n|[^\n]+$/g) ?? [];
const lineOffsets = [0];
for (const line of originalLines) lineOffsets.push(lineOffsets.at(-1) + line.length);
const lines = [...originalLines];
const footnotes = new Map();

// A footnote definition may follow a section boundary even though its reference
// belongs to the preceding section. Extract once, then attach to its reference.
for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(/^\[\^([^\]]+)\]:/);
  if (!match) continue;
  let end = i + 1;
  while (end < lines.length) {
    if (/^(?: {4}|\t)\S/.test(lines[end])) { end++; continue; }
    if (!lines[end].trim() && /^(?: {4}|\t)\S/.test(lines[end + 1] ?? '')) { end += 2; continue; }
    break;
  }
  assert(!footnotes.has(match[1]), `Duplicate footnote definition: ${match[1]}`);
  footnotes.set(match[1], { text: lines.slice(i, end).join(''), sourceLine: i + 1, routes: [] });
  for (let j = i; j < end; j++) lines[j] = '';
}

const pageAnchorLine = value => /^(?:\s*<a\s+id="(?:pdf-[\d]+|p-[\w-]+|alt-[\d]+)"><\/a>)+\s*$/.test(value);
function includeLeadingPageAnchors(index) {
  let start = index;
  for (let j = index - 1; j >= 0; j--) {
    if (!lines[j].trim() || pageAnchorLine(lines[j])) start = j;
    else break;
  }
  return start;
}
const boundaries = [{ start: 0, route: `${prefix}/frontmatter`, title: '卷前', kind: 'frontmatter', section: null, anchor: 'pdf-001', headingLine: volume.frontmatterHeadingLine }];
const sectionPattern = /^<a id="(sec-[^"]+)"><\/a>\s*$/;
let answerStart, answerEnd;
for (let i = 0; i < lines.length; i++) {
  const match = lines[i].trim().match(sectionPattern);
  if (!match) continue;
  const anchor = match[1];
  // Lettered parts such as 4.3.3 A–E remain stable in-page targets. Only
  // numbered sections and the configured book divisions create routes.
  if (!/^sec-\d+(?:-\d+)*$/.test(anchor)
    && ![volume.answerStartAnchor, ...volume.appendixAnchors, ...volume.indexAnchors].includes(anchor)) continue;
  let headingLine = i + 1;
  while (headingLine < lines.length && !/^#{1,6}\s+/.test(lines[headingLine])) headingLine++;
  assert(headingLine < i + 5, `No heading immediately after ${anchor}`);
  const title = lines[headingLine].replace(/^#+\s+/, '').trim().replace(/\\\*/g, '*');
  const kind = volume.appendixAnchors.includes(anchor) ? 'appendix' : volume.indexAnchors.includes(anchor) ? 'index' : anchor === volume.answerStartAnchor ? 'answers-index' : 'body';
  const section = /^sec-\d/.test(anchor) ? anchor.slice(4).replaceAll('-', '.') : null;
  let start = includeLeadingPageAnchors(i);
  const leadAnchor = volume.leadInAnchors?.[anchor];
  if (leadAnchor) {
    const marker = `<a id="${leadAnchor}"></a>`;
    const positions = lines.flatMap((line, index) => line.trim() === marker ? [index] : []);
    assert(positions.length === 1 && positions[0] < i, `Missing or misplaced section lead-in ${leadAnchor}`);
    assert(!lines.slice(positions[0] + 1, i).some(line => sectionPattern.test(line.trim())), `Section lead-in crosses another section: ${leadAnchor}`);
    start = includeLeadingPageAnchors(positions[0]);
  }
  boundaries.push({ start, route: `${prefix}/${anchor}`, title, kind, section, anchor, headingLine });
  if (anchor === volume.answerStartAnchor) answerStart = i;
  if (anchor === volume.answerEndAnchor) answerEnd = i;
}
assert(Number.isInteger(answerStart) && Number.isInteger(answerEnd) && answerEnd > answerStart, `Answer section boundaries were not found for ${volume.id}`);

// Answer headings are inconsistent in the master. Its verified ans-* anchors
// are authoritative; use the adjacent original heading where one exists.
const answerSections = new Set();
for (let i = answerStart + 1; i < answerEnd; i++) {
  for (const match of lines[i].matchAll(/<a id="ans-(intro|[\d-]+)-\d+"><\/a>/g)) {
    const sectionKey = match[1];
    if (answerSections.has(sectionKey)) continue;
    answerSections.add(sectionKey);
    let start = i, headingLine = null;
    const expected = sectionKey === 'intro' ? '习题说明' : `${sectionKey.replaceAll('-', '.')}节`;
    let prev = i - 1;
    while (prev >= answerStart && !lines[prev].trim()) prev--;
    if ((lines[prev] ?? '').replace(/^#+\s*/, '').replace(/\s/g, '') === expected) {
      start = prev; headingLine = prev;
    }
    // 1.2.11.2 has its first answer anchor embedded in the source heading.
    // Preserve that line rather than silently editing the editorial master.
    const section = sectionKey === 'intro' ? 'intro' : sectionKey.replaceAll('-', '.');
    const title = sectionKey === 'intro' ? '习题说明的答案' : `${section} 节习题答案`;
    boundaries.push({ start: includeLeadingPageAnchors(start), route: `${prefix}/answers/${sectionKey}`, title, kind: 'answers', section, anchor: `answers-${sectionKey}`, headingLine });
  }
}
boundaries.sort((a, b) => a.start - b.start);
assert(new Set(boundaries.map(x => x.start)).size === boundaries.length, 'Two routes overlap at a source boundary');

// Check the actual block state at each cut, not just the number of delimiters.
const boundarySet = new Set(boundaries.map(x => x.start));
let fence = null, displayMath = false;
const htmlStack = [];
for (let i = 0; i < lines.length; i++) {
  if (boundarySet.has(i)) assert(!fence && !displayMath && !htmlStack.length, `Unsafe split inside code, math or HTML at source line ${i + 1}`);
  const line = lines[i];
  const fm = line.match(/^ {0,3}(`{3,}|~{3,})/);
  if (fm) {
    if (!fence) fence = fm[1];
    else if (fm[1][0] === fence[0] && fm[1].length >= fence.length) fence = null;
    continue;
  }
  if (fence) continue;
  if (/^\s*\$\$\s*$/.test(line)) { displayMath = !displayMath; continue; }
  if (displayMath) continue;
  for (const tag of line.matchAll(/<(\/?)(table|details|pre)\b[^>]*>/g)) {
    if (tag[1]) { assert(htmlStack.pop() === tag[2], `Unbalanced ${tag[2]} at source line ${i + 1}`); }
    else htmlStack.push(tag[2]);
  }
}
assert(!fence && !displayMath && !htmlStack.length, 'Source has an unclosed code, math or HTML block');

const pages = boundaries.map((boundary, i) => {
  const end = boundaries[i + 1]?.start ?? lines.length;
  return { ...boundary, end, file: `docs${boundary.route}.md`, sourceStartLine: boundary.start + 1, sourceEndLine: end, sourceRange: { start: lineOffsets[boundary.start], end: lineOffsets[end] }, raw: lines.slice(boundary.start, end).join('') };
});
assert(pages.map(x => x.raw).join('') === lines.join(''), 'Source partition is not lossless');
const anchorRoutes = {};
const originalAnchors = [...source.matchAll(/<a\s+id="([^"]+)"[^>]*>/g)].map(x => x[1]);
assert(new Set(originalAnchors).size === originalAnchors.length, 'The master has duplicate explicit anchors');
const sourcePageAnchors = originalAnchors.filter(id => /^pdf-\d+$/.test(id));
assert(sourcePageAnchors.length === volume.expectedSourcePages, `Source page anchor count differs from the confirmed count for ${volume.id}`);
assert(Array.from({ length: volume.expectedSourcePages }, (_, index) => `pdf-${String(index + 1).padStart(3, '0')}`).every(id => sourcePageAnchors.includes(id)), `A physical source page anchor is missing from ${volume.id}`);
for (const page of pages) {
  page.anchors = [...page.raw.matchAll(/<a\s+id="([^"]+)"[^>]*>/g)].map(x => x[1]);
  for (const anchor of page.anchors) {
    assert(!anchorRoutes[anchor], `Duplicate split anchor ${anchor}`);
    anchorRoutes[anchor] = page.route;
  }
  if (page.kind === 'answers') {
    anchorRoutes[page.anchor] = page.route;
    page.anchors.push(page.anchor);
  }
  const refs = [...new Set([...page.raw.matchAll(/\[\^([^\]]+)\](?!:)/g)].map(x => x[1]))];
  page.footnotes = refs;
  for (const key of refs) {
    assert(footnotes.has(key), `Missing definition of ${key} in ${page.route}`);
    footnotes.get(key).routes.push(page.route);
    page.raw += `\n${footnotes.get(key).text}\n`;
  }
}
for (const [key, def] of footnotes) assert(def.routes.length, `Unreferenced footnote definition ${key}`);
assert(originalAnchors.every(x => anchorRoutes[x]), 'An original anchor was lost');

const badLinks = [];
const linkedAssets = new Set();
let originalInternalLinks = 0, crossPageLinks = 0, samePageLinks = 0;
function relativeRoute(from, to, fragment = '') {
  if (from === to) return `#${fragment}`;
  let target = path.posix.relative(path.posix.dirname(from), to) + '.md';
  if (!target.startsWith('.')) target = './' + target;
  return target + (fragment ? `#${fragment}` : '');
}
function resolveAnchor(anchor, from, record = false) {
  const route = anchorRoutes[anchor];
  if (!route) { badLinks.push({ from, anchor }); return '#' + anchor; }
  if (record) { originalInternalLinks++; if (route === from) samePageLinks++; else crossPageLinks++; }
  return relativeRoute(from, route, anchor);
}
function assetPath(from, asset) {
  const target = path.posix.relative(path.posix.dirname(from), '/' + asset);
  return target.startsWith('.') ? target : './' + target;
}
function linkedAssetPath(from, asset) {
  assert(asset.startsWith('assets/'), `Unexpected linked asset: ${asset}`);
  linkedAssets.add(asset);
  // Unlike img.src, an anchor's href is not rewritten to Vite's hashed asset.
  // Give original-resolution links their own stable public byte-for-byte copy.
  return assetPath(from, 'linked-assets/' + asset.slice('assets/'.length));
}
function rewriteBook(text, route) {
  return text
    .replace(/(\[!\[[^\n]*?\]\(assets\/[^)\n]+\)\])\((assets\/[^)\n]+)\)/g, (_, image, asset) => `${image}(${linkedAssetPath(route, asset)})`)
    .replace(/\]\(#([^\s)]+)\)/g, (_, id) => `](${resolveAnchor(id, route, true)})`)
    .replace(/href="#([^"\s]+)"/g, (_, id) => `href="${resolveAnchor(id, route, true).replace(/\.md(?=#)/, '.html')}"`)
    .replace(/(<a\b[^>]*?href=")(assets\/[^"\n]+)(")/g, (_, prefix, asset, suffix) => `${prefix}${linkedAssetPath(route, asset)}${suffix}`)
    .replace(/\]\((assets\/[^\s)]+)\)/g, (_, asset) => `](${assetPath(route, asset)})`)
    .replace(/src="(assets\/[^"\n]+)"/g, (_, asset) => `src="${assetPath(route, asset)}"`);
}
const removedReportLinks = [];
function cleanReport(text, forWebsite) {
  let result = text.replace(/\[([^\]\n]+)\]\(([^\s)]+)\)/g, (all, label, href) => {
    if (/^(?:source_cn\/|source_en\/|\.work\/|\.\.\/|file:|\/Users\/)/.test(href)) {
      removedReportLinks.push(href);
      return label;
    }
    if (forWebsite && href.startsWith(BOOK + '#')) return `[${label}](${resolveAnchor(href.slice(BOOK.length + 1), volume.reportRoute)})`;
    // Review Markdown is a downloadable source, and .jsonl is an unknown
    // suffix. Native links prevent both being rewritten into page routes.
    if (forWebsite && href.startsWith(volume.reviewRoot + '/') && /\.(?:jsonl|md)$/.test(href)) return `<a href="${assetPath(volume.reportRoute, volume.reviewPublicPrefix.slice(1) + '/' + href.slice(volume.reviewRoot.length + 1).split('/').map(encodeURIComponent).join('/'))}" download>${label}</a>`;
    return all;
  });
  if (forWebsite) result = result.replace(/\]\((assets\/[^\s)]+)\)/g, (_, asset) => `](${asset.startsWith(volume.reviewRoot + '/') ? volume.reviewPublicPrefix + '/' + asset.slice(volume.reviewRoot.length + 1) : assetPath(volume.reportRoute, asset)})`);
  return result;
}

// Only generated paths are written. The editorial masters remain byte-for-byte
// unchanged, and existing config, theme and hand-authored entry pages are kept.
const currentRoutes = new Set(pages.map(p => p.route));
const priorPages = previousNavigation?.volumes?.find(item => item.id === volume.id)?.pages ?? (volume.id === 'volume1' ? previousNavigation?.pages : []) ?? [];
for (const old of priorPages) {
  if (!currentRoutes.has(old.route) && old.route.startsWith(prefix + '/') && /^\/volume\d+[a-z]?\/[a-z0-9/-]+$/.test(old.route)) await fs.rm(path.join(DOCS, old.route.slice(1) + '.md'), { force: true });
}
for (const page of pages) {
  let body = rewriteBook(page.raw, page.route);
  if (page.headingLine !== null) {
    const original = lines[page.headingLine].trimEnd();
    const normalized = original.replace(/^#{1,6}\s+/, '');
    // A plain source heading (the 2.3.4.4 answers) is promoted without changing
    // its wording. All other source headings and prose retain their spelling.
    body = body.replace(original, '# ' + normalized);
  } else {
    body = `# ${page.title}\n\n<a id="${page.anchor}"></a>\n\n` + body;
  }
  if (page.kind === 'answers' && page.headingLine !== null) body = `<a id="${page.anchor}"></a>\n\n` + body;
  const frontmatter = `---\ntitle: ${JSON.stringify(page.title)}\nbookPage: true\n---\n\n`;
  page.markdown = frontmatter + body.trim() + '\n';
  page.sha256 = sha(page.markdown);
  page.bytes = Buffer.byteLength(page.markdown);
  await write(page.file, page.markdown);
}
const websiteReport = `---\ntitle: 校订报告\nsearch: false\n---\n\n${cleanReport(report, true)}`;
await write(`docs${volume.reportRoute}.md`, websiteReport);

function bodyTree(chapter) {
  const group = pages.filter(p => p.kind === 'body' && (p.section === chapter || p.section.startsWith(chapter + '.')));
  const nodes = new Map(group.map(p => [p.section, { text: p.title, link: p.route, items: [] }]));
  for (const page of group) {
    const parent = page.section.split('.').slice(0, -1).join('.');
    if (nodes.has(parent)) nodes.get(parent).items.push(nodes.get(page.section));
  }
  const trim = node => { if (!node.items.length) delete node.items; else { node.collapsed = true; node.items.forEach(trim); } return node; };
  assert(nodes.has(chapter), `Configured chapter ${chapter} is missing from ${volume.id}`);
  return trim(nodes.get(chapter));
}
const sidebar = [
  { text: '卷前与目录', items: [{ text: '全卷目录', link: `${prefix}/` }, { text: '卷前', link: `${prefix}/frontmatter` }] },
  ...volume.chapterRoots.map(bodyTree),
  { text: '习题答案', link: `${prefix}/${volume.answerStartAnchor}`, collapsed: true, items: pages.filter(p => p.kind === 'answers').map(p => ({ text: p.title, link: p.route })) },
  { text: '附录与索引', items: pages.filter(p => ['appendix', 'index'].includes(p.kind)).map(p => ({ text: p.title, link: p.route })) },
];
const publicPages = pages.map(({ raw, markdown, start, end, headingLine, ...meta }) => meta);
const navigation = { version: 1, id: volume.id, title: volume.title, routePrefix: prefix, reportRoute: volume.reportRoute, source: { file: BOOK, sha256: sourceHash }, pages: publicPages, sidebar, anchorRoutes, downloads: { bundle: `/downloads/${volume.zipName}` } };

function directoryItems(items, depth = 0) {
  return items.map(item => `${'  '.repeat(depth)}- ${item.link ? `[${item.text}](${item.link.endsWith('.zip') ? '.' + item.link : relativeRoute(`${prefix}/index`, item.link === prefix + '/' ? `${prefix}/index` : item.link)})` : item.text}\n${item.items ? directoryItems(item.items, depth + 1) : ''}`).join('');
}
// Use relative source paths in content; VitePress applies the configured base.
let directory = `# 全卷目录\n\n[开始阅读](./frontmatter.md)\n\n`;
directory += directoryItems(sidebar.slice(1));
await write(`docs${prefix}/index.md`, `---\ntitle: 全卷目录\n---\n\n${directory}`);

const assetFiles = [];
async function collectAssets(folder) {
  for (const entry of (await fs.readdir(path.join(ROOT, folder), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const relative = path.posix.join(folder, entry.name);
    if (entry.isDirectory()) await collectAssets(relative);
    else if (entry.isFile() && !entry.name.startsWith('.')) {
      const data = await fs.readFile(path.join(ROOT, relative));
      assetFiles.push({ path: relative, bytes: data.length, sha256: sha(data), data });
      await write('docs/' + relative, data);
      if (relative.startsWith(volume.reviewRoot + '/')) await write('docs/public' + volume.reviewPublicPrefix + '/' + relative.slice(volume.reviewRoot.length + 1), data);
      if (linkedAssets.has(relative)) await write('docs/public/linked-assets/' + relative.slice('assets/'.length), data);
    }
    else assert(!entry.isSymbolicLink(), `Publication assets must not follow symlinks: ${relative}`);
  }
}
for (const root of volume.assetRoots) await collectAssets(root);
const knownAssets = new Set(assetFiles.map(x => x.path));
const referencedAssets = new Set([...source.matchAll(/(?:\]\(|src=")(assets\/[^\s)"]+)/g)].map(x => x[1]));
const missingAssets = [...referencedAssets].filter(x => !knownAssets.has(x));
assert(!missingAssets.length, `Missing assets: ${missingAssets.join(', ')}`);
assert([...linkedAssets].every(asset => knownAssets.has(asset)), 'A linked original-resolution asset is missing');
assert(!badLinks.length, `Unresolved internal links: ${JSON.stringify(badLinks)}`);

const zipFiles = {
  [BOOK]: [Buffer.from(source), { mtime: new Date('2026-01-01T00:00:00Z') }],
  [REPORT]: [Buffer.from(cleanReport(report, false)), { mtime: new Date('2026-01-01T00:00:00Z') }],
  '阅读说明.txt': [Buffer.from(`请完整解压后打开《${BOOK}》，并保留同层 assets 文件夹。\n原书公式使用 TeX 数学记法，需使用支持数学公式、HTML 和脚注的 Markdown 阅读器。\n校订报告中的本地扫描底本和临时校样链接已移除，来源说明及校订内容保留。\n`), { mtime: new Date('2026-01-01T00:00:00Z') }],
};
for (const asset of assetFiles) zipFiles[asset.path] = [asset.data, { mtime: new Date('2026-01-01T00:00:00Z') }];
const zipped = zipSync(zipFiles, { level: 6 });
await write(`docs/public/downloads/${volume.zipName}`, zipped);
const unpacked = unzipSync(zipped);
assert(sha(unpacked[BOOK]) === sourceHash, 'Download archive changed the book master');
assert(assetFiles.every(x => sha(unpacked[x.path]) === x.sha256), 'Download archive changed an asset');
assert(Object.keys(unpacked).every(x => !/(?:^|\/)(?:\.work|source_cn|source_en)(?:\/|$)/.test(x)), 'Private source leaked into archive');

const footnoteDistribution = [...footnotes].map(([id, def]) => ({ id, sourceLine: def.sourceLine, routes: def.routes }));
const manifest = {
  version: 1,
  source: { file: BOOK, sha256: sourceHash, bytes: Buffer.byteLength(source), lines: originalLines.length },
  editorialReport: { file: REPORT, sha256: reportHash,
    websiteFile: `docs${volume.reportRoute}.md`, websiteSha256: sha(websiteReport),
    downloadSha256: sha(cleanReport(report, false)) },
  counts: { pages: pages.length, body: pages.filter(p => p.kind === 'body').length, answers: answerSections.size, originalExplicitAnchors: originalAnchors.length, pdfPageAnchors: originalAnchors.filter(x => x.startsWith('pdf-')).length, exerciseAnchors: originalAnchors.filter(x => x.startsWith('ex-')).length, answerAnchors: originalAnchors.filter(x => x.startsWith('ans-')).length, originalInternalLinks, crossPageLinks, samePageLinks, footnoteDefinitions: footnotes.size, footnoteReferences: footnoteDistribution.reduce((n, x) => n + x.routes.length, 0), assets: assetFiles.length, referencedBookAssets: referencedAssets.size },
  checks: { sourcePartitionLossless: true, sourceAnchorsPreserved: true, cutsOutsideCodeMathAndTables: true, badLinks, missingAssets, downloadBookIdentical: true },
  sectionRoutes: publicPages,
  anchorRoutes,
  footnotes: footnoteDistribution,
  transformationCounts: {
    rewrittenCrossPageLinks: crossPageLinks,
    rewrittenImageReferences: [...source.matchAll(/(?:\]\(|src=")assets\//g)].length,
    attachedFootnoteDefinitions: footnoteDistribution.reduce((n, x) => n + x.routes.length, 0),
    movedFootnoteDefinitions: footnoteDistribution.filter(x => !pages.find(p => x.sourceLine >= p.sourceStartLine && x.sourceLine <= p.sourceEndLine)?.footnotes.includes(x.id)).length,
    promotedPageHeadings: pages.filter(p => p.headingLine !== null && !/^# /.test(lines[p.headingLine])).length,
    addedPageTitles: pages.filter(p => p.headingLine === null).length,
    addedAnswerSectionAnchors: answerSections.size,
    stableLinkedAssets: linkedAssets.size,
    latexEdits: 0,
    codeEdits: 0,
  },
  removedReportLinks: [...new Set(removedReportLinks)],
  assets: assetFiles.map(({ data, ...entry }) => entry),
  linkedAssets: [...linkedAssets].map(asset => ({ source: asset, publicPath: '/linked-assets/' + asset.slice('assets/'.length), sha256: assetFiles.find(x => x.path === asset).sha256 })),
  download: { path: `/downloads/${volume.zipName}`, bytes: zipped.length, sha256: sha(zipped), files: Object.keys(unpacked).length },
};
assert(sha(await read(BOOK)) === sourceHash && sha(await read(REPORT)) === reportHash, 'An editorial master changed during preparation');
await write(`.work/site/source-manifest-${volume.id}.json`, JSON.stringify(manifest, null, 2) + '\n');
const publicManifest = { ...manifest, volume: { id: volume.id, routePrefix: prefix, reportRoute: volume.reportRoute, expectedSourcePages: volume.expectedSourcePages }, removedReportLinks: { count: new Set(removedReportLinks).size } };
await write(volumeManifestFile(volume), JSON.stringify(publicManifest, null, 2) + '\n');
if (volume.id === 'volume1') {
  await write('.work/site/source-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  await write('docs/.vitepress/book-manifest.json', JSON.stringify(publicManifest, null, 2) + '\n');
}
console.log(JSON.stringify({ volume: volume.id, ...manifest.counts, downloadBytes: zipped.length, sourceSha256: sourceHash, badLinks: badLinks.length, missingAssets: missingAssets.length }, null, 2));
return { navigation, manifest: publicManifest };
}

const selected = enabledVolumes();
const previousNavigation = await fs.readFile(path.join(DOCS, '.vitepress/book-navigation.json'), 'utf8').then(JSON.parse).catch(() => null);
// Configuration is authoritative even if the ignored previous navigation was
// deleted. Also remove routes belonging to a volume removed from configuration.
const disabledOrPrevious = new Map([
  ...volumes.filter(volume => !volume.enabled),
  ...(previousNavigation?.volumes ?? []).filter(previous => !selected.some(volume => volume.id === previous.id))
].map(volume => [volume.id, volume]));
for (const previous of disabledOrPrevious.values()) {
  assert(/^volume\d+[a-z]?$/.test(previous.id) && previous.routePrefix === '/' + previous.id, 'Unsafe previous volume route');
  assert(previous.reportRoute === '/corrections' && previous.id === 'volume1'
    || /^\/volume\d+[a-z]?\/[a-z\d/-]+$/.test(previous.reportRoute ?? '') && previous.reportRoute.startsWith(previous.routePrefix + '/'), 'Unsafe previous report route');
  await fs.rm(path.join(DOCS, previous.id), { recursive: true, force: true });
  if (previous.reportRoute && !previous.reportRoute.startsWith(previous.routePrefix + '/')) {
    assert(previous.id === 'volume1' && previous.reportRoute === '/corrections', 'Unsafe previous report route');
    await fs.rm(path.join(DOCS, 'corrections.md'), { force: true });
  }
  await fs.rm(path.join(ROOT, volumeManifestFile(previous)), { force: true });
}
// Clean shared generated copies once, then accumulate the disjoint volume roots.
for (const folder of ['docs/assets', 'docs/public/review', 'docs/public/linked-assets', 'docs/public/downloads']) {
  await fs.rm(path.join(ROOT, folder), { recursive: true, force: true });
}
const built = [];
for (const volume of selected) built.push(await prepareVolume(volume));
const first = built.find(item => item.navigation.id === 'volume1') ?? built[0];
const allNavigation = { ...first.navigation, version: 2, volumes: built.map(item => item.navigation),
  sidebar: built.length === 1 ? first.navigation.sidebar : Object.fromEntries(built.flatMap(({ navigation }) => [[navigation.routePrefix + '/', navigation.sidebar], [navigation.reportRoute, navigation.sidebar]])) };
await write('docs/.vitepress/book-navigation.json', JSON.stringify(allNavigation, null, 2) + '\n');
await write('docs/.vitepress/books-manifest.json', JSON.stringify({ version: 2, volumes: built.map(({ navigation, manifest }) => ({ id: navigation.id, title: navigation.title, routePrefix: navigation.routePrefix, reportRoute: navigation.reportRoute, manifest: volumeManifestFile(navigation), source: manifest.source, download: manifest.download })) }, null, 2) + '\n');
