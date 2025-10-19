import { put } from '@vercel/blob'
import { checkAdminAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  checkAdminAuth(event)

  try {
    const form = await readMultipartFormData(event)

    if (!form || form.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file provided'
      })
    }

    const file = form[0]

    if (!file.filename || !file.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file'
      })
    }

    const blob = await put(file.filename, file.data, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    })

    return {
      success: true,
      url: blob.url,
      filename: file.filename
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Upload error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload file',
      data: error.message
    })
  }
})

