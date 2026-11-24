import { SITE } from './site.js'

export function headFor(route, pathname) {
  const canonical = `${SITE.url}${pathname}`
  const base = { canonical, ogType: 'website', noindex: false }

  if (route.name === 'home') {
    return { ...base, title: `${SITE.name} — Reality is but an illusion`, description: SITE.subtitle }
  }

  if (route.name === 'page') {
    return {
      ...base,
      title: `${route.data.title} — ${SITE.name}`,
      description: route.data.summary || SITE.subtitle,
    }
  }

  return {
    ...base,
    title: `Page Not Found — ${SITE.name}`,
    description: 'This address has slipped out of the record, or perhaps it was never filed.',
    noindex: true,
  }
}
