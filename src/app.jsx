import { Preferences } from '@ui-sdk/solid/preferences'

import './styles/theme.css.js'
import './styles/global.css.js'
import './styles/shell.css.js'

import SiteShell from './components/SiteShell.jsx'
import { theme } from './lib/preferences.js'
import { matchRoute } from './routes.js'
import Archive from './views/Archive.jsx'
import Article from './views/Article.jsx'
import Home from './views/Home.jsx'
import NotFoundPage from './views/NotFoundPage.jsx'
import Page from './views/Page.jsx'
import Section from './views/Section.jsx'
import Topic from './views/Topic.jsx'

const VIEWS = {
  home: Home,
  archive: Archive,
  article: Article,
  section: Section,
  topic: Topic,
  page: Page,
  notFound: NotFoundPage,
}

export default function App(props) {
  const route = matchRoute(props.url)
  const View = VIEWS[route.name]

  return (
    <Preferences preferences={[theme]}>
      <SiteShell>
        <View route={route} />
      </SiteShell>
    </Preferences>
  )
}
