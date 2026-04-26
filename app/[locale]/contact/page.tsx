import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Mail, Send, Github, MessageCircle } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { BrutalCard } from '@/components/brutal-card'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <SectionHeader eyebrow="04 / Get in touch" title={t('cta.title')} accent="red">
        <p className="text-2xl font-medium leading-snug">{t('cta.lead')}</p>
        <p className="text-base mt-2 opacity-80">{t('cta.add')}</p>
      </SectionHeader>

      <div className="grid gap-6 sm:grid-cols-2">
        <a
          href="mailto:leonovstepan.jobs@outlook.com"
          className="group block"
        >
          <BrutalCard tone="yellow" press shadow="lg" className="p-8">
            <Mail className="w-10 h-10 mb-6" />
            <p className="font-mono text-xs font-bold uppercase tracking-widest opacity-70">
              {t('cta.email')}
            </p>
            <p className="font-display text-base sm:text-lg font-bold mt-2 break-all group-hover:underline decoration-4 underline-offset-4">
              leonovstepan.jobs@outlook.com
            </p>
          </BrutalCard>
        </a>

        <a
          href="https://t.me/locturui"
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <BrutalCard tone="blue" press shadow="lg" className="p-8">
            <Send className="w-10 h-10 mb-6" />
            <p className="font-mono text-xs font-bold uppercase tracking-widest opacity-70">
              {t('cta.telegram')}
            </p>
            <p className="font-display text-2xl sm:text-3xl uppercase mt-2 wrap-break-word group-hover:underline decoration-4 underline-offset-4">
              @locturui
            </p>
          </BrutalCard>
        </a>

        <a
          href="https://github.com/locturui"
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <BrutalCard tone="cream" press shadow="lg" className="p-8">
            <Github className="w-10 h-10 mb-6" />
            <p className="font-mono text-xs font-bold uppercase tracking-widest opacity-70">
              {t('cta.github')}
            </p>
            <p className="font-display text-2xl sm:text-3xl uppercase mt-2 break-words group-hover:underline decoration-4 underline-offset-4">
              @locturui
            </p>
          </BrutalCard>
        </a>

        <BrutalCard tone="pink" shadow="lg" className="p-8">
          <MessageCircle className="w-10 h-10 mb-6" />
          <p className="font-mono text-xs font-bold uppercase tracking-widest opacity-80">
            {t('cta.kakao')}
          </p>
          <p className="font-display text-2xl sm:text-3xl uppercase mt-2 break-words">locturui</p>
        </BrutalCard>
      </div>
    </section>
  )
}
