import { checkAdminAuth } from '~/server/utils/auth'
import { useDatabase } from '~/server/database/client'
import { experience } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  checkAdminAuth(event)

  const id = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)

  try {
    const db = useDatabase()
    const updates: any = { updatedAt: new Date() }

    if (body.key !== undefined) updates.key = body.key
    if (body.year !== undefined) updates.year = body.year
    if (body.startMonth !== undefined) updates.startMonth = body.startMonth
    if (body.startYear !== undefined) updates.startYear = body.startYear
    if (body.endMonth !== undefined) updates.endMonth = body.endMonth
    if (body.endYear !== undefined) updates.endYear = body.endYear
    if (body.isPresent !== undefined) updates.isPresent = body.isPresent
    if (body.roleEn !== undefined) updates.roleEn = body.roleEn
    if (body.roleRu !== undefined) updates.roleRu = body.roleRu
    if (body.roleKo !== undefined) updates.roleKo = body.roleKo
    if (body.companyEn !== undefined) updates.companyEn = body.companyEn
    if (body.companyRu !== undefined) updates.companyRu = body.companyRu
    if (body.companyKo !== undefined) updates.companyKo = body.companyKo
    if (body.bulletsEn !== undefined) updates.bulletsEn = body.bulletsEn
    if (body.bulletsRu !== undefined) updates.bulletsRu = body.bulletsRu
    if (body.bulletsKo !== undefined) updates.bulletsKo = body.bulletsKo
    if (body.techEn !== undefined) updates.techEn = body.techEn
    if (body.techRu !== undefined) updates.techRu = body.techRu
    if (body.techKo !== undefined) updates.techKo = body.techKo
    if (body.order !== undefined) updates.order = body.order

    const [updated] = await db
      .update(experience)
      .set(updates)
      .where(eq(experience.id, id))
      .returning()

    if (!updated) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Experience not found'
      })
    }

    return updated
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Error updating experience:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update experience'
    })
  }
})

