import { searchIndex } from '../lib/content.js'

export function GET() {
  return Response.json(searchIndex)
}
