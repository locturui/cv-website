'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { LanguageSwitcher } from './language-switcher'
import { dispatchBrutalNavStart } from './page-transition'
import { Github, Menu, X } from 'lucide-react'

export function SiteHeader() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const navItems: { href: '/' | '/skills' | '/experience' | '/projects' | '/contact'; label: string }[] = [
    { href: '/', label: t('home') },
    { href: '/skills', label: t('skills') },
    { href: '/experience', label: t('exp') },
    { href: '/projects', label: t('projects') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <>
      <header className="sticky top-0 z-30 bg-cream brutal-border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap group-hover:-translate-y-0.5 transition-transform">
              <span className="block w-2 h-2 bg-brutal-green brutal-pulse" />
              Online
            </span>
            <span className="hidden sm:block font-display text-xl uppercase tracking-tight">
              Stepan&nbsp;Leonov
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-mono text-sm font-bold uppercase tracking-tight px-4 py-2 brutal-border-2 transition-all ${
                    active
                      ? 'bg-ink text-cream'
                      : 'bg-cream hover:bg-brutal-yellow hover:-translate-y-0.5'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href="https://github.com/locturui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden sm:grid place-items-center w-10 h-10 brutal-border-2 brutal-shadow-sm bg-cream brutal-press"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="md:hidden grid place-items-center w-10 h-10 brutal-border-2 brutal-shadow-sm bg-brutal-yellow brutal-press"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="md:hidden fixed inset-0 z-20 bg-cream pt-24 px-6 overflow-y-auto">
          <ul className="flex flex-col gap-4">
            {navItems.map((item, i) => {
              const tones = ['bg-brutal-yellow', 'bg-brutal-pink', 'bg-brutal-blue', 'bg-brutal-green', 'bg-brutal-red']
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      if (isActive(pathname, item.href)) {
                        setOpen(false)
                        return
                      }
                      dispatchBrutalNavStart()
                    }}
                    className={`block brutal-border brutal-shadow ${tones[i % tones.length]} font-display text-4xl uppercase px-6 py-5 ${i % 2 ? 'text-cream' : 'text-ink'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/' || /^\/(en|ru|ko|es)$/.test(pathname)
  // pathname has no locale prefix here (next-intl Link strips it)
  return pathname === href || pathname.startsWith(`${href}/`)
}
