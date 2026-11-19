#!/usr/bin/env node
/** Render private page proofs with the production Markdown rules, without
 * assigning source review or publishing a volume. Paths are relative to ROOT.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { createMarkdownRenderer, disposeMdItInstance } from 'vitepress'
import footnote from 'markdown-it-footnote'
import { load } from 'cheerio'
import { installBookMarkdown } from './book-markdown.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const option = name => args[args.indexOf(name) + 1]
if (!args.includes('--work') || !args.includes('--pages')) throw new Error('Pass --work .work/volumeN --pages 17,68,339')
const work = path.resolve(root, option('--work'))
if (!work.startsWith(path.join(root, '.work') + path.sep)) throw new Error('Proofs must stay inside the private .work directory')
const pages = [...new Set(option('--pages').split(',').flatMap(part => {
  const m = part.match(/^(\d+)(?:-(\d+))?$/)
  if (!m || +m[1] < 1 || +(m[2] ?? m[1]) < +m[1]) throw new Error('Invalid physical-page range')
  return Array.from({ length: +(m[2] ?? m[1]) - +m[1] + 1 }, (_, i) => +m[1] + i)
}))].sort((a, b) => a - b)
const output = path.join(work, 'verified-render')
await fs.mkdir(output, { recursive: true })
const relative = target => path.relative(output, target).split(path.sep).join('/')
const assetPrefix = relative(path.join(root, 'assets')) + '/'
const renderer = await createMarkdownRenderer(root, { math: true, languageAlias: { mixal: 'text', fortran: 'text' }, config(md) { md.use(footnote); installBookMarkdown(md) } })
const results = []
try {
  for (const page of pages) {
    const raw = await fs.readFile(path.join(work, 'verified', `${String(page).padStart(3, '0')}.md`))
    const rendered = renderer.render(raw.toString(), { bookDirectHTML: true }).replace(/(src|href)="(?:\.\/)?assets\//g, `$1="${assetPrefix}`)
    const $ = load(rendered)
    const html = `<!doctype html><html lang="zh-CN" data-reader-theme="paper"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="${relative(path.join(root, 'node_modules/katex/dist/katex.min.css'))}"><link rel="stylesheet" href="${relative(path.join(root, 'docs/.vitepress/theme/style.css'))}"><style>body{max-width:760px;margin:24px auto;padding:16px;background:#f6f1e6;color:#342f29;box-sizing:border-box}pre{padding:12px;background:#eee8dc;font:13px/1.6 monospace}table{border-collapse:collapse}td,th{border:1px solid #c8bcaa}svg{max-width:100%;height:auto}</style><body><main class="VPDoc"><article class="vp-doc">${rendered}</article></main></body></html>`
    await fs.writeFile(path.join(output, `${page}.html`), html)
    results.push({ physicalPage: page, markdownSha256: createHash('sha256').update(raw).digest('hex'), htmlSha256: createHash('sha256').update(html).digest('hex'), mathExpressions: $('[data-tex]').length, displayMath: $('.book-math-display').length, parseErrors: $('.katex-error').length, images: $('img').length, codeLines: $('pre code').toArray().map(el => $(el).text().split('\n').length), unexpectedControls: (raw.toString().match(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g) ?? []).length })
  }
} finally { disposeMdItInstance() }
await fs.writeFile(path.join(output, `syntax-${pages.join('-')}.json`), JSON.stringify({ status: 'rendered-private-proof-only', results, qualification: 'Parsing and rendering do not assign original-page or bilingual acceptance.' }, null, 2) + '\n')
console.log(JSON.stringify(results))
if (results.some(item => item.parseErrors || item.unexpectedControls)) process.exitCode = 1
