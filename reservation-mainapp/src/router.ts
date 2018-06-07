import Vue from 'vue'
import Router from 'vue-router'
import GetStarted from './components/GetStarted.vue'
import Rooms from './components/booking.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GetStarted',
      component: GetStarted
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: Rooms
    }
  ]
})
