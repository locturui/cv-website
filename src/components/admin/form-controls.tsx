'use client'

import type { ComponentProps, ReactNode } from 'react'

const inputBase =
  'w-full brutal-border-2 bg-paper px-3 py-2 font-mono text-sm focus:outline-none focus:bg-brutal-yellow'

export function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="block font-mono text-xs font-bold uppercase tracking-widest mb-2">
        {label}
        {required ? <span className="text-brutal-red ml-1">*</span> : null}
        {hint ? <span className="ml-2 normal-case font-normal opacity-60">— {hint}</span> : null}
      </span>
      {children}
    </label>
  )
}

export function Input(props: ComponentProps<'input'>) {
  return <input {...props} className={`${inputBase} ${props.className || ''}`} />
}

export function Textarea(props: ComponentProps<'textarea'>) {
  return <textarea {...props} className={`${inputBase} h-32 resize-y ${props.className || ''}`} />
}

export function Select(props: ComponentProps<'select'>) {
  return <select {...props} className={`${inputBase} ${props.className || ''}`} />
}

export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="brutal-border-2 bg-paper p-5">
      <legend className="brutal-border-2 bg-ink text-cream px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
        {title}
      </legend>
      <div className="space-y-4 mt-2">{children}</div>
    </fieldset>
  )
}
