import type { H3Event } from 'h3'

export function checkAdminAuth(event: H3Event) {
  const authHeader = getHeader(event, 'Authorization')
  const adminSecret = process.env.ADMIN_SECRET

  if (!adminSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Admin secret not configured'
    })
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Missing or invalid authorization header'
    })
  }

  const token = authHeader.substring(7)
  
  if (token !== adminSecret) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden - Invalid admin token'
    })
  }

  return true
}

export function checkAdminAuthFlexible(event: H3Event) {
  const query = getQuery(event)
  const authHeader = getHeader(event, 'Authorization')
  const adminSecret = process.env.ADMIN_SECRET

  if (!adminSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Admin secret not configured'
    })
  }

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    if (token === adminSecret) {
      return true
    }
  }

  if (query.secret && query.secret === adminSecret) {
    return true
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Unauthorized - Invalid or missing admin credentials'
  })
}

