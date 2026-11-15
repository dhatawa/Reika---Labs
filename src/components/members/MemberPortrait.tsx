import { useState } from 'react'
import type { Member } from '../../content/site'

/** Show the "which file to replace" hint only while developing locally. */
const SHOW_PHOTO_HINT = import.meta.env.DEV

type Props = { member: Member; index: number }

export function MemberPortrait({ member, index }: Props) {
  const [failed, setFailed] = useState(false)
  const src = `${import.meta.env.BASE_URL}${member.photo}`

  return (
    <figure className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-ocean">
        {!failed ? (
          <img
            src={src}
            alt={`Portrait of ${member.name}, ${member.role} at Reika Labs`}
            loading="lazy"
            decoding="async"
            width={1000}
            height={1250}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-water)] group-hover:scale-[1.04]"
          />
        ) : (
          <Placeholder member={member} />
        )}

        {/* Waterline sheen on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full translate-y-full bg-[linear-gradient(180deg,transparent,rgb(138_231_242/0.10)_40%,rgb(47_182_201/0.18))] transition-transform duration-[1.2s] ease-[var(--ease-water)] group-hover:translate-y-[45%]"
        />
        {/* Soft depth at the base so photos with different backgrounds sit together */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgb(10_23_48/0.28))]"
        />
        <span className="label absolute left-3 top-3 rounded-full bg-midnight/55 px-2.5 py-1 text-foam/85 backdrop-blur-sm">
          M—0{index + 1}
        </span>
      </div>

      <figcaption className="mt-6">
        <p className="label text-cyan">{member.role}</p>
        <h3 className="mt-3 font-display text-[1.9rem] leading-[1.05] tracking-[-0.01em] text-foam md:text-[2.2rem]">
          {member.name}
        </h3>
        <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-foam/60">{member.description}</p>
      </figcaption>
    </figure>
  )
}

function Placeholder({ member }: { member: Member }) {
  return (
    <div
      role="img"
      aria-label={`Photo of ${member.name} coming soon`}
      className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(120%_80%_at_50%_0%,#12507e_0%,#0c2f55_45%,#0a1730_100%)]"
    >
      <svg aria-hidden="true" viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" fill="none">
        {[60, 110, 165, 225, 290].map((r, i) => (
          <ellipse
            key={r}
            cx="200"
            cy="250"
            rx={r}
            ry={r * 0.36}
            stroke="#8ae7f2"
            strokeOpacity={0.22 - i * 0.035}
            strokeWidth="1"
          />
        ))}
      </svg>
      <span className="relative font-display text-[clamp(4rem,9vw,6.5rem)] tracking-[0.06em] text-foam/85">
        {member.initials}
      </span>
      {SHOW_PHOTO_HINT ? (
        <span className="label absolute inset-x-4 bottom-4 text-center normal-case tracking-[0.06em] text-cyan/80">
          Add photo → public/{member.photo}
        </span>
      ) : null}
    </div>
  )
}
