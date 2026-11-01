import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

export const pythonPath = resolve(
  process.platform === 'win32' ? '.venv/Scripts/python.exe' : '.venv/bin/python',
)

export function requireProjectPython() {
  if (!existsSync(pythonPath)) {
    throw new Error(
      `Project Python was not found at ${pythonPath}. Create it with: python -m venv .venv`,
    )
  }
  return pythonPath
}
