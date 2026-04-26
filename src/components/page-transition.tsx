'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'

type Phase = 'idle' | 'covering' | 'exiting'

const NAV_START_EVENT = 'brutal:nav-start'

export function dispatchBrutalNavStart() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(NAV_START_EVENT))
  }
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  const lastPath = useRef(pathname)

  useEffect(() => {
    const onStart = () => setPhase('covering')
    window.addEventListener(NAV_START_EVENT, onStart)
    return () => window.removeEventListener(NAV_START_EVENT, onStart)
  }, [])

  useEffect(() => {
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    if (phase === 'covering') {
      const id = requestAnimationFrame(() => setPhase('exiting'))
      return () => cancelAnimationFrame(id)
    }
  }, [pathname, phase])

  const covering = phase === 'covering' || phase === 'exiting'

  return (
    <>
      {/* Manual cover lives OUTSIDE the keyed wrapper so it survives the
          pathname-driven remount and never flashes during reconciliation. */}
      {covering ? (
        <div
          aria-hidden
          className={`brutal-page-cover${phase === 'exiting' ? ' is-exiting' : ''}`}
          onAnimationEnd={() => setPhase('idle')}
        />
      ) : null}

      <div key={pathname} className="brutal-page-wrapper relative">
        {/* Auto sweep panel — only on navigations where no manual cover fired
            (i.e. phase was idle at the moment this wrapper mounted). */}
        <AutoSlam phase={phase} />
        <div className="brutal-page-in">{children}</div>
      </div>
    </>
  )
}

function AutoSlam({ phase }: { phase: Phase }) {
  // Capture phase ONCE per mount. If a manual cover was already in flight
  // when this wrapper mounted, never render the auto slam — preventing the
  // "second yellow flash" after the manual cover-exit completes.
  const initialPhase = useRef(phase)
  if (initialPhase.current !== 'idle') return null
  return <div aria-hidden className="brutal-page-slam" />
}
