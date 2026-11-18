/** Shared content types. Both languages (en.ts, id.ts) follow these shapes. */
export type Member = {
  name: string
  role: string
  description: string
  photo: string
  initials: string
}
export type MenuItem = { id: string; to: string; label: string; description: string }
export type NavGroup = {
  kind: 'group'
  id: string
  /** URL prefix; any path starting with it marks the group active. */
  base: string
  label: string
  title: string
  description: string
  items: MenuItem[]
}
export type NavLink = { kind: 'link'; id: string; to: string; label: string }
export type LogoSegment = 'stem' | 'top' | 'middle' | 'bottom' | 'hook'
export type StageState = 'done' | 'current' | 'planned'
export type Lang = 'en' | 'id'
