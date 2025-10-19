import { useDatabase } from '~/server/database/client'
import { projects } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  try {
    const db = useDatabase()
    const allProjects = await db.select().from(projects)

    const query = getQuery(event)
    const locale = (query.locale as string) || 'en'

    return allProjects.map(project => ({
      key: project.key,
      title: locale === 'ru' ? project.titleRu : project.titleEn,
      desc: locale === 'ru' ? project.descRu : project.descEn,
      description: locale === 'ru' ? project.descriptionRu : project.descriptionEn,
      link: project.link || '',
      image: project.image,
      images: JSON.parse(project.images),
      stack: JSON.parse(project.stack)
    }))
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch projects'
    })
  }
})

