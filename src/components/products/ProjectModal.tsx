import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import { contact, smartGate } from '../../content/site'

type Props = { open: boolean; onClose: () => void }

export function ProjectModal({ open, onClose }: Props) {
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
            className="absolute inset-0 bg-midnight/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sg-modal-title"
            initial={reduced ? { opacity: 0 } : { x: '100%' }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[44rem] flex-col overflow-y-auto overscroll-contain bg-foam text-ink shadow-[0_0_80px_rgb(6_13_28/0.5)]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-foam/90 px-6 py-4 backdrop-blur md:px-10">
              <span className="label inline-flex items-center gap-2 text-ocean-2">
                <span className="h-1.5 w-1.5 rounded-full bg-aqua" aria-hidden="true" />
                {smartGate.status}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="-mr-2 grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/5"
                aria-label="Close project details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 pb-16 pt-10 md:px-10 md:pt-14">
              <p className="label text-ink/50">{smartGate.categories.join(' / ')}</p>
              <h2 id="sg-modal-title" className="mt-5 font-display text-[clamp(2.75rem,7vw,4.5rem)] leading-[0.95] tracking-[-0.015em]">
                {smartGate.name}
              </h2>
              <p className="mt-5 max-w-lg text-xl leading-snug tracking-tight text-ocean-2">{smartGate.tagline}</p>

              <div className="mt-14 space-y-12">
                {smartGate.detail.map((block, i) => (
                  <section key={block.title} className="grid gap-4 border-t border-ink/12 pt-6 md:grid-cols-[9rem_1fr] md:gap-8">
                    <h3 className="label pt-1 text-ink/55">
                      0{i + 1} · {block.title}
                    </h3>
                    <div className="space-y-4">
                      {block.body.map((para) => (
                        <p key={para.slice(0, 24)} className="text-[1.0625rem] leading-relaxed text-ink/80">
                          {para}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}

                {smartGate.recognition ? (
                  <section className="grid gap-4 border-t border-ink/12 pt-6 md:grid-cols-[9rem_1fr] md:gap-8">
                    <h3 className="label pt-1 text-ink/55">Recognition</h3>
                    <p className="text-[1.0625rem] leading-relaxed text-ink/80">{smartGate.recognition}</p>
                  </section>
                ) : null}
              </div>

              <div className="mt-16 rounded-[3px] bg-ink p-8 text-foam md:p-10">
                <p className="font-display text-2xl leading-tight md:text-3xl">Interested in this research?</p>
                <p className="mt-3 max-w-md text-foam/65">
                  We are open to mentors, partners, and communities who want to explore Smart Gate with us.
                </p>
                <ButtonLink href={contact.whatsapp.href} tone="light" className="mt-7">
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
