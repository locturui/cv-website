import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { skills } from '@/lib/db/schema'
import { checkAdminAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const auth = checkAdminAuth(request)
  if (!auth.ok) return auth.response

  const body = await request.json()
  const updates = body?.updates
  if (!Array.isArray(updates)) {
    return NextResponse.json(
      { error: 'Invalid request body. Expected array of updates.' },
      { status: 400 }
    )
  }

  try {
    const db = getDb()
    let count = 0
    for (const u of updates) {
      if (!u.id || u.order === undefined) continue
      const [updated] = await db
        .update(skills)
        .set({ order: u.order, updatedAt: new Date() })
        .where(eq(skills.id, u.id))
        .returning()
      if (updated) count += 1
    }
    return NextResponse.json({ success: true, updated: count })
  } catch (error) {
    console.error('Error reordering skills:', error)
    return NextResponse.json({ error: 'Failed to reorder skills' }, { status: 500 })
  }
}
