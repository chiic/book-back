import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routesMap: []
  },
  getters: {
    getRoutesmap (state) {
      return state.routesMap
    }
  },
  mutations: {
    GETROUTES (state, data) {
      state.routesMap = data
    }
  },
  actions: {
    dispatchRoutes ({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('GETROUTES', data)
        resolve()
      })
    }
  }
})
