import { useState } from 'react'
import { SectionLabel } from '../ui/Gauge'
import { Reveal } from '../ui/Reveal'
import { LogoVector } from '../brand/LogoVector'
import { useSite, type LogoSegment } from '../../content/site'

export function LogoPhilosophy() {
  const { logoPhilosophy: lp, ui } = useSite()
  const [pinned, setPinned] = useState<LogoSegment | null>(null)
  const [hovered, setHovered] = useState<LogoSegment | null>(null)
  const highlight = hovered ?? pinned

  return (
    <section id="logo" aria-labelledby="logo-title" className="bg-night text-mist">
      <div className="container-x py-24 md:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="mx-auto w-full max-w-[22rem] lg:max-w-[26rem]">
              <LogoVector
                className="h-auto w-full"
                highlight={highlight}
                title={ui.logoTitle}
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <SectionLabel label={lp.label} tone="dark" />
              <h1 id="logo-title" className="mt-8 font-display text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.02] tracking-[-0.01em]">
                {lp.title}
              </h1>
            </Reveal>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist-2">{lp.intro}</p>

            <dl className="hairline-dark mt-10 border-t">
              {lp.official.map((o) => (
                <div key={o.term} className="hairline-dark grid grid-cols-[8rem_1fr] gap-4 border-b py-4">
                  <dt className="flex items-center gap-2 font-medium text-mist">
                    {o.swatch ? (
                      <span aria-hidden="true" className="h-3 w-3 rounded-full" style={{ background: o.swatch }} />
                    ) : null}
                    {o.term}
                  </dt>
                  <dd className="leading-relaxed text-mist-2">{o.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* The five folds — a proposed reading, clearly labelled as such */}
        <div className="mt-20 md:mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="text-lg font-medium text-mist">{lp.readingTitle}</h3>
            {!lp.readingConfirmed ? <p className="text-sm text-mist-3">{lp.readingNote}</p> : null}
          </div>
          <p className="mt-2 text-sm text-mist-3">{ui.selectFold}</p>

          <ul className="hairline-dark mt-6 grid border-t sm:grid-cols-2 lg:grid-cols-5">
            {lp.reading.map((r) => {
              const isOn = highlight === r.segment
              return (
                <li key={r.segment} className="hairline-dark border-b lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
                  <button
                    type="button"
                    aria-pressed={pinned === r.segment}
                    onClick={() => setPinned((p) => (p === r.segment ? null : r.segment))}
                    onMouseEnter={() => setHovered(r.segment)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(r.segment)}
                    onBlur={() => setHovered(null)}
                    className={`flex h-full w-full flex-col items-start justify-start py-6 text-left transition-colors duration-150 ${
                      isOn ? 'text-mist' : 'text-mist-2 hover:text-mist'
                    }`}
                  >
                    <span className={`block h-0.5 w-8 rounded-full transition-colors duration-150 ${isOn ? 'bg-sky' : 'bg-mist/20'}`} />
                    <span className="mt-4 block font-display text-2xl">{r.value}</span>
                    <span className="mt-2 block leading-relaxed text-mist-3">{r.text}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
