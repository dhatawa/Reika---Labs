import { Link, Outlet } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Hero } from '../components/sections/Hero'
import { About, Meaning } from '../components/sections/About'
import { LogoPhilosophy } from '../components/sections/LogoPhilosophy'
import { VisionMission, Approach } from '../components/sections/VisionApproach'
import { Members } from '../components/sections/Members'
import { Products } from '../components/sections/Products'
import { Contact } from '../components/sections/Contact'
import { SectionLabel, Gauge } from '../components/ui/Gauge'
import { ButtonRoute } from '../components/ui/Button'
import { PageNav, SubNav, usePageTitle } from '../components/layout/PageNav'
import { useSite, type NavGroup } from '../content/site'

/* ── / ─────────────────────────────────────────────────────── */
export function HomePage() {
  usePageTitle('')
  return (
    <>
      <Hero />
      <Directory />
      <Contact />
    </>
  )
}

/**
 * Home's second screen: a table of contents for the whole platform,
 * grouped like the navigation, with the current research pinned on top.
 */
function Directory() {
  const { activity, navigation, ui } = useSite()
  const groups = navigation.filter((n): n is NavGroup => n.kind === 'group')
  const r = activity.currentResearch
  return (
    <section aria-labelledby="directory-title" className="bg-paper text-ink">
      <div className="container-x py-24 md:py-32">
        <SectionLabel label={ui.insideReika} />
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2 id="directory-title" className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.01em] lg:col-span-7">
            {ui.directoryTitle}
          </h2>
          <p className="max-w-md leading-relaxed text-ink-2 lg:col-span-4 lg:col-start-9">
            {ui.directoryText}
          </p>
        </div>

        <Link
          to="/activities/research"
          className="group mt-16 grid gap-6 rounded-2xl border border-ink/10 bg-surface p-6 transition-colors duration-150 hover:border-sky-ink/40 sm:p-8 md:grid-cols-[1fr_auto] md:items-center"
        >
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-ink-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sky" />
              {ui.currentResearch} · {r.facts[0].value}
            </p>
            <p className="mt-3 font-display text-3xl">{r.project}</p>
            <p className="mt-2 max-w-2xl leading-relaxed text-ink-2">{r.summary}</p>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-sky-ink">
            {ui.openJournal}
            <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-px group-hover:translate-x-px" />
          </span>
        </Link>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-8">
          {groups.map((g) => (
            <div key={g.id}>
              <h3 className="text-lg font-medium text-ink">{g.label}</h3>
              <ul className="hairline mt-4 border-t">
                {g.items.map((item) => (
                  <li key={item.id} className="hairline border-b">
                    <Link to={item.to} className="group flex items-center gap-4 py-4">
                      <span className="flex-1">
                        <span className="block font-medium text-ink transition-colors duration-150 group-hover:text-sky-ink">{item.label}</span>
                        <span className="mt-0.5 block text-sm text-ink-3">{item.description}</span>
                      </span>
                      <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-[18px] w-[18px] text-ink-3 transition-colors duration-150 group-hover:text-sky-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonRoute to="/members" tone="outline-dark" icon={false}>
            {ui.meetMembers}
          </ButtonRoute>
          <ButtonRoute to="/products" tone="outline-dark" icon={false}>
            {ui.seeProducts}
          </ButtonRoute>
        </div>
      </div>
    </section>
  )
}

/** Label of an About sub-page in the active language (used for the tab title). */
function useLabel(id: string) {
  const { navigation } = useSite()
  for (const n of navigation) if (n.kind === 'group') for (const i of n.items) if (i.id === id) return i.label
  return ''
}

/* ── /about/* ──────────────────────────────────────────────── */
export function AboutLayout() {
  return (
    <>
      <SubNav groupId="about-menu" />
      <Outlet />
    </>
  )
}

export function AboutPage() {
  usePageTitle(useLabel('about'))
  return (
    <>
      <About />
      <PageNav groupId="about-menu" />
    </>
  )
}

export function MeaningPage() {
  usePageTitle(useLabel('meaning'))
  return (
    <>
      <Meaning />
      <PageNav groupId="about-menu" />
    </>
  )
}

export function LogoPage() {
  usePageTitle(useLabel('logo'))
  return (
    <div className="bg-night">
      <LogoPhilosophy />
      <PageNav groupId="about-menu" tone="dark" />
    </div>
  )
}

export function VisionPage() {
  usePageTitle(useLabel('vision'))
  return (
    <>
      <VisionMission />
      <PageNav groupId="about-menu" />
    </>
  )
}

export function ApproachPage() {
  usePageTitle(useLabel('approach'))
  return (
    <>
      <Approach />
      <PageNav groupId="about-menu" />
    </>
  )
}

/* ── /members, /products ───────────────────────────────────── */
export function MembersPage() {
  usePageTitle(useSite().members.label)
  return <Members />
}

export function ProductsPage() {
  usePageTitle(useSite().products.label)
  return <Products />
}

/* ── 404 ───────────────────────────────────────────────────── */
export function NotFoundPage() {
  const { ui } = useSite()
  usePageTitle(ui.notFoundPageTitle)
  return (
    <section aria-labelledby="nf-title" className="bg-paper text-ink">
      <div className="container-x flex min-h-[70vh] flex-col justify-center py-24">
        <div className="flex items-center gap-4 text-sky-ink">
          <Gauge width={96} />
          <span className="font-mono text-sm text-ink-3">{ui.notFoundGauge}</span>
        </div>
        <h1 id="nf-title" className="mt-8 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-[-0.01em]">
          {ui.notFoundTitle}
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
          {ui.notFoundText}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonRoute to="/">{ui.backHome}</ButtonRoute>
          <ButtonRoute to="/about" tone="outline-dark" icon={false}>
            {useSite().about.label}
          </ButtonRoute>
          <ButtonRoute to="/activities/research" tone="outline-dark" icon={false}>
            {ui.journalNav}
          </ButtonRoute>
        </div>
      </div>
    </section>
  )
}
