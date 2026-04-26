import { NextResponse } from 'next/server'
import { asc } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { skills } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = getDb()
    const all = await db.select().from(skills).orderBy(asc(skills.order))
    return NextResponse.json({
      frontend: all.filter((s) => s.category === 'frontend'),
      backend: all.filter((s) => s.category === 'backend'),
      devops: all.filter((s) => s.category === 'devops'),
    })
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}
