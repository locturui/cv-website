import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'yellow' | 'pink' | 'blue' | 'red' | 'green' | 'cream'

const VARIANTS: Record<Variant, string> = {
  yellow: 'bg-brutal-yellow text-ink',
  pink: 'bg-brutal-pink text-cream',
  blue: 'bg-brutal-blue text-cream',
  red: 'bg-brutal-red text-cream',
  green: 'bg-brutal-green text-ink',
  cream: 'bg-cream text-ink',
}

const BASE =
  'inline-flex items-center justify-center gap-2 font-display uppercase tracking-tight text-base px-6 py-3 brutal-border brutal-shadow brutal-press cursor-pointer select-none'

type Common = {
  variant?: Variant
  children: ReactNode
  className?: string
}

export function BrutalButton({
  variant = 'yellow',
  className = '',
  children,
  ...rest
}: Common & ComponentProps<'button'>) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export function BrutalLink({
  href,
  variant = 'yellow',
  className = '',
  children,
  external = false,
  ...rest
}: Common & {
  href: string
  external?: boolean
} & Omit<ComponentProps<'a'>, 'href'>) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
