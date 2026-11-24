import { hydrate } from '@solidjs/web'

import App from './app.jsx'

hydrate(() => <App url={window.location.pathname} />, document.getElementById('app'))
