import { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useSite, type NavGroup } from '../../content/site'

/** A navigation group in the active language. */
export function useGroup(id: string) {
  const { navigation } = useSite()
  return navigation.find((n): n is NavGroup => n.kind === 'group' && n.id === id)!
}

/** Sets the browser tab title for the current page. */
export function usePageTitle(title: string) {
  const { site } = useSite()
  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : `${site.name} — ${site.acronym}`
  }, [title, site])
}

/** Horizontal tabs for the pages of one group, sticky under the navbar. */
export function SubNav({ groupId, className = '' }: { groupId: string; className?: string }) {
  const group = useGroup(groupId)
  return (
    <nav aria-label={group.label} className={`hairline sticky top-16 z-40 border-b bg-paper/90 backdrop-blur-md ${className}`}>
      <ul className="container-x flex gap-1 overflow-x-auto [scrollbar-width:none]">
        {group.items.map((item) => (
          <li key={item.id} className="shrink-0">
            <NavLink
              to={item.to}
              end
              className={({ isActive }) =>
                `relative flex h-12 items-center px-3 text-sm transition-colors duration-150 first:pl-0 ${
                  isActive ? 'font-medium text-ink' : 'text-ink-3 hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive ? <span aria-hidden="true" className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-sky" /> : null}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Previous / next page within a group, at the foot of each page. */
export function PageNav({ groupId, tone = 'light' }: { groupId: string; tone?: 'light' | 'dark' }) {
  const { pathname } = useLocation()
  const items = useGroup(groupId).items
  const { ui } = useSite()
  const i = items.findIndex((it) => it.to === pathname)
  if (i < 0) return null
  const prev = items[i - 1]
  const next = items[i + 1]
  const line = tone === 'light' ? 'hairline' : 'hairline-dark'
  const muted = tone === 'light' ? 'text-ink-3' : 'text-mist-3'
  const strong = tone === 'light' ? 'text-ink group-hover:text-sky-ink' : 'text-mist group-hover:text-sky'
  return (
    <nav aria-label={ui.pagesInSection} className={`container-x ${tone === 'dark' ? 'bg-night' : ''}`}>
      <div className={`${line} grid gap-4 border-t py-10 sm:grid-cols-2`}>
        {prev ? (
          <Link to={prev.to} className="group flex flex-col gap-1">
            <span className={`flex items-center gap-2 text-sm ${muted}`}>
              <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" /> {ui.previous}
            </span>
            <span className={`font-display text-2xl transition-colors duration-150 ${strong}`}>{prev.label}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={next.to} className="group flex flex-col gap-1 sm:items-end sm:text-right">
            <span className={`flex items-center gap-2 text-sm ${muted}`}>
              {ui.next} <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            </span>
            <span className={`font-display text-2xl transition-colors duration-150 ${strong}`}>{next.label}</span>
          </Link>
        ) : null}
      </div>
    </nav>
  )
}
