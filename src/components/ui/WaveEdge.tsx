type Props = {
  /** Colour of the section the wave flows into. */
  fill: string
  className?: string
}

/** The single, still waterline between the dark hero and the light page. */
export function WaveEdge({ fill, className = '' }: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 bottom-[-1px] z-10 h-[clamp(24px,4vw,64px)] w-full ${className}`}
    >
      <path
        d="M0 32 C 160 12, 320 12, 480 28 S 800 52, 960 36 S 1280 12, 1440 28 V 64 H 0 Z"
        fill={fill}
      />
    </svg>
  )
}
