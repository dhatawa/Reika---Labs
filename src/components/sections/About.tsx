import { SectionLabel } from '../ui/Gauge'
import { Reveal } from '../ui/Reveal'
import { fmt, useSite } from '../../content/site'

/** Water level of each letter, rising from Research to Action. */
const LEVELS = ['22%', '40%', '58%', '76%', '100%']

export function About() {
  const { about } = useSite()
  return (
    <section id="about" aria-labelledby="about-title" className="bg-paper text-ink">
      <div className="container-x py-24 md:py-32">
        <Reveal>
          <SectionLabel label={about.label} />
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <h1 id="about-title" className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.01em]">
              {about.title}
            </h1>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
            <p className="text-[1.375rem] leading-snug text-ink md:text-2xl">{about.lead}</p>
            {about.body.map((para) => (
              <p key={para.slice(0, 24)} className="mt-6 max-w-xl leading-relaxed text-ink-2">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Meaning() {
  const { about, site, ui } = useSite()
  return (
    <section id="meaning" aria-labelledby="meaning-title" className="bg-paper text-ink">
      <div className="container-x py-24 md:py-32">
        <Reveal>
          <SectionLabel label={ui.meaningLabel} />
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <h1 id="meaning-title" className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.01em]">
              {about.pillarsTitle}
            </h1>
            <p className="max-w-sm text-ink-2">{fmt(ui.acronymNote, { acronym: site.acronym })}</p>
          </div>
        </Reveal>

        <ol className="hairline mt-12 grid border-t md:grid-cols-5">
          {about.pillars.map((p, i) => (
            <li
              key={p.word}
              className="hairline grid grid-cols-[6rem_1fr] items-end gap-x-6 border-b py-6 sm:grid-cols-[8rem_1fr] md:block md:border-b-0 md:border-r md:py-0 md:pr-6 md:pt-8 md:last:border-r-0 md:[&:not(:first-child)]:pl-6"
            >
              <span
                aria-hidden="true"
                style={{ ['--level' as string]: LEVELS[i] }}
                className="level-letter block font-display text-[clamp(5rem,12vw,11rem)] leading-[0.8]"
              >
                {p.letter}
              </span>
              <div className="pb-1 md:mt-8">
                <h3 className="text-lg font-semibold text-ink">{p.word}</h3>
                <p className="mt-2 max-w-[24ch] leading-relaxed text-ink-2">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
