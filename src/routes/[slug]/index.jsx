import '../../styles/content.css.js'
import { Meta, Title } from '@solidjs/meta'
import { createAsync } from '@solidjs/router'
import { Show } from 'solid-js'

import NotFound from '../../components/NotFound.jsx'
import { getPageData } from '../../lib/content.js'
import { SITE } from '../../lib/site.js'

export const route = {
  preload: ({ params }) => getPageData(params.slug),
}

export default function Page(props) {
  const page = createAsync(() => getPageData(props.params.slug))

  return (
    <Show when={page()} fallback={<NotFound />}>
      {(entry) => (
        <>
          <Title>{`${entry().title} — ${SITE.name}`}</Title>
          <Meta name="description" content={entry().summary || SITE.subtitle} />

          <article class="page-sheet">
            <header class="page-header">
              <p class="eyebrow">Permanent record</p>
              <h1>{entry().title}</h1>
            </header>
            <div class="article-content page-content" innerHTML={entry().html} />
          </article>
        </>
      )}
    </Show>
  )
}
