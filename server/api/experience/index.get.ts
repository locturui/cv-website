import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { experience } from '~/server/database/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const locale = (query.locale as string) || 'en'

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!connectionString) {
    throw createError({
      statusCode: 500,
      message: 'Database connection not configured'
    })
  }

  const client = postgres(connectionString)
  const db = drizzle(client, { schema: { experience } })

  try {
    const experiences = await db.select().from(experience).orderBy(asc(experience.order))

    return experiences.map((exp) => ({
      key: exp.key,
      year: exp.year,
      role: locale === 'ru' ? exp.roleRu : exp.roleEn,
      company: locale === 'ru' ? exp.companyRu : exp.companyEn,
      bullets: JSON.parse(locale === 'ru' ? exp.bulletsRu : exp.bulletsEn),
      tech: locale === 'ru' ? exp.techRu : exp.techEn
    }))
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch experience'
    })
  } finally {
    await client.end()
  }
})

