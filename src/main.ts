import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
