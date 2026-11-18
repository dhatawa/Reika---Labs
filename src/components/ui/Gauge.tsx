/**
 * Signature detail: a staff gauge — the ruler fixed beside a lake to read its water level.
 * Ticks every 4 px, a longer tick every 16 px. Used only for section markers
 * and inside the Smart Gate diagram.
 */
export function Gauge({ className = '', width = 64 }: { className?: string; width?: number }) {
  const ticks = []
  for (let x = 0; x <= width; x += 4) {
    const major = x % 16 === 0
    ticks.push(<line key={x} x1={x + 0.5} x2={x + 0.5} y1={major ? 0 : 6} y2={12} />)
  }
  return (
    <svg
      aria-hidden="true"
      width={width + 1}
      height={12}
      viewBox={`0 0 ${width + 1} 12`}
      className={className}
      stroke="currentColor"
      strokeWidth="1"
    >
      {ticks}
    </svg>
  )
}

type SectionLabelProps = { label: string; tone?: 'light' | 'dark'; className?: string }

/** Section marker: gauge + plain label in sentence case. */
export function SectionLabel({ label, tone = 'light', className = '' }: SectionLabelProps) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-medium ${
        tone === 'light' ? 'text-ink-3' : 'text-mist-3'
      } ${className}`}
    >
      <Gauge className={tone === 'light' ? 'text-sky-ink' : 'text-sky'} />
      {label}
    </p>
  )
}
