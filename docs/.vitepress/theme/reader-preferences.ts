export const READER_STORAGE_KEY = 'taocp-reader-preferences-v1'

export const READER_THEMES = ['paper', 'light', 'dark'] as const
export const READER_FONT_SIZES = [16, 18, 20, 22, 24] as const
export const READER_CONTENT_WIDTHS = [640, 760, 920] as const

export type ReaderTheme = (typeof READER_THEMES)[number]
export type ReaderPreferences = {
  theme: ReaderTheme
  fontSize: (typeof READER_FONT_SIZES)[number]
  contentWidth: (typeof READER_CONTENT_WIDTHS)[number]
  toc: 'shown' | 'hidden'
}

export const DEFAULT_READER_PREFERENCES: Readonly<ReaderPreferences> = Object.freeze({
  theme: 'paper',
  fontSize: 18,
  contentWidth: 760,
  toc: 'shown'
})

// Keep this function self-contained: its compiled source is also used by the
// small head script, so pre-paint and mounted validation cannot drift apart.
export function normalizeReaderPreferences(value: unknown): ReaderPreferences {
  const data = value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {}
  return {
    theme: data.theme === 'light' || data.theme === 'dark' ? data.theme : 'paper',
    fontSize: [16, 18, 20, 22, 24].includes(data.fontSize as number)
      ? data.fontSize as ReaderPreferences['fontSize'] : 18,
    contentWidth: [640, 760, 920].includes(data.contentWidth as number)
      ? data.contentWidth as ReaderPreferences['contentWidth'] : 760,
    toc: data.toc === 'hidden' ? 'hidden' : 'shown'
  }
}

export function parseReaderPreferences(raw: string | null): ReaderPreferences {
  try {
    return normalizeReaderPreferences(raw === null ? null : JSON.parse(raw))
  } catch {
    return { ...DEFAULT_READER_PREFERENCES }
  }
}

export function readReaderPreferences(): ReaderPreferences {
  try {
    return parseReaderPreferences(window.localStorage.getItem(READER_STORAGE_KEY))
  } catch {
    // Covers SSR, blocked storage, and browsers with unavailable localStorage.
    return { ...DEFAULT_READER_PREFERENCES }
  }
}

export function persistReaderPreferences(value: ReaderPreferences): void {
  try {
    window.localStorage.setItem(READER_STORAGE_KEY, JSON.stringify(normalizeReaderPreferences(value)))
  } catch {
    // In-memory preferences continue to work when persistence is unavailable.
  }
}

// Also self-contained for the pre-paint script. With appearance:false this is
// the single owner of the document's light/dark class and reader attributes.
export function applyReaderPreferences(value: ReaderPreferences, root: HTMLElement): void {
  root.dataset.readerTheme = value.theme
  root.dataset.readerToc = value.toc
  root.style.setProperty('--reader-font-size', `${value.fontSize}px`)
  root.style.setProperty('--reader-content-width', `${value.contentWidth}px`)
  root.style.colorScheme = value.theme === 'dark' ? 'dark' : 'light'
  root.classList.toggle('dark', value.theme === 'dark')
}

/** Import in config.mts and add ['script', {}, READER_INIT_SCRIPT] to head. */
export const READER_INIT_SCRIPT = `;(() => {
  const normalize = ${normalizeReaderPreferences.toString()};
  const apply = ${applyReaderPreferences.toString()};
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(${JSON.stringify(READER_STORAGE_KEY)}) || 'null'); } catch {}
  apply(normalize(saved), document.documentElement);
})();`
