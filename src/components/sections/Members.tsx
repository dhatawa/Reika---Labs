import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'
import { MemberPortrait } from '../members/MemberPortrait'
import { WaveEdge } from '../ui/WaveEdge'
import { members } from '../../content/site'

export function Members() {
  return (
    <section id="members" aria-labelledby="members-title" className="relative overflow-hidden bg-abyss text-foam">
      {/* Faint light from the surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_15%_0%,rgb(47_182_201/0.12),transparent_70%)]"
      />
      <div className="container-x relative pb-28 pt-24 md:pb-40 md:pt-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <SectionLabel index={members.index} label={members.label} className="text-foam/55" />
              </Reveal>
              <Reveal delay={0.05}>
                <h2
                  id="members-title"
                  className="mt-10 font-display text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.015em]"
                >
                  {members.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xs text-lg leading-snug text-foam/65">{members.description}</p>
              </Reveal>
            </div>
          </div>

          <div className="grid gap-16 sm:grid-cols-2 sm:gap-8 lg:col-span-7 lg:col-start-6 lg:gap-10">
            {members.people.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.12} className={i % 2 === 1 ? 'sm:mt-28' : ''}>
                <MemberPortrait member={m} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <WaveEdge fill="var(--color-foam)" />
    </section>
  )
}
