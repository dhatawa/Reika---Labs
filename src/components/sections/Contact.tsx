import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '../ui/Gauge'
import { useSite } from '../../content/site'

export function Contact() {
  const { contact, ui } = useSite()
  const rows = [
    { term: 'WhatsApp', value: contact.whatsapp.display, href: contact.whatsapp.href },
    { term: 'Instagram', value: contact.instagram.display, href: contact.instagram.href },
  ]
  return (
    <section id="contact" aria-labelledby="contact-title" className="hairline border-t bg-paper text-ink">
      <div className="container-x py-24 md:py-32">
        <SectionLabel label={contact.label} />

        <h2 id="contact-title" className="mt-8">
          {/* The headline is the call to action */}
          <a
            href={contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-start gap-3 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.015em] text-ink transition-colors duration-150 hover:text-sky-ink"
          >
            {contact.title}
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.25}
              className="mt-[0.1em] h-[0.45em] w-[0.45em] shrink-0 text-sky-ink transition-transform duration-150 ease-[var(--ease-water)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only">{ui.opensWhatsapp}</span>
          </a>
        </h2>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-8">
          <p className="max-w-md text-lg leading-relaxed text-ink-2 lg:col-span-5">{contact.description}</p>

          <dl className="hairline border-t lg:col-span-6 lg:col-start-7">
            {rows.map((r) => (
              <div key={r.term} className="hairline border-b">
                <dt className="sr-only">{r.term}</dt>
                <dd>
                  {r.href ? (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-20 items-center gap-6 transition-colors duration-150 hover:text-sky-ink"
                    >
                      <span className="w-28 shrink-0 text-sm text-ink-3">{r.term}</span>
                      <span className="flex-1 text-lg tabular-nums md:text-xl">{r.value}</span>
                      <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-[18px] w-[18px] text-ink-3 group-hover:text-sky-ink" />
                    </a>
                  ) : (
                    <div className="flex h-20 items-center gap-6 text-ink-3">
                      <span className="w-28 shrink-0 text-sm">{r.term}</span>
                      <span className="flex-1 text-lg md:text-xl">{r.value}</span>
                    </div>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
