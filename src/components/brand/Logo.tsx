/**
 * Reika Labs logo: the official ribbon "R" mark + the name set in the display face.
 *
 * Ganti logo? Timpa file di public/brand/:
 *   reika-mark-128.png  → dipakai di navbar & footer (tampil 32 px)
 *   reika-mark.png      → versi 512 px (OG image, dokumentasi)
 */
type LogoProps = {
  className?: string
  /** Text colour comes from the parent; the mark keeps its own brand colours. */
  size?: 'md' | 'sm'
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const mark = size === 'md' ? 'h-8 w-8' : 'h-7 w-7'
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}brand/reika-mark-128.png`}
        alt=""
        width={32}
        height={32}
        className={mark}
        decoding="async"
      />
      <span className="font-display text-[1.25rem] leading-none tracking-[0.01em]">Reika Labs</span>
    </span>
  )
}
