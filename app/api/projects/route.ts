import { NextResponse } from 'next/server'
import { asc } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { projects } from '@/lib/db/schema'
import { pickLocalised } from '@/lib/date-formatter'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const locale = url.searchParams.get('locale') || 'en'

    const db = getDb()
    const all = await db.select().from(projects).orderBy(asc(projects.order), asc(projects.id))

    const data = all.map((p) => ({
      key: p.key,
      title: pickLocalised(locale, p.titleEn, p.titleRu, p.titleKo, p.titleEs),
      desc: pickLocalised(locale, p.descEn, p.descRu, p.descKo, p.descEs),
      description: pickLocalised(locale, p.descriptionEn, p.descriptionRu, p.descriptionKo, p.descriptionEs),
      link: p.link || '',
      githubLink: p.githubLink || '',
      deployLink: p.deployLink || '',
      image: p.image,
      images: JSON.parse(p.images),
      stack: JSON.parse(p.stack),
    }))

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
