import { useEffect, useId, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import type { NavGroup } from '../../content/site'

type Props = {
  group: NavGroup
  open: boolean
  active: boolean
  dark: boolean
  onToggle: () => void
  onClose: () => void
}

/**
 * Panels are positioned against the nav list (its parent <ul> is `relative`),
 * so they always stay inside the viewport.
 *
 * Click-to-open dropdown with a two-column panel. Every item is a route.
 * Keyboard: Enter/Space toggles, ArrowDown opens and focuses the first item,
 * ArrowUp/ArrowDown move between items, Home/End jump, Escape closes and
 * returns focus to the trigger. Tabbing out or clicking outside also closes.
 */
export function NavDropdown({ group, open, active, dark, onToggle, onClose }: Props) {
  const rootRef = useRef<HTMLLIElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  const items = () => Array.from(rootRef.current?.querySelectorAll<HTMLAnchorElement>('[data-menu-item]') ?? [])

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) onClose()
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [open, onClose])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const list = items()
    const index = list.indexOf(document.activeElement as HTMLAnchorElement)
    switch (e.key) {
      case 'Escape':
        if (open) {
          e.preventDefault()
          onClose()
          buttonRef.current?.focus()
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!open) {
          onToggle()
          requestAnimationFrame(() => items()[0]?.focus())
        } else list[(index + 1) % list.length]?.focus()
        break
      case 'ArrowUp':
        if (!open) return
        e.preventDefault()
        list[index <= 0 ? list.length - 1 : index - 1]?.focus()
        break
      case 'Home':
        if (!open) return
        e.preventDefault()
        list[0]?.focus()
        break
      case 'End':
        if (!open) return
        e.preventDefault()
        list[list.length - 1]?.focus()
        break
    }
  }

  const onBlur = (e: React.FocusEvent) => {
    if (open && !rootRef.current?.contains(e.relatedTarget as Node)) onClose()
  }

  const tone = active || open ? (dark ? 'text-mist' : 'text-ink') : dark ? 'text-mist-3 hover:text-mist' : 'text-ink-3 hover:text-ink'

  return (
    <li ref={rootRef} onKeyDown={onKeyDown} onBlur={onBlur}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={`relative flex items-center gap-1 rounded-lg px-3 py-2 text-[0.9375rem] transition-colors duration-150 ${tone}`}
      >
        {group.label}
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className={`h-4 w-4 transition-transform duration-200 ease-[var(--ease-water)] ${open ? 'rotate-180' : ''}`}
        />
        {active ? <ActiveBar /> : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+12px)] z-50 grid w-[40rem] max-w-[calc(100vw-2rem)] grid-cols-[13rem_1fr] overflow-hidden rounded-2xl border border-ink/10 bg-surface text-ink shadow-[0_12px_32px_rgb(7_17_28/0.12)]"
          >
            <div className="bg-paper p-6">
              <p className="font-display text-2xl leading-tight">{group.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{group.description}</p>
            </div>
            <ul className="p-2">
              {group.items.map((item) => (
                <li key={item.id}>
                  <NavLink
                    data-menu-item
                    to={item.to}
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group block rounded-[10px] px-4 py-3 transition-colors duration-150 hover:bg-paper focus-visible:bg-paper ${
                        isActive ? 'bg-paper' : ''
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`flex items-center gap-2 text-[0.9375rem] font-medium group-hover:text-sky-ink ${
                            isActive ? 'text-sky-ink' : 'text-ink'
                          }`}
                        >
                          {isActive ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sky" /> : null}
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-sm text-ink-3">{item.description}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  )
}

/** Active page indicator: a short accent line under the nav item. */
export function ActiveBar() {
  return <span aria-hidden="true" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-sky" />
}
