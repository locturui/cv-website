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

  try {
    const db = useDatabase()

    const deleted = await db
      .delete(projects)
      .where(eq(projects.id, parseInt(id)))
      .returning()

    if (deleted.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }

    return {
      success: true,
      message: 'Project deleted successfully',
      project: deleted[0]
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Error deleting project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete project',
      data: error.message
    })
  }
})

