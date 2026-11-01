export { SITE, formatDate, slugify } from './site.js'

export function withoutBody({ body, ...entry }) {
  return entry
}

export function listing(article) {
  const { html, body, ...entry } = article
  return entry
}

function groupBy(values) {
  const groups = new Map()
  for (const value of values) {
    if (!groups.has(value.slug)) groups.set(value.slug, { ...value, articles: [] })
    groups.get(value.slug).articles.push(value.article)
  }
  return [...groups.values()]
}

export function groupCategories(articles) {
  return groupBy(
    articles.map((article) => ({
      name: article.category,
      slug: article.categorySlug,
      url: article.categoryUrl,
      article,
    })),
  )
}

export function groupTags(articles) {
  return groupBy(
    articles.flatMap((article) =>
      article.tagUrls.map((tag) => ({
        name: tag.name,
        slug: tag.slug,
        url: tag.url,
        article,
      })),
    ),
  )
}

export function searchEntry(article) {
  return {
    title: article.title,
    summary: article.summary,
    url: article.url,
    category: article.category,
    date: article.date,
  }
}
