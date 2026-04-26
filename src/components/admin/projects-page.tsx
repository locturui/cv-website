'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'
import { useAdmin } from './admin-context'
import { AdminModal } from './modal'
import { ProjectForm, type ProjectAdmin } from './project-form'

type Row = ProjectAdmin & { id: number }

export function AdminProjectsPage() {
  const { secret } = useAdmin()
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState<Row | null>(null)
  const [creating, setCreating] = useState(false)
  const [reordering, setReordering] = useState(false)
  const [dragId, setDragId] = useState<number | null>(null)
  const [overId, setOverId] = useState<number | null>(null)
  const persistTimer = useRef<number | null>(null)

  const refresh = useCallback(async () => {
    if (!secret) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/projects?secret=${encodeURIComponent(secret)}`)
      if (!res.ok) throw new Error('Failed to fetch')
      setRows(await res.json())
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
    if (!confirm('Delete this project? This is permanent.')) return
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${secret}` },
      })
      if (!res.ok) throw new Error('Delete failed')
      await refresh()
    } catch (e) {
      alert((e as Error).message)
    }
  }

  async function persistOrder(list: Row[]) {
    if (!secret) return
    setReordering(true)
    try {
      const updates = list.map((r, i) => ({ id: r.id, order: i + 1 }))
      const res = await fetch('/api/admin/projects/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({ updates }),
      })
      if (!res.ok) throw new Error('Reorder failed')
    } catch (e) {
      setError((e as Error).message)
      refresh()
    } finally {
      setReordering(false)
    }
  }

  function reorder(fromId: number, toId: number) {
    if (fromId === toId) return
    setRows((prev) => {
      const fromIdx = prev.findIndex((r) => r.id === fromId)
      const toIdx = prev.findIndex((r) => r.id === toId)
      if (fromIdx < 0 || toIdx < 0) return prev
      const next = prev.slice()
      const [moved] = next.splice(fromIdx, 1)
      next.splice(toIdx, 0, moved)
      // debounce persistence so a rapid drag doesn't fire many requests
      if (persistTimer.current) window.clearTimeout(persistTimer.current)
      persistTimer.current = window.setTimeout(() => persistOrder(next), 250)
      return next
    })
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h1 className="font-display text-4xl sm:text-5xl uppercase">Projects</h1>
        <div className="flex items-center gap-3">
          {reordering ? (
            <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-60">
              Saving order…
            </span>
          ) : null}
          <button
            onClick={() => {
              setEditing(null)
              setCreating(true)
            }}
            className="inline-flex items-center gap-2 font-display uppercase text-sm tracking-tight px-5 py-3 bg-brutal-yellow text-ink brutal-border brutal-shadow brutal-press"
          >
            <Plus className="w-4 h-4" /> New project
          </button>
        </div>
      </header>

      <p className="font-mono text-xs uppercase opacity-60 mb-4">
        Drag the handle (≡) to reorder. Top of list = featured on home.
      </p>

      {loading ? (
        <p className="font-mono text-sm uppercase">Loading…</p>
      ) : error ? (
        <p className="brutal-border-2 bg-brutal-red text-cream px-3 py-2 font-mono text-xs font-bold uppercase">
          {error}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((p, i) => {
            const isDragging = dragId === p.id
            const isOver = overId === p.id && dragId !== null && dragId !== p.id
            return (
              <article
                key={p.id}
                onDragOver={(e) => {
                  e.preventDefault()
                  if (dragId !== null && dragId !== p.id) setOverId(p.id)
                }}
                onDragLeave={() => {
                  if (overId === p.id) setOverId(null)
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  if (dragId !== null && dragId !== p.id) reorder(dragId, p.id)
                  setDragId(null)
                  setOverId(null)
                }}
                className={`brutal-border bg-cream flex flex-col transition-all ${
                  isDragging ? 'opacity-40 brutal-shadow-sm' : 'brutal-shadow'
                } ${isOver ? 'outline-4 outline-brutal-yellow -translate-y-1' : ''}`}
              >
                <div className="aspect-video bg-paper brutal-border-b relative">
                  {p.image ? (
                    <img src={p.image} alt="" className="w-full h-full object-cover" />
                  ) : null}
                  <span className="absolute top-2 left-2 brutal-border-2 bg-ink text-cream px-2 py-1 font-mono text-xs font-bold">
                    #{String(i + 1).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    draggable
                    onDragStart={(e) => {
                      setDragId(p.id)
                      e.dataTransfer.effectAllowed = 'move'
                      // Firefox needs data set
                      try {
                        e.dataTransfer.setData('text/plain', String(p.id))
                      } catch {}
                    }}
                    onDragEnd={() => {
                      setDragId(null)
                      setOverId(null)
                    }}
                    aria-label="Drag to reorder"
                    title="Drag to reorder"
                    className="absolute top-2 right-2 grid place-items-center w-9 h-9 brutal-border-2 bg-brutal-yellow text-ink cursor-grab active:cursor-grabbing"
                  >
                    <GripVertical className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="font-display text-xl uppercase">{p.titleEn}</h2>
                  <p className="font-mono text-xs opacity-70 mt-1">key: {p.key}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(p.stack || []).slice(0, 4).map((s) => (
                      <span key={s} className="brutal-tag !text-[0.65rem]">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 flex gap-2">
                    <button
                      onClick={() => {
                        setCreating(false)
                        setEditing(p)
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 brutal-border-2 bg-brutal-blue text-cream py-2 font-mono text-xs font-bold uppercase brutal-press"
                    >
                      <Pencil className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => remove(p.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 brutal-border-2 bg-brutal-red text-cream py-2 font-mono text-xs font-bold uppercase brutal-press"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}

      <AdminModal
        open={creating || editing !== null}
        title={editing ? `Edit · ${editing.titleEn || editing.key}` : 'Create project'}
        onClose={() => {
          setCreating(false)
          setEditing(null)
        }}
      >
        <ProjectForm
          project={editing}
          adminSecret={secret || ''}
          onSuccess={() => {
            setCreating(false)
            setEditing(null)
            refresh()
          }}
          onCancel={() => {
            setCreating(false)
            setEditing(null)
          }}
        />
      </AdminModal>
    </div>
  )
}
