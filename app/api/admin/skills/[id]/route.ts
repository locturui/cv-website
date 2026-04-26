import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { skills } from '@/lib/db/schema'
import { checkAdminAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request)
  if (!auth.ok) return auth.response

  const { id } = await params
  const body = await request.json()
  const updates: Record<string, unknown> = { updatedAt: new Date() }
  for (const k of ['name', 'icon', 'category', 'order'] as const) {
    if (body[k] !== undefined) updates[k] = body[k]
  }

  try {
    const db = getDb()
    const [updated] = await db
      .update(skills)
      .set(updates)
      .where(eq(skills.id, parseInt(id)))
      .returning()
    if (!updated) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
    }
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating skill:', error)
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request)
  if (!auth.ok) return auth.response

  const { id } = await params
  try {
    const db = getDb()
    const [deleted] = await db
      .delete(skills)
      .where(eq(skills.id, parseInt(id)))
      .returning()
    if (!deleted) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}
