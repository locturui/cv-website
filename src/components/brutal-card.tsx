import type { ReactNode, HTMLAttributes } from 'react'

type Tone = 'cream' | 'yellow' | 'pink' | 'blue' | 'red' | 'green' | 'paper'

const TONES: Record<Tone, string> = {
  cream: 'bg-cream',
  paper: 'bg-paper',
  yellow: 'bg-brutal-yellow',
  pink: 'bg-brutal-pink text-cream',
  blue: 'bg-brutal-blue text-cream',
  red: 'bg-brutal-red text-cream',
  green: 'bg-brutal-green',
}

type Props = {
  tone?: Tone
  shadow?: 'sm' | 'md' | 'lg' | 'none'
  press?: boolean
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>

export function BrutalCard({
  tone = 'cream',
  shadow = 'md',
  press = false,
  className = '',
  children,
  ...rest
}: Props) {
  const shadowCls =
    shadow === 'sm'
      ? 'brutal-shadow-sm'
      : shadow === 'lg'
        ? 'brutal-shadow-lg'
        : shadow === 'none'
          ? ''
          : 'brutal-shadow'
  const pressCls = press ? 'brutal-press' : ''
  return (
    <div
      className={`brutal-border ${shadowCls} ${pressCls} ${TONES[tone]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
