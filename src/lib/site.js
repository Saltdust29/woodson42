export const SITE = {
  name: 'woodson42',
  subtitle: 'A personal index of code, systems, and ordinary wonder.',
  author: 'woodson42',
  lang: 'en',
  timezone: 'Asia/Shanghai',
  currentYear: 2026,
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: SITE.timezone,
})

export function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDate(iso) {
  return dateFormatter.format(new Date(iso))
}
