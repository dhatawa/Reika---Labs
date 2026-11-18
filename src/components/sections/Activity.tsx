import type { ReactNode } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { SectionLabel } from '../ui/Gauge'
import { Reveal } from '../ui/Reveal'
import { SmartGateIllustration } from '../products/SmartGateIllustration'
import { PageNav, SubNav, useGroup, usePageTitle } from '../layout/PageNav'
import { useSite, type StageState } from '../../content/site'

const GROUP = 'activity-menu'
const LEVEL: Record<StageState, number> = { done: 100, current: 50, planned: 0 }

/** Journal menu + content in the active language. */
function useJournal() {
  const t = useSite()
  const menu = useGroup(GROUP)
  const stateLabel: Record<StageState, string> = {
    done: t.ui.stateDone,
    current: t.ui.stateCurrent,
    planned: t.ui.statePlanned,
  }
  return { ...t, menu, stateLabel }
}

/* ═══════════════════════════════════════════════════════════════
   Layout shared by the five "What we're doing" pages:
   journal header, sidebar index (desktop) / tabs (mobile), page nav.
   ═══════════════════════════════════════════════════════════════ */
export function ActivityLayout() {
  const { activity, menu, ui } = useJournal()
  return (
    <>
      <SubNav groupId={GROUP} className="lg:hidden" />
      <div className="bg-paper text-ink">
        <div className="container-x pb-16 pt-12 md:pt-16">
          <SectionLabel label={`${activity.label} · ${activity.title}`} />

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-8">
            <nav aria-label={ui.journalNav} className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
              <ol className="border-l border-ink/10">
                {menu.items.map((item, i) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        `-ml-px flex gap-3 border-l py-2 pl-4 transition-colors duration-150 ${
                          isActive ? 'border-sky-ink font-medium text-ink' : 'border-transparent text-ink-2 hover:border-ink/30 hover:text-ink'
                        }`
                      }
                    >
                      <span className="font-mono text-xs tabular-nums leading-6 text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ol>
              <p className="mt-8 max-w-[16rem] text-sm leading-relaxed text-ink-3">{activity.intro}</p>
              </div>
            </nav>

            <div className="lg:col-span-8 lg:col-start-5">
              <Outlet />
            </div>
          </div>
        </div>
        <PageNav groupId={GROUP} />
      </div>
    </>
  )
}

/** Page heading shared by the journal pages. */
function JournalHeader({ lead }: { lead?: string }) {
  const { pathname } = useLocation()
  const { menu, activity } = useJournal()
  const item = menu.items.find((i) => i.to === pathname)
  const index = menu.items.findIndex((i) => i.to === pathname) + 1
  usePageTitle(item?.label ?? activity.title)
  return (
    <Reveal className="mb-10">
      <p className="font-mono text-xs tabular-nums text-ink-3">{String(index).padStart(2, '0')}</p>
      <h1 className="mt-2 font-display text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.02] tracking-[-0.01em]">{item?.label}</h1>
      {lead ? <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-2">{lead}</p> : null}
    </Reveal>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14 first:mt-0">
      <h2 className="text-sm font-medium text-ink-3">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function NotUpdated() {
  const { activity, ui } = useJournal()
  return (
    <p className="flex items-center gap-3 rounded-2xl border border-dashed border-ink/20 px-6 py-6 text-ink-3">
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full border border-ink-3" />
      {activity.notUpdated}. {ui.notUpdatedLong}
    </p>
  )
}

/** A small staff gauge filled to the stage's level — the site's signature detail. */
function StageGauge({ level }: { level: number }) {
  return (
    <span aria-hidden="true" className="relative block h-8 w-5 shrink-0 overflow-hidden rounded-[4px] border border-sky-ink/40">
      <span className="absolute inset-x-0 bottom-0 bg-sky" style={{ height: `${level}%` }} />
      <span className="absolute inset-x-0 top-1/2 h-px bg-sky-ink/40" />
    </span>
  )
}

/* ── /activities/research ─────────────────────────────────── */
export function ResearchPage() {
  const { activity, smartGate, menu, ui } = useJournal()
  const r = activity.currentResearch
  const [background, problem] = smartGate.detail
  return (
    <>
      <JournalHeader lead={menu.items[0].description} />

      <Link
        to="/products"
        className="group block rounded-2xl border border-ink/10 bg-surface p-6 transition-colors duration-150 hover:border-sky-ink/40 sm:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-ink-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sky" />
              {r.facts[0].value}
            </p>
            <h2 className="mt-3 font-display text-3xl">{r.project}</h2>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-sky-ink">
            {ui.projectDetails}
            <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-px group-hover:translate-x-px" />
          </span>
        </div>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-2">{r.summary}</p>

        <dl className="hairline mt-6 grid border-t sm:grid-cols-2 sm:gap-x-8">
          {r.facts.slice(1).map((f) => (
            <div key={f.term} className="hairline border-b py-4">
              <dt className="text-sm text-ink-3">{f.term}</dt>
              <dd className={`mt-1 ${f.value ? 'text-ink' : 'text-ink-3'}`}>
                {f.value ?? (
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full border border-ink-3" />
                    {activity.notUpdated}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Link>

      <Block title={ui.whyThisLake}>
        <div className="grid gap-8 md:grid-cols-2">
          {[background, problem].map((b) => (
            <div key={b.title}>
              <h3 className="font-medium text-ink">{b.title}</h3>
              {b.body.map((p) => (
                <p key={p.slice(0, 20)} className="mt-3 leading-relaxed text-ink-2">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Block>
    </>
  )
}

/* ── /activities/projects ─────────────────────────────────── */
export function ProjectsPage() {
  const { activity, ui, stateLabel } = useJournal()
  return (
    <>
      <JournalHeader lead={ui.stagesLead} />

      <figure className="rounded-2xl bg-night-2 p-4 sm:p-8">
        <SmartGateIllustration className="h-auto w-full" />
        <figcaption className="mt-4 text-sm text-mist-3">{ui.diagramCaption}</figcaption>
      </figure>

      <Block title={ui.stagesTitle}>
        <ol className="hairline border-t">
          {activity.development.map((d) => {
            const st = { label: stateLabel[d.state], level: LEVEL[d.state] }
            return (
              <li key={d.stage} className="hairline border-b">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center gap-4 py-5 [&::-webkit-details-marker]:hidden">
                    <StageGauge level={st.level} />
                    <span className="w-28 shrink-0 text-sm font-medium text-sky-ink">{d.stage}</span>
                    <span className="flex-1 text-ink">{d.title}</span>
                    <span className="hidden text-sm text-ink-3 sm:inline">{st.label}</span>
                    <ChevronDown aria-hidden="true" strokeWidth={1.5} className="h-[18px] w-[18px] shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="pb-6 pl-[3.25rem] sm:pl-[10.25rem]">
                    <p className="text-sm text-ink-3 sm:hidden">{st.label}</p>
                    <p className="max-w-xl leading-relaxed text-ink-2">{d.text}</p>
                  </div>
                </details>
              </li>
            )
          })}
        </ol>
      </Block>
    </>
  )
}

/* ── /activities/experiments ──────────────────────────────── */
export function ExperimentsPage() {
  const { activity, menu, ui } = useJournal()
  return (
    <>
      <JournalHeader lead={menu.items[2].description} />
      {activity.experiments.length ? (
        <ul className="hairline border-t">
          {activity.experiments.map((x) => (
            <li key={x.title} className="hairline grid gap-2 border-b py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <p className="font-mono text-sm text-ink-3">{x.date}</p>
              <div>
                <p className="font-medium">{x.title}</p>
                <p className="mt-1 leading-relaxed text-ink-2">{x.text}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <NotUpdated />
      )}
      <Block title={ui.experimentsLogTitle}>
        <p className="max-w-xl leading-relaxed text-ink-2">
          {ui.experimentsLogBefore}
          <Link to="/about/approach" className="text-sky-ink underline-offset-4 hover:underline">
            {ui.experimentsLogLink}
          </Link>
          {ui.experimentsLogAfter}
        </p>
      </Block>
    </>
  )
}

/* ── /activities/achievements ─────────────────────────────── */
export function AchievementsPage() {
  const { activity, ui } = useJournal()
  const list = activity.achievements.filter((a) => a.published)
  return (
    <>
      <JournalHeader lead={ui.achievementsLead} />
      <ol>
        {list.map((a) => (
          <li key={a.title} className="hairline grid gap-4 border-t py-8 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <span className="font-display text-5xl leading-none text-sky-ink">{a.year}</span>
            <div>
              <h2 className="text-xl font-medium text-ink">{a.title}</h2>
              <p className="mt-2 text-ink-2">{a.event}</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-ink-3">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sky" />
                {ui.projectLabel}: {a.project}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}

/* ── /activities/future ───────────────────────────────────── */
export function FuturePage() {
  const { activity, menu, ui } = useJournal()
  const nextStage = activity.development.find((d) => d.state === 'planned')
  return (
    <>
      <JournalHeader lead={menu.items[4].description} />
      {activity.futureDirection.length ? (
        <ul className="hairline border-t">
          {activity.futureDirection.map((f) => (
            <li key={f.title} className="hairline border-b py-5">
              <p className="font-medium">{f.title}</p>
              <p className="mt-1 leading-relaxed text-ink-2">{f.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <NotUpdated />
      )}
      {nextStage ? (
        <Block title={ui.openStageTitle}>
          <Link to="/activities/projects" className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-surface p-6 transition-colors duration-150 hover:border-sky-ink/40">
            <StageGauge level={0} />
            <span className="flex-1">
              <span className="block text-sm font-medium text-sky-ink">Smart Gate · {nextStage.stage}</span>
              <span className="mt-1 block text-ink">{nextStage.title}: {nextStage.text}</span>
            </span>
            <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-[18px] w-[18px] text-ink-3 group-hover:text-sky-ink" />
          </Link>
        </Block>
      ) : null}
    </>
  )
}
