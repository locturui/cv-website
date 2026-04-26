import { setRequestLocale, getTranslations } from 'next-intl/server'
import { asc } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { experience } from '@/lib/db/schema'
import { formatExperienceDate, pickLocalised } from '@/lib/date-formatter'
import { SectionHeader } from '@/components/section-header'
import { BrutalCard } from '@/components/brutal-card'

export const dynamic = 'force-dynamic'

type ExperienceRow = {
  key: string
  year: string
  role: string
  company: string
  bullets: string[]
  tech: string
}

async function fetchExperience(locale: string): Promise<ExperienceRow[]> {
  try {
    const db = getDb()
    const rows = await db.select().from(experience).orderBy(asc(experience.order))
    return rows.map((exp) => {
      const formattedYear =
        exp.startMonth && exp.startYear
          ? formatExperienceDate(
              exp.startMonth,
              exp.startYear,
              exp.endMonth,
              exp.endYear,
              exp.isPresent,
              locale
            )
          : exp.year
      return {
        key: exp.key,
        year: formattedYear,
        role: pickLocalised(locale, exp.roleEn, exp.roleRu, exp.roleKo, exp.roleEs),
        company: pickLocalised(locale, exp.companyEn, exp.companyRu, exp.companyKo, exp.companyEs),
        bullets: JSON.parse(
          pickLocalised(locale, exp.bulletsEn, exp.bulletsRu, exp.bulletsKo, exp.bulletsEs) || '[]'
        ),
        tech: pickLocalised(locale, exp.techEn, exp.techRu, exp.techKo, exp.techEs),
      }
    })
  } catch (e) {
    console.error('Experience fetch failed', e)
    return []
  }
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const items = await fetchExperience(locale)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <SectionHeader eyebrow="01 / Career" title={t('exp.title')} accent="blue" />

      {items.length === 0 ? (
        <BrutalCard tone="paper" className="p-10 text-center">
          <p className="font-mono uppercase">{t('exp.error')}</p>
        </BrutalCard>
      ) : (
        <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-2">
          {items.map((exp, i) => {
            const tones = ['yellow', 'pink', 'blue', 'green'] as const
            const tone = tones[i % tones.length]
            return (
              <li key={exp.key}>
                <BrutalCard tone={tone} shadow="lg" press className="p-8 h-full">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest brutal-border-2 bg-ink text-cream px-3 py-1.5">
                      {exp.year}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-70">
                      #{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl uppercase leading-none">{exp.role}</h3>
                  <p className="mt-2 font-mono text-sm font-bold">{exp.company}</p>

                  <ul className="mt-6 space-y-3">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="flex gap-3 text-base">
                        <span className="font-display text-lg leading-none mt-1">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 brutal-border-t">
                    <p className="font-mono text-[0.65rem] font-bold uppercase tracking-widest opacity-70 mb-1">
                      {t('exp.stackLabel')}
                    </p>
                    <p className="font-mono text-sm font-bold">{exp.tech}</p>
                  </div>
                </BrutalCard>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}
