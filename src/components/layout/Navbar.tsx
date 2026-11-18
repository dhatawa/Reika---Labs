import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { NavDropdown, ActiveBar } from './NavDropdown'
import { useSite, type NavGroup } from '../../content/site'
import { navigation } from '../../content/en'
import { LanguageSwitch } from './LanguageSwitch'

/** Which top-level menu owns the current URL (paths are the same in every language). */
export function activeMenuId(pathname: string) {
  for (const item of navigation) {
    if (item.kind === 'group' && pathname.startsWith(item.base)) return item.id
    if (item.kind === 'link' && (item.to === '/' ? pathname === '/' : pathname.startsWith(item.to))) return item.id
  }
  return null
}

/**
 * Shared across every page. Transparent with light text only over the dark
 * home hero; everywhere else it is a light surface with dark text.
 */
export function Navbar() {
  const { pathname } = useLocation()
  const { navigation: nav, ui } = useSite()
  const isHome = pathname === '/'
  const [overHero, setOverHero] = useState(isHome)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const activeId = activeMenuId(pathname)

  // Close every menu whenever the page changes (also on back/forward).
  useEffect(() => {
    setOpenGroup(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isHome) {
      setOverHero(false)
      return
    }
    const onScroll = () => {
      const hero = document.getElementById('home')
      const limit = (hero?.offsetHeight ?? window.innerHeight) - 64
      setOverHero(window.scrollY < limit)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const closeGroup = useCallback(() => setOpenGroup(null), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const dark = overHero && !mobileOpen
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-300 ease-[var(--ease-water)] ${
        dark ? 'border-transparent bg-transparent text-mist' : 'hairline bg-paper/90 text-ink backdrop-blur-md'
      }`}
    >
      <nav aria-label="Main" className="container-x flex h-16 items-center justify-between">
        <Link to="/" aria-label={ui.homeAria} onClick={closeMobile}>
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
        <ul className="relative hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.kind === 'group' ? (
              <NavDropdown
                key={item.id}
                group={item}
                dark={dark}
                active={activeId === item.id}
                open={openGroup === item.id}
                onToggle={() => setOpenGroup((g) => (g === item.id ? null : item.id))}
                onClose={closeGroup}
              />
            ) : (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `relative block rounded-lg px-3 py-2 text-[0.9375rem] transition-colors duration-150 ${
                      isActive
                        ? dark
                          ? 'text-mist'
                          : 'text-ink'
                        : dark
                          ? 'text-mist-3 hover:text-mist'
                          : 'text-ink-3 hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive ? <ActiveBar /> : null}
                    </>
                  )}
                </NavLink>
              </li>
            ),
          )}
        </ul>

        <LanguageSwitch dark={dark} />

        <button
          type="button"
          className="-mr-2 grid h-11 w-11 place-items-center lg:hidden"
          aria-label={mobileOpen ? ui.closeMenu : ui.openMenu}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
        </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-paper lg:hidden"
          >
            <ul className="container-x flex flex-col pb-12 pt-2">
              {nav.map((item) =>
                item.kind === 'group' ? (
                  <MobileGroup key={item.id} group={item} defaultOpen={activeId === item.id} />
                ) : (
                  <li key={item.id} className="hairline border-b">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `flex h-16 items-center gap-3 font-display text-2xl ${isActive ? 'text-sky-ink' : 'text-ink'}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

/** Mobile: dropdown groups become accordions. */
function MobileGroup({ group, defaultOpen }: { group: NavGroup; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = `m-${group.id}`
  return (
    <li className="hairline border-b">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex h-16 w-full items-center justify-between font-display text-2xl text-ink"
      >
        {group.label}
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className={`h-5 w-5 text-ink-3 transition-transform duration-200 ease-[var(--ease-water)] ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div id={id} hidden={!open} className="pb-4">
        <ul className="flex flex-col">
          {group.items.map((item) => (
            <li key={item.id}>
              <NavLink to={item.to} end className="group block rounded-[10px] px-4 py-3 active:bg-ink/5">
                {({ isActive }) => (
                  <>
                    <span className={`block font-medium ${isActive ? 'text-sky-ink' : 'text-ink'}`}>{item.label}</span>
                    <span className="mt-0.5 block text-sm text-ink-3">{item.description}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
