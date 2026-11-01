import { createVaporApp } from 'vue'

import App from './App.vue'
import './styles.css'

const mount = document.querySelector('#vue-tools')

if (mount) {
  createVaporApp(App, {
    searchUrl: mount.dataset.searchUrl,
    homeUrl: mount.dataset.homeUrl,
  }).mount(mount)
}
