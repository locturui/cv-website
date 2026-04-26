import type { Metadata } from 'next'
import {
  Unbounded,
  Inter,
  JetBrains_Mono,
  Black_Han_Sans,
  Noto_Sans_KR,
} from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['700', '800', '900'],
  variable: '--font-display-latin',
  display: 'swap',
})

const blackHanSans = Black_Han_Sans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display-ko',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-body-latin',
  display: 'swap',
})

const notoKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-body-ko',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-mono-latin',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Stepan Leonov — Full-stack Developer',
  description:
    'Stepan Leonov · Full-stack developer building web apps from UI to API. Vue, Nuxt, Next.js, TypeScript.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html
      lang={locale}
      className={`${unbounded.variable} ${blackHanSans.variable} ${inter.variable} ${notoKR.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  )
}
