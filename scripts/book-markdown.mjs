import { load } from 'cheerio';
import katex from 'katex';

// These two source expressions contain nested Markdown delimiters. Their TeX
// content is retained while the website gets one delimiter pair per expression.
const nestedDelimiters = [
  ['$T _ { $n$ }$', '$T _ { n }$'],
  ['$\\{ 1 , 2 , \\ldots , \\: $p - 1$ \\}$', '$\\{ 1 , 2 , \\ldots , \\: p - 1 \\}$']
];

export function normalizeMathSyntax(source) {
  const segments = source.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)/g);
  return segments.map((segment, index) => {
    if (index % 2) return segment;
    let result = segment;
    for (const [original, corrected] of nestedDelimiters) {
      result = result.replaceAll(original, corrected);
    }
    // The master has seven unambiguous TeX expressions with a space immediately
    // before the closing dollar. This is presentation-only whitespace.
    return result.replace(
      /(?<![\\$])\$(?!\$)([^$\n]*\\[A-Za-z][^$\n]*?[^\s$])[ \t]+\$(?!\$)/g,
      (_, tex) => `$${tex.trim()}$`
    );
  }).join('');
}

export function installBookMarkdown(md) {
  md.core.ruler.before('normalize', 'book_math_syntax', state => {
    state.src = normalizeMathSyntax(state.src);
  });
  md.core.ruler.after('block', 'mixal_plain_text', state => {
    for (const token of state.tokens) {
      if (token.type === 'fence' && /^mixal(?:\s|$)/i.test(token.info)) {
        token.info = token.info.replace(/^mixal/i, 'text');
      }
    }
  });

  const cache = new Map();
  const renderMath = (tex, display) => {
    const key = `${display}\0${tex}`;
    if (cache.has(key)) return cache.get(key);
    const markup = katex.renderToString(tex, {
      displayMode: display,
      output: 'htmlAndMathml',
      throwOnError: true,
      strict: 'ignore',
      trust: false
    });
    const tag = display ? 'div' : 'span';
    const mode = display ? 'display' : 'inline';
    const result = `<${tag} class="book-math book-math-${mode}" v-pre data-tex="${md.utils.escapeHtml(tex)}" data-math-display="${mode}">${markup}</${tag}>`;
    cache.set(key, result);
    return result;
  };
  md.renderer.rules.math_inline = (tokens, index) => renderMath(tokens[index].content, false);
  md.renderer.rules.math_block = (tokens, index) => renderMath(tokens[index].content, true) + '\n';

  const renderHtml = md.renderer.rules.html_block;
  md.renderer.rules.html_block = (tokens, index, options, env, self) => {
    const token = tokens[index];
    if (!token.content.includes('<table')) return renderHtml(tokens, index, options, env, self);
    const $ = load(token.content, { xml: { decodeEntities: false } }, false);
    const visit = node => {
      for (const child of [...(node.children ?? [])]) {
        if (child.type === 'text' && child.data.includes('$')) {
          const parsed = [];
          // Inline parsing avoids running the document's footnote-tail rule a
          // second time while a table cell is being rendered.
          md.inline.parse(normalizeMathSyntax(child.data), md, env, parsed);
          if (parsed.some(token => token.type === 'math_inline')) {
            $(child).replaceWith(md.renderer.renderInline(parsed, options, env));
          }
        } else if (!['code', 'pre', 'script', 'style', 'svg'].includes(child.name)) {
          visit(child);
        }
      }
    };
    $('td, th').each((_, node) => visit(node));
    return $.html() + '\n';
  };

  // Plain-HTML images in source tables also need lazy loading.
  for (const type of ['html_block', 'html_inline']) {
    const previous = md.renderer.rules[type];
    md.renderer.rules[type] = (...args) => previous(...args).replace(
      /<img\b[^>]*>/g,
      tag => tag.replace('<img', `<img${/\bloading=/.test(tag) ? '' : ' loading="lazy"'}${/\bdecoding=/.test(tag) ? '' : ' decoding="async"'}`)
    );
  }
}
