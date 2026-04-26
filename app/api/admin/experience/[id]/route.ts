import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { experience } from '@/lib/db/schema'
import { checkAdminAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const FIELDS = [
  'key',
  'year',
  'startMonth',
  'startYear',
  'endMonth',
  'endYear',
  'isPresent',
  'roleEn',
  'roleRu',
  'roleKo',
  'companyEn',
  'companyRu',
  'companyKo',
  'bulletsEn',
  'bulletsRu',
  'bulletsKo',
  'techEn',
  'techRu',
  'techKo',
  'roleEs',
  'companyEs',
  'bulletsEs',
  'techEs',
  'order',
] as const

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request)
  if (!auth.ok) return auth.response

  const { id } = await params
  const body = await request.json()
  const updates: Record<string, unknown> = { updatedAt: new Date() }
  for (const k of FIELDS) {
    if (body[k] !== undefined) updates[k] = body[k]
  }

  try {
    const db = getDb()
    const [updated] = await db
      .update(experience)
      .set(updates)
      .where(eq(experience.id, parseInt(id)))
      .returning()
    if (!updated) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
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
      .delete(experience)
      .where(eq(experience.id, parseInt(id)))
      .returning()
    if (!deleted) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
