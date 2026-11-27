// The per-volume README is both the public contents page and the binding order.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { formatDirectory, formatPrintedContents, tocTitle } from './book-toc.mjs';
import { sourceAnchorIds } from './book-anchors.mjs';

const posix = path.posix;
const sha = text => createHash('sha256').update(text).digest('hex');
const assert = (ok, message) => { if (!ok) throw new Error(message); };
// A moved definition lives with its reference. Its slot records the original
// printed position, so the bound edition can also reproduce the reviewed bytes.
const appendixNotes = '\n<!-- section-footnotes -->\n\n';
const noteSlot = /^<!-- archive-footnote: ([^\s]+) -->\n/gm;

// Keep complete literal blocks out of link and footnote transformations.
function mapProse(text, transform, file) {
  const blocks = /^ {0,3}(`{3,}|~{3,}|\$\$)([^\n]*)(?:\n|$)/gm;
  const output = [];
  let open = null, start = 0;
  for (const match of text.matchAll(blocks)) {
    const [, marker, suffix] = match;
    if (!open) {
      if (marker === '$$' && suffix.trim()) continue;
      output.push(transform(text.slice(start, match.index)));
      start = match.index;
      open = marker;
    } else if (open[0] === marker[0] && marker.length >= open.length && !suffix.trim()) {
      const end = match.index + match[0].length;
      output.push(text.slice(start, end));
      start = end;
      open = null;
    }
  }
  assert(!open, 'Unclosed ' + open + ' block in ' + file);
  output.push(transform(text.slice(start)));
  return output.join('');
}

function extractNotes(text, file) {
  const notes = new Map();
  const body = mapProse(text, chunk => chunk.replace(/^\[\^([^\]\n]+)\]:[^\n]*(?:\n|$)(?:(?:\n)?(?: {4}|\t)[^\n]+(?:\n|$))*/gm, (definition, id) => {
    assert(!notes.has(id), 'Duplicate footnote: ' + id);
    notes.set(id, definition);
    return '';
  }), file);
  return { body, notes };
}

function pageMetadata(volume, key) {
  const answers = key.startsWith('answers/');
  const anchor = answers ? key.replace('/', '-') : key === 'frontmatter' ? 'pdf-001' : key;
  const kind = answers ? 'answers' : key === 'frontmatter' ? key : key === volume.answerStartAnchor ? 'answers-index'
    : volume.appendixAnchors.includes(key) ? 'appendix' : volume.indexAnchors.includes(key) ? 'index' : 'body';
  const section = answers ? key.slice(8).replaceAll('-', '.') : kind === 'body'
    ? volume.unnumberedSections?.[key] ?? key.slice(4).replaceAll('-', '.') : null;
  return { kind, anchor, section };
}

async function readMarkdown(file) {
  const data = await fs.readFile(file);
  const text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(data);
  assert(!/[\x00-\x08\x0b\x0c\x0e-\x1f]|\r(?!\n)/.test(text), 'Unexpected control character in ' + file);
  return { text: text.replaceAll('\r\n', '\n'), sha256: sha(data) };
}

export async function readChapters(root, volume) {
  const folder = 'chapters/' + volume.id;
  const entries = await fs.readdir(path.join(root, folder), { withFileTypes: true, recursive: true });
  const disk = new Set();
  for (const entry of entries) {
    assert(!entry.isSymbolicLink(), 'Symlink in chapter sources: ' + entry.name);
    if (entry.isFile() && entry.name.endsWith('.md')) {
      disk.add(path.relative(path.join(root, folder), path.join(entry.parentPath, entry.name)).split(path.sep).join('/'));
    }
  }
  disk.delete('README.md');
  const indexFile = folder + '/README.md';
  const { text: index, sha256: indexSha256 } = await readMarkdown(path.join(root, indexFile));
  assert(formatDirectory(index) === index, 'Run npm run book:toc to align ' + indexFile);
  const pages = [], anchorRoutes = Object.create(null), relocatedNotes = new Map(), noteIds = new Set();
  for (const match of index.matchAll(/\[([^\]\n]+)\]\(\.\/([^)\n]+)\.md\)/g)) {
    const [, label, key] = match;
    const title = tocTitle(label);
    assert(/^(?:frontmatter|sec-[a-z0-9-]+|answers\/[a-z0-9-]+)$/.test(key) && disk.delete(key + '.md'), 'Invalid, missing or repeated chapter in ' + indexFile + ': ' + key);
    const chapterFile = folder + '/' + key + '.md';
    const route = volume.routePrefix + '/' + key;
    const { text, sha256: chapterSha256 } = await readMarkdown(path.join(root, chapterFile));
    if (key === 'frontmatter') assert(formatPrintedContents(text) === text, 'Run npm run book:toc to align ' + chapterFile);
    const parts = text.split(appendixNotes);
    assert(parts.length <= 2, 'Repeated footnotes separator in ' + chapterFile);
    const raw = parts[0];
    const { body, notes } = extractNotes(raw.replace(noteSlot, ''), chapterFile);
    if (parts.length === 2) {
      const appendix = extractNotes(parts[1], chapterFile);
      assert(appendix.notes.size && !appendix.body.trim(), 'Unexpected appendix note content in ' + chapterFile);
      for (const [id, definition] of appendix.notes) {
        assert(!notes.has(id) && !relocatedNotes.has(id), 'Repeated relocated footnote: ' + id);
        relocatedNotes.set(id, { definition, route });
        notes.set(id, definition);
      }
    }
    const html = [], refs = new Set();
    mapProse(body, chunk => {
      for (const tag of chunk.matchAll(/<(\/?)(table|details|pre)\b[^>]*>/g)) {
        if (tag[1]) assert(html.pop() === tag[2], 'Unbalanced ' + tag[2] + ' in ' + chapterFile);
        else html.push(tag[2]);
      }
      for (const ref of chunk.matchAll(/\[\^([^\]\n]+)\]/g)) refs.add(ref[1]);
      return chunk;
    }, chapterFile);
    assert(!html.length, 'Unclosed HTML block in ' + chapterFile);
    const footnotes = [...refs];
    assert(refs.size === notes.size && footnotes.every(id => notes.has(id) && !noteIds.has(id)), 'Missing, duplicate or unused footnote in ' + chapterFile);
    for (const id of footnotes) noteIds.add(id);
    const anchors = sourceAnchorIds(text);
    for (const id of anchors) {
      assert(!anchorRoutes[id], 'Duplicate anchor in ' + chapterFile + ': ' + id);
      anchorRoutes[id] = route;
    }
    const page = { route, title, directoryLabel: label, file: 'docs' + route + '.md', chapterFile, chapterSha256,
      ...pageMetadata(volume, key), anchors, footnotes, raw, body, notes };
    assert(anchors.includes(page.anchor), 'Missing section anchor in ' + chapterFile + ': ' + page.anchor);
    pages.push(page);
  }
  assert(!disk.size && pages.length && pages[0].kind === 'frontmatter', 'Incomplete contents in ' + indexFile + ': ' + [...disk].join(', '));
  return { pages, anchorRoutes, relocatedNotes, index, indexFile, indexSha256,
    byFile: new Map(pages.map(p => [p.chapterFile, p])), byRoute: new Map(pages.map(p => [p.route, p])) };
}

function relative(from, to) {
  const result = posix.relative(posix.dirname(from), to);
  return result.startsWith('.') ? result : './' + result;
}

// Convert only chapter-local fragments, Markdown destinations and repository assets.
// Fenced listings are copied literally, including examples that resemble links.
function chapterLinks(text, page, book, website, linkedAssets = new Set()) {
  const targets = /(\]\(|\b(?:href|src)=")((?:#[^)"\s]+|(?:\.\.?\/|[\w-]+(?:\/|\.md\b))[^)"\s]*))/g;
  const convert = chunk => {
    const enlarged = new Set([...chunk.matchAll(/(\[!\[[^\n]*?\]\([^)\n]+\))\]\(/g)].map(m => m.index + m[1].length));
    return chunk.replace(targets, (original, opener, href, offset) => {
      const [pathname, fragment] = href.split('#');
      const file = pathname ? posix.join(posix.dirname(page.chapterFile), pathname) : page.chapterFile;
      if (file.startsWith('assets/')) {
        let asset = file;
        if (website && (opener === 'href="' || enlarged.has(offset))) {
          linkedAssets.add(file);
          asset = 'linked-assets/' + file.slice(7);
        }
        return opener + (website ? relative(page.route, '/' + asset) : file);
      }
      if (!file.endsWith('.md')) return original;
      const target = book.byFile.get(file);
      assert(target && (!fragment || book.anchorRoutes[fragment] === target.route), 'Broken chapter link in ' + page.chapterFile + ': ' + href);
      const anchor = fragment || target.anchor;
      if (!website) {
        // Answer-group anchors belong to the single-section edition. Its first
        // printed answer remains the corresponding destination in the bound book.
        const bound = target.kind === 'answers' && anchor === target.anchor ? target.anchors.find(id => id.startsWith('ans-')) : anchor;
        assert(bound, 'No archive target for ' + href);
        return opener + '#' + bound;
      }
      if (!pathname) return original;
      const link = relative(page.route, target.route) + (opener === 'href="' ? '.html' : '.md');
      return opener + link + (fragment ? '#' + fragment : '');
    });
  };
  return mapProse(text, convert, page.chapterFile);
}

export function websiteChapter(page, book, linkedAssets) {
  let body = page.body;
  // A printed answer heading in volume one is plain text.
  const plain = page.kind === 'answers' && page.section + ' 节';
  body = body.replace(/^(#{1,6}) (?=\S)|^([\d.]+ 节)$/m, (full, hashes, label) =>
    hashes ? '# ' : label === plain ? '# ' + label : full);
  for (const id of page.footnotes) body += '\n' + page.notes.get(id) + '\n';
  return chapterLinks(body.trim() + '\n', page, book, true, linkedAssets);
}

export function bindChapters(book) {
  const usedSlots = new Set();
  let offset = 0, line = 1;
  const sections = book.pages.map(page => {
    let raw = page.raw;
    if (page.kind === 'answers') {
      const anchor = '<a id="' + page.anchor + '"></a>\n\n';
      const titled = '# ' + page.title + '\n\n' + anchor;
      if (raw.startsWith(titled)) raw = raw.slice(titled.length);
      else if (raw.startsWith(anchor)) raw = raw.slice(anchor.length);
    }
    let text = chapterLinks(raw, page, book, false).replace(noteSlot, (_, id) => {
      const note = book.relocatedNotes.get(id);
      assert(note && !usedSlots.has(id), 'Unresolved or repeated archive footnote: ' + id);
      usedSlots.add(id);
      return chapterLinks(note.definition, book.byRoute.get(note.route), book, false);
    });
    if (!text.endsWith('\n')) text += '\n';
    const sourceRange = { start: offset, end: offset + text.length };
    const sourceStartLine = line;
    offset = sourceRange.end;
    line += (text.match(/\n/g) ?? []).length;
    return { text, sourceRange, sourceStartLine, sourceEndLine: line - Number(text.endsWith('\n')) };
  });
  assert(usedSlots.size === book.relocatedNotes.size, 'An archive footnote has no insertion point');
  return sections;
}
