import './style.css'



import { createApp } from 'vue'
import router from './routes'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'

var app = createApp(App)

app.use(router).use(PrimeVue, {}).mount("#app")
