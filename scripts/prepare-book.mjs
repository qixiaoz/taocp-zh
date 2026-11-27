#!/usr/bin/env node
/** Build enabled volumes directly from their ordered manuscript sections.
 * No source PDF, OCR working file or local tool is part of the publication.
 * Run: node scripts/prepare-book.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { zipSync, unzipSync } from 'fflate';
import { volumes, enabledVolumes, volumeManifestFile } from './book-volumes.mjs';
import { readChapters, bindChapters, websiteChapter } from './book-chapters.mjs';
import { sourceAnchorIds } from './book-anchors.mjs';

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
const write = async (name, data) => {
  const file = path.join(ROOT, name);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, data);
};
async function prepareVolume(volume) {
const BOOK = volume.archiveBook;
const REPORT = volume.report;
const prefix = volume.routePrefix;
const book = await readChapters(ROOT, volume);
const { pages, anchorRoutes } = book;
const report = await read(REPORT);
const reportHash = sha(report);
const sourceInfo = { directory: path.posix.dirname(book.indexFile), index: book.indexFile,
  indexSha256: book.indexSha256, sha256: sha(JSON.stringify([book.indexSha256, ...pages.map(p => [p.chapterFile, p.chapterSha256])])) };
const linkedAssets = new Set();
function relativeRoute(from, to, fragment = '') {
  if (from === to) return `#${fragment}`;
  let target = path.posix.relative(path.posix.dirname(from), to) + '.md';
  if (!target.startsWith('.')) target = './' + target;
  return target + (fragment ? `#${fragment}` : '');
}
function resolveReportLink(href, forWebsite) {
  const [file, id] = href.split('#');
  const target = book.byFile.get(file);
  assert(target && id && target.route === anchorRoutes[id], `Broken report link: ${href}`);
  return forWebsite ? relativeRoute(volume.reportRoute, target.route, id) : BOOK + '#' + id;
}
function assetPath(from, asset) {
  const target = path.posix.relative(path.posix.dirname(from), '/' + asset);
  return target.startsWith('.') ? target : './' + target;
}
const removedReportLinks = [];
function cleanReport(text, forWebsite) {
  let result = text.replace(/\[([^\]\n]+)\]\(([^\s)]+)\)/g, (all, label, href) => {
    if (/^(?:source_cn\/|source_en\/|\.work\/|\.\.\/|file:|\/Users\/)/.test(href)) {
      removedReportLinks.push(href);
      return label;
    }
    if (href.startsWith(sourceInfo.directory + '/')) return `[${label}](${resolveReportLink(href, forWebsite)})`;
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
  const frontmatter = `---\ntitle: ${JSON.stringify(page.title)}\nbookPage: true\n---\n\n`;
  page.markdown = frontmatter + websiteChapter(page, book, linkedAssets);
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
  ...pages.filter(p => volume.unnumberedSections?.[p.anchor]).map(p => ({ text: p.title, link: p.route })),
  ...volume.chapterRoots.map(bodyTree),
  { text: '习题答案', link: `${prefix}/${volume.answerStartAnchor}`, collapsed: true, items: pages.filter(p => p.kind === 'answers').map(p => ({ text: p.title, link: p.route })) },
  { text: '附录与索引', items: pages.filter(p => ['appendix', 'index'].includes(p.kind)).map(p => ({ text: p.title, link: p.route })) },
];
// Share the actual Markdown tree, including sibling column widths, with GitHub.
const directory = book.index.replace(/^# .+$/m, '# 全卷目录')
  .replace('[卷前](./frontmatter.md)', '[开始阅读](./frontmatter.md)');
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
// Binding is an archive operation. Site rendering above reads each chapter directly.
const bound = bindChapters(book);
const source = bound.map(section => section.text).join('');
const sourceHash = sha(source);
const archive = { file: BOOK, sha256: sourceHash, bytes: Buffer.byteLength(source), lines: bound.at(-1).sourceEndLine };
const publicPages = pages.map(({ raw, body, notes, markdown, ...meta }, i) => {
  const { text, ...ranges } = bound[i];
  return { ...meta, ...ranges };
});
const navigation = { version: 2, id: volume.id, title: volume.title, routePrefix: prefix, reportRoute: volume.reportRoute,
  source: sourceInfo, archive, pages: publicPages, sidebar, anchorRoutes, downloads: { bundle: `/downloads/${volume.zipName}` } };
const originalAnchors = sourceAnchorIds(source);
const physical = originalAnchors.filter(id => /^pdf-\d+$/.test(id));
assert(physical.length === volume.expectedSourcePages && physical.every((id, i) => id === 'pdf-' + String(i + 1).padStart(3, '0')),
  'Missing or out-of-order physical page in ' + volume.id);
const referencedAssets = new Set([...source.matchAll(/(?:\]\(|src="|href=")(assets\/[^\s)"]+)/g)].map(x => x[1]));
assert([...referencedAssets, ...linkedAssets].every(asset => knownAssets.has(asset)), 'Missing chapter asset in ' + volume.id);
const zipFiles = {
  [BOOK]: [Buffer.from(source), { mtime: new Date('2026-01-01T00:00:00Z') }],
  [REPORT]: [Buffer.from(cleanReport(report, false)), { mtime: new Date('2026-01-01T00:00:00Z') }],
  '阅读说明.txt': [Buffer.from(`请完整解压后打开《${BOOK}》，并保留同层 assets 文件夹。\n原书公式使用 TeX 数学记法，需使用支持数学公式、HTML 和脚注的 Markdown 阅读器。\n校订报告中的本地扫描底本和临时校样链接已移除，来源说明及校订内容保留。\n`), { mtime: new Date('2026-01-01T00:00:00Z') }],
};
for (const asset of assetFiles) zipFiles[asset.path] = [asset.data, { mtime: new Date('2026-01-01T00:00:00Z') }];
const zipped = zipSync(zipFiles, { level: 6 });
await write(`docs/public/downloads/${volume.zipName}`, zipped);
const unpacked = unzipSync(zipped);
assert(sha(unpacked[BOOK]) === sourceHash, 'Download ZIP changed the assembled Markdown');
assert(assetFiles.every(x => sha(unpacked[x.path]) === x.sha256), 'Download archive changed an asset');
assert(Object.keys(unpacked).every(x => !/(?:^|\/)(?:\.work|source_cn|source_en)(?:\/|$)/.test(x)), 'Private source leaked into archive');

const footnoteDistribution = pages.flatMap(p => p.footnotes.map(id => ({ id, routes: [p.route] })));
const manifest = {
  version: 2, source: sourceInfo, archive,
  editorialReport: { file: REPORT, sha256: reportHash,
    websiteFile: `docs${volume.reportRoute}.md`, websiteSha256: sha(websiteReport),
    downloadSha256: sha(cleanReport(report, false)) },
  counts: { pages: pages.length, body: pages.filter(p => p.kind === 'body').length, answers: pages.filter(p => p.kind === 'answers').length,
    originalExplicitAnchors: originalAnchors.length, pdfPageAnchors: physical.length,
    exerciseAnchors: originalAnchors.filter(x => x.startsWith('ex-')).length, answerAnchors: originalAnchors.filter(x => x.startsWith('ans-')).length,
    footnoteDefinitions: footnoteDistribution.length, assets: assetFiles.length, referencedBookAssets: referencedAssets.size },
  sectionRoutes: publicPages, anchorRoutes, footnotes: footnoteDistribution,
  removedReportLinks: [...new Set(removedReportLinks)],
  assets: assetFiles.map(({ data, ...entry }) => entry),
  linkedAssets: [...linkedAssets].map(asset => ({ source: asset, publicPath: '/linked-assets/' + asset.slice('assets/'.length), sha256: assetFiles.find(x => x.path === asset).sha256 })),
  download: { path: `/downloads/${volume.zipName}`, bytes: zipped.length, sha256: sha(zipped), files: Object.keys(unpacked).length },
};
assert(sha(await read(REPORT)) === reportHash, 'Editorial report changed during preparation');
await write(`.work/site/source-manifest-${volume.id}.json`, JSON.stringify(manifest, null, 2) + '\n');
const publicManifest = { ...manifest, volume: { id: volume.id, routePrefix: prefix, reportRoute: volume.reportRoute, expectedSourcePages: volume.expectedSourcePages }, removedReportLinks: { count: new Set(removedReportLinks).size } };
await write(volumeManifestFile(volume), JSON.stringify(publicManifest, null, 2) + '\n');
if (volume.id === 'volume1') {
  await write('.work/site/source-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  await write('docs/.vitepress/book-manifest.json', JSON.stringify(publicManifest, null, 2) + '\n');
}
console.log(JSON.stringify({ volume: volume.id, ...manifest.counts, downloadBytes: zipped.length, sourceSha256: sourceHash }, null, 2));
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
await write('docs/.vitepress/books-manifest.json', JSON.stringify({ version: 2, volumes: built.map(({ navigation, manifest }) => ({ id: navigation.id, title: navigation.title, routePrefix: navigation.routePrefix, reportRoute: navigation.reportRoute, manifest: volumeManifestFile(navigation), source: manifest.source, archive: manifest.archive, download: manifest.download })) }, null, 2) + '\n');
