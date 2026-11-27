import { useCallback, useState } from 'react'
import { SectionLabel } from '../ui/Gauge'
import { Button, ButtonLink } from '../ui/Button'
import { SmartGateIllustration } from '../products/SmartGateIllustration'
import { ProjectModal } from '../products/ProjectModal'
import { useSite } from '../../content/site'

export function Products() {
  const { products, smartGate, reBoats, ui } = useSite()
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

        {/* ── Draft prototype ──────────────────────────────── */}
        <article
          aria-labelledby="re-boats-title"
          className="hairline mt-6 grid gap-2 rounded-[20px] border bg-surface p-2 lg:grid-cols-12"
        >
          <figure className="relative min-h-72 overflow-hidden rounded-xl bg-night-2 p-8 lg:col-span-7">
            <div className="absolute inset-0 opacity-70" aria-hidden="true"
              style={{
                background:
                  'radial-gradient(circle at 68% 40%, rgba(0,183,249,.22), transparent 28%), linear-gradient(135deg, #0d1b2a 0%, #07111c 100%)',
              }}
            />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-mist-2">
                <span className="h-2 w-2 rounded-full bg-sky" aria-hidden="true" />
                RE-01-A
              </div>
              <div className="mt-16">
                <svg viewBox="0 0 420 180" className="h-auto w-full" role="img" aria-label="Concept illustration of a twin-hull autonomous boat">
                  <g fill="none" stroke="rgba(201,212,222,.9)" strokeWidth="2">
                    <path d="M70 118 C95 72 150 54 210 54 C270 54 325 72 350 118 L310 142 L110 142 Z" />
                    <path d="M110 142 C82 154 58 154 35 142 C50 122 82 112 110 118 Z" />
                    <path d="M310 142 C338 154 362 154 385 142 C370 122 338 112 310 118 Z" />
                    <path d="M150 54 L140 24 L280 24 L270 54" />
                    <path d="M210 24 L210 4" />
                    <rect x="192" y="2" width="36" height="22" rx="3" />
                  </g>
                  <g fill="rgba(0,183,249,.18)" stroke="#00b7f9" strokeWidth="2">
                    <rect x="135" y="58" width="150" height="62" rx="8" />
                    <path d="M184 58 L210 38 L236 58 Z" fill="rgba(0,183,249,.12)" />
                  </g>
                  <path d="M35 160 C95 150 135 170 195 160 C255 150 325 170 385 158" fill="none" stroke="#00b7f9" strokeWidth="2" opacity=".6" />
                </svg>
              </div>
            </div>
          </figure>

          <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <p className="flex items-center gap-2 text-sm font-medium text-ink-2">
              <span className="h-2 w-2 rounded-full bg-sky" aria-hidden="true" />
              {reBoats.status}
            </p>
            <h3 id="re-boats-title" className="mt-6 font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-none">
              {reBoats.name}
            </h3>
            <p className="mt-4 text-sm text-ink-3">{reBoats.categories.join(' · ')}</p>
            <p className="mt-6 text-xl leading-snug text-ink">{reBoats.tagline}</p>
            <p className="mt-4 leading-relaxed text-ink-2">{reBoats.description}</p>

            <h4 className="mt-8 text-sm font-medium text-ink-3">{reBoats.featuresTitle}</h4>
            <ul className="hairline mt-3 grid border-t sm:grid-cols-2 sm:gap-x-6">
              {reBoats.features.map((feature, i) => (
                <li key={feature} className="hairline flex items-baseline gap-3 border-b py-3 text-[0.9375rem] text-ink">
                  <span className="w-5 shrink-0 font-mono text-xs tabular-nums text-ink-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-3">{reBoats.scopeNote}</p>

            <div className="mt-auto pt-10">
              <ButtonLink href={reBoats.visualHref} tone="primary" icon>
                {reBoats.visualLabel}
              </ButtonLink>
            </div>
          </div>
        </article>
      </div>

      <ProjectModal open={open} onClose={close} />
    </section>
  )
}
