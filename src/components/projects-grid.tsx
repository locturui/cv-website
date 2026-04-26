'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ProjectModal, type ProjectModalData } from './project-modal'
import { ArrowUpRight } from 'lucide-react'

export type ProjectListItem = {
  key: string
  title: string
  desc: string
  description: string
  image: string
  images: string[]
  stack: string[]
  githubLink?: string
  deployLink?: string
}

const TONES = ['yellow', 'pink', 'blue', 'green', 'red'] as const
const BG: Record<(typeof TONES)[number], string> = {
  yellow: 'bg-brutal-yellow',
  pink: 'bg-brutal-pink text-cream',
  blue: 'bg-brutal-blue text-cream',
  green: 'bg-brutal-green',
  red: 'bg-brutal-red text-cream',
}

export function ProjectsGrid({ projects }: { projects: ProjectListItem[] }) {
  const t = useTranslations()
  const [active, setActive] = useState<ProjectModalData | null>(null)

  if (projects.length === 0) {
    return (
      <div className="brutal-border brutal-shadow bg-paper p-10 text-center">
        <p className="font-mono uppercase">{t('proj.error')}</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const tone = TONES[i % TONES.length]
          return (
            <button
              key={p.key}
              onClick={() =>
                setActive({
                  title: p.title,
                  description: p.description,
                  githubLink: p.githubLink,
                  deployLink: p.deployLink,
                  images: p.images?.length ? p.images : [p.image],
                  stack: p.stack,
                })
              }
              className={`text-left brutal-border brutal-shadow brutal-press bg-cream group flex flex-col`}
            >
              <div className="relative aspect-[4/3] overflow-hidden brutal-border-b">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-3 left-3 brutal-border-2 ${BG[tone]} font-mono text-[0.65rem] font-bold uppercase tracking-widest px-2 py-1`}
                >
                  #{String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute bottom-3 right-3 grid place-items-center w-10 h-10 brutal-border-2 bg-cream text-ink brutal-shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col gap-3">
                <h3 className="font-display text-2xl uppercase leading-tight tracking-tight">
                  {p.title}
                </h3>
                <p className="text-sm leading-snug line-clamp-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="brutal-tag !text-[0.65rem]">
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 4 && (
                    <span className="brutal-tag !text-[0.65rem]">
                      +{p.stack.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  )
}
