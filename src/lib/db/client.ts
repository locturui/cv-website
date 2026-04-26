import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

type DbInstance = PostgresJsDatabase<typeof schema>

declare global {
  // eslint-disable-next-line no-var
  var __pg_client: ReturnType<typeof postgres> | undefined
  // eslint-disable-next-line no-var
  var __pg_db: DbInstance | undefined
}

export function getDb(): DbInstance {
  if (!global.__pg_db) {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
    if (!connectionString) {
      throw new Error('DATABASE_URL or POSTGRES_URL environment variable is not set')
    }
    global.__pg_client = postgres(connectionString, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    })
    global.__pg_db = drizzle(global.__pg_client, { schema })
  }
  return global.__pg_db
}

export { schema }
