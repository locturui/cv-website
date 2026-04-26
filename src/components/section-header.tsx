import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: string
  accent?: 'yellow' | 'pink' | 'blue' | 'red' | 'green'
  children?: ReactNode
}

const ACCENTS = {
  yellow: 'bg-brutal-yellow',
  pink: 'bg-brutal-pink',
  blue: 'bg-brutal-blue',
  red: 'bg-brutal-red',
  green: 'bg-brutal-green',
}

export function SectionHeader({ eyebrow, title, accent = 'yellow', children }: Props) {
  return (
    <div className="mb-12">
      {eyebrow ? (
        <div className="inline-flex items-center gap-3 mb-6">
          <span className={`block w-8 h-3 ${ACCENTS[accent]} brutal-border-2`} />
          <span className="font-mono text-xs font-bold uppercase tracking-widest">{eyebrow}</span>
        </div>
      ) : null}
      <h2
        className="brutal-display text-5xl sm:text-6xl md:text-7xl"
        style={{ overflowWrap: 'anywhere' }}
      >
        {title}
      </h2>
      {children ? <div className="mt-6 max-w-2xl text-lg">{children}</div> : null}
    </div>
  )
}
