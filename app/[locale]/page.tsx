import { setRequestLocale, getTranslations } from 'next-intl/server'
import { asc, desc } from 'drizzle-orm'
import { Link } from '@/i18n/navigation'
import { ArrowUpRight, Sparkles, MoveDown } from 'lucide-react'
import { getDb } from '@/lib/db/client'
import { projects, experience } from '@/lib/db/schema'
import { pickLocalised } from '@/lib/date-formatter'
import { CursorSpotlight } from '@/components/home/cursor-spotlight'
import { LiveClock } from '@/components/home/live-clock'

const HERO_NAME = 'Stepan'
const HERO_LASTNAME = 'Leonov.'

async function fetchHomeData(locale: string) {
  try {
    const db = getDb()
    const [latestProject] = await db
      .select()
      .from(projects)
      .orderBy(asc(projects.order), asc(projects.id))
      .limit(1)

    const [currentJob] = await db
      .select()
      .from(experience)
      .orderBy(desc(experience.startYear))
      .limit(1)

    return {
      project: latestProject
        ? {
            key: latestProject.key,
            title: pickLocalised(
              locale,
              latestProject.titleEn,
              latestProject.titleRu,
              latestProject.titleKo,
              latestProject.titleEs
            ),
            desc: pickLocalised(
              locale,
              latestProject.descEn,
              latestProject.descRu,
              latestProject.descKo,
              latestProject.descEs
            ),
            image: latestProject.image,
            stack: safeParse<string[]>(latestProject.stack, []).slice(0, 5),
          }
        : null,
      job: currentJob
        ? {
            role: pickLocalised(
              locale,
              currentJob.roleEn,
              currentJob.roleRu,
              currentJob.roleKo,
              currentJob.roleEs
            ),
            company: pickLocalised(
              locale,
              currentJob.companyEn,
              currentJob.companyRu,
              currentJob.companyKo,
              currentJob.companyEs
            ),
          }
        : null,
    }
  } catch (e) {
    console.error('Home data fetch failed', e)
    return { project: null, job: null }
  }
}

function safeParse<T>(s: string | null, fallback: T): T {
  if (!s) return fallback
  try {
    return JSON.parse(s) as T
  } catch {
    return fallback
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const { project, job } = await fetchHomeData(locale)

  return (
    <>
      <section className="relative bg-cream pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 brutal-stripes opacity-[0.04] pointer-events-none" />
        <CursorSpotlight />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 mb-8 brutal-border-2 bg-brutal-yellow px-3 py-1.5 brutal-rise">
            <Sparkles className="w-4 h-4" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest">
              {t('hero.hi')}
            </span>
          </div>

          <h1
            className="brutal-display text-[clamp(3rem,11vw,9rem)]"
            style={{ overflowWrap: 'anywhere' }}
            aria-label={`${HERO_NAME} ${HERO_LASTNAME}`}
          >
            <span className="block" aria-hidden>
              {[...HERO_NAME].map((ch, i) => (
                <span
                  key={i}
                  className="brutal-letter"
                  style={{ ['--stagger' as never]: `${i * 60}ms` }}
                >
                  {ch}
                </span>
              ))}
            </span>
            <span className="block" aria-hidden>
              <span className="brutal-marker">
                {[...HERO_LASTNAME].map((ch, i) => (
                  <span
                    key={i}
                    className="brutal-letter"
                    style={{ ['--stagger' as never]: `${(HERO_NAME.length + i) * 60}ms` }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          <p className="mt-10 max-w-3xl text-xl sm:text-2xl leading-snug font-medium brutal-rise" style={{ animationDelay: '600ms' }}>
            {t('hero.bio')}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 brutal-rise" style={{ animationDelay: '750ms' }}>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-3 font-display uppercase text-lg tracking-tight px-8 py-5 bg-ink text-cream brutal-border brutal-shadow brutal-press"
            >
              {t('projects.btn')}
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 font-display uppercase text-lg tracking-tight px-8 py-5 bg-cream text-ink brutal-border brutal-shadow brutal-press"
            >
              {t('nav.contact')}
            </Link>
          </div>

          <div className="absolute right-4 sm:right-8 bottom-2 hidden sm:flex flex-col items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-70">
            <MoveDown className="w-4 h-4 animate-pulse" />
            scroll
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream brutal-border-t brutal-border-b py-4 overflow-hidden brutal-marquee-hoverable">
        <div className="brutal-marquee">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center gap-12 pr-12 font-display uppercase text-3xl">
              <span>Vue</span>
              <span className="text-brutal-yellow">×</span>
              <span>Nuxt</span>
              <span className="text-brutal-yellow">×</span>
              <span>Next.js</span>
              <span className="text-brutal-yellow">×</span>
              <span>TypeScript</span>
              <span className="text-brutal-yellow">×</span>
              <span>Tailwind</span>
              <span className="text-brutal-yellow">×</span>
              <span>Postgres</span>
              <span className="text-brutal-yellow">×</span>
              <span>Drizzle</span>
              <span className="text-brutal-yellow">×</span>
              <span>Node</span>
              <span className="text-brutal-yellow">×</span>
            </div>
          ))}
        </div>
      </section>

      {project ? (
        <section className="bg-brutal-yellow py-16 sm:py-24 brutal-border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-baseline justify-between gap-4 flex-wrap mb-8">
              <p className="font-mono text-xs font-bold uppercase tracking-widest">
                {t('featured.eyebrow')}
              </p>
              <Link
                href="/projects"
                className="font-mono text-xs font-bold uppercase tracking-widest underline decoration-2 underline-offset-4 hover:opacity-70"
              >
                {t('featured.viewAll')} →
              </Link>
            </div>

            <Link
              href={{ pathname: '/projects', query: { p: project.key } } as never}
              className="group brutal-border brutal-shadow-lg bg-cream brutal-press grid md:grid-cols-2 overflow-hidden"
            >
              <div className="aspect-video md:aspect-auto bg-paper relative overflow-hidden md:brutal-border-b-0 md:border-r-4 md:border-ink">
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 brutal-stripes opacity-20" />
                )}
              </div>
              <div className="p-6 sm:p-10 flex flex-col justify-between gap-6">
                <div>
                  <h2 className="brutal-display text-3xl sm:text-5xl leading-[0.95]">
                    {project.title}
                  </h2>
                  <p className="mt-4 text-base sm:text-lg leading-snug">
                    {project.desc}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {project.stack.map((tag) => (
                    <span key={tag} className="brutal-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="bg-cream py-16 sm:py-24 brutal-border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <header className="flex items-baseline justify-between gap-4 flex-wrap mb-10">
            <h2 className="brutal-display text-5xl sm:text-7xl">
              <span className="brutal-marker">{t('now.title')}</span>
            </h2>
            <span className="inline-flex items-center gap-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest">
              <span className="relative inline-block w-3 h-3">
                <span className="absolute inset-0 bg-brutal-green brutal-pulse rounded-none" />
              </span>
              {t('now.status')}
            </span>
          </header>

          <dl className="grid sm:grid-cols-2 gap-y-10 gap-x-12">
            <div className="flex flex-col">
              <dt className="font-mono text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
                {t('now.timeLabel')}
              </dt>
              <dd className="brutal-display text-4xl sm:text-6xl leading-none">
                <LiveClock />
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="font-mono text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
                {t('now.workingLabel')}
              </dt>
              <dd className="font-display uppercase text-2xl sm:text-3xl leading-tight">
                {job ? (
                  <>
                    {job.role}
                    <span className="block text-base sm:text-lg font-mono normal-case opacity-70 mt-1">
                      @ {job.company}
                    </span>
                  </>
                ) : (
                  <span className="opacity-50">—</span>
                )}
              </dd>
            </div>

            <div className="flex flex-col sm:col-span-2">
              <dt className="font-mono text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
                {t('now.learningLabel')}
              </dt>
              <dd className="font-display uppercase text-2xl sm:text-3xl leading-tight break-words">
                {t('now.learning')}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <Link
        href="/contact"
        className="block bg-ink text-cream brutal-arrow-link group flex-1"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <h2
            className="brutal-display leading-[0.9] text-[clamp(2.25rem,11vw,10rem)]"
            style={{ overflowWrap: 'anywhere' }}
          >
            <span className="block">{t('outro.line1')}</span>
            <span className="block text-brutal-yellow">{t('outro.line2')}</span>
          </h2>
          <p className="mt-10 inline-flex items-baseline gap-3 font-mono text-sm sm:text-base font-bold uppercase tracking-widest border-b-2 border-cream pb-2 group-hover:border-brutal-yellow group-hover:text-brutal-yellow transition-colors">
            {t('outro.cta')}
            <span className="brutal-arrow text-2xl">→</span>
          </p>
        </div>
      </Link>
    </>
  )
}
