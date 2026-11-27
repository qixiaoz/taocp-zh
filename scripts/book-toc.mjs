// GitHub Markdown supports <samp> in links but strips custom CSS. A monospace
// number with nonbreaking padding gives each sibling title the same starting x.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { enabledVolumes } from './book-volumes.mjs';

export function tocTitle(label) {
  return label.replace(/^<samp>([^<>]+)<\/samp>　/u, (_, field) =>
    field.replaceAll('&nbsp;', '').trim() + '　').replace(/(\d 节)　习题答案$/u, '$1习题答案');
}

function numberedLabel(label) {
  const plain = tocTitle(label).replace(/^\\\*/, '*');
  const answer = plain.match(/^(\d+(?:\.\d+)*)\s*节\s*(习题答案)$/u);
  if (answer) return { kind: 'answers', number: answer[1], suffix: ' 节', title: answer[2] };
  const section = plain.match(/^(\*?)(\d+(?:\.\d+)+)\s*(.+)$/u);
  if (section) return { kind: 'section', star: section[1], number: section[2], title: section[3] };
  const chapter = plain.match(/^第\s*(\d+)\s*章\s*(.+)$/u);
  if (chapter) return { kind: 'chapter', number: `第 ${chapter[1]} 章`, title: chapter[2] };
  const appendix = plain.match(/^附录\s*([A-Z])\s*(.+)$/u);
  if (appendix) return { kind: 'appendix', number: `附录 ${appendix[1]}`, title: appendix[2] };
}

function alignRows(lines, rows) {
  const groups = new Map();
  for (const row of rows) {
    const parts = numberedLabel(row.label);
    if (!parts) continue;
    const key = parts.kind + ':' + row.depth;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ ...row, ...parts });
  }
  for (const level of groups.values()) {
    const width = Math.max(...level.map(row => row.number.length));
    const hasStar = level.some(row => row.star);
    for (const row of level) {
      const mark = row.star || (hasStar ? '&nbsp;' : '');
      const pad = '&nbsp;'.repeat(width - row.number.length);
      const field = `<samp>${mark}${row.number}${pad}${row.suffix ?? ''}</samp>`;
      lines[row.i] = row.before + field + '　' + row.title + row.after;
    }
  }
  return lines.join('\n');
}

export function formatDirectory(markdown) {
  const lines = markdown.split('\n'), rows = [];
  let previousDepth = -1;
  for (const [i, line] of lines.entries()) {
    const bullet = line.match(/^( *)- (.*)$/u);
    if (!bullet) continue;
    const depth = bullet[1].length / 2;
    if (!Number.isInteger(depth) || depth > previousDepth + 1) throw new Error('Invalid directory indentation: ' + line);
    previousDepth = depth;
    const link = bullet[2].match(/^\[([^\]]+)\](\(\.\/[^)]+\.md\))$/u);
    if (link) rows.push({ i, depth, label: link[1], before: bullet[1] + '- [', after: ']' + link[2] });
  }
  return alignRows(lines, rows);
}

// The printed contents use three layouts: nested lists, a Markdown page-number
// table, and an HTML table with ideographic indentation. Keep their pagination.
export function formatPrintedContents(markdown) {
  const lines = markdown.split('\n'), rows = [];
  const start = lines.indexOf('## 目录');
  if (start < 0) return markdown;
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^#{1,2} |^<\/table>/.test(line)) break;
    const link = line.match(/^(( *)(?:- |\| )(?:<a id="[^"]+"><\/a>)*\[)([^\]]+)(\]\(.*)$/u);
    if (link) {
      rows.push({ i, depth: link[2].length, label: link[3], before: link[1], after: link[4] });
      continue;
    }
    const html = line.match(/^(<tr[^>]*><td>(　*)<a [^>]+><strong>)(.*?)(<\/strong><\/a>.*)$/u);
    if (html) rows.push({ i, depth: html[2].length, label: html[3], before: html[1], after: html[4] });
  }
  return alignRows(lines, rows);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  for (const volume of enabledVolumes()) {
    for (const [name, format] of [['README.md', formatDirectory], ['frontmatter.md', formatPrintedContents]]) {
      const file = path.join(root, 'chapters', volume.id, name);
      const original = await fs.readFile(file, 'utf8');
      const formatted = format(original);
      if (formatted !== original) await fs.writeFile(file, formatted);
    }
  }
}
