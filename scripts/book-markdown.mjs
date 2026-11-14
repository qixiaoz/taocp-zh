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

export function installBookMarkdown(md, { literalMath = false } = {}) {
  const inlineCode = md.renderer.rules.code_inline;
  md.renderer.rules.code_inline = (...args) => {
    const text = args[0][args[1]].content;
    if (!/ {2}/.test(text) || args[3]?.bookDirectHTML) return inlineCode(...args);
    // v-pre still lets Vue condense text whitespace. A literal v-text preserves
    // the code's ASCII spaces through SSR without evaluating source expressions.
    const literal = md.utils.escapeHtml(JSON.stringify(text));
    return `<code data-book-code-literal="1" v-text="${literal}" style="white-space:pre-wrap"></code>`;
  };
  const render = md.renderer.render;
  md.renderer.render = (...args) => {
    if (args[2]?.bookDirectHTML) return render.apply(md.renderer, args);
    let preDepth = 0;
    return render.apply(md.renderer, args).replace(/<\/?pre\b[^>]*>|<code\b([^>]*)>([^<]*)<\/code>/gi, (html, attributes, text) => {
      if (/^<pre\b/i.test(html)) { preDepth++; return html; }
      if (/^<\/pre\b/i.test(html)) { preDepth--; return html; }
      if (preDepth || !/ {2}/.test(text)) return html;
      const code = load(html, {}, false)('code');
      if (!/(?:^|;)\s*white-space\s*:\s*pre\s*(?:!important\s*)?(?:;|$)/i.test(code.attr('style') ?? '')
        || code.is('[v-pre],[v-text],[data-book-code-literal]')) return html;
      // Original MIX character fields also use explicit preformatted HTML code.
      // Preserve its attributes and decoded text; nested markup and pre blocks
      // are deliberately outside this narrowly defined protection.
      const literal = md.utils.escapeHtml(JSON.stringify(code.text()));
      return `<code${attributes} data-book-code-literal="1" v-text="${literal}"></code>`;
    });
  };
  md.core.ruler.before('normalize', 'book_math_syntax', state => {
    state.src = normalizeMathSyntax(state.src);
  });
  md.core.ruler.after('block', 'mixal_plain_text', state => {
    for (const token of state.tokens) {
      if (token.type === 'fence' && /^(?:mixal|fortran)(?:\s|$)/i.test(token.info)) {
        token.info = token.info.replace(/^(?:mixal|fortran)/i, 'text');
      }
    }
  });

  const cache = new Map();
  const renderMath = (tex, display, env) => {
    const literal = literalMath && !env?.bookDirectHTML;
    const key = `${literal}\0${display}\0${tex}`;
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
    const attributes = `class="book-math book-math-${mode}" data-tex="${md.utils.escapeHtml(tex)}" data-math-display="${mode}"`;
    // KaTeX's trusted renderer already produced the complete HTML/MathML. Keep
    // those children out of Vue's compiler AST while preserving exact SSR DOM.
    const result = literal
      ? `<${tag} ${attributes} :v-pre="''" v-html="${md.utils.escapeHtml(JSON.stringify(markup))}"></${tag}>`
      : `<${tag} class="book-math book-math-${mode}" v-pre data-tex="${md.utils.escapeHtml(tex)}" data-math-display="${mode}">${markup}</${tag}>`;
    cache.set(key, result);
    return result;
  };
  md.renderer.rules.math_inline = (tokens, index, _options, env) => renderMath(tokens[index].content, false, env);
  md.renderer.rules.math_block = (tokens, index, _options, env) => renderMath(tokens[index].content, true, env) + '\n';

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
    // KaTeX contains empty HTML spans for vertical struts. XML serialization
    // self-closes them, which HTML browsers treat as unclosed spans and can
    // clip accents or nest the remaining table incorrectly.
    return $.html({ xml: { xmlMode: false, decodeEntities: false } }) + '\n';
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
