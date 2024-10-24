import './assets/css/global.css'
import '@libs/markdown/css/markdown.css'
import { createApp } from 'vue'
import { pinia } from './stores/index'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
