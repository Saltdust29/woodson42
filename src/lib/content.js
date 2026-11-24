import content from 'virtual:journal-content'

const { pages } = content

export function findPage(slug) {
  return pages.find((page) => page.slug === slug) ?? null
}

export const contentPaths = pages.map((page) => page.url)
