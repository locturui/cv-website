import { NextResponse } from 'next/server'

export type AuthOk = { ok: true }
export type AuthFail = { ok: false; response: NextResponse }
export type AuthResult = AuthOk | AuthFail

function readSecret(): string | null {
  return process.env.ADMIN_SECRET || null
}

export function checkAdminAuth(request: Request): AuthResult {
  const adminSecret = readSecret()
  if (!adminSecret) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Admin secret not configured' }, { status: 500 }),
    }
  }
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Unauthorized - Missing or invalid authorization header' },
        { status: 401 }
      ),
    }
  }
  const token = authHeader.slice(7)
  if (token !== adminSecret) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Forbidden - Invalid admin token' }, { status: 403 }),
    }
  }
  return { ok: true }
}

/** Same as checkAdminAuth but also accepts ?secret=... in the URL (used for browser-side fetches). */
export function checkAdminAuthFlexible(request: Request): AuthResult {
  const adminSecret = readSecret()
  if (!adminSecret) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Admin secret not configured' }, { status: 500 }),
    }
  }
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7)
    if (token === adminSecret) return { ok: true }
  }
  const url = new URL(request.url)
  const querySecret = url.searchParams.get('secret')
  if (querySecret && querySecret === adminSecret) return { ok: true }

  return {
    ok: false,
    response: NextResponse.json(
      { error: 'Unauthorized - Invalid or missing admin credentials' },
      { status: 401 }
    ),
  }
}
