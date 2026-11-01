import { spawnSync } from 'node:child_process'

import { requireProjectPython } from './python-path.js'

const result = spawnSync(requireProjectPython(), process.argv.slice(2), { stdio: 'inherit' })

if (result.error) throw result.error
process.exit(result.status ?? 1)
