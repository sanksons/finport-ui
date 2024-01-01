import './style.css'



import { createApp } from 'vue'
import router from './routes'
import App from './App.vue'

import PrimeVue from 'primevue/config';


var app = createApp(App)

app.use(router).use(PrimeVue,
    {
        unstyled: false,

    }
).mount("#app")
