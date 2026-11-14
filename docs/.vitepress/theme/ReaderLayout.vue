<script setup lang="ts">
import DefaultTheme from 'vitepress/theme-without-fonts'
import { useData } from 'vitepress'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ReaderControls from './ReaderControls.vue'
import {
  applyReaderPreferences,
  DEFAULT_READER_PREFERENCES,
  normalizeReaderPreferences,
  parseReaderPreferences,
  persistReaderPreferences,
  readReaderPreferences,
  READER_STORAGE_KEY,
  type ReaderPreferences
} from './reader-preferences'

const DefaultLayout = DefaultTheme.Layout
const { isDark } = useData()
// Both SSR and the first client render use identical state. The head script
// sets the visual preference before paint; controls catch up after hydration.
const preferences = ref<ReaderPreferences>({ ...DEFAULT_READER_PREFERENCES })

function replacePreferences(next: ReaderPreferences, persist: boolean) {
  preferences.value = normalizeReaderPreferences(next)
  applyReaderPreferences(preferences.value, document.documentElement)
  isDark.value = preferences.value.theme === 'dark'
  if (persist) persistReaderPreferences(preferences.value)
}

function updatePreferences(patch: Partial<ReaderPreferences>) {
  replacePreferences({ ...preferences.value, ...patch }, true)
}

function resetPreferences() {
  replacePreferences({ ...DEFAULT_READER_PREFERENCES }, true)
}

function handleStorage(event: StorageEvent) {
  if (event.key === READER_STORAGE_KEY || event.key === null) {
    replacePreferences(parseReaderPreferences(event.key === null ? null : event.newValue), false)
  }
}

onMounted(() => {
  replacePreferences(readReaderPreferences(), false)
  window.addEventListener('storage', handleStorage)
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', handleStorage)
})
</script>

<template>
  <DefaultLayout>
    <template #doc-before>
      <ReaderControls
        :preferences="preferences"
        @change="updatePreferences"
        @reset="resetPreferences"
      />
    </template>
  </DefaultLayout>
</template>
