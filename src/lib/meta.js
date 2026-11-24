import { SITE } from './site.js'

export function headFor(route, pathname) {
  const canonical = `${SITE.url}${pathname}`
  const base = { canonical, ogType: 'website', noindex: false }

  switch (route.name) {
    case 'home':
      return { ...base, title: `${SITE.name} — Field Notes`, description: SITE.subtitle }
    case 'archive':
      return {
        ...base,
        title: `Archive — ${SITE.name}`,
        description: 'Every dispatch, filed in reverse chronological order.',
      }
    case 'article':
      return {
        ...base,
        title: `${route.data.title} — ${SITE.name}`,
        description: route.data.summary || SITE.subtitle,
        ogType: 'article',
        published: route.data.date,
      }
    case 'section':
      return {
        ...base,
        title: `${route.data.name} — ${SITE.name}`,
        description: `${route.data.name} — ${SITE.subtitle}`,
      }
    case 'topic':
      return {
        ...base,
        title: `${route.data.name} — ${SITE.name}`,
        description: `${route.data.name} — ${SITE.subtitle}`,
      }
    case 'page':
      return {
        ...base,
        title: `${route.data.title} — ${SITE.name}`,
        description: route.data.summary || SITE.subtitle,
      }
    default:
      return {
        ...base,
        title: `Page Not Found — ${SITE.name}`,
        description: 'This address has slipped out of the archive, or perhaps it was never filed.',
        noindex: true,
      }
  }
}
