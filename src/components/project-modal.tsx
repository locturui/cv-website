'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react'

export type ProjectModalData = {
  title: string
  description: string
  githubLink?: string
  deployLink?: string
  images: string[]
  stack: string[]
}

type Props = {
  project: ProjectModalData | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: Props) {
  const t = useTranslations('proj.modal')
  const [index, setIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIndex(0)
    setFullscreen(false)
  }, [project])

  const next = useCallback(() => {
    if (!project) return
    setIndex((i) => (i + 1) % project.images.length)
  }, [project])
  const prev = useCallback(() => {
    if (!project) return
    setIndex((i) => (i - 1 + project.images.length) % project.images.length)
  }, [project])

  useEffect(() => {
    if (!project) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreen) setFullscreen(false)
        else onClose()
      } else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [project, fullscreen, onClose, next, prev])

  if (!project) return null
  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal
      className="fixed inset-0 z-[100] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative bg-cream brutal-border brutal-shadow-lg w-full max-w-6xl max-h-[92vh] flex flex-col">
        <div className="flex justify-between items-center bg-ink text-cream px-6 py-4 brutal-border-b shrink-0">
          <h3 className="font-display text-2xl sm:text-3xl uppercase truncate">{project.title}</h3>
          <button
            onClick={onClose}
            aria-label={t('close')}
            className="grid place-items-center w-10 h-10 border-4 border-cream bg-brutal-yellow text-ink brutal-press"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-0 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
          <div className="lg:col-span-3 p-6 border-b-4 border-ink lg:border-b-0 lg:border-r-4 lg:overflow-y-auto">
            <div
              className="relative aspect-video bg-paper brutal-border-2 cursor-zoom-in overflow-hidden"
              onClick={() => setFullscreen(true)}
            >
              <img
                src={project.images[index]}
                alt={`${project.title} - ${index + 1}`}
                className="w-full h-full object-contain"
              />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prev()
                    }}
                    aria-label="Previous"
                    className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 brutal-border-2 brutal-shadow-sm bg-cream brutal-press"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      next()
                    }}
                    aria-label="Next"
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 brutal-border-2 brutal-shadow-sm bg-cream brutal-press"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-3 right-3 brutal-border-2 bg-ink text-cream px-3 py-1 font-mono text-xs font-bold">
                    {String(index + 1).padStart(2, '0')} /{' '}
                    {String(project.images.length).padStart(2, '0')}
                  </span>
                </>
              )}
            </div>
            {project.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto brutal-scroll pb-2">
                {project.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`shrink-0 w-20 h-20 brutal-border-2 ${
                      i === index ? 'brutal-shadow-sm' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col gap-6 lg:overflow-y-auto">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest mb-3">
                {t('about')}
              </p>
              <p className="whitespace-pre-line leading-relaxed">{project.description}</p>
            </div>

            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest mb-3">
                {t('tech')}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="brutal-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-display uppercase text-sm tracking-tight px-5 py-3 bg-cream text-ink brutal-border brutal-shadow-sm brutal-press flex-1"
                >
                  <Github className="w-4 h-4" />
                  {t('viewGithub')}
                </a>
              )}
              {project.deployLink && (
                <a
                  href={project.deployLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-display uppercase text-sm tracking-tight px-5 py-3 bg-brutal-yellow text-ink brutal-border brutal-shadow-sm brutal-press flex-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('viewDemo')}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {fullscreen && (
        <div
          className="fixed inset-0 z-[200] bg-ink/95 flex items-center justify-center p-4"
          onClick={() => setFullscreen(false)}
          role="dialog"
          aria-modal
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setFullscreen(false)
            }}
            aria-label="Close"
            className="absolute top-4 right-4 grid place-items-center w-12 h-12 border-4 border-cream bg-brutal-yellow text-ink brutal-press"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={project.images[index]}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 border-4 border-cream bg-cream text-ink brutal-press"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 border-4 border-cream bg-cream text-ink brutal-press"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </div>,
    document.body,
  )
}
