import { checkAdminAuth } from '~/server/utils/auth'
import { useDatabase } from '~/server/database/client'
import { skills } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  checkAdminAuth(event)

  const body = await readBody(event)

  try {
    const db = useDatabase()
    const [newSkill] = await db.insert(skills).values({
      name: body.name,
      icon: body.icon,
      category: body.category,
      order: body.order || 999
    }).returning()

    return newSkill
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Error creating skill:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create skill'
    })
  }
})

