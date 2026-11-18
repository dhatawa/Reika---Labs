import { SectionLabel } from '../ui/Gauge'
import { Reveal } from '../ui/Reveal'
import { useSite } from '../../content/site'

export function VisionMission() {
  const { visionMission: vm, ui } = useSite()
  return (
    <section id="vision" aria-labelledby="vision-title" className="bg-paper text-ink">
      <div className="container-x py-24 md:py-32">
        <Reveal>
          <SectionLabel label={vm.label} />
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-ink-3">{ui.vision}</p>
            <h1 id="vision-title" className="mt-3 font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.01em]">
              {vm.vision}
            </h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm font-medium text-ink-3">{ui.mission}</p>
            <ol className="mt-3">
              {vm.mission.map((m, i) => (
                <li key={m} className="hairline flex gap-4 border-b py-4 first:border-t">
                  <span className="w-5 shrink-0 pt-0.5 font-mono text-xs tabular-nums text-ink-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-relaxed text-ink">{m}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <p className="text-sm font-medium text-ink-3">{ui.principles}</p>
          <dl className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-3">
            {vm.principles.map((p) => (
              <div key={p.term} className="bg-surface p-6">
                <dt className="font-medium text-ink">{p.term}</dt>
                <dd className="mt-2 leading-relaxed text-ink-2">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export function Approach() {
  const { approach } = useSite()
  return (
    <section id="approach" aria-labelledby="approach-title" className="bg-paper text-ink">
      <div className="container-x py-24 md:py-32">
        <Reveal>
          <SectionLabel label={approach.label} />
          <h1 id="approach-title" className="mt-8 max-w-3xl font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.01em]">
            {approach.title}
          </h1>
        </Reveal>

        {/* A waterline runs through the steps; each step is a reading on it */}
        <ol className="relative mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-sky-ink/30 md:block" />
          {approach.steps.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 md:block">
              <span
                aria-hidden="true"
                className="relative z-10 mt-1 block h-[15px] w-[15px] rounded-full border-2 border-sky-ink bg-paper md:mt-0"
              />
              <div className="md:mt-6">
                <p className="font-mono text-xs tabular-nums text-ink-3">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
