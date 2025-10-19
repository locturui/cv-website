import { checkAdminAuthFlexible } from '~/server/utils/auth'
import { useDatabase } from '~/server/database/client'
import { projects } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  checkAdminAuthFlexible(event)

  try {
    const db = useDatabase()
    const allProjects = await db.select().from(projects)

    return allProjects.map(project => ({
      id: project.id,
      key: project.key,
      titleEn: project.titleEn,
      titleRu: project.titleRu,
      descEn: project.descEn,
      descRu: project.descRu,
      descriptionEn: project.descriptionEn,
      descriptionRu: project.descriptionRu,
      link: project.link || '',
      image: project.image,
      images: JSON.parse(project.images),
      stack: JSON.parse(project.stack),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    }))
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Error fetching projects:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch projects'
    })
  }
})

