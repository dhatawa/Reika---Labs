import { useLang, useSite } from '../../content/site'
import type { Lang } from '../../content/types'

const OPTIONS: { value: Lang; label: string; name: string }[] = [
  { value: 'id', label: 'ID', name: 'Bahasa Indonesia' },
  { value: 'en', label: 'EN', name: 'English' },
]

/** Two-option segmented switch: ID / EN. */
export function LanguageSwitch({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  const { lang, setLang } = useLang()
  const { ui } = useSite()
  return (
    <div
      role="group"
      aria-label={ui.language}
      className={`inline-flex h-9 items-center rounded-[10px] border p-0.5 text-xs font-medium ${
        dark ? 'border-mist/20' : 'border-ink/15'
      } ${className}`}
    >
      {OPTIONS.map((o) => {
        const on = lang === o.value
        return (
          <button
            key={o.value}
            type="button"
            lang={o.value}
            aria-pressed={on}
            aria-label={o.name}
            onClick={() => setLang(o.value)}
            className={`h-full rounded-lg px-2.5 transition-colors duration-150 ${
              on
                ? dark
                  ? 'bg-mist text-ink'
                  : 'bg-ink text-paper'
                : dark
                  ? 'text-mist-3 hover:text-mist'
                  : 'text-ink-3 hover:text-ink'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
