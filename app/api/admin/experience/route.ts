import { NextResponse } from 'next/server'
import { asc } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { experience } from '@/lib/db/schema'
import { checkAdminAuth, checkAdminAuthFlexible } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const auth = checkAdminAuthFlexible(request)
  if (!auth.ok) return auth.response

  try {
    const db = getDb()
    const all = await db.select().from(experience).orderBy(asc(experience.order))
    return NextResponse.json(all)
  } catch (error) {
    console.error('Error fetching experience:', error)
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = checkAdminAuth(request)
  if (!auth.ok) return auth.response

  const body = await request.json()
  try {
    const db = getDb()
    const [created] = await db
      .insert(experience)
      .values({
        key: body.key,
        year: body.year || '',
        startMonth: body.startMonth ?? null,
        startYear: body.startYear ?? null,
        endMonth: body.endMonth ?? null,
        endYear: body.endYear ?? null,
        isPresent: body.isPresent ?? 0,
        roleEn: body.roleEn,
        roleRu: body.roleRu,
        roleKo: body.roleKo || null,
        companyEn: body.companyEn,
        companyRu: body.companyRu,
        companyKo: body.companyKo || null,
        bulletsEn: body.bulletsEn,
        bulletsRu: body.bulletsRu,
        bulletsKo: body.bulletsKo || null,
        techEn: body.techEn,
        techRu: body.techRu,
        techKo: body.techKo || null,
        roleEs: body.roleEs || null,
        companyEs: body.companyEs || null,
        bulletsEs: body.bulletsEs || null,
        techEs: body.techEs || null,
        order: body.order ?? 999,
      })
      .returning()
    return NextResponse.json(created)
  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}
