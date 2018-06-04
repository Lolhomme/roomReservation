import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: []
  },
  mutations: {
    updateRooms(state:any, data:any) {
      state.rooms = data.rooms
    }
  },
  actions: {
    getRoomsFromAPI(context:any) {
      if (context.state.services.length === 0) {
          return axios.get('booking').then(res => {
              context.commit('updateRooms', res.data)
          })
      }
  }
  }
})
