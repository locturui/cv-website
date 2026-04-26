'use client'

import { useEffect, useState } from 'react'
import { Field, FormSection, Input, Textarea } from './form-controls'

export type ProjectAdmin = {
  id?: number
  key: string
  titleEn: string
  titleRu: string
  titleKo: string
  descEn: string
  descRu: string
  descKo: string
  descriptionEn: string
  descriptionRu: string
  descriptionKo: string
  titleEs: string
  descEs: string
  descriptionEs: string
  order: number
  link: string
  githubLink: string
  deployLink: string
  image: string
  images: string[]
  stack: string[]
}

const EMPTY: ProjectAdmin = {
  key: '',
  titleEn: '',
  titleRu: '',
  titleKo: '',
  descEn: '',
  descRu: '',
  descKo: '',
  descriptionEn: '',
  descriptionRu: '',
  descriptionKo: '',
  titleEs: '',
  descEs: '',
  descriptionEs: '',
  order: 999,
  link: '',
  githubLink: '',
  deployLink: '',
  image: '',
  images: [],
  stack: [],
}

type Props = {
  project: ProjectAdmin | null
  adminSecret: string
  onSuccess: () => void
  onCancel: () => void
}

export function ProjectForm({ project, adminSecret, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<ProjectAdmin>(EMPTY)
  const [stackInput, setStackInput] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (project) {
      setForm({ ...EMPTY, ...project, images: project.images ?? [], stack: project.stack ?? [] })
      setStackInput((project.stack ?? []).join(', '))
    } else {
      setForm(EMPTY)
      setStackInput('')
    }
    setError('')
  }, [project])

  function patch<K extends keyof ProjectAdmin>(k: K, v: ProjectAdmin[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${adminSecret}` },
      body: fd,
    })
    if (!res.ok) throw new Error('Upload failed')
    const data = await res.json()
    return data.url as string
  }

  async function handleMain(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadFile(file)
      patch('image', url)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  async function handleGallery(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    setError('')
    try {
      const urls: string[] = []
      for (const f of files) urls.push(await uploadFile(f))
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }))
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const stack = stackInput.split(',').map((s) => s.trim()).filter(Boolean)
    const body = { ...form, stack }
    setSubmitting(true)
    setError('')
    try {
      const url = project?.id
        ? `/api/admin/projects/${project.id}`
        : '/api/admin/projects'
      const res = await fetch(url, {
        method: project?.id ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminSecret}`,
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to save project')
      }
      onSuccess()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormSection title="01 — Basics">
        <Field label="Key" required hint="unique slug, e.g. my-project">
          <Input
            value={form.key}
            onChange={(e) => patch('key', e.target.value)}
            placeholder="my-project"
            required
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="GitHub link">
            <Input
              type="url"
              value={form.githubLink}
              onChange={(e) => patch('githubLink', e.target.value)}
              placeholder="https://github.com/..."
            />
          </Field>
          <Field label="Deploy link">
            <Input
              type="url"
              value={form.deployLink}
              onChange={(e) => patch('deployLink', e.target.value)}
              placeholder="https://..."
            />
          </Field>
        </div>
      </FormSection>

      {(['En', 'Ru', 'Ko', 'Es'] as const).map((suffix) => {
        const labels: Record<string, string> = {
          En: '02 — English',
          Ru: '03 — Russian',
          Ko: '04 — Korean',
          Es: '05 — Spanish',
        }
        const required = suffix === 'En' || suffix === 'Ru'
        return (
          <FormSection key={suffix} title={labels[suffix]}>
            <Field label="Title" required={required}>
              <Input
                value={(form as any)[`title${suffix}`] || ''}
                onChange={(e) => patch(`title${suffix}` as keyof ProjectAdmin, e.target.value as never)}
              />
            </Field>
            <Field label="Short description" hint="card preview">
              <Input
                value={(form as any)[`desc${suffix}`] || ''}
                onChange={(e) => patch(`desc${suffix}` as keyof ProjectAdmin, e.target.value as never)}
              />
            </Field>
            <Field label="Full description" hint="modal body, supports line breaks">
              <Textarea
                value={(form as any)[`description${suffix}`] || ''}
                onChange={(e) => patch(`description${suffix}` as keyof ProjectAdmin, e.target.value as never)}
              />
            </Field>
          </FormSection>
        )
      })}

      <FormSection title="06 — Images">
        <Field label="Main image (card thumbnail)">
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleMain}
            className="block w-full file:mr-3 file:py-2 file:px-4 file:brutal-border-2 file:bg-brutal-yellow file:font-mono file:text-xs file:font-bold file:uppercase file:cursor-pointer"
          />
          {form.image ? (
            <div className="mt-3 flex gap-3 items-start">
              <img src={form.image} className="w-32 h-24 object-cover brutal-border-2" alt="" />
              <button
                type="button"
                onClick={() => patch('image', '')}
                className="brutal-border-2 bg-brutal-red text-cream px-3 py-1 font-mono text-xs font-bold uppercase"
              >
                Remove
              </button>
            </div>
          ) : null}
          <details className="mt-3">
            <summary className="font-mono text-xs uppercase cursor-pointer">Paste URL manually</summary>
            <Input
              className="mt-2"
              value={form.image}
              onChange={(e) => patch('image', e.target.value)}
              placeholder="https://…"
            />
          </details>
        </Field>

        <Field label={`Gallery (${form.images.length})`}>
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={handleGallery}
            className="block w-full file:mr-3 file:py-2 file:px-4 file:brutal-border-2 file:bg-brutal-pink file:text-cream file:font-mono file:text-xs file:font-bold file:uppercase file:cursor-pointer"
          />
          {form.images.length > 0 ? (
            <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {form.images.map((url, idx) => (
                <div key={idx} className="relative">
                  <img src={url} alt="" className="w-full aspect-square object-cover brutal-border-2" />
                  <button
                    type="button"
                    onClick={() => patch('images', form.images.filter((_, i) => i !== idx))}
                    className="absolute -top-2 -right-2 grid place-items-center w-6 h-6 brutal-border-2 bg-brutal-red text-cream font-mono text-xs font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </Field>
      </FormSection>

      <FormSection title="07 — Tech stack">
        <Field label="Technologies" hint="comma separated">
          <Input
            value={stackInput}
            onChange={(e) => setStackInput(e.target.value)}
            placeholder="Vue, Nuxt, Tailwind, TypeScript"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {stackInput
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
              .map((tag) => (
                <span key={tag} className="brutal-tag">
                  {tag}
                </span>
              ))}
          </div>
        </Field>
      </FormSection>

      {error ? (
        <p className="brutal-border-2 bg-brutal-red text-cream px-3 py-2 font-mono text-xs font-bold uppercase">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="font-display uppercase text-sm tracking-tight px-5 py-3 bg-cream text-ink brutal-border brutal-press flex-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting || uploading}
          className="font-display uppercase text-sm tracking-tight px-5 py-3 bg-ink text-cream brutal-border brutal-shadow brutal-press flex-1 disabled:opacity-50"
        >
          {submitting ? 'Saving…' : project?.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}
