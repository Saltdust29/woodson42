import '../styles/tools.css.js'

import { usePreference } from '@ui-sdk/solid/preferences'
import { Toggle, ToggleIcon } from '@ui-sdk/solid/toggle'

import { theme } from '../lib/preferences.js'

export default function ThemeToggle() {
  const state = usePreference(theme)
  const night = () => state().value === 'ink'

  return (
    <Toggle
      class="tool-button tool-button--theme"
      pressed={night()}
      onPressedChange={(pressed) => theme.set(pressed ? 'ink' : 'paper')}
      aria-label={night() ? 'Use paper reading theme' : 'Use night reading theme'}
    >
      <ToggleIcon class="theme-glyph">{night() ? '◑' : '◐'}</ToggleIcon>
      <span>{night() ? 'Paper' : 'Ink'}</span>
    </Toggle>
  )
}
