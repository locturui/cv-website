import { checkAdminAuth } from '~/server/utils/auth'
import { useDatabase } from '~/server/database/client'
import { projects } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  checkAdminAuth(event)

  const body = await readBody(event)

  if (!body.key || !body.titleEn || !body.titleRu) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: key, titleEn, titleRu'
    })
  }

  try {
    const db = useDatabase()

    const newProject = await db.insert(projects).values({
      key: body.key,
      titleEn: body.titleEn,
      titleRu: body.titleRu,
      descEn: body.descEn || '',
      descRu: body.descRu || '',
      descriptionEn: body.descriptionEn || '',
      descriptionRu: body.descriptionRu || '',
      link: body.link || null,
      image: body.image || '',
      images: JSON.stringify(body.images || []),
      stack: JSON.stringify(body.stack || [])
    }).returning()

    return {
      success: true,
      project: newProject[0]
    }
  } catch (error: any) {
    console.error('Error creating project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create project',
      data: error.message
    })
  }
})

