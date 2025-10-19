import { eq } from 'drizzle-orm'
import { useDatabase } from '~/server/database/client'
import { projects } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  try {
    const key = getRouterParam(event, 'key')
    
    if (!key) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Project key is required'
      })
    }

    const db = useDatabase()
    const result = await db.select().from(projects).where(eq(projects.key, key)).limit(1)

    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }

    const project = result[0]

    const query = getQuery(event)
    const locale = (query.locale as string) || 'en'

    return {
      key: project.key,
      title: locale === 'ru' ? project.titleRu : project.titleEn,
      desc: locale === 'ru' ? project.descRu : project.descEn,
      description: locale === 'ru' ? project.descriptionRu : project.descriptionEn,
      link: project.link || '',
      image: project.image,
      images: JSON.parse(project.images),
      stack: JSON.parse(project.stack)
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error fetching project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch project'
    })
  }
})

