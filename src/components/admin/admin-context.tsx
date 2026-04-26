'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type AdminContextValue = {
  secret: string | null
  authed: boolean
  ready: boolean
  authError: string
  login: (s: string) => Promise<void>
  logout: () => void
}

const Ctx = createContext<AdminContextValue | null>(null)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [secret, setSecret] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [authError, setAuthError] = useState('')

  const verify = useCallback(async (s: string) => {
    const res = await fetch(`/api/admin/projects?secret=${encodeURIComponent(s)}`)
    if (!res.ok) throw new Error('invalid')
  }, [])

  useEffect(() => {
    let cancelled = false
    const stored = typeof window !== 'undefined' ? localStorage.getItem('admin_secret') : null
    if (!stored) {
      setReady(true)
      return
    }
    verify(stored)
      .then(() => {
        if (!cancelled) setSecret(stored)
      })
      .catch(() => {
        if (!cancelled) localStorage.removeItem('admin_secret')
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [verify])

  const login = useCallback(
    async (s: string) => {
      setAuthError('')
      try {
        await verify(s)
        localStorage.setItem('admin_secret', s)
        setSecret(s)
      } catch {
        setAuthError('Invalid password')
        throw new Error('invalid')
      }
    },
    [verify]
  )

  const logout = useCallback(() => {
    localStorage.removeItem('admin_secret')
    setSecret(null)
  }, [])

  const value = useMemo(
    () => ({
      secret,
      authed: !!secret,
      ready,
      authError,
      login,
      logout,
    }),
    [secret, ready, authError, login, logout]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAdmin() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
