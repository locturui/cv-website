import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

let client: ReturnType<typeof postgres> | null = null
let db: ReturnType<typeof drizzle> | null = null

export function useDatabase() {
  if (!db) {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL

    if (!connectionString) {
      const errorMessage = "DATABASE_URL or POSTGRES_URL environment variable is not set".trim()
      
      throw new Error(errorMessage)
    }

    try {
      client = postgres(connectionString, {
        max: 10,
        idle_timeout: 20,
        connect_timeout: 10,
      })
      db = drizzle(client, { schema })
      console.log('Database connected successfully')
    } catch (error) {
      console.error('Failed to connect to database:', error)
      throw error
    }
  }

  return db
}

export { schema }

