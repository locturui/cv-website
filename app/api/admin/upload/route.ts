import { NextResponse } from 'next/server'
import { put, head } from '@vercel/blob'
import { checkAdminAuth } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const auth = checkAdminAuth(request)
  if (!auth.ok) return auth.response

  try {
    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const filename = file.name
    if (!filename) {
      return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
    }

    // Try to find an existing blob by filename, return its URL if present
    try {
      const existing = await head(filename, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
      if (existing) {
        return NextResponse.json({
          success: true,
          url: existing.url,
          filename,
          existing: true,
        })
      }
    } catch {
      // not found - proceed with upload
    }

    const blob = await put(filename, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename,
      existing: false,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
