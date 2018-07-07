import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: {
      userName: ''
    }
  },
  mutations: {
    login (state, payload) {
      state.token = payload.token
      state.userInfo.userName = payload.userName
    },
    logout (state) {
      state.token = ''
      state.userInfo.userName = ''
    }
  }
})
