import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { projects } from '@/lib/db/schema'
import { checkAdminAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request)
  if (!auth.ok) return auth.response

  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
  }

  const body = await request.json()
  const updateData: Record<string, unknown> = {}
  for (const k of [
    'key',
    'titleEn',
    'titleRu',
    'titleKo',
    'descEn',
    'descRu',
    'descKo',
    'descriptionEn',
    'descriptionRu',
    'descriptionKo',
    'titleEs',
    'descEs',
    'descriptionEs',
    'order',
    'link',
    'githubLink',
    'deployLink',
    'image',
  ] as const) {
    if (body[k] !== undefined) updateData[k] = body[k]
  }
  if (body.images !== undefined) updateData.images = JSON.stringify(body.images)
  if (body.stack !== undefined) updateData.stack = JSON.stringify(body.stack)
  updateData.updatedAt = new Date()

  try {
    const db = getDb()
    const updated = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, parseInt(id)))
      .returning()

    if (updated.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, project: updated[0] })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request)
  if (!auth.ok) return auth.response

  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
  }

  try {
    const db = getDb()
    const deleted = await db
      .delete(projects)
      .where(eq(projects.id, parseInt(id)))
      .returning()

    if (deleted.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, project: deleted[0] })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
