import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// styles
import '@/assets/scss/style.scss'

import VueChatScroll from 'vue-chat-scroll'
import Vuelidate from 'vuelidate'

Vue.use(VueChatScroll)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
