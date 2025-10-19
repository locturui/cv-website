import { eq } from 'drizzle-orm'
import { checkAdminAuth } from '~/server/utils/auth'
import { useDatabase } from '~/server/database/client'
import { projects } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  checkAdminAuth(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Project ID is required'
    })
  }

  const body = await readBody(event)

  try {
    const db = useDatabase()

    const updateData: any = {}
    if (body.key !== undefined) updateData.key = body.key
    if (body.titleEn !== undefined) updateData.titleEn = body.titleEn
    if (body.titleRu !== undefined) updateData.titleRu = body.titleRu
    if (body.descEn !== undefined) updateData.descEn = body.descEn
    if (body.descRu !== undefined) updateData.descRu = body.descRu
    if (body.descriptionEn !== undefined) updateData.descriptionEn = body.descriptionEn
    if (body.descriptionRu !== undefined) updateData.descriptionRu = body.descriptionRu
    if (body.link !== undefined) updateData.link = body.link
    if (body.image !== undefined) updateData.image = body.image
    if (body.images !== undefined) updateData.images = JSON.stringify(body.images)
    if (body.stack !== undefined) updateData.stack = JSON.stringify(body.stack)
    updateData.updatedAt = new Date()

    const updated = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, parseInt(id)))
      .returning()

    if (updated.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }

    return {
      success: true,
      project: updated[0]
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Error updating project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update project',
      data: error.message
    })
  }
})

