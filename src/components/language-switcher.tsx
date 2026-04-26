'use client'

import { useState, useTransition } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { Languages } from 'lucide-react'

const LABELS: Record<string, string> = {
  en: 'EN',
  ru: 'РУ',
  ko: '한',
  es: 'ES',
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function pick(loc: (typeof routing.locales)[number]) {
    setOpen(false)
    if (loc === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: loc })
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch language"
        className="brutal-border-2 brutal-shadow-sm bg-cream px-3 py-2 font-mono text-sm font-bold uppercase brutal-press flex items-center gap-2"
      >
        <Languages className="w-4 h-4" />
        {LABELS[locale]}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 mt-2 z-50 brutal-border-2 brutal-shadow-sm bg-cream min-w-[80px]">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => pick(loc)}
                disabled={isPending}
                className={`block w-full text-left px-4 py-2 font-mono text-sm font-bold uppercase border-b-2 last:border-b-0 hover:bg-brutal-yellow ${
                  loc === locale ? 'bg-brutal-yellow' : ''
                }`}
              >
                {LABELS[loc]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
