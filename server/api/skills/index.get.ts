import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { skills } from '~/server/database/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!connectionString) {
    throw createError({
      statusCode: 500,
      message: 'Database connection not configured'
    })
  }

  const client = postgres(connectionString)
  const db = drizzle(client, { schema: { skills } })

  try {
    const allSkills = await db.select().from(skills).orderBy(asc(skills.order))
    
    return {
      frontend: allSkills.filter(s => s.category === 'frontend'),
      backend: allSkills.filter(s => s.category === 'backend'),
      devops: allSkills.filter(s => s.category === 'devops')
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch skills'
    })
  } finally {
    await client.end()
  }
})

