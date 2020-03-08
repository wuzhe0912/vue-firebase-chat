import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// styles
import 'element-theme-chalk/lib/loading.css'
import '@/assets/scss/style.scss'

import VueChatScroll from 'vue-chat-scroll'
import Vuelidate from 'vuelidate'
import ElLoading from 'element-loading'

Vue.use(VueChatScroll)
Vue.use(Vuelidate)
Vue.use(ElLoading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
