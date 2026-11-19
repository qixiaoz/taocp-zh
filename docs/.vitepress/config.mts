import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import footnote from 'markdown-it-footnote'
import navigation from './book-navigation.json'
import { installBookMarkdown } from '../../scripts/book-markdown.mjs'
import { READER_INIT_SCRIPT } from './theme/reader-preferences'

const publishedVolumes = navigation.volumes
const multipleVolumes = publishedVolumes.length > 1
const siteTitle = multipleVolumes ? '《计算机程序设计艺术》中文阅读' : '《计算机程序设计艺术》卷1'
const readingNav = multipleVolumes
  ? publishedVolumes.map(volume => ({ text: volume.title.split('·')[0], link: `${volume.routePrefix}/frontmatter`, activeMatch: `^${volume.routePrefix}/` }))
  : [{ text: '章节正文', link: '/volume1/frontmatter', activeMatch: '^/volume1/' }]

// Format only the sidebar display: source headings and generated metadata keep
// their original spelling. Sibling titles share a number column, including the
// optional difficulty marker and the longer numbers in the answer list.
function formatSidebar(items: DefaultTheme.SidebarItem[]): DefaultTheme.SidebarItem[] {
  const parts = items.map(item => item.text?.match(/^(\*?\d+(?:\.\d+)+)\s*(.+)$/u))
  const numberWidth = Math.max(0, ...parts.map(part => part?.[1].length ?? 0))
  const escape = (text: string) => text.replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]!)
  // This source heading contains $n$. Sidebar and footer labels are plain
  // theme text, so present the symbol here without changing book metadata.
  const label = (text: string) => escape(text).replaceAll('$n$', '<i>n</i>')
  return items.map((item, index) => ({
    ...item,
    docFooterText: (item.docFooterText ?? item.text)?.replaceAll('$n$', 'n'),
    text: parts[index]
      ? `<span class="book-nav-number" style="--book-nav-number-width:${numberWidth}ch">${escape(parts[index]![1])}</span> <span class="book-nav-label">${label(parts[index]![2])}</span>`
      : item.text,
    ...(item.items ? { items: formatSidebar(item.items) } : {})
  }))
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
    build: { assetsInlineLimit: 0 }
  },
  markdown: {
    math: true,
    image: { lazyLoading: true },
    lineNumbers: false,
    languageAlias: { mixal: 'text', fortran: 'text' },
    config(md) {
      md.use(footnote)
      installBookMarkdown(md, { literalMath: true })
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
