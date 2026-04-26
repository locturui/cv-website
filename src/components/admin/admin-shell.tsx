'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Briefcase, FolderKanban, Sparkles, LogOut, ArrowLeft } from 'lucide-react'
import { useAdmin } from './admin-context'

export function AdminShell({ children }: { children: ReactNode }) {
  const { ready, authed, login, authError } = useAdmin()
  const [pwd, setPwd] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!ready) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="font-mono text-sm uppercase tracking-widest">Checking…</div>
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center px-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (!pwd) return
            setSubmitting(true)
            try {
              await login(pwd)
            } catch {
              /* error already surfaced */
            } finally {
              setSubmitting(false)
            }
          }}
          className="brutal-border brutal-shadow bg-cream p-8 w-full max-w-md"
        >
          <h1 className="font-display text-4xl uppercase mb-2">Admin</h1>
          <p className="font-mono text-xs uppercase tracking-widest mb-6 opacity-70">
            Restricted area
          </p>
          <input
            type="password"
            autoFocus
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Password"
            className="w-full brutal-border-2 bg-paper px-4 py-3 font-mono focus:outline-none focus:bg-brutal-yellow"
          />
          {authError ? (
            <p className="mt-3 font-mono text-sm text-brutal-red font-bold">{authError}</p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full font-display uppercase text-lg py-3 bg-ink text-cream brutal-border brutal-shadow brutal-press disabled:opacity-50"
          >
            {submitting ? 'Checking…' : 'Enter'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-10 max-w-full overflow-x-auto">{children}</main>
    </div>
  )
}

function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAdmin()

  const items = [
    { href: '/admin', label: 'Projects', icon: FolderKanban, exact: true },
    { href: '/admin/experience', label: 'Experience', icon: Briefcase },
    { href: '/admin/skills', label: 'Skills', icon: Sparkles },
  ]

  return (
    <aside className="md:w-64 md:min-h-screen brutal-border-b md:brutal-border-b-0 md:border-r-4 md:border-ink bg-cream p-6">
      <Link href="/admin" className="block mb-8">
        <span className="brutal-border-2 brutal-shadow-sm bg-brutal-yellow inline-block px-3 py-1 font-display text-2xl uppercase">
          Admin
        </span>
      </Link>
      <nav className="space-y-2">
        {items.map((it) => {
          const active = it.exact ? pathname === it.href : pathname.startsWith(it.href)
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 px-4 py-3 brutal-border-2 font-mono uppercase text-sm font-bold transition-colors ${
                active
                  ? 'bg-ink text-cream'
                  : 'bg-cream hover:bg-brutal-yellow'
              }`}
            >
              <it.icon className="w-4 h-4" />
              {it.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-10 pt-6 brutal-border-t space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 brutal-border-2 bg-cream font-mono uppercase text-sm font-bold hover:bg-brutal-yellow"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 brutal-border-2 bg-cream font-mono uppercase text-sm font-bold hover:bg-brutal-red hover:text-cream transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
