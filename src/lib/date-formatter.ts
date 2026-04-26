export function formatExperienceDate(
  startMonth: number | null,
  startYear: number | null,
  endMonth: number | null,
  endYear: number | null,
  isPresent: number | null,
  locale: string
): string {
  const monthNames: Record<string, string[]> = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ru: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  }

  const presentText: Record<string, string> = {
    en: 'Now',
    ru: 'н.в.',
    ko: '현재',
    es: 'Actualidad',
  }

  const months = monthNames[locale] || monthNames.en
  const present = presentText[locale] || presentText.en

  if (!startMonth || !startYear) return ''

  const startMonthName = months[startMonth - 1]
  const start =
    locale === 'ko' ? `${startYear}년 ${startMonthName}` : `${startMonthName} ${startYear}`

  if (isPresent === 1) return `${start} – ${present}`

  if (endMonth && endYear) {
    const endMonthName = months[endMonth - 1]
    const end =
      locale === 'ko' ? `${endYear}년 ${endMonthName}` : `${endMonthName} ${endYear}`
    return `${start} – ${end}`
  }

  return start
}

export function pickLocalised<T>(
  locale: string,
  en: T,
  ru: T,
  ko: T | null | undefined,
  es: T | null | undefined = null,
  fallback: T = en
): T {
  if (locale === 'ru') return ru
  if (locale === 'ko') return (ko ?? fallback) as T
  if (locale === 'es') return (es ?? fallback) as T
  return en
}
