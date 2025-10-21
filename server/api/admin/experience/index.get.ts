import { checkAdminAuthFlexible } from '~/server/utils/auth'
import { useDatabase } from '~/server/database/client'
import { experience } from '~/server/database/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  checkAdminAuthFlexible(event)

  try {
    const db = useDatabase()
    const experiences = await db.select().from(experience).orderBy(asc(experience.order))
    return experiences
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Error fetching experience:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch experience'
    })
  }
})

