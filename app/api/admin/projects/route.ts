import { NextResponse } from 'next/server'
import { asc } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { projects } from '@/lib/db/schema'
import { checkAdminAuth, checkAdminAuthFlexible } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const auth = checkAdminAuthFlexible(request)
  if (!auth.ok) return auth.response

  try {
    const db = getDb()
    const all = await db.select().from(projects).orderBy(asc(projects.order), asc(projects.id))
    return NextResponse.json(
      all.map((p) => ({
        id: p.id,
        key: p.key,
        titleEn: p.titleEn,
        titleRu: p.titleRu,
        titleKo: p.titleKo,
        descEn: p.descEn,
        descRu: p.descRu,
        descKo: p.descKo,
        descriptionEn: p.descriptionEn,
        descriptionRu: p.descriptionRu,
        descriptionKo: p.descriptionKo,
        titleEs: p.titleEs,
        descEs: p.descEs,
        descriptionEs: p.descriptionEs,
        order: p.order,
        link: p.link || '',
        githubLink: p.githubLink || '',
        deployLink: p.deployLink || '',
        image: p.image,
        images: JSON.parse(p.images),
        stack: JSON.parse(p.stack),
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }))
    )
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = checkAdminAuth(request)
  if (!auth.ok) return auth.response

  const body = await request.json()
  if (!body.key || !body.titleEn || !body.titleRu) {
    return NextResponse.json(
      { error: 'Missing required fields: key, titleEn, titleRu' },
      { status: 400 }
    )
  }

  try {
    const db = getDb()
    const [created] = await db
      .insert(projects)
      .values({
        key: body.key,
        titleEn: body.titleEn,
        titleRu: body.titleRu,
        titleKo: body.titleKo,
        descEn: body.descEn || '',
        descRu: body.descRu || '',
        descKo: body.descKo || '',
        descriptionEn: body.descriptionEn || '',
        descriptionRu: body.descriptionRu || '',
        descriptionKo: body.descriptionKo || '',
        titleEs: body.titleEs || null,
        descEs: body.descEs || null,
        descriptionEs: body.descriptionEs || null,
        order: body.order ?? 999,
        link: body.link || null,
        githubLink: body.githubLink || null,
        deployLink: body.deployLink || null,
        image: body.image || '',
        images: JSON.stringify(body.images || []),
        stack: JSON.stringify(body.stack || []),
      })
      .returning()

    return NextResponse.json({ success: true, project: created })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
