import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Tone = 'light' | 'ghost-light' | 'dark' | 'ghost-dark'

const tones: Record<Tone, string> = {
  light: 'bg-foam text-ink hover:bg-white',
  'ghost-light': 'text-foam ring-1 ring-inset ring-foam/30 hover:ring-foam/70 hover:bg-foam/5',
  dark: 'bg-ink text-foam hover:bg-ocean',
  'ghost-dark': 'text-ink ring-1 ring-inset ring-ink/25 hover:ring-ink/60 hover:bg-ink/[0.03]',
}

const base =
  'group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-[0.9375rem] font-medium tracking-tight transition-[background-color,box-shadow,color] duration-500 ease-[var(--ease-water)] disabled:cursor-not-allowed disabled:opacity-45'

function Inner({ children, icon }: { children: ReactNode; icon: boolean }) {
  return (
    <>
      {/* Water line that rises on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-cyan/20 transition-[height] duration-700 ease-[var(--ease-water)] group-hover:h-full"
      />
      <span className="relative">{children}</span>
      {icon ? (
        <ArrowUpRight
          aria-hidden="true"
          className="relative h-4 w-4 transition-transform duration-500 ease-[var(--ease-water)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  )
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { tone?: Tone; icon?: boolean }

export function ButtonLink({ tone = 'light', icon = true, className = '', children, ...rest }: LinkProps) {
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

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone; icon?: boolean }

export function Button({ tone = 'light', icon = true, className = '', children, ...rest }: BtnProps) {
  return (
    <button type="button" className={`${base} ${tones[tone]} ${className}`} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  )
}
