import { setRequestLocale, getTranslations } from 'next-intl/server'
import { asc } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { skills } from '@/lib/db/schema'
import { SectionHeader } from '@/components/section-header'

export const dynamic = 'force-dynamic'

type SkillRow = { id: number; name: string; icon: string; category: string; order: number }

async function fetchSkills() {
  try {
    const db = getDb()
    const all = await db.select().from(skills).orderBy(asc(skills.order))
    return {
      frontend: all.filter((s) => s.category === 'frontend'),
      backend: all.filter((s) => s.category === 'backend'),
      devops: all.filter((s) => s.category === 'devops'),
    }
  } catch (e) {
    console.error(e)
    return { frontend: [], backend: [], devops: [] }
  }
}

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const data = await fetchSkills()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <SectionHeader eyebrow="02 / Toolkit" title={t('skills.title')} accent="pink" />

      <div className="space-y-12 sm:space-y-16">
        <SkillStripe
          index="01"
          label={t('skills.frontend')}
          tone="yellow"
          skills={data.frontend}
        />
        <SkillStripe
          index="02"
          label={t('skills.backend')}
          tone="blue"
          skills={data.backend}
        />
        <SkillStripe
          index="03"
          label={t('skills.devops')}
          tone="pink"
          skills={data.devops}
        />
      </div>
    </section>
  )
}

const TONE_BG: Record<'yellow' | 'blue' | 'pink', string> = {
  yellow: 'bg-brutal-yellow text-ink',
  blue: 'bg-brutal-blue text-cream',
  pink: 'bg-brutal-pink text-cream',
}

function SkillStripe({
  index,
  label,
  tone,
  skills,
}: {
  index: string
  label: string
  tone: 'yellow' | 'blue' | 'pink'
  skills: SkillRow[]
}) {
  if (!skills.length) return null
  return (
    <article className="brutal-border brutal-shadow bg-cream">
      <header
        className={`flex items-center justify-between gap-4 px-5 sm:px-8 py-4 brutal-border-b ${TONE_BG[tone]}`}
      >
        <div className="flex items-baseline gap-4 min-w-0">
          <span className="font-mono text-xs sm:text-sm font-bold tracking-widest opacity-70">
            {index}
          </span>
          <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-tight truncate">
            {label}
          </h3>
        </div>
        <span className="font-mono text-xs sm:text-sm font-bold tracking-widest shrink-0">
          [{String(skills.length).padStart(2, '0')}]
        </span>
      </header>

      <ul className="px-5 sm:px-8 py-6 sm:py-8 flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-2 sm:gap-y-3">
        {skills.map((s, i) => (
          <li
            key={s.id}
            className="flex items-baseline gap-2 max-w-full min-w-0 font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-none"
          >
            <span className="font-mono text-[0.5em] font-bold opacity-40 tabular-nums shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ overflowWrap: 'anywhere' }}>{s.name}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
