import '../styles/tools.css.js'

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandItemText,
  CommandList,
} from '@ui-sdk/solid/command'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogShortcut,
  DialogTitle,
  DialogTrigger,
} from '@ui-sdk/solid/dialog'
import { createMemo, createSignal, For, onSettled, Show } from 'solid-js'

import ThemeToggle from './ThemeToggle.jsx'

export default function SearchPalette() {
  const [entries, setEntries] = createSignal([])
  const [status, setStatus] = createSignal('loading')

  async function loadIndex() {
    try {
      const response = await fetch('/search.json', { headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error(`Search index returned ${response.status}`)
      setEntries(await response.json())
      setStatus('ready')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  onSettled(() => {
    void loadIndex()
  })

  const items = createMemo(() =>
    entries().map((entry) => ({
      value: entry.url,
      label: entry.title,
      keywords: [entry.category, ...entry.summary.split(/\s+/)],
    })),
  )

  const byUrl = createMemo(() => new Map(entries().map((entry) => [entry.url, entry])))

  return (
    <div class="journal-tools-shell">
      <div class="journal-tools">
        <Dialog>
          <DialogTrigger class="tool-button" shortcut="mod+k">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.75" cy="10.75" r="6.75" />
              <path d="m16 16 4.25 4.25" />
            </svg>
            <span>Search</span>
            <DialogShortcut />
          </DialogTrigger>

          <DialogContent class="search-dialog" initialFocus="[data-slot=command-input]">
            <div class="search-sheet">
              <header class="search-sheet__header">
                <div>
                  <p class="eyebrow">The reading room</p>
                  <DialogTitle>Search the journal</DialogTitle>
                </div>
                <DialogClose class="close-button">Close ×</DialogClose>
              </header>

              <Command items={items()} onAction={(value) => window.location.assign(value)}>
                <label class="search-field">
                  <span class="sr-only">Search by title, section, or phrase</span>
                  <CommandInput
                    aria-label="Search by title, section, or phrase"
                    placeholder="Title, section, or remembered phrase…"
                    autocomplete="off"
                  />
                  <span class="search-field__count" aria-live="polite">
                    {status() === 'ready'
                      ? `${entries().length} indexed`
                      : status() === 'error'
                        ? 'Index unavailable'
                        : 'Opening the index…'}
                  </span>
                </label>

                <CommandEmpty>No matching entry. Try a shorter phrase.</CommandEmpty>

                <CommandList>
                  {(state) => (
                    <For each={state.items}>
                      {(entry) => {
                        const item = typeof entry === 'string' ? { value: entry, label: entry } : entry
                        const article = () => byUrl().get(item.value)

                        return (
                          <Show when={article()}>
                            {(found) => (
                              <CommandItem value={item.value} label={item.label} class="search-result">
                                <span>{found().category}</span>
                                <strong>
                                  <CommandItemText />
                                </strong>
                                <p>{found().summary}</p>
                                <time datetime={found().date}>{new Date(found().date).getFullYear()}</time>
                              </CommandItem>
                            )}
                          </Show>
                        )
                      }}
                    </For>
                  )}
                </CommandList>
              </Command>
            </div>
          </DialogContent>
        </Dialog>

        <ThemeToggle />
      </div>
    </div>
  )
}
