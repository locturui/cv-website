'use client'

import { useCallback, useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import { useAdmin } from './admin-context'
import { AdminModal } from './modal'
import { Field, FormSection, Input, Select } from './form-controls'

type SkillRow = {
  id: number
  name: string
  icon: string
  category: string
  order: number
}

const CATEGORIES = ['frontend', 'backend', 'devops'] as const
type Category = (typeof CATEGORIES)[number]

export function AdminSkillsPage() {
  const { secret } = useAdmin()
  const [rows, setRows] = useState<SkillRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState<SkillRow | null>(null)
  const [creating, setCreating] = useState<Category | null>(null)
  const [reordering, setReordering] = useState(false)

  const refresh = useCallback(async () => {
    if (!secret) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/skills?secret=${encodeURIComponent(secret)}`)
      if (!res.ok) throw new Error('Failed to fetch skills')
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
    if (!confirm('Delete this skill?')) return
    const res = await fetch(`/api/admin/skills/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${secret}` },
    })
    if (res.ok) refresh()
  }

  async function move(category: Category, id: number, dir: -1 | 1) {
    if (!secret || reordering) return
    const list = rows.filter((r) => r.category === category).sort((a, b) => a.order - b.order)
    const idx = list.findIndex((r) => r.id === id)
    if (idx < 0) return
    const swap = idx + dir
    if (swap < 0 || swap >= list.length) return
    const updates = [
      { id: list[idx].id, order: list[swap].order },
      { id: list[swap].id, order: list[idx].order },
    ]
    setReordering(true)
    try {
      await fetch('/api/admin/skills/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({ updates }),
      })
      refresh()
    } finally {
      setReordering(false)
    }
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl uppercase">Skills</h1>
      </header>

      {loading ? (
        <p className="font-mono text-sm uppercase">Loading…</p>
      ) : error ? (
        <p className="brutal-border-2 bg-brutal-red text-cream px-3 py-2 font-mono text-xs font-bold uppercase">{error}</p>
      ) : (
        <div className="space-y-10">
          {CATEGORIES.map((cat) => {
            const list = rows
              .filter((r) => r.category === cat)
              .sort((a, b) => a.order - b.order)
            return (
              <section key={cat}>
                <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                  <h2 className="font-display text-2xl uppercase">{cat}</h2>
                  <button
                    onClick={() => {
                      setEditing(null)
                      setCreating(cat)
                    }}
                    className="inline-flex items-center gap-2 brutal-border-2 brutal-shadow-sm bg-brutal-yellow px-3 py-1.5 font-mono text-xs font-bold uppercase brutal-press"
                  >
                    <Plus className="w-3 h-3" /> Add to {cat}
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((s, i) => (
                    <article key={s.id} className="brutal-border-2 brutal-shadow-sm bg-cream p-3 flex items-center gap-3">
                      <span className="brutal-border-2 bg-paper px-2 py-1 font-mono text-xs font-bold">
                        {String(s.order).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-sm uppercase truncate">{s.name}</p>
                        <p className="font-mono text-[0.65rem] opacity-70 truncate">{s.icon}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => move(cat, s.id, -1)}
                          disabled={i === 0 || reordering}
                          className="grid place-items-center w-6 h-6 brutal-border-2 bg-cream disabled:opacity-30"
                          aria-label="Move up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => move(cat, s.id, 1)}
                          disabled={i === list.length - 1 || reordering}
                          className="grid place-items-center w-6 h-6 brutal-border-2 bg-cream disabled:opacity-30"
                          aria-label="Move down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => {
                            setCreating(null)
                            setEditing(s)
                          }}
                          className="grid place-items-center w-6 h-6 brutal-border-2 bg-brutal-blue text-cream"
                          aria-label="Edit"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => remove(s.id)}
                          className="grid place-items-center w-6 h-6 brutal-border-2 bg-brutal-red text-cream"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </article>
                  ))}
                  {list.length === 0 ? (
                    <p className="font-mono text-xs uppercase opacity-60 col-span-full">
                      No skills yet.
                    </p>
                  ) : null}
                </div>
              </section>
            )
          })}
        </div>
      )}

      <AdminModal
        open={editing !== null || creating !== null}
        title={editing ? `Edit · ${editing.name}` : `New skill · ${creating}`}
        onClose={() => {
          setEditing(null)
          setCreating(null)
        }}
      >
        <SkillForm
          row={editing}
          defaultCategory={creating}
          onClose={() => {
            setEditing(null)
            setCreating(null)
          }}
          onSaved={() => {
            setEditing(null)
            setCreating(null)
            refresh()
          }}
        />
      </AdminModal>
    </div>
  )
}

function SkillForm({
  row,
  defaultCategory,
  onClose,
  onSaved,
}: {
  row: SkillRow | null
  defaultCategory: Category | null
  onClose: () => void
  onSaved: () => void
}) {
  const { secret } = useAdmin()
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('')
  const [category, setCategory] = useState<Category>('frontend')
  const [order, setOrder] = useState('999')
  const [submitting, setSubmitting] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    if (row) {
      setName(row.name)
      setIcon(row.icon)
      setCategory(row.category as Category)
      setOrder(row.order.toString())
    } else {
      setName('')
      setIcon('')
      setCategory(defaultCategory || 'frontend')
      setOrder('999')
    }
    setErr('')
  }, [row, defaultCategory])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!secret) return
    setSubmitting(true)
    setErr('')
    try {
      const url = row ? `/api/admin/skills/${row.id}` : '/api/admin/skills'
      const res = await fetch(url, {
        method: row ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({
          name,
          icon,
          category,
          order: parseInt(order || '999'),
        }),
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
      <FormSection title="Skill">
        <Field label="Name" required>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </Field>
        <Field label="Icon" hint="iconify name e.g. mdi:vuejs">
          <Input value={icon} onChange={(e) => setIcon(e.target.value)} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Category" required>
            <Select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Order">
            <Input value={order} onChange={(e) => setOrder(e.target.value)} />
          </Field>
        </div>
      </FormSection>

      {err ? (
        <p className="brutal-border-2 bg-brutal-red text-cream px-3 py-2 font-mono text-xs font-bold uppercase">{err}</p>
      ) : null}

      <div className="flex gap-3">
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
