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
    ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  }

  const presentText: Record<string, string> = {
    en: 'Now',
    ru: 'н.в.',
    ko: '현재'
  }

  const months = monthNames[locale] || monthNames.en
  const present = presentText[locale] || presentText.en

  if (!startMonth || !startYear) {
    return ''
  }

  let startMonthName = months[startMonth - 1]
  let start = ''
  
  if (locale === 'ko') {
    start = `${startYear}년 ${startMonthName}`
  } else {
    start = `${startMonthName} ${startYear}`
  }

  if (isPresent === 1) {
    return `${start} – ${present}`
  }

  if (endMonth && endYear) {
    let endMonthName = months[endMonth - 1]
    let end = ''
    
    if (locale === 'ko') {
      end = `${endYear}년 ${endMonthName}`
    } else {
      end = `${endMonthName} ${endYear}`
    }
    
    return `${start} – ${end}`
  }

  return start
}

