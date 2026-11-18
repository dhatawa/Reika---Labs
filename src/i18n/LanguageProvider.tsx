import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import * as en from '../content/en'
import * as id from '../content/id'
import type { Lang } from '../content/types'

export type Content = typeof en
const dictionaries: Record<Lang, Content> = { en, id }

const STORAGE_KEY = 'reika-lang'

type LangState = { lang: Lang; setLang: (l: Lang) => void; t: Content }
const LangContext = createContext<LangState | null>(null)

/** Saved choice → browser language (Indonesian browsers get ID) → English. */
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'id') return saved
  } catch {
    /* storage unavailable: fall through */
  }
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  // Keep <html lang> correct for screen readers, hyphenation and SEO.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

function useLangState() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useSite/useLang must be used inside <LanguageProvider>')
  return ctx
}

/** All content for the active language: `const { hero, ui } = useSite()`. */
export function useSite() {
  return useLangState().t
}

/** Current language and setter, for the switcher. */
export function useLang() {
  const { lang, setLang } = useLangState()
  return { lang, setLang }
}
