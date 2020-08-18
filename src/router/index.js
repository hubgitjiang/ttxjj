import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  { path: '/login', component: () => import('../views/login/login.vue') },
  { path: '/clogin', component: () => import('../views/login/login.vue') },
  {
    path: '/home',
    component: () => import('../views/home/home.vue'),
    children: [
      {
        path: '/index',
        component: () => import('../views/home/index/index.vue')
      },
      {
        path: '/search',
        component: () => import('../views/home/search/sesarch.vue')
      },
      {
        path: '/video',
        component: () => import('../views/home/video/video.vue')
      },
      {
        path: '/my',
        component: () => import('../views/home/my/my.vue')
      }
    ]
  },
  {
    path: '/searchResult/:key',
    component: () => import('../views/searchResult/searchResult.vue')
  },
  { path: '/detail/:artid', component: () => import('../views/detail/detail.vue') }
]

const router = new VueRouter({
  routes
})

export default router
