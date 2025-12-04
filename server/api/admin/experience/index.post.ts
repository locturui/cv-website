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
      year: body.year || '',
      startMonth: body.startMonth || null,
      startYear: body.startYear || null,
      endMonth: body.endMonth || null,
      endYear: body.endYear || null,
      isPresent: body.isPresent || 0,
      roleEn: body.roleEn,
      roleRu: body.roleRu,
      roleKo: body.roleKo || null,
      companyEn: body.companyEn,
      companyRu: body.companyRu,
      companyKo: body.companyKo || null,
      bulletsEn: body.bulletsEn,
      bulletsRu: body.bulletsRu,
      bulletsKo: body.bulletsKo || null,
      techEn: body.techEn,
      techRu: body.techRu,
      techKo: body.techKo || null,
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

