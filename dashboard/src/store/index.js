import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routesMap: [],
    userName: ''
  },
  getters: {
    getRoutesmap (state) {
      return state.routesMap
    },
    userName (state) {
      return state.userName
    }
  },
  mutations: {
    GETROUTES (state, data) {
      state.routesMap = data
    },
    SETUSERNAME (state, data) {
      state.userName = data.username
    }
  },
  actions: {
    dispatchRoutes ({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('GETROUTES', data)
        resolve()
      })
    },
    dispatchUsername ({commit}, data) {
      commit('SETUSERNAME', data)
    }
  }
})
