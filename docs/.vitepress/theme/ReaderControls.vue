<script setup lang="ts">
import { useRoute } from 'vitepress'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  READER_FONT_SIZES,
  type ReaderPreferences,
  type ReaderTheme
} from './reader-preferences'

const props = defineProps<{ preferences: ReaderPreferences }>()
const emit = defineEmits<{
  change: [patch: Partial<ReaderPreferences>]
  reset: []
}>()
const route = useRoute()
const controls = ref<HTMLElement | null>(null)
const settingsButton = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const open = ref(false)
const themes: { value: ReaderTheme; label: string }[] = [
  { value: 'paper', label: '纸色' },
  { value: 'light', label: '白色' },
  { value: 'dark', label: '深色' }
]

function closeSettings(restoreFocus = false) {
  if (!open.value) return
  open.value = false
  if (restoreFocus) settingsButton.value?.focus()
}

async function toggleSettings() {
  if (open.value) return closeSettings()
  open.value = true
  await nextTick()
  panel.value?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]')?.focus()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    event.stopPropagation()
    closeSettings(true)
  }
}

function handleOutside(event: Event) {
  if (open.value && event.target instanceof Node && !controls.value?.contains(event.target)) {
    closeSettings()
  }
}

function setFontSize(event: Event) {
  emit('change', { fontSize: Number((event.target as HTMLSelectElement).value) as ReaderPreferences['fontSize'] })
}

function setContentWidth(event: Event) {
  emit('change', { contentWidth: Number((event.target as HTMLSelectElement).value) as ReaderPreferences['contentWidth'] })
}

watch(() => route.path, () => closeSettings())
onMounted(() => {
  document.addEventListener('pointerdown', handleOutside, true)
  document.addEventListener('focusin', handleOutside)
  document.addEventListener('keydown', handleKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleOutside, true)
  document.removeEventListener('focusin', handleOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="reader-controls" role="group" aria-label="阅读工具">
    <button
      type="button"
      class="reader-control-button reader-toc-toggle"
      data-testid="reader-toc-toggle"
      aria-controls="VPSidebarNav"
      :aria-expanded="preferences.toc === 'shown'"
      @click="emit('change', { toc: preferences.toc === 'shown' ? 'hidden' : 'shown' })"
    >
      <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
        <path d="M3 4.5h14v11H3zM7 4.5v11M10 8h4M10 11h4" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      {{ preferences.toc === 'shown' ? '收起目录' : '展开目录' }}
    </button>

    <div ref="controls" class="reader-settings">
      <button
        ref="settingsButton"
        type="button"
        class="reader-control-button"
        data-testid="reader-settings-toggle"
        aria-controls="reader-settings-panel"
        :aria-expanded="open"
        @click="toggleSettings"
      >
        <span class="reader-type-icon" aria-hidden="true">Aa</span>
        阅读设置
      </button>

      <section
        v-if="open"
        id="reader-settings-panel"
        ref="panel"
        class="reader-settings-panel"
        role="region"
        aria-labelledby="reader-settings-title"
        data-testid="reader-settings-panel"
      >
        <div class="reader-panel-heading">
          <h2 id="reader-settings-title">阅读设置</h2>
          <button type="button" class="reader-close" aria-label="关闭阅读设置" @click="closeSettings(true)">×</button>
        </div>

        <fieldset class="reader-theme-group">
          <legend>页面颜色</legend>
          <div class="reader-theme-options">
            <button
              v-for="theme in themes"
              :key="theme.value"
              type="button"
              class="reader-theme-option"
              :data-testid="`reader-theme-${theme.value}`"
              :aria-pressed="preferences.theme === theme.value"
              @click="emit('change', { theme: theme.value })"
            >
              <span class="reader-swatch" :class="`reader-swatch-${theme.value}`" aria-hidden="true" />
              {{ theme.label }}
            </button>
          </div>
        </fieldset>

        <label class="reader-setting-row" for="reader-font-size">
          <span>字号</span>
          <select id="reader-font-size" data-testid="reader-font-size" :value="preferences.fontSize" @change="setFontSize">
            <option v-for="size in READER_FONT_SIZES" :key="size" :value="size">{{ size }} px</option>
          </select>
        </label>

        <label class="reader-setting-row" for="reader-content-width">
          <span>正文宽度</span>
          <select id="reader-content-width" data-testid="reader-content-width" :value="preferences.contentWidth" @change="setContentWidth">
            <option :value="640">紧凑 · 640 px</option>
            <option :value="760">适中 · 760 px</option>
            <option :value="920">宽屏 · 920 px</option>
          </select>
        </label>

        <button type="button" class="reader-reset" data-testid="reader-reset" @click="emit('reset')">恢复默认</button>
      </section>
    </div>
  </div>
</template>

<style scoped>
.reader-controls {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0 0 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: var(--vp-font-family-base);
  font-size: 13px;
  line-height: 1.5;
}

.reader-control-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 36px;
  padding: 6px 8px;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  cursor: pointer;
}

.reader-control-button:hover,
.reader-control-button[aria-expanded='true']:not(.reader-toc-toggle),
.reader-close:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.reader-control-button:focus-visible,
.reader-settings-panel button:focus-visible,
.reader-settings-panel select:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.reader-toc-toggle { display: none; }
.reader-type-icon { font-family: Georgia, serif; font-size: 17px; }
.reader-settings { position: relative; margin-left: auto; }

.reader-settings-panel {
  position: absolute;
  z-index: 40;
  top: calc(100% + 8px);
  right: 0;
  width: 300px;
  max-width: calc(100vw - 32px);
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  box-shadow: var(--vp-shadow-3);
  text-align: left;
}

.reader-panel-heading { display: flex; align-items: center; justify-content: space-between; margin: -4px -4px 14px 0; }
.reader-panel-heading h2 { margin: 0; font-size: 15px; font-weight: 600; line-height: 1.5; }
.reader-close { width: 32px; height: 32px; border-radius: 6px; font-size: 24px; color: var(--vp-c-text-2); cursor: pointer; }
.reader-theme-group { min-width: 0; margin: 0 0 16px; padding: 0; border: 0; }
.reader-theme-group legend { padding: 0; margin-bottom: 8px; font-size: 13px; color: var(--vp-c-text-2); }
.reader-theme-options { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
.reader-theme-option { display: flex; align-items: center; justify-content: center; gap: 6px; min-height: 38px; border: 1px solid var(--vp-c-divider); border-radius: 6px; cursor: pointer; }
.reader-theme-option:hover { background: var(--vp-c-default-soft); }
.reader-theme-option[aria-pressed='true'] { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); box-shadow: inset 0 0 0 1px var(--vp-c-brand-1); }
.reader-swatch { width: 12px; height: 12px; flex: 0 0 12px; border: 1px solid rgb(127 127 127 / 35%); border-radius: 50%; }
.reader-swatch-paper { background: #f7f2e8; }
.reader-swatch-light { background: #fff; }
.reader-swatch-dark { background: #202126; }
.reader-setting-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 12px; }
.reader-setting-row > span { color: var(--vp-c-text-2); }
.reader-setting-row select { width: 156px; min-height: 36px; padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1); font: inherit; cursor: pointer; appearance: auto; }
.reader-reset { margin-top: 18px; padding: 5px 0; color: var(--vp-c-text-2); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.reader-reset:hover { color: var(--vp-c-brand-1); }

@media (min-width: 960px) {
  .reader-toc-toggle { display: inline-flex; }
}

@media print {
  .reader-controls { display: none; }
}
</style>
