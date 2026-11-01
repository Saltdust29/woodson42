import { MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'

import SiteShell from './components/SiteShell.jsx'
import { SITE } from './lib/site.js'
import './styles/theme.css.js'
import './styles/global.css.js'
import './styles/shell.css.js'

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>{`${SITE.name} — Field Notes`}</Title>
          <SiteShell>{props.children}</SiteShell>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
