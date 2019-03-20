import Vue from 'vue'
import Router from 'vue-router'
import auth from '../service/auth'
const HomeComponent = () => import('@/components/home')
const LoginComponent = () => import('@/components/login')
const PagenotfoundComponent = () => import('@/components/pagenotfound')
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent
    },
    {
      path: '*',
      name: 'pagenotfound',
      component: PagenotfoundComponent
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    auth().then(
      res => {
        if (res.data.islogin) {
          next()
        } else {
          next('/login')
        }
      }
    )
  }
  next()
})

export default router
