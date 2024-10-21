import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@views/Home/adminIndex.vue'),
    children: [
      {
        path: '/article/add',
        name: 'ArticleAdd',
        component: () => import('@views/Article/articleIndex.vue')
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('@views/Article/test.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/Login/adminLogin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from) => {
  const token = getToken()
  // console.log(token)
  if (!token && to.name !== 'Login') {
    return 'login' // 重定向到登录页面
  }
})

export default router
