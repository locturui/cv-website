import { NextResponse } from 'next/server'
import { asc } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { experience } from '@/lib/db/schema'
import { formatExperienceDate, pickLocalised } from '@/lib/date-formatter'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const locale = url.searchParams.get('locale') || 'en'

    const db = getDb()
    const all = await db.select().from(experience).orderBy(asc(experience.order))

    const data = all.map((exp) => {
      const formattedYear =
        exp.startMonth && exp.startYear
          ? formatExperienceDate(
              exp.startMonth,
              exp.startYear,
              exp.endMonth,
              exp.endYear,
              exp.isPresent,
              locale
            )
          : exp.year

      const bulletsRaw = pickLocalised(
        locale,
        exp.bulletsEn,
        exp.bulletsRu,
        exp.bulletsKo,
        exp.bulletsEs
      )

      return {
        key: exp.key,
        year: formattedYear,
        role: pickLocalised(locale, exp.roleEn, exp.roleRu, exp.roleKo, exp.roleEs),
        company: pickLocalised(locale, exp.companyEn, exp.companyRu, exp.companyKo, exp.companyEs),
        bullets: JSON.parse(bulletsRaw || '[]'),
        tech: pickLocalised(locale, exp.techEn, exp.techRu, exp.techKo, exp.techEs),
      }
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching experience:', error)
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 })
  }
}
