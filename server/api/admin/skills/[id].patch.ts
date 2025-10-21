import { checkAdminAuth } from '~/server/utils/auth'
import { useDatabase } from '~/server/database/client'
import { skills } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  checkAdminAuth(event)

  const id = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)

  try {
    const db = useDatabase()
    const updates: any = { updatedAt: new Date() }

    if (body.name !== undefined) updates.name = body.name
    if (body.icon !== undefined) updates.icon = body.icon
    if (body.category !== undefined) updates.category = body.category
    if (body.order !== undefined) updates.order = body.order

    const [updated] = await db
      .update(skills)
      .set(updates)
      .where(eq(skills.id, id))
      .returning()

    if (!updated) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Skill not found'
      })
    }

    return updated
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Error updating skill:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update skill'
    })
  }
})

