import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import locale from 'iview/dist/locale/en-US'
import axios from 'axios'

Vue.use(iView, {locale});
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8081'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
