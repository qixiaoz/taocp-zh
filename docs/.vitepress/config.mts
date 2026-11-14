import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'
import navigation from './book-navigation.json'
import { installBookMarkdown } from '../../scripts/book-markdown.mjs'
import { READER_INIT_SCRIPT } from './theme/reader-preferences'

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
  title: '《计算机程序设计艺术》卷1',
  description: '《计算机程序设计艺术》第一卷《基本算法》中文阅读版：基本概念、信息结构、习题答案与附录。',
  base: '/taocp-zh/',
  cleanUrls: false,
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
    languageAlias: { mixal: 'text' },
    config(md) {
      md.use(footnote)
      installBookMarkdown(md)
    }
  },
  themeConfig: {
    siteTitle: '《计算机程序设计艺术》卷1',
    nav: [
      { text: '主页', link: '/' },
      { text: '章节正文', link: '/volume1/frontmatter', activeMatch: '^/volume1/' },
      { text: '校订说明', link: '/corrections' },
      { text: '下载', link: '/taocp-zh/downloads/taocp-volume1.zip' }
    ],
    sidebar: navigation.sidebar,
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
