import './style.css'

import { createApp } from 'vue'
import router from './routes'

import App from './App.vue'


var app = createApp(App)

app.use(router).mount("#app")
