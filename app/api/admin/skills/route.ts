import { NextResponse } from 'next/server'
import { asc } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { skills } from '@/lib/db/schema'
import { checkAdminAuth, checkAdminAuthFlexible } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const auth = checkAdminAuthFlexible(request)
  if (!auth.ok) return auth.response

  try {
    const db = getDb()
    const all = await db.select().from(skills).orderBy(asc(skills.order))
    return NextResponse.json(all)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = checkAdminAuth(request)
  if (!auth.ok) return auth.response

  const body = await request.json()
  try {
    const db = getDb()
    const [created] = await db
      .insert(skills)
      .values({
        name: body.name,
        icon: body.icon,
        category: body.category,
        order: body.order ?? 999,
      })
      .returning()
    return NextResponse.json(created)
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}
