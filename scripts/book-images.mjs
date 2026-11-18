import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cache = new Map();
const attribute = (tag, name) => tag.match(new RegExp(`\\s${name}\\s*=\\s*(["'])(.*?)\\1`, 'is'));
const positive = value => Number.isFinite(value) && value > 0;
const number = value => String(Number(value.toFixed(6)));

function svgLength(value) {
  const match = value?.match(/^([\d.]+)(px|pt|mm|cm|in)?$/i);
  if (!match) return null;
  const scale = { px: 1, pt: 96 / 72, mm: 96 / 25.4, cm: 96 / 2.54, in: 96 };
  const result = Number(match[1]) * scale[(match[2] ?? 'px').toLowerCase()];
  return positive(result) ? result : null;
}

/** Read only local, already-publishable book assets. No source PDF is needed. */
export function bookImageDimensions(url) {
  if (!url || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(url)) return null;
  let pathname;
  try { pathname = decodeURIComponent(url.split(/[?#]/)[0]); } catch { return null; }
  const match = pathname.match(/(?:^|\/)(assets\/.+)$/);
  if (!match || match[1].split('/').some(part => part === '..' || part === '.') || match[1].includes('\\')) return null;
  const relative = match[1];
  let signature;
  try {
    const stat = fs.statSync(path.join(ROOT, relative));
    signature = `${stat.ino}:${stat.size}:${stat.mtimeMs}:${stat.ctimeMs}`;
  } catch { cache.delete(relative); return null; }
  const previous = cache.get(relative);
  if (previous?.signature === signature) return previous.value;
  let result = null;
  try {
    const data = fs.readFileSync(path.join(ROOT, relative));
    if (/\.svg$/i.test(relative)) {
      const svg = data.toString('utf8').match(/<svg\b(?:[^>"']|"[^"]*"|'[^']*')*>/i)?.[0] ?? '';
      const width = svgLength(attribute(svg, 'width')?.[2]);
      const height = svgLength(attribute(svg, 'height')?.[2]);
      const box = attribute(svg, 'viewBox')?.[2].trim().split(/[\s,]+/).map(Number);
      if (width && height) result = { width, height, viewBoxOnly: false };
      else if (box?.length === 4 && positive(box[2]) && positive(box[3])) {
        if (width) result = { width, height: width * box[3] / box[2], viewBoxOnly: false };
        else if (height) result = { width: height * box[2] / box[3], height, viewBoxOnly: false };
        else result = { width: box[2], height: box[3], viewBoxOnly: true };
      }
    } else if (data.length >= 24 && data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
      result = { width: data.readUInt32BE(16), height: data.readUInt32BE(20), viewBoxOnly: false };
    } else if (data.length >= 10 && /^GIF8[79]a$/.test(data.subarray(0, 6).toString())) {
      result = { width: data.readUInt16LE(6), height: data.readUInt16LE(8), viewBoxOnly: false };
    } else if (data[0] === 0xff && data[1] === 0xd8) {
      for (let offset = 2; offset + 4 < data.length;) {
        if (data[offset] !== 0xff) break;
        while (data[offset] === 0xff) offset++;
        const marker = data[offset++];
        if (marker === 0xd9 || marker === 0xda) break;
        if (marker === 0x01 || marker >= 0xd0 && marker <= 0xd7) continue;
        const length = data.readUInt16BE(offset);
        if (length < 2 || offset + length > data.length) break;
        if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker) && length >= 7) {
          result = { width: data.readUInt16BE(offset + 5), height: data.readUInt16BE(offset + 3), viewBoxOnly: false };
          break;
        }
        offset += length;
      }
    }
  } catch { /* Missing assets are reported by the source/site checker. */ }
  if (result && (!positive(result.width) || !positive(result.height))) result = null;
  cache.set(relative, { signature, value: result });
  return result;
}

/** Reserve the final image ratio before lazy loading so hash links stay put. */
export function reserveBookImageSpace(tag) {
  const size = bookImageDimensions(attribute(tag, 'src')?.[2]);
  if (!size) return tag;
  const width = attribute(tag, 'width'), height = attribute(tag, 'height');
  if (width && height) return tag;
  const add = text => { tag = tag.replace(/\s*\/?\s*>$/, ` ${text}>`); };
  if (width && positive(Number(width[2]))) {
    add(`height="${number(Number(width[2]) * size.height / size.width)}"`);
  } else if (height) {
    // Do not reinterpret an author's explicit height-only sizing choice.
    return tag;
  } else if (size.viewBoxOnly) {
    // Unsized inline SVG images fill their text container in the existing
    // reader. Keep that width and provide their ratio without stretching art.
    if (!width) add('width="100%"');
    const style = attribute(tag, 'style');
    if (!/(?:^|;)\s*aspect-ratio\s*:/i.test(style?.[2] ?? '')) {
      const ratio = `aspect-ratio:auto ${number(size.width)} / ${number(size.height)}`;
      if (style) tag = tag.replace(style[0], ` style=${style[1]}${style[2].trim().replace(/;?$/, ';')}${ratio}${style[1]}`);
      else add(`style="${ratio}"`);
    }
  } else if (!width) {
    add(`width="${number(size.width)}" height="${number(size.height)}"`);
  }
  return tag;
}
