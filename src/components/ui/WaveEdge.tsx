type Props = {
  /** Colour of the section the wave flows INTO (fills the wave body). */
  fill: string
  /** Draw the wave at the top of a section (flipped) or at the bottom. */
  position?: 'top' | 'bottom'
  className?: string
}

/**
 * Fluid section transition: two layered, slowly drifting wave lines.
 * The path is tiled twice so it can slide -50% and loop seamlessly.
 */
export function WaveEdge({ fill, position = 'bottom', className = '' }: Props) {
  const d =
    'M0 40 C 120 18, 240 18, 360 34 S 600 58, 720 40 S 960 14, 1080 30 S 1320 56, 1440 40 L 1440 80 L 0 80 Z'
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 h-[clamp(36px,5vw,72px)] overflow-hidden ${
        position === 'bottom' ? 'bottom-[-1px]' : 'top-[-1px] rotate-180'
      } ${className}`}
    >
      <div className="wave-track-slow absolute inset-y-0 left-0 flex w-[200%] opacity-40">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full w-1/2">
          <path d={d} fill={fill} transform="translate(0 6)" />
        </svg>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full w-1/2">
          <path d={d} fill={fill} transform="translate(0 6)" />
        </svg>
      </div>
      <div className="wave-track absolute inset-y-0 left-0 flex w-[200%]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full w-1/2">
          <path d={d} fill={fill} transform="translate(0 14)" />
        </svg>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full w-1/2">
          <path d={d} fill={fill} transform="translate(0 14)" />
        </svg>
      </div>
    </div>
  )
}
