import '../styles/content.css.js'

import { Show } from 'solid-js'

import ListingSheet from '../components/ListingSheet.jsx'
import NotFound from '../components/NotFound.jsx'

export default function Topic(props) {
  return (
    <Show when={props.route.data} fallback={<NotFound />}>
      {(topic) => (
        <ListingSheet
          eyebrow="Index term"
          title={topic().name}
          description={`${topic().articles.length} related dispatch${topic().articles.length === 1 ? '' : 'es'}.`}
          articles={topic().articles}
        />
      )}
    </Show>
  )
}
