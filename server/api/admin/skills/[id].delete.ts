import { checkAdminAuth } from '~/server/utils/auth'
import { useDatabase } from '~/server/database/client'
import { skills } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  checkAdminAuth(event)

  const id = parseInt(getRouterParam(event, 'id') || '0')

  try {
    const db = useDatabase()
    const [deleted] = await db
      .delete(skills)
      .where(eq(skills.id, id))
      .returning()

    if (!deleted) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Skill not found'
      })
    }

    return { success: true }
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Error deleting skill:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete skill'
    })
  }
})

