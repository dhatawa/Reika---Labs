import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * primary  — the one accent action on light grounds
 * light    — primary action on the dark hero (off-white, dark text)
 * outline  — secondary action, on light or dark (set text colour via className)
 */
type Tone = 'primary' | 'light' | 'outline-dark' | 'outline-light'

const tones: Record<Tone, string> = {
  primary: 'bg-sky-ink text-white hover:bg-sky-ink-hover',
  light: 'bg-mist text-ink hover:bg-white',
  'outline-dark': 'text-ink border border-ink/15 hover:border-ink/40 hover:bg-ink/[0.03]',
  'outline-light': 'text-mist border border-mist/25 hover:border-mist/60 hover:bg-mist/[0.06]',
}

const base =
  'group inline-flex h-12 items-center gap-2 rounded-[10px] px-5 text-[0.9375rem] font-medium transition-[background-color,border-color,color,transform] duration-150 ease-[var(--ease-water)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45'

function Inner({ children, icon }: { children: ReactNode; icon: boolean }) {
  return (
    <>
      <span>{children}</span>
      {icon ? (
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.5}
          className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-water)] group-hover:-translate-y-px group-hover:translate-x-px"
        />
      ) : null}
    </>
  )
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { tone?: Tone; icon?: boolean }

export function ButtonLink({ tone = 'primary', icon = true, className = '', children, ...rest }: LinkProps) {
  const external = rest.href?.startsWith('http')
  return (
    <a
      className={`${base} ${tones[tone]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <Inner icon={icon}>{children}</Inner>
    </a>
  )
}

type RouteProps = { to: string; tone?: Tone; icon?: boolean; className?: string; children: ReactNode }

/** Internal page link styled as a button (client-side navigation). */
export function ButtonRoute({ to, tone = 'primary', icon = true, className = '', children }: RouteProps) {
  return (
    <Link to={to} className={`${base} ${tones[tone]} ${className}`}>
      <Inner icon={icon}>{children}</Inner>
    </Link>
  )
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone; icon?: boolean }

export function Button({ tone = 'primary', icon = true, className = '', children, ...rest }: BtnProps) {
  return (
    <button type="button" className={`${base} ${tones[tone]} ${className}`} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  )
}
