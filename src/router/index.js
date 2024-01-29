import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/pages/auth/index.vue'
const routes = [
  {
    path: '/',
    name: '认证页面',
    component: Auth,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  console.log('路由：', to, from)
  next()
})

export default router
