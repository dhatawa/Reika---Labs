import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import { useSite } from '../../content/site'

type Props = { open: boolean; onClose: () => void }

export function ProjectModal({ open, onClose }: Props) {
  const { contact, smartGate, ui } = useSite()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbar}px`
    requestAnimationFrame(() => closeRef.current?.focus())

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      // Keep focus inside the dialog
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60]" role="presentation">
          <motion.div
            className="absolute inset-0 bg-night/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sg-modal-title"
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[44rem] flex-col overflow-y-auto overscroll-contain bg-paper text-ink shadow-[0_0_40px_rgb(7_17_28/0.25)]"
          >
            <div className="hairline sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-paper/95 px-6 backdrop-blur md:px-10">
              <p className="flex items-center gap-2 text-sm font-medium text-ink-2">
                <span className="h-2 w-2 rounded-full bg-sky" aria-hidden="true" />
                {smartGate.status}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="-mr-2 grid h-10 w-10 place-items-center rounded-[10px] transition-colors duration-150 hover:bg-ink/5"
                aria-label={ui.closeProject}
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="px-6 pb-16 pt-10 md:px-10 md:pt-12">
              <p className="text-sm text-ink-3">{smartGate.categories.join(' · ')}</p>
              <h2 id="sg-modal-title" className="mt-4 font-display text-[clamp(2.5rem,6vw,4rem)] leading-none">
                {smartGate.name}
              </h2>
              <p className="mt-4 max-w-lg text-xl leading-snug text-ink-2">{smartGate.tagline}</p>

              <div className="mt-12 space-y-10">
                {smartGate.detail.map((block) => (
                  <section key={block.title} className="hairline grid gap-3 border-t pt-6 md:grid-cols-[10rem_1fr] md:gap-8">
                    <h3 className="font-medium text-ink">{block.title}</h3>
                    <div className="space-y-4">
                      {block.body.map((para) => (
                        <p key={para.slice(0, 24)} className="leading-relaxed text-ink-2">
                          {para}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}

                {smartGate.recognition ? (
                  <section className="hairline grid gap-3 border-t pt-6 md:grid-cols-[10rem_1fr] md:gap-8">
                    <h3 className="font-medium text-ink">{ui.recognition}</h3>
                    <p className="leading-relaxed text-ink-2">{smartGate.recognition}</p>
                  </section>
                ) : null}
              </div>

              <div className="hairline mt-12 rounded-2xl border bg-surface p-8">
                <p className="font-display text-2xl leading-tight">{ui.interestedTitle}</p>
                <p className="mt-3 max-w-md leading-relaxed text-ink-2">
                  {ui.interestedText}
                </p>
                <ButtonLink href={contact.whatsapp.href} tone="primary" className="mt-6">
                  {contact.title}
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
