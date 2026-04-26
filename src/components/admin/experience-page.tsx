'use client'

import { useCallback, useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useAdmin } from './admin-context'
import { AdminModal } from './modal'
import { Field, FormSection, Input, Textarea } from './form-controls'

type ExperienceRow = {
  id: number
  key: string
  year: string
  startMonth: number | null
  startYear: number | null
  endMonth: number | null
  endYear: number | null
  isPresent: number | null
  roleEn: string
  roleRu: string
  roleKo: string | null
  companyEn: string
  companyRu: string
  companyKo: string | null
  bulletsEn: string
  bulletsRu: string
  bulletsKo: string | null
  techEn: string
  techRu: string
  techKo: string | null
  roleEs: string | null
  companyEs: string | null
  bulletsEs: string | null
  techEs: string | null
  order: number
}

type FormState = {
  key: string
  year: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  isPresent: boolean
  roleEn: string
  roleRu: string
  roleKo: string
  companyEn: string
  companyRu: string
  companyKo: string
  bulletsEn: string
  bulletsRu: string
  bulletsKo: string
  techEn: string
  techRu: string
  techKo: string
  roleEs: string
  companyEs: string
  bulletsEs: string
  techEs: string
  order: string
}

const EMPTY: FormState = {
  key: '',
  year: '',
  startMonth: '',
  startYear: '',
  endMonth: '',
  endYear: '',
  isPresent: false,
  roleEn: '',
  roleRu: '',
  roleKo: '',
  companyEn: '',
  companyRu: '',
  companyKo: '',
  bulletsEn: '',
  bulletsRu: '',
  bulletsKo: '',
  techEn: '',
  techRu: '',
  techKo: '',
  roleEs: '',
  companyEs: '',
  bulletsEs: '',
  techEs: '',
  order: '999',
}

function rowToForm(r: ExperienceRow): FormState {
  const parseBullets = (raw: string | null) => {
    if (!raw) return ''
    try {
      const arr = JSON.parse(raw)
      return Array.isArray(arr) ? arr.join('\n') : raw
    } catch {
      return raw
    }
  }
  return {
    key: r.key,
    year: r.year,
    startMonth: r.startMonth?.toString() || '',
    startYear: r.startYear?.toString() || '',
    endMonth: r.endMonth?.toString() || '',
    endYear: r.endYear?.toString() || '',
    isPresent: r.isPresent === 1,
    roleEn: r.roleEn,
    roleRu: r.roleRu,
    roleKo: r.roleKo || '',
    companyEn: r.companyEn,
    companyRu: r.companyRu,
    companyKo: r.companyKo || '',
    bulletsEn: parseBullets(r.bulletsEn),
    bulletsRu: parseBullets(r.bulletsRu),
    bulletsKo: parseBullets(r.bulletsKo),
    techEn: r.techEn,
    techRu: r.techRu,
    techKo: r.techKo || '',
    roleEs: r.roleEs || '',
    companyEs: r.companyEs || '',
    bulletsEs: parseBullets(r.bulletsEs),
    techEs: r.techEs || '',
    order: r.order.toString(),
  }
}

export function AdminExperiencePage() {
  const { secret } = useAdmin()
  const [rows, setRows] = useState<ExperienceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState<ExperienceRow | null>(null)
  const [creating, setCreating] = useState(false)

  const refresh = useCallback(async () => {
    if (!secret) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/experience?secret=${encodeURIComponent(secret)}`)
      if (!res.ok) throw new Error('Failed to fetch experience')
      setRows(await res.json())
      setError('')
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [secret])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function remove(id: number) {
    if (!secret) return
    if (!confirm('Delete this experience entry?')) return
    const res = await fetch(`/api/admin/experience/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${secret}` },
    })
    if (res.ok) refresh()
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h1 className="font-display text-4xl sm:text-5xl uppercase">Experience</h1>
        <button
          onClick={() => {
            setEditing(null)
            setCreating(true)
          }}
          className="inline-flex items-center gap-2 font-display uppercase text-sm tracking-tight px-5 py-3 bg-brutal-yellow text-ink brutal-border brutal-shadow brutal-press"
        >
          <Plus className="w-4 h-4" /> New entry
        </button>
      </header>

      {loading ? (
        <p className="font-mono text-sm uppercase">Loading…</p>
      ) : error ? (
        <p className="brutal-border-2 bg-brutal-red text-cream px-3 py-2 font-mono text-xs font-bold uppercase">{error}</p>
      ) : (
        <div className="space-y-4">
          {rows.map((r) => (
            <article key={r.id} className="brutal-border brutal-shadow-sm bg-cream p-5 flex items-start gap-4 flex-wrap">
              <span className="brutal-border-2 bg-ink text-cream px-3 py-1 font-mono text-xs font-bold uppercase">
                #{r.order}
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-xl uppercase truncate">{r.roleEn}</h2>
                <p className="font-mono text-xs opacity-70 mt-1 truncate">
                  {r.companyEn} · {r.year}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCreating(false)
                    setEditing(r)
                  }}
                  className="inline-flex items-center gap-1 brutal-border-2 bg-brutal-blue text-cream px-3 py-1.5 font-mono text-xs font-bold uppercase brutal-press"
                >
                  <Pencil className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => remove(r.id)}
                  className="inline-flex items-center gap-1 brutal-border-2 bg-brutal-red text-cream px-3 py-1.5 font-mono text-xs font-bold uppercase brutal-press"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <AdminModal
        open={creating || editing !== null}
        title={editing ? `Edit · ${editing.roleEn}` : 'Create experience'}
        onClose={() => {
          setCreating(false)
          setEditing(null)
        }}
      >
        <ExperienceForm
          row={editing}
          onClose={() => {
            setCreating(false)
            setEditing(null)
          }}
          onSaved={() => {
            setCreating(false)
            setEditing(null)
            refresh()
          }}
        />
      </AdminModal>
    </div>
  )
}

function ExperienceForm({
  row,
  onClose,
  onSaved,
}: {
  row: ExperienceRow | null
  onClose: () => void
  onSaved: () => void
}) {
  const { secret } = useAdmin()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    setForm(row ? rowToForm(row) : EMPTY)
    setErr('')
  }, [row])

  function patch<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!secret) return
    setSubmitting(true)
    setErr('')
    const bulletsToJson = (s: string) =>
      JSON.stringify(s.split('\n').map((x) => x.trim()).filter(Boolean))
    const body = {
      key: form.key,
      year: form.year,
      startMonth: form.startMonth ? parseInt(form.startMonth) : null,
      startYear: form.startYear ? parseInt(form.startYear) : null,
      endMonth: form.endMonth ? parseInt(form.endMonth) : null,
      endYear: form.endYear ? parseInt(form.endYear) : null,
      isPresent: form.isPresent ? 1 : 0,
      roleEn: form.roleEn,
      roleRu: form.roleRu,
      roleKo: form.roleKo || null,
      companyEn: form.companyEn,
      companyRu: form.companyRu,
      companyKo: form.companyKo || null,
      bulletsEn: bulletsToJson(form.bulletsEn),
      bulletsRu: bulletsToJson(form.bulletsRu),
      bulletsKo: form.bulletsKo ? bulletsToJson(form.bulletsKo) : null,
      techEn: form.techEn,
      techRu: form.techRu,
      techKo: form.techKo || null,
      roleEs: form.roleEs || null,
      companyEs: form.companyEs || null,
      bulletsEs: form.bulletsEs ? bulletsToJson(form.bulletsEs) : null,
      techEs: form.techEs || null,
      order: parseInt(form.order || '999'),
    }
    try {
      const url = row ? `/api/admin/experience/${row.id}` : '/api/admin/experience'
      const res = await fetch(url, {
        method: row ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to save')
      }
      onSaved()
    } catch (e) {
      setErr((e as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <FormSection title="01 — Meta">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Key" required>
            <Input value={form.key} onChange={(e) => patch('key', e.target.value)} required />
          </Field>
          <Field label="Order" hint="lower = first">
            <Input value={form.order} onChange={(e) => patch('order', e.target.value)} />
          </Field>
        </div>
        <Field label="Display year" hint="e.g. 'Apr 2025 – Now' (overridden if dates set)">
          <Input value={form.year} onChange={(e) => patch('year', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Field label="Start mo">
            <Input
              type="number"
              min={1}
              max={12}
              value={form.startMonth}
              onChange={(e) => patch('startMonth', e.target.value)}
            />
          </Field>
          <Field label="Start yr">
            <Input
              type="number"
              value={form.startYear}
              onChange={(e) => patch('startYear', e.target.value)}
            />
          </Field>
          <Field label="End mo">
            <Input
              type="number"
              min={1}
              max={12}
              value={form.endMonth}
              onChange={(e) => patch('endMonth', e.target.value)}
              disabled={form.isPresent}
            />
          </Field>
          <Field label="End yr">
            <Input
              type="number"
              value={form.endYear}
              onChange={(e) => patch('endYear', e.target.value)}
              disabled={form.isPresent}
            />
          </Field>
        </div>
        <label className="flex items-center gap-3 font-mono text-xs uppercase font-bold">
          <input
            type="checkbox"
            checked={form.isPresent}
            onChange={(e) => patch('isPresent', e.target.checked)}
            className="w-5 h-5 brutal-border-2"
          />
          Currently here
        </label>
      </FormSection>

      {(['En', 'Ru', 'Ko', 'Es'] as const).map((suffix, i) => {
        const lang =
          suffix === 'En' ? 'English' : suffix === 'Ru' ? 'Russian' : suffix === 'Ko' ? 'Korean' : 'Spanish'
        const required = suffix === 'En' || suffix === 'Ru'
        return (
          <FormSection key={suffix} title={`0${i + 2} — ${lang}`}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Role" required={required}>
                <Input
                  value={(form as any)[`role${suffix}`]}
                  onChange={(e) => patch(`role${suffix}` as keyof FormState, e.target.value as never)}
                />
              </Field>
              <Field label="Company" required={required}>
                <Input
                  value={(form as any)[`company${suffix}`]}
                  onChange={(e) => patch(`company${suffix}` as keyof FormState, e.target.value as never)}
                />
              </Field>
            </div>
            <Field label="Bullets" hint="one per line" required={required}>
              <Textarea
                value={(form as any)[`bullets${suffix}`]}
                onChange={(e) => patch(`bullets${suffix}` as keyof FormState, e.target.value as never)}
              />
            </Field>
            <Field label="Tech stack" required={required}>
              <Input
                value={(form as any)[`tech${suffix}`]}
                onChange={(e) => patch(`tech${suffix}` as keyof FormState, e.target.value as never)}
              />
            </Field>
          </FormSection>
        )
      })}

      {err ? (
        <p className="brutal-border-2 bg-brutal-red text-cream px-3 py-2 font-mono text-xs font-bold uppercase">
          {err}
        </p>
      ) : null}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="font-display uppercase text-sm tracking-tight px-5 py-3 bg-cream text-ink brutal-border brutal-press flex-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="font-display uppercase text-sm tracking-tight px-5 py-3 bg-ink text-cream brutal-border brutal-shadow brutal-press flex-1 disabled:opacity-50"
        >
          {submitting ? 'Saving…' : row ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}
