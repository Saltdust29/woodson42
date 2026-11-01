import '../styles/content.css.js'
import { Title } from '@solidjs/meta'

import NotFound from '../components/NotFound.jsx'
import { SITE } from '../lib/site.js'

export default function CatchAll() {
  return (
    <>
      <Title>{`Page Not Found — ${SITE.name}`}</Title>
      <NotFound />
    </>
  )
}
