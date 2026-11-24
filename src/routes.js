import {
  archiveData,
  contentPaths,
  findArticle,
  findCategory,
  findPage,
  findTag,
  homeData,
} from './lib/content.js'

const NOT_FOUND = { name: 'notFound', params: {}, data: null }

const PATTERNS = [
  { name: 'home', segments: [] },
  { name: 'archive', segments: ['archive'] },
  { name: 'article', segments: ['journal', ':year', ':slug'] },
  { name: 'section', segments: ['section', ':slug'] },
  { name: 'topic', segments: ['topic', ':slug'] },
  { name: 'page', segments: [':page'] },
]

function resolve(name, params) {
  if (name === 'home') return { name, params, data: homeData }
  if (name === 'archive') return { name, params, data: archiveData }

  const data =
    name === 'article'
      ? findArticle(params.year, params.slug)
      : name === 'section'
        ? findCategory(params.slug)
        : name === 'topic'
          ? findTag(params.slug)
          : findPage(params.page)

  return data ? { name, params, data } : NOT_FOUND
}

export function matchRoute(pathname) {
  const segments = pathname.split('/').filter(Boolean)

  for (const pattern of PATTERNS) {
    if (pattern.segments.length !== segments.length) continue

    const params = {}
    let matched = true

    for (let index = 0; index < segments.length; index += 1) {
      const expected = pattern.segments[index]
      if (expected.startsWith(':')) {
        try {
          params[expected.slice(1)] = decodeURIComponent(segments[index])
        } catch {
          matched = false
          break
        }
      } else if (expected !== segments[index]) {
        matched = false
        break
      }
    }

    if (matched) return resolve(pattern.name, params)
  }

  return NOT_FOUND
}

export function prerenderPaths() {
  return ['/', '/archive/', '/404/', ...contentPaths]
}

export { NOT_FOUND }
