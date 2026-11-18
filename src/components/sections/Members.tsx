import { SectionLabel } from '../ui/Gauge'
import { MemberPortrait } from '../members/MemberPortrait'
import { useSite } from '../../content/site'

export function Members() {
  const { members } = useSite()
  return (
    <section id="members" aria-labelledby="members-title" className="bg-paper text-ink">
      <div className="container-x py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionLabel label={members.label} />
              <h1
                id="members-title"
                className="mt-8 font-display text-[clamp(2.5rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.01em]"
              >
                {members.title}
              </h1>
              <p className="mt-6 max-w-xs text-lg leading-snug text-ink-2">{members.description}</p>
            </div>
          </div>

          <div className="grid gap-16 sm:grid-cols-2 sm:gap-8 lg:col-span-7 lg:col-start-6">
            {members.people.map((m) => (
              <MemberPortrait key={m.name} member={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
