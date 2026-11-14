import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import ReaderLayout from './ReaderLayout.vue'
import 'katex/dist/katex.min.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: ReaderLayout
} satisfies Theme
