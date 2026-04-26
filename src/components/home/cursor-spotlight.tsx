'use client'

import { useEffect, useRef } from 'react'

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let started = false

    function onMove(e: PointerEvent) {
      const rect = parent!.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
      if (!started) {
        started = true
        currentX = targetX
        currentY = targetY
        el!.style.opacity = '1'
      }
    }

    function loop() {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      if (el) {
        el.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    parent.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      parent.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(circle at center, var(--color-brutal-yellow) 0%, var(--color-brutal-yellow) 30%, transparent 70%)',
        mixBlendMode: 'multiply',
        filter: 'blur(30px)',
      }}
    />
  )
}
