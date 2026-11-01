import fs from 'node:fs'
import path from 'node:path'

const output = path.resolve('.output/public')
const source = path.join(output, '404', 'index.html')
const target = path.join(output, '404.html')

if (fs.existsSync(source)) {
  fs.copyFileSync(source, target)
  fs.rmSync(path.dirname(source), { recursive: true, force: true })
  console.log('postbuild: wrote 404.html')
} else {
  console.log('postbuild: no prerendered 404 page found')
}
