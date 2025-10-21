import { checkAdminAuthFlexible } from '~/server/utils/auth'
import { useDatabase } from '~/server/database/client'
import { skills } from '~/server/database/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  checkAdminAuthFlexible(event)

  try {
    const db = useDatabase()
    const allSkills = await db.select().from(skills).orderBy(asc(skills.order))
    return allSkills
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Error fetching skills:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch skills'
    })
  }
})

