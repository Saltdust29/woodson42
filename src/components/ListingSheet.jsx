import '../styles/content.css.js'
import { For } from 'solid-js'

import StoryRow from './StoryRow.jsx'

export default function ListingSheet(props) {
  return (
    <section class="listing-sheet">
      <header class="archive-header">
        <p class="eyebrow">{props.eyebrow}</p>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </header>
      <div class="story-list">
        <For each={props.articles}>
          {(article, index) => (
            <StoryRow article={article} number={index() + 1} featured={index() === 0} />
          )}
        </For>
      </div>
    </section>
  )
}
