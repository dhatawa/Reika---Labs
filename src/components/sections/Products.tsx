import { useCallback, useState } from 'react'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'
import { WaveEdge } from '../ui/WaveEdge'
import { SmartGateIllustration } from '../products/SmartGateIllustration'
import { ProjectModal } from '../products/ProjectModal'
import { products, smartGate } from '../../content/site'

export function Products() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <section id="products" aria-labelledby="products-title" className="relative bg-foam text-ink">
      <div className="container-x pb-28 pt-20 md:pb-40 md:pt-28">
        <Reveal>
          <SectionLabel index={products.index} label={products.label} className="text-ink/55" />
        </Reveal>

        <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end lg:gap-6">
          <Reveal className="lg:col-span-7">
            <h2
              id="products-title"
              className="font-display text-[clamp(2.6rem,6vw,5.75rem)] leading-[0.96] tracking-[-0.015em]"
            >
              {products.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1.0625rem] leading-relaxed text-ink/65">{products.description}</p>
          </Reveal>
        </div>

        {/* ── Featured project ─────────────────────────────── */}
        <article
          aria-labelledby="sg-title"
          className="mt-16 grid overflow-hidden rounded-[3px] bg-abyss text-foam md:mt-24 lg:grid-cols-12"
        >
          <Reveal className="relative border-b border-foam/10 p-4 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
            <figure>
              <SmartGateIllustration className="h-auto w-full" />
              <figcaption className="label mt-4 leading-relaxed text-foam/45 sm:mt-2">
                Fig. 01 — Conceptual system diagram · illustrative, not live data
              </figcaption>
            </figure>
          </Reveal>

          <div className="flex flex-col p-7 sm:p-10 lg:col-span-5 lg:p-12">
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="label inline-flex items-center gap-2 rounded-full bg-foam/[0.06] px-3 py-1.5 text-cyan ring-1 ring-inset ring-cyan/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
                  {smartGate.status}
                </span>
                <span className="label text-foam/40">Featured · P—01</span>
              </div>

              <h3 id="sg-title" className="mt-8 font-display text-[clamp(2.5rem,4.5vw,3.75rem)] uppercase leading-none tracking-[0.04em]">
                {smartGate.name}
              </h3>
              <p className="label mt-4 leading-relaxed text-foam/45">{smartGate.categories.join(' / ')}</p>
              <p className="mt-7 text-xl leading-snug tracking-tight text-cyan">{smartGate.tagline}</p>
              <p className="mt-4 text-[0.975rem] leading-relaxed text-foam/70">{smartGate.description}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-9">
              <h4 className="label text-foam/45">Proposed capabilities</h4>
              <ul className="mt-4 grid border-t border-foam/10 sm:grid-cols-2 sm:gap-x-6">
                {smartGate.features.map((f, i) => (
                  <li key={f} className="flex items-baseline gap-3 border-b border-foam/10 py-3 text-[0.925rem] text-foam/85">
                    <span className="label text-foam/35">{String(i + 1).padStart(2, '0')}</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.8125rem] leading-relaxed text-foam/45">{smartGate.scopeNote}</p>
            </Reveal>

            <Reveal delay={0.15} className="mt-auto pt-10">
              <Button tone="light" onClick={() => setOpen(true)} aria-haspopup="dialog">
                Explore Project
              </Button>
            </Reveal>
          </div>
        </article>
      </div>

      <WaveEdge fill="var(--color-midnight)" />
      <ProjectModal open={open} onClose={close} />
    </section>
  )
}
