import { createApp } from 'vue'
import router from './router'
// import Vue from 'vue'
import App from './App.vue'

//import router from './router'
import './assets/tailwind.css'

//Vue.config.productionTip = false


// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app')

const app = createApp(App)

app.use(router)
app.mount('#app')
