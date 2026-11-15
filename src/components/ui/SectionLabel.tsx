type Props = { index: string; label: string; className?: string }

/** Lab-style section marker: "01 — About Reika" with a hairline. */
export function SectionLabel({ index, label, className = '' }: Props) {
  return (
    <div className={`label flex items-center gap-4 ${className}`}>
      <span>{index}</span>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
      <span>{label}</span>
    </div>
  )
}
