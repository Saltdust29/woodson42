import { createSignal, onMount } from 'solid-js'

export default function ThemeToggle() {
  const [theme, setTheme] = createSignal('paper')

  onMount(() => {
    setTheme(document.documentElement.dataset.theme === 'ink' ? 'ink' : 'paper')
  })

  function toggleTheme() {
    const next = theme() === 'paper' ? 'ink' : 'paper'
    setTheme(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem('journal-theme', next)
  }

  return (
    <button
      class="tool-button tool-button--theme"
      type="button"
      aria-label={theme() === 'paper' ? 'Use night reading theme' : 'Use paper reading theme'}
      onClick={toggleTheme}
    >
      <span class="theme-glyph" aria-hidden="true">
        {theme() === 'paper' ? '◐' : '◑'}
      </span>
      <span>{theme() === 'paper' ? 'Ink' : 'Paper'}</span>
    </button>
  )
}
