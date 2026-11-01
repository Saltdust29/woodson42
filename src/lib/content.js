import { query } from '@solidjs/router'

import content from 'virtual:journal-content'

import { groupCategories, groupTags, listing, searchEntry } from './content-model.js'

const { articles, pages } = content
const categories = groupCategories(articles)
const tags = groupTags(articles)

export const searchIndex = articles.map(searchEntry)

export const getHomeData = query(async () => {
  return {
    articles: articles.map(listing),
    categories: categories.map(({ articles: entries, ...category }) => ({
      ...category,
      count: entries.length,
    })),
    tags: tags.map(({ articles: entries, ...tag }) => ({ ...tag, count: entries.length })),
  }
}, 'home')

export const getArchiveData = query(async () => articles.map(listing), 'archive')

export const getArticleData = query(async (year, slug) => {
  return articles.find((article) => article.year === year && article.slug === slug) ?? null
}, 'article')

export const getPageData = query(async (slug) => {
  return pages.find((page) => page.slug === slug) ?? null
}, 'page')

export const getCategoryData = query(async (slug) => {
  const category = categories.find((entry) => entry.slug === slug)
  return category
    ? { name: category.name, slug: category.slug, url: category.url, articles: category.articles.map(listing) }
    : null
}, 'category')

export const getTagData = query(async (slug) => {
  const tag = tags.find((entry) => entry.slug === slug)
  return tag
    ? { name: tag.name, slug: tag.slug, url: tag.url, articles: tag.articles.map(listing) }
    : null
}, 'tag')
