import { createLocalStorage, createPreference } from '@ui-sdk/core'

export const theme = createPreference({
  values: ['paper', 'ink'],
  defaultValue: 'paper',
  attribute: 'data-theme',
  global: true,
  storage: createLocalStorage('journal-theme'),
})
