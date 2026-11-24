import content from 'virtual:journal-content'

import { groupCategories, groupTags, listing, searchEntry } from './content-model.js'

const { articles, pages } = content
const categories = groupCategories(articles)
const tags = groupTags(articles)

export const searchIndex = articles.map(searchEntry)

export const homeData = {
  articles: articles.map(listing),
  categories: categories.map(({ articles: entries, ...category }) => ({
    ...category,
    count: entries.length,
  })),
  tags: tags.map(({ articles: entries, ...tag }) => ({ ...tag, count: entries.length })),
}

export const archiveData = articles.map(listing)

export function findArticle(year, slug) {
  return articles.find((article) => article.year === year && article.slug === slug) ?? null
}

export function findPage(slug) {
  return pages.find((page) => page.slug === slug) ?? null
}

export function findCategory(slug) {
  const category = categories.find((entry) => entry.slug === slug)
  if (!category) return null
  return {
    name: category.name,
    slug: category.slug,
    url: category.url,
    articles: category.articles.map(listing),
  }
}

export function findTag(slug) {
  const tag = tags.find((entry) => entry.slug === slug)
  if (!tag) return null
  return {
    name: tag.name,
    slug: tag.slug,
    url: tag.url,
    articles: tag.articles.map(listing),
  }
}

export const contentPaths = [
  ...articles.map((article) => article.url),
  ...pages.map((page) => page.url),
  ...categories.map((category) => category.url),
  ...tags.map((tag) => tag.url),
]
