import { setRequestLocale, getTranslations } from 'next-intl/server'
import { asc } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { projects } from '@/lib/db/schema'
import { pickLocalised } from '@/lib/date-formatter'
import { SectionHeader } from '@/components/section-header'
import { ProjectsGrid, type ProjectListItem } from '@/components/projects-grid'

export const dynamic = 'force-dynamic'

async function fetchProjects(locale: string): Promise<ProjectListItem[]> {
  try {
    const db = getDb()
    const rows = await db.select().from(projects).orderBy(asc(projects.order), asc(projects.id))
    return rows.map((p) => ({
      key: p.key,
      title: pickLocalised(locale, p.titleEn, p.titleRu, p.titleKo, p.titleEs),
      desc: pickLocalised(locale, p.descEn, p.descRu, p.descKo, p.descEs),
      description: pickLocalised(locale, p.descriptionEn, p.descriptionRu, p.descriptionKo, p.descriptionEs),
      image: p.image,
      images: safeParse(p.images, []),
      stack: safeParse(p.stack, []),
      githubLink: p.githubLink || undefined,
      deployLink: p.deployLink || undefined,
    }))
  } catch (e) {
    console.error('Projects fetch failed', e)
    return []
  }
}

function safeParse<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const items = await fetchProjects(locale)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <SectionHeader eyebrow="03 / Selected work" title={t('proj.title')} accent="green" />
      <ProjectsGrid projects={items} />
    </section>
  )
}
