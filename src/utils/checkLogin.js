import router from '../router/index'
import store from '../store/index'
import { Toast } from 'vant'

export default {
  install: function (Vue) {
    Vue.prototype.$login = function () {
      if (!store.state.token.token) {
        Toast('您还没有登录，请重新登录')
        router.push('/clogin')
        return false
      } else {
        return true
      }
    }
  }
}
