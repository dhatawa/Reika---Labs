import { useId } from 'react'
import type { LogoSegment } from '../../content/site'

type Props = {
  className?: string
  /** Highlight one of the five folds; the others fade back. */
  highlight?: LogoSegment | null
  title?: string
}

/**
 * The Reika ribbon "R", redrawn as vector from the official logo
 * (same shape, colours and fold shading). Each fold is its own group
 * so the Logo Philosophy section can highlight it.
 *
 * Folds, in the order the ribbon runs:
 *  stem → top → middle → bottom → hook
 */
export function LogoVector({ className = '', highlight = null, title }: Props) {
  const uid = useId().replace(/:/g, '')
  const g = (name: string) => `${name}-${uid}`
  const fade = (seg: LogoSegment) =>
    ({
      opacity: highlight && highlight !== seg ? 0.16 : 1,
      transition: 'opacity 200ms cubic-bezier(0.22, 1, 0.36, 1)',
    }) as const

  return (
    <svg
      viewBox="200 100 880 1100"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      fill="none"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={g('rv')} gradientUnits="userSpaceOnUse" x1="0" y1="194" x2="0" y2="1060">
          <stop offset="0" stopColor="#00709a" />
          <stop offset="0.12" stopColor="#0083af" />
          <stop offset="0.27" stopColor="#00a8e0" />
          <stop offset="0.42" stopColor="#00b7f9" />
          <stop offset="0.66" stopColor="#00b4f4" />
          <stop offset="0.82" stopColor="#018ebc" />
          <stop offset="1" stopColor="#007ba6" />
        </linearGradient>
        <linearGradient id={g('bot')} gradientUnits="userSpaceOnUse" x1="385" y1="771" x2="1029" y2="1087">
          <stop offset="0" stopColor="#1ba393" />
          <stop offset="0.38" stopColor="#1fb0a6" />
          <stop offset="0.62" stopColor="#14bcd6" />
          <stop offset="0.85" stopColor="#02b8f7" />
        </linearGradient>
        <linearGradient id={g('stem')} gradientUnits="userSpaceOnUse" x1="0" y1="124" x2="0" y2="1169">
          <stop offset="0" stopColor="#2bccba" />
          <stop offset="0.42" stopColor="#26c0af" />
          <stop offset="0.55" stopColor="#1fa99b" />
          <stop offset="0.8" stopColor="#25b4a5" />
          <stop offset="0.94" stopColor="#3fd0c0" />
          <stop offset="1" stopColor="#4cd5c6" />
        </linearGradient>
        <linearGradient id={g('mid')} gradientUnits="userSpaceOnUse" x1="244" y1="840" x2="775" y2="479">
          <stop offset="0" stopColor="#2ecdbb" />
          <stop offset="0.5" stopColor="#28cabd" />
          <stop offset="0.72" stopColor="#14adb7" />
          <stop offset="0.88" stopColor="#038fa7" />
          <stop offset="1" stopColor="#008ca3" />
        </linearGradient>
        <linearGradient id={g('top')} gradientUnits="userSpaceOnUse" x1="312" y1="200" x2="846" y2="479">
          <stop offset="0" stopColor="#2bccbc" />
          <stop offset="0.25" stopColor="#2bccbc" />
          <stop offset="0.6" stopColor="#1ec5ce" />
          <stop offset="1" stopColor="#03b8f6" />
        </linearGradient>
        <clipPath id={g('clip')}>
          <rect x="242" y="0" width="1038" height="1280" />
        </clipPath>
      </defs>

      <g style={fade('hook')}>
        <line x1="956" y1="194" x2="956" y2="1052" stroke={`url(#${g('rv')})`} strokeWidth="150" />
        <path d="M765 123 H983 A48 48 0 0 1 1031 171 V265 H765 A71 71 0 0 1 765 123 Z" fill="#02b8f9" />
      </g>
      <g style={fade('bottom')}>
        <line x1="385" y1="771" x2="958" y2="1052" stroke={`url(#${g('bot')})`} strokeWidth="142" strokeLinecap="round" />
        <line x1="385" y1="771" x2="500" y2="827" stroke={`url(#${g('bot')})`} strokeWidth="142" />
      </g>
      <g style={fade('stem')}>
        <line x1="312" y1="195" x2="312" y2="1098" stroke={`url(#${g('stem')})`} strokeWidth="142" strokeLinecap="round" />
      </g>
      <g style={fade('middle')}>
        <line x1="775" y1="479" x2="120" y2="923" stroke={`url(#${g('mid')})`} strokeWidth="142" clipPath={`url(#${g('clip')})`} />
      </g>
      <g style={fade('top')}>
        <line x1="312" y1="200" x2="775" y2="479" stroke={`url(#${g('top')})`} strokeWidth="142" strokeLinecap="round" />
      </g>
    </svg>
  )
}
