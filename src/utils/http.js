import axios from 'axios'
import store from '../store/index'
import jsonbig from 'json-bigint'
var instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    try {
      return jsonbig.parse(data)
    } catch {
      return data
    }
  }]
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    if (store.state.token.token) {
      config.headers.Authorization = `Bearer ${store.state.token.token}`
    }
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
