import { checkAdminAuth } from '~/server/utils/auth'
import { useDatabase } from '~/server/database/client'
import { experience } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  checkAdminAuth(event)

  const body = await readBody(event)

  try {
    const db = useDatabase()
    const [newExperience] = await db.insert(experience).values({
      key: body.key,
      year: body.year,
      roleEn: body.roleEn,
      roleRu: body.roleRu,
      companyEn: body.companyEn,
      companyRu: body.companyRu,
      bulletsEn: body.bulletsEn,
      bulletsRu: body.bulletsRu,
      techEn: body.techEn,
      techRu: body.techRu,
      order: body.order || 999
    }).returning()

    return newExperience
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Error creating experience:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create experience'
    })
  }
})

