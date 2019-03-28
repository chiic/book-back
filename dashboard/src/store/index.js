import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routesMap: [],
    userName: '',
    stepNum: 0
  },
  getters: {
    getRoutesmap (state) {
      return state.routesMap
    },
    userName (state) {
      return state.userName
    },
    getStepNum (state) {
      return state.stepNum
    }
  },
  mutations: {
    GETROUTES (state, data) {
      state.routesMap = data
    },
    SETUSERNAME (state, data) {
      state.userName = data.username
    },
    SETSTEP (state, data) {
      state.stepNum = data.num
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
    },
    dispatchStep ({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('SETSTEP', data)
        resolve()
      })
    }
  }
})
