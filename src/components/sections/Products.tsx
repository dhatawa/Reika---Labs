import { useCallback, useState } from 'react'
import { SectionLabel } from '../ui/Gauge'
import { Button } from '../ui/Button'
import { SmartGateIllustration } from '../products/SmartGateIllustration'
import { ProjectModal } from '../products/ProjectModal'
import { useSite } from '../../content/site'

export function Products() {
  const { products, smartGate, ui } = useSite()
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <section id="products" aria-labelledby="products-title" className="bg-paper text-ink">
      <div className="container-x py-24 md:py-32">
        <SectionLabel label={products.label} />

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h1
            id="products-title"
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.01em] lg:col-span-7"
          >
            {products.title}
          </h1>
          <p className="max-w-md leading-relaxed text-ink-2 lg:col-span-4 lg:col-start-9">{products.description}</p>
        </div>

        {/* ── Featured project ─────────────────────────────── */}
        <article
          aria-labelledby="sg-title"
          className="hairline mt-16 grid gap-2 rounded-[20px] border bg-surface p-2 md:mt-20 lg:grid-cols-12"
        >
          <figure className="flex flex-col rounded-xl bg-night-2 p-4 sm:p-8 lg:col-span-7">
            <div className="flex flex-1 items-center">
              <SmartGateIllustration className="h-auto w-full" />
            </div>
            <figcaption className="mt-4 text-sm text-mist-3">
              {ui.diagramCaption}
            </figcaption>
          </figure>

          <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <p className="flex items-center gap-2 text-sm font-medium text-ink-2">
              <span className="h-2 w-2 rounded-full bg-sky" aria-hidden="true" />
              {smartGate.status}
            </p>

            <h3 id="sg-title" className="mt-6 font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-none">
              {smartGate.name}
            </h3>
            <p className="mt-4 text-sm text-ink-3">{smartGate.categories.join(' · ')}</p>
            <p className="mt-6 text-xl leading-snug text-ink">{smartGate.tagline}</p>
            <p className="mt-4 leading-relaxed text-ink-2">{smartGate.description}</p>

            <h4 className="mt-8 text-sm font-medium text-ink-3">{smartGate.featuresTitle}</h4>
            <ul className="hairline mt-3 grid border-t sm:grid-cols-2 sm:gap-x-6">
              {smartGate.features.map((f, i) => (
                <li key={f} className="hairline flex items-baseline gap-3 border-b py-3 text-[0.9375rem] text-ink">
                  <span className="w-5 shrink-0 font-mono text-xs tabular-nums text-ink-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-3">{smartGate.scopeNote}</p>

            <div className="mt-auto pt-10">
              <Button tone="primary" onClick={() => setOpen(true)} aria-haspopup="dialog">
                {ui.exploreProject}
              </Button>
            </div>
          </div>
        </article>
      </div>

      <ProjectModal open={open} onClose={close} />
    </section>
  )
}
