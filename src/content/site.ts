/**
 * ─────────────────────────────────────────────────────────────
 *  REIKA LABS — CONTENT ENTRY POINT
 *
 *  Teks website ada di dua file dengan struktur yang sama:
 *    en.ts  → English
 *    id.ts  → Bahasa Indonesia
 *
 *  Komponen membaca bahasa aktif lewat `useSite()`.
 * ─────────────────────────────────────────────────────────────
 */
export type * from './types'
export type { Content } from '../i18n/LanguageProvider'

/** Fill {name}-style placeholders in a UI string. */
export function fmt(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`)
}

export { useSite, useLang } from '../i18n/LanguageProvider'
