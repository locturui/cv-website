'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

type Props = {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export function AdminModal({ open, title, onClose, children }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-cream brutal-border brutal-shadow-lg w-full max-w-3xl max-h-[92vh] overflow-y-auto">
        <div className="sticky top-0 bg-ink text-cream px-6 py-4 brutal-border-b flex items-center justify-between">
          <h2 className="font-display text-2xl uppercase">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid place-items-center w-10 h-10 border-4 border-cream bg-brutal-yellow text-ink brutal-press"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  )
}
