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
      titleKo: project.titleKo,
      descEn: project.descEn,
      descRu: project.descRu,
      descKo: project.descKo,
      descriptionEn: project.descriptionEn,
      descriptionRu: project.descriptionRu,
      descriptionKo: project.descriptionKo,
      link: project.link || '',
      githubLink: project.githubLink || '',
      deployLink: project.deployLink || '',
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

