import { checkAdminAuth } from '~/server/utils/auth'
import { useDatabase } from '~/server/database/client'
import { skills } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  checkAdminAuth(event)

  const body = await readBody(event)
  const { updates } = body

  if (!Array.isArray(updates)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body. Expected array of updates.'
    })
  }

  try {
    const db = useDatabase()
    const results = []

    for (const update of updates) {
      if (!update.id || update.order === undefined) {
        continue
      }

      const [updated] = await db
        .update(skills)
        .set({ 
          order: update.order,
          updatedAt: new Date()
        })
        .where(eq(skills.id, update.id))
        .returning()

      if (updated) {
        results.push(updated)
      }
    }

    return { success: true, updated: results.length }
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Error reordering skills:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to reorder skills'
    })
  }
})

