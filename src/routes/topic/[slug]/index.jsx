import '../../../styles/content.css.js'
import { Meta, Title } from '@solidjs/meta'
import { createAsync } from '@solidjs/router'
import { Show } from 'solid-js'

import ListingSheet from '../../../components/ListingSheet.jsx'
import NotFound from '../../../components/NotFound.jsx'
import { getTagData } from '../../../lib/content.js'
import { SITE } from '../../../lib/site.js'

export const route = {
  preload: ({ params }) => getTagData(params.slug),
}

export default function Topic(props) {
  const tag = createAsync(() => getTagData(props.params.slug))

  return (
    <Show when={tag()} fallback={<NotFound />}>
      {(entry) => (
        <>
          <Title>{`${entry().name} — ${SITE.name}`}</Title>
          <Meta name="description" content={`${entry().name} — ${SITE.subtitle}`} />
          <ListingSheet
            eyebrow="Index term"
            title={entry().name}
            description={`${entry().articles.length} related dispatch${entry().articles.length === 1 ? '' : 'es'}.`}
            articles={entry().articles}
          />
        </>
      )}
    </Show>
  )
}
