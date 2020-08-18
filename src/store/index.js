import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '../utils/mytoken'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken('token') || {} // 登录信息
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {},
  modules: {}
})
