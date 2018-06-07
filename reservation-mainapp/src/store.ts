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
      state.rooms = data
    }
  },
  actions: {
    getRoomsFromAPI(context:any) {
      if (context.state.rooms.length === 0) {
          return axios.get('booking').then(res => {
              context.commit('updateRooms', res.data)
          })
      }
    },
    updateAfterSave(context: any, room:any) {
      let newState = context.state.rooms.map((e:any) => {
        if (e._id == room._id) {
          e = new Object(room)
        }
        return e
      })
      context.commit('updateRooms', newState)
    }
  }
})
