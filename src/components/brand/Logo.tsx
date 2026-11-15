type LogoMarkProps = { className?: string; title?: string }

/**
 * Reika Labs mark — a single drop meeting the water surface:
 * the idea (center) and the ripples it sends outward (impact).
 * The open gaps keep the rings in motion even when static.
 *
 * Ingin pakai logo resmi? Ganti isi <svg> di bawah, atau ganti file
 * public/brand/reika-mark.svg lalu render <img src="brand/reika-mark.svg" />.
 */
export function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="20" cy="20" r="3.6" fill="currentColor" />
      <path
        d="M29.36 18.35A9.5 9.5 0 1 1 21.65 10.64"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M6.89 29.18A16 16 0 1 1 29.18 33.11"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}

type LogoProps = { className?: string; markClassName?: string }

export function Logo({ className = '', markClassName = 'h-7 w-7 text-cyan' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="font-display text-[1.15rem] tracking-[0.22em]">REIKA</span>
        <span className="font-mono text-[0.6rem] tracking-[0.3em] opacity-60">LABS</span>
      </span>
    </span>
  )
}
