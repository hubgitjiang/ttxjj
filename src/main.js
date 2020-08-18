import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './style/index.css'
import checkLogin from '@/utils/checkLogin.js'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

Vue.use(Vant)
Vue.config.productionTip = false

Vue.filter('mytime', function (val) {
  return dayjs().from(val)
})

Vue.use(checkLogin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
