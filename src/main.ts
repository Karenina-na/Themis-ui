import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css' //element-plus css
import 'element-plus/theme-chalk/dark/css-vars.css' //element-plus dark theme
import './assets/css/global-light.css'
import './assets/css/global-dark.css'
import ElementPlus from 'element-plus' //element-plus
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import './assets/index.css'    //tailwind

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(createPinia())
app.use(router)
app.use(ElementPlus) //element-plus 
app.mount('#app')
