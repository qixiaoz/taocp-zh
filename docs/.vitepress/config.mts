import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import footnote from 'markdown-it-footnote'
import navigation from './book-navigation.json'
import { installBookMarkdown } from '../../scripts/book-markdown.mjs'
import { createBookMathModules } from '../../scripts/book-math-modules.mjs'
import { READER_INIT_SCRIPT } from './theme/reader-preferences'

const publishedVolumes = navigation.volumes
const bookMathModules = createBookMathModules()
const multipleVolumes = publishedVolumes.length > 1
const siteTitle = multipleVolumes ? '《计算机程序设计艺术》中文阅读' : '《计算机程序设计艺术》卷1'
const readingNav = multipleVolumes
  ? publishedVolumes.map(volume => ({ text: volume.title.split('·')[0], link: `${volume.routePrefix}/frontmatter`, activeMatch: `^${volume.routePrefix}/` }))
  : [{ text: '章节正文', link: '/volume1/frontmatter', activeMatch: '^/volume1/' }]

// Use the same padded number field as the two public chapter directories.
const directoryLabels = new Map(publishedVolumes.flatMap(volume =>
  volume.pages.map(page => [page.route, page.directoryLabel] as const)))
const escapeLabel = (text: string) => text.replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]!)

function formatSidebar(items: DefaultTheme.SidebarItem[]): DefaultTheme.SidebarItem[] {
  return items.map(item => {
    const parts = directoryLabels.get(item.link ?? '')?.match(/^<samp>([^<>]+)<\/samp>　(.+)$/u)
    return {
      ...item,
      docFooterText: (item.docFooterText ?? item.text)?.replaceAll('$n$', 'n'),
      text: parts
        ? `<samp class="book-nav-number">${escapeLabel(parts[1].replaceAll('&nbsp;', '\u00a0'))}</samp> <span class="book-nav-label">${escapeLabel(parts[2]).replaceAll('$n$', '<i>n</i>')}</span>`
        : item.text,
      ...(item.items ? { items: formatSidebar(item.items) } : {})
    }
  })
}

const sidebar = Array.isArray(navigation.sidebar)
  ? formatSidebar(navigation.sidebar)
  : Object.fromEntries(Object.entries(navigation.sidebar).map(([route, items]) => [route, formatSidebar(items)]))

// VitePress serializes this function into the client bundle. Keep it self-contained
// so the browser uses exactly the same tokenizer as the build-time search index.
function tokenizeChinese(text: string): string[] {
  const normalized = text.normalize('NFKC')
  const words = typeof Intl.Segmenter === 'function'
    ? Array.from(new Intl.Segmenter('zh-Hans', { granularity: 'word' }).segment(normalized))
        .filter((part) => part.isWordLike)
        .map((part) => part.segment)
    : (normalized.match(/\p{Script=Han}|[\p{L}\p{N}_]+/gu) ?? [])
  const symbols = normalized.match(/<=|>=|!=|==|[≤≥≠±−+×÷∑∏∫∞≡∈∉⊂⊆∪∩<>＝=]/gu) ?? []
  return [...words, ...symbols]
}

export default defineConfig({
  lang: 'zh-CN',
  title: siteTitle,
  description: multipleVolumes
    ? '《计算机程序设计艺术》中文阅读版：卷一基本算法、卷二半数值算法、卷三排序与查找、卷4A组合算法（一），含习题答案、附录与索引。'
    : '《计算机程序设计艺术》第一卷《基本算法》中文阅读版：基本概念、信息结构、习题答案与附录。',
  base: '/taocp-zh/',
  cleanUrls: false,
  // Limit concurrent search/SSR work for the dense four-volume math build.
  buildConcurrency: 1,
  appearance: false,
  lastUpdated: false,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/taocp-zh/favicon.svg' }],
    ['script', {}, READER_INIT_SCRIPT]
  ],
  vite: {
    plugins: [bookMathModules.plugin],
    build: { assetsInlineLimit: 0 }
  },
  markdown: {
    math: true,
    image: { lazyLoading: true },
    lineNumbers: false,
    languageAlias: { mixal: 'text', fortran: 'text' },
    config(md) {
      // In technical prose, punctuation next to a label is literal text.
      md.core.ruler.disable('emoji')
      md.use(footnote)
      installBookMarkdown(md, { literalMath: true })
      bookMathModules.install(md)
    }
  },
  themeConfig: {
    siteTitle: '计算机程序设计艺术',
    nav: [
      { text: '主页', link: '/' },
      ...readingNav
    ],
    sidebar,
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一节', next: '下一节' },
    sidebarMenuLabel: '章节目录',
    returnToTopLabel: '返回顶部',
    skipToContentLabel: '跳转到正文',
    darkModeSwitchLabel: '外观',
    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    socialLinks: [{ icon: 'github', link: 'https://github.com/qixiaoz/taocp-zh' }],
    search: {
      provider: 'local',
      options: {
        _render(src, env, md) {
          // Search indexes HTML before Vue SSR: retain full math and code text.
          env.bookDirectHTML = true
          const html = md.render(src, env)
          return env.frontmatter?.search === false ? '' : html
        },
        detailedView: 'auto',
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索全书' },
          modal: {
            displayDetails: '显示详细结果',
            resetButtonTitle: '清除搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '未找到相关内容',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车键',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '向上箭头',
              navigateDownKeyAriaLabel: '向下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc 键'
            }
          }
        },
        miniSearch: {
          options: { tokenize: tokenizeChinese },
          searchOptions: {
            combineWith: 'AND',
            prefix: true,
            fuzzy: (term: string) => /^[a-z]{4,}$/i.test(term) ? 0.15 : false,
            boost: { title: 4, text: 2, titles: 1 }
          }
        }
      }
    }
  }
})
