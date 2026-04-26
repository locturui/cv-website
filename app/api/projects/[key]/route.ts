import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { projects } from '@/lib/db/schema'
import { pickLocalised } from '@/lib/date-formatter'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params
    if (!key) {
      return NextResponse.json({ error: 'Project key is required' }, { status: 400 })
    }

    const url = new URL(request.url)
    const locale = url.searchParams.get('locale') || 'en'

    const db = getDb()
    const result = await db.select().from(projects).where(eq(projects.key, key)).limit(1)

    if (result.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const p = result[0]
    return NextResponse.json({
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
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}
