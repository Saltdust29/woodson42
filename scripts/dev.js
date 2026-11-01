import { spawn } from 'node:child_process'

import { requireProjectPython } from './python-path.js'

const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const python = requireProjectPython()
const host = '127.0.0.1'
const vitePort = process.env.VITE_PORT || '5173'
const pelicanPort = process.env.PELICAN_PORT || '8000'
const viteOrigin = `http://${host}:${vitePort}`
const devEnv = { ...process.env, VITE_DEV_SERVER: viteOrigin }

const processes = [
  spawn(
    pnpm,
    ['exec', 'vite', '--host', host, '--port', vitePort, '--strictPort'],
    { stdio: 'inherit', env: devEnv },
  ),
  spawn(
    python,
    [
      '-m',
      'pelican',
      'content',
      '-s',
      'pelicanconf.py',
      '--autoreload',
      '--listen',
      '--bind',
      host,
      '--port',
      pelicanPort,
    ],
    { stdio: 'inherit', env: devEnv },
  ),
]

let shuttingDown = false

function shutdown(signal, exitCode = 0) {
  if (shuttingDown) return
  shuttingDown = true
  for (const child of processes) {
    if (!child.killed) child.kill(signal)
  }
  process.exitCode = exitCode
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => shutdown(signal))
}

for (const child of processes) {
  child.on('error', (error) => {
    console.error(error)
    shutdown('SIGTERM', 1)
  })

  child.on('exit', (code, signal) => {
    if (!shuttingDown) shutdown(signal || 'SIGTERM', code ?? 1)
  })
}
