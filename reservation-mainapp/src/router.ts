import Vue from 'vue'
import Router from 'vue-router'
import GetStarted from './components/GetStarted.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GetStarted',
      component: GetStarted
    },
    // {
    //   path: '/booking',
    //   name: 'rooms',
    //   component: Rooms
    // }
  ]
})
