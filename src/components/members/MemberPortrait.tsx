import { useState } from 'react'
import { fmt, useSite, type Member } from '../../content/site'

/** Show the "which file to replace" hint only while developing locally. */
const SHOW_PHOTO_HINT = import.meta.env.DEV

export function MemberPortrait({ member }: { member: Member }) {
  const { ui } = useSite()
  const [failed, setFailed] = useState(false)
  const src = `${import.meta.env.BASE_URL}${member.photo}`

  return (
    <figure>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e3eaee]">
        {!failed ? (
          <img
            src={src}
            alt={fmt(ui.portraitAlt, { name: member.name, role: member.role })}
            loading="lazy"
            decoding="async"
            width={1000}
            height={1250}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={fmt(ui.photoSoon, { name: member.name })}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <span className="font-display text-6xl text-ink-3">{member.initials}</span>
            {SHOW_PHOTO_HINT ? (
              <span className="px-4 text-center font-mono text-xs text-ink-3">public/{member.photo}</span>
            ) : null}
          </div>
        )}
      </div>

      <figcaption className="mt-6">
        <p className="text-sm font-medium text-sky-ink">{member.role}</p>
        <h3 className="mt-2 font-display text-[2rem] leading-[1.1] text-ink">{member.name}</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-ink-2">{member.description}</p>
      </figcaption>
    </figure>
  )
}
