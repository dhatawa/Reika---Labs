import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { WaveEdge } from '../ui/WaveEdge'
import { about, site } from '../../content/site'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-paper text-ink">
      <div className="container-x pb-24 pt-20 md:pb-36 md:pt-28">
        <Reveal>
          <SectionLabel index={about.index} label={about.label} className="text-ink/55" />
        </Reveal>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-5">
            <h2 id="about-title" className="font-display text-[clamp(2.75rem,6.4vw,6rem)] leading-[0.95] tracking-[-0.015em]">
              {about.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-3">
            <p className="text-[1.375rem] leading-snug tracking-tight text-ink md:text-[1.625rem]">{about.lead}</p>
            {about.body.map((para) => (
              <p key={para.slice(0, 24)} className="mt-6 max-w-xl text-[1rem] leading-relaxed text-ink/65">
                {para}
              </p>
            ))}
          </Reveal>
        </div>

        {/* ── The five pillars, spelled as the name itself ── */}
        <div className="mt-24 md:mt-36">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/15 pb-5">
            <h3 className="label text-ink/55">Philosophy — five words, one name</h3>
            <p className="label hidden text-ink/40 md:block">{site.acronym}</p>
          </Reveal>

          <ol className="grid md:grid-cols-5">
            {about.pillars.map((p, i) => (
              <li
                key={p.word}
                className="group relative grid grid-cols-[6.25rem_1fr] items-end gap-x-5 sm:grid-cols-[8rem_1fr] border-b border-ink/15 py-7 md:block md:border-b-0 md:border-r md:py-0 md:pr-6 md:pt-6 md:last:border-r-0 md:[&:not(:first-child)]:pl-6"
              >
                <Reveal delay={i * 0.07}>
                  <span
                    aria-hidden="true"
                    className="water-letter block font-display text-[clamp(5.5rem,14vw,13rem)] leading-[0.8] md:-ml-1"
                  >
                    {p.letter}
                  </span>
                </Reveal>
                <Reveal delay={0.1 + i * 0.07} className="pb-1 md:mt-10">
                  <div className="label text-ink/40">0{i + 1}</div>
                  <h4 className="mt-2 text-xl font-semibold tracking-tight md:text-[1.35rem]">{p.word}</h4>
                  <p className="mt-2 max-w-[22ch] text-[0.95rem] leading-relaxed text-ink/60">{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <WaveEdge fill="var(--color-abyss)" />
    </section>
  )
}
