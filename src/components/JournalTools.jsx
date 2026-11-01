import '../styles/tools.css.js'
import { createMemo, createSignal, For, Match, onCleanup, onMount, Switch } from 'solid-js'

import ThemeToggle from './ThemeToggle.jsx'

export default function JournalTools() {
  const [query, setQuery] = createSignal('')
  const [articles, setArticles] = createSignal([])
  const [status, setStatus] = createSignal('loading')

  let dialog
  let searchInput

  const results = createMemo(() => {
    const normalized = query().trim().toLocaleLowerCase()
    if (!normalized) return articles().slice(0, 6)

    return articles()
      .map((article) => {
        const title = article.title.toLocaleLowerCase()
        const summary = article.summary.toLocaleLowerCase()
        const category = article.category.toLocaleLowerCase()
        const score =
          (title.includes(normalized) ? 3 : 0) +
          (category.includes(normalized) ? 2 : 0) +
          (summary.includes(normalized) ? 1 : 0)
        return { ...article, score }
      })
      .filter((article) => article.score > 0)
      .sort((a, b) => b.score - a.score)
  })

  async function loadSearchIndex() {
    try {
      const response = await fetch('/search.json', { headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error(`Search index returned ${response.status}`)
      setArticles(await response.json())
      setStatus('ready')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  function openSearch() {
    if (!dialog || dialog.open) return
    dialog.showModal()
    searchInput?.focus()
  }

  function closeSearch() {
    dialog?.close()
    setQuery('')
  }

  function handleBackdrop(event) {
    if (event.target === event.currentTarget) closeSearch()
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

  onMount(() => {
    loadSearchIndex()
    window.addEventListener('keydown', handleShortcut)
    onCleanup(() => window.removeEventListener('keydown', handleShortcut))
  })

  return (
    <div class="journal-tools-shell">
      <div class="journal-tools">
        <button
          class="tool-button"
          type="button"
          aria-keyshortcuts="Control+K Meta+K /"
          aria-label="Search the journal"
          onClick={openSearch}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.75" cy="10.75" r="6.75" />
            <path d="m16 16 4.25 4.25" />
          </svg>
          <span>Search</span>
          <kbd>/</kbd>
        </button>

        <ThemeToggle />

        <dialog
          ref={(element) => (dialog = element)}
          class="search-dialog"
          onClick={handleBackdrop}
        >
          <div class="search-sheet">
            <header class="search-sheet__header">
              <div>
                <p class="eyebrow">The reading room</p>
                <h2>Search the journal</h2>
              </div>
              <button class="close-button" type="button" aria-label="Close search" onClick={closeSearch}>
                Close ×
              </button>
            </header>

            <label class="search-field">
              <span class="sr-only">Search by title, section, or phrase</span>
              <input
                ref={(element) => (searchInput = element)}
                value={query()}
                onInput={(event) => setQuery(event.currentTarget.value)}
                type="search"
                placeholder="Title, section, or remembered phrase…"
                autocomplete="off"
              />
              <span class="search-field__count" aria-live="polite">
                {status() === 'ready' ? `${results().length} found` : ''}
              </span>
            </label>

            <div class="search-results" aria-live="polite">
              <Switch
                fallback={
                  <div class="search-state search-state--empty">
                    <p class="eyebrow">No matching entry</p>
                    <strong>Try a shorter phrase.</strong>
                  </div>
                }
              >
                <Match when={status() === 'loading'}>
                  <p class="search-state">Opening the index…</p>
                </Match>
                <Match when={status() === 'error'}>
                  <p class="search-state">
                    The index could not be opened. <a href="/archive/">Browse the archive instead.</a>
                  </p>
                </Match>
                <Match when={results().length}>
                  <For each={results()}>
                    {(article) => (
                      <a class="search-result" href={article.url}>
                        <span>{article.category}</span>
                        <strong>{article.title}</strong>
                        <p>{article.summary}</p>
                        <time datetime={article.date}>{new Date(article.date).getFullYear()}</time>
                      </a>
                    )}
                  </For>
                </Match>
              </Switch>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  )
}
