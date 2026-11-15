import { ArrowUpRight } from 'lucide-react'
import { WaterCanvas } from '../water/WaterCanvas'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { contact } from '../../content/site'

export function Contact() {
  const ig = contact.instagram
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-midnight text-foam">
      <div className="absolute inset-0 -z-10">
        <WaterCanvas variant="calm" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(6_13_28/0.9)_0%,rgb(6_13_28/0.35)_45%,rgb(6_13_28/0.9)_100%)]" />
      </div>

      <div className="container-x pb-24 pt-32 md:pb-32 md:pt-44">
        <Reveal>
          <SectionLabel index={contact.index} label={contact.label} className="text-foam/55" />
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <h2 id="contact-title" className="sr-only">
            {contact.title}
          </h2>
          {/* The headline IS the call to action */}
          <a
            href={contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-start gap-3 font-display text-[clamp(3rem,10vw,9.5rem)] leading-[0.92] tracking-[-0.02em] text-foam"
          >
            <span className="relative">
              {contact.title}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-[0.18] bg-cyan transition-transform duration-700 ease-[var(--ease-water)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="mt-[0.12em] h-[0.5em] w-[0.5em] shrink-0 text-cyan transition-transform duration-500 ease-[var(--ease-water)] group-hover:-translate-y-1 group-hover:translate-x-1"
              strokeWidth={1.25}
            />
            <span className="sr-only">(opens WhatsApp)</span>
          </a>
        </Reveal>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-6">
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-md text-lg leading-snug text-foam/75 md:text-xl">{contact.description}</p>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <dl className="border-t border-foam/15">
              <ContactRow term="WhatsApp" value={contact.whatsapp.display} href={contact.whatsapp.href} />
              <ContactRow term="Instagram" value={ig.display} href={ig.href} pendingNote="Link coming soon" />
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  term,
  value,
  href,
  pendingNote,
}: {
  term: string
  value: string
  href: string | null
  pendingNote?: string
}) {
  return (
    <div className="border-b border-foam/15">
      <dt className="sr-only">{term}</dt>
      <dd>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-6 py-6 transition-colors hover:text-cyan"
          >
            <span className="label w-28 shrink-0 text-foam/45">{term}</span>
            <span className="flex-1 text-lg tracking-tight md:text-xl">{value}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 text-foam/50 transition-transform duration-500 ease-[var(--ease-water)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan"
            />
          </a>
        ) : (
          <div className="flex items-center justify-between gap-6 py-6 text-foam/55">
            <span className="label w-28 shrink-0 text-foam/45">{term}</span>
            <span className="flex-1 text-lg tracking-tight md:text-xl">{value}</span>
            <span className="label text-foam/35">{pendingNote}</span>
          </div>
        )}
      </dd>
    </div>
  )
}
