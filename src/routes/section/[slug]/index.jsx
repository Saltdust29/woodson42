import '../../../styles/content.css.js'
import { Meta, Title } from '@solidjs/meta'
import { createAsync } from '@solidjs/router'
import { Show } from 'solid-js'

import ListingSheet from '../../../components/ListingSheet.jsx'
import NotFound from '../../../components/NotFound.jsx'
import { getCategoryData } from '../../../lib/content.js'
import { SITE } from '../../../lib/site.js'

export const route = {
  preload: ({ params }) => getCategoryData(params.slug),
}

export default function Section(props) {
  const category = createAsync(() => getCategoryData(props.params.slug))

  return (
    <Show when={category()} fallback={<NotFound />}>
      {(entry) => (
        <>
          <Title>{`${entry().name} — ${SITE.name}`}</Title>
          <Meta name="description" content={`${entry().name} — ${SITE.subtitle}`} />
          <ListingSheet
            eyebrow="Section"
            title={entry().name}
            description={`${entry().articles.length} dispatch${entry().articles.length === 1 ? '' : 'es'} in this section.`}
            articles={entry().articles}
          />
        </>
      )}
    </Show>
  )
}
