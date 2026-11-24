import '../styles/content.css.js'

import { Show } from 'solid-js'

import ListingSheet from '../components/ListingSheet.jsx'
import NotFound from '../components/NotFound.jsx'

export default function Section(props) {
  return (
    <Show when={props.route.data} fallback={<NotFound />}>
      {(section) => (
        <ListingSheet
          eyebrow="Section"
          title={section().name}
          description={`${section().articles.length} dispatch${section().articles.length === 1 ? '' : 'es'} in this section.`}
          articles={section().articles}
        />
      )}
    </Show>
  )
}
