'use client'

import { useEffect, useState } from 'react'

export function LiveClock() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    function tick() {
      const fmt = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Europe/Moscow',
      })
      setTime(fmt.format(new Date()))
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span suppressHydrationWarning className="tabular-nums">
      {time || '—— : —— : ——'}
    </span>
  )
}
