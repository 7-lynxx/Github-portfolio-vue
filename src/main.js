import { createApp } from 'vue'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'
import './style.css'
import '@quasar/extras/material-icons/material-icons.css'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(Quasar, {
    plugins: {}
})
app.use(router)
app.mount('#app')
