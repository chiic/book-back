import Vue from 'vue'
import Router from 'vue-router'
import auth from '../service/auth'
const LayoutComponent = () => import('@/components/layout')
const LoginComponent = () => import('@/components/login')
const PagenotfoundComponent = () => import('@/components/pagenotfound')

const HomeComponent = () => import('@/components/views/Home')
const AddbookComponent = () => import('@/components/views/Addbook')
const BooklistComponent = () => import('@/components/views/Booklist')
const MovieComponent = () => import('@/components/views/Movie')
const AuthComponent = () => import('@/components/views/Auth')
const AuthLayoutComponent = () => import('@/components/views/Auth/layout')
const AuthAddComponent = () => import('@/components/views/Auth/components/addRole')
const PluginComponent = () => import('@/components/views/Plugin')
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: LayoutComponent,
      children: [
        {
          path: '',
          name: 'layoutComponent',
          component: HomeComponent
        },
        {
          path: 'addbook',
          name: 'addbook',
          component: AddbookComponent
        },
        {
          path: 'booklist',
          name: 'booklist',
          component: BooklistComponent
        },
        {
          path: 'movie',
          name: 'movie',
          component: MovieComponent
        },
        {
          path: 'auth',
          component: AuthLayoutComponent,
          children: [{
            path: '',
            name: 'auth',
            component: AuthComponent
          }, {
            path: 'add',
            name: 'auth-add',
            component: AuthAddComponent
          }]
        },
        {
          path: 'plugin',
          name: 'plugin',
          component: PluginComponent
        }
      ]
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
  if (to.path === '/login') {
    next()
  } else {
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
})

export default router
