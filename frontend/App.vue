<script setup vapor>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  searchUrl: { type: String, required: true },
  homeUrl: { type: String, required: true },
})

const dialog = ref(null)
const searchInput = ref(null)
const query = ref('')
const articles = ref([])
const status = ref('loading')
const theme = ref(document.documentElement.dataset.theme || 'paper')

const normalizedQuery = computed(() => query.value.trim().toLocaleLowerCase())
const results = computed(() => {
  if (!normalizedQuery.value) return articles.value.slice(0, 6)

  return articles.value
    .map((article) => {
      const title = article.title.toLocaleLowerCase()
      const summary = article.summary.toLocaleLowerCase()
      const category = article.category.toLocaleLowerCase()
      const score =
        (title.includes(normalizedQuery.value) ? 3 : 0) +
        (category.includes(normalizedQuery.value) ? 2 : 0) +
        (summary.includes(normalizedQuery.value) ? 1 : 0)
      return { ...article, score }
    })
    .filter((article) => article.score > 0)
    .sort((a, b) => b.score - a.score)
})

async function loadSearchIndex() {
  try {
    const response = await fetch(props.searchUrl, { headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`Search index returned ${response.status}`)
    articles.value = await response.json()
    status.value = 'ready'
  } catch (error) {
    console.error(error)
    status.value = 'error'
  }
}

async function openSearch() {
  dialog.value?.showModal()
  await nextTick()
  searchInput.value?.focus()
}

function closeSearch() {
  dialog.value?.close()
  query.value = ''
}

function toggleTheme() {
  theme.value = theme.value === 'paper' ? 'ink' : 'paper'
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem('journal-theme', theme.value)
}

function handleShortcut(event) {
  const target = event.target
  const isTyping =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target?.isContentEditable

  if ((event.key === '/' && !isTyping) || ((event.metaKey || event.ctrlKey) && event.key === 'k')) {
    event.preventDefault()
    openSearch()
  }
}

onMounted(() => {
  loadSearchIndex()
  window.addEventListener('keydown', handleShortcut)
})

onBeforeUnmount(() => window.removeEventListener('keydown', handleShortcut))
</script>

<template>
  <div class="journal-tools">
    <button
      class="tool-button"
      type="button"
      aria-keyshortcuts="Control+K Meta+K /"
      aria-label="Search the journal"
      @click="openSearch"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.75" cy="10.75" r="6.75" />
        <path d="m16 16 4.25 4.25" />
      </svg>
      <span>Search</span>
      <kbd>/</kbd>
    </button>

    <button
      class="tool-button tool-button--theme"
      type="button"
      :aria-label="theme === 'paper' ? 'Use night reading theme' : 'Use paper reading theme'"
      @click="toggleTheme"
    >
      <span class="theme-glyph" aria-hidden="true">{{ theme === 'paper' ? '◐' : '◑' }}</span>
      <span>{{ theme === 'paper' ? 'Ink' : 'Paper' }}</span>
    </button>

    <dialog ref="dialog" class="search-dialog" @click.self="closeSearch">
      <div class="search-sheet">
        <header class="search-sheet__header">
          <div>
            <p class="eyebrow">The reading room</p>
            <h2>Search the journal</h2>
          </div>
          <button class="close-button" type="button" aria-label="Close search" @click="closeSearch">Close ×</button>
        </header>

        <label class="search-field">
          <span class="sr-only">Search by title, section, or phrase</span>
          <input
            ref="searchInput"
            v-model="query"
            type="search"
            placeholder="Title, section, or remembered phrase…"
            autocomplete="off"
          >
          <span class="search-field__count" aria-live="polite">
            {{ status === 'ready' ? `${results.length} found` : '' }}
          </span>
        </label>

        <div class="search-results" aria-live="polite">
          <p v-if="status === 'loading'" class="search-state">Opening the index…</p>
          <p v-else-if="status === 'error'" class="search-state">
            The index could not be opened. <a :href="`${homeUrl}archive/`">Browse the archive instead.</a>
          </p>
          <template v-else-if="results.length">
            <a v-for="article in results" :key="article.url" class="search-result" :href="article.url">
              <span>{{ article.category }}</span>
              <strong>{{ article.title }}</strong>
              <p>{{ article.summary }}</p>
              <time :datetime="article.date">{{ new Date(article.date).getFullYear() }}</time>
            </a>
          </template>
          <div v-else class="search-state search-state--empty">
            <p class="eyebrow">No matching entry</p>
            <strong>Try a shorter phrase.</strong>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
