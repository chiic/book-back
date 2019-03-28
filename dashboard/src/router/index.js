import Vue from 'vue'
import Router from 'vue-router'
import auth from '../service/auth'
import store from '../store'
const LayoutComponent = () => import('@/components/layout')
const LoginComponent = () => import('@/components/login')
const PagenotfoundComponent = () => import('@/components/pagenotfound')
const changepsdComponent = () => import('@/components/changepsd')
const HomeComponent = () => import('@/components/views/Home')
const AddbookComponent = () => import('@/components/views/Addbook')
const BooklistComponent = () => import('@/components/views/Booklist')
const MovieComponent = () => import('@/components/views/Movie')
const AuthComponent = () => import('@/components/views/Auth')
const AuthLayoutComponent = () => import('@/components/views/Auth/layout')
const AuthAddComponent = () => import('@/components/views/Auth/components/addRole')
const PluginComponent = () => import('@/components/views/Plugin')
const verifyComponent = () => import('@/components/changepsd/components/verifyComponent')
const inputNewComponent = () => import('@/components/changepsd/components/inputnewComponent')

Vue.use(Router)

export const commonRoutes = [
  {
    path: '/',
    component: LayoutComponent,
    children: [
      {
        path: '',
        menuname: '首页',
        name: 'layoutComponent',
        component: HomeComponent
      },
      {
        path: 'addbook',
        name: 'addbook',
        hidden: true,
        component: AddbookComponent
      },
      {
        path: 'editor/:id',
        name: 'editor',
        hidden: true,
        component: AddbookComponent
      },
      {
        path: 'booklist',
        name: 'booklist',
        menuname: '书籍列表',
        component: BooklistComponent
      },
      {
        path: 'movie',
        name: 'movie',
        menuname: '电影爬虫',
        component: MovieComponent
      },
      {
        path: 'plugin',
        name: 'plugin',
        menuname: '插件',
        component: PluginComponent
      }
    ]
  }
]
const asyncRoutes = [{
  path: 'auth',
  menuname: '权限管理',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    name: 'auth',
    menuname: '管理首页',
    component: AuthComponent
  }, {
    path: 'add',
    name: 'auth-add',
    menuname: '权限添加',
    component: AuthAddComponent
  }]
}]

const pageNotRoute = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    hidden: true,
    component: LoginComponent
  },
  {
    path: '/modify',
    component: changepsdComponent,
    children: [{
      path: '',
      name: 'modify',
      component: verifyComponent
    }, {
      path: 'input',
      name: 'input-modify',
      beforeEnter (to, from, next) {
        if (store.state.stepNum === 0) {
          next('/modify')
        } else {
          next()
        }
      },
      component: inputNewComponent
    }]
  },
  {
    path: '/404',
    name: 'pagenotfound',
    hidden: true,
    component: PagenotfoundComponent
  }]
})

let pushFlag = false
router.beforeEach((to, from, next) => {
  auth().then(
    res => {
      if (res.data && res.data.islogin) {
        if (to.path === '/login') {
          next('/')
        } else {
          store.dispatch('dispatchUsername', {username: res.data.username})
          if (!pushFlag && res.data.role === 'admin') {
            commonRoutes[0].children.push(asyncRoutes[0])
            store.dispatch('dispatchRoutes', commonRoutes)
              .then(res => {
                router.addRoutes([...commonRoutes, ...pageNotRoute])
                pushFlag = true
                next({...to, replace: true})
              })
          } else if (!pushFlag && res.data.role === 'user') {
            store.dispatch('dispatchRoutes', commonRoutes)
              .then(res => {
                router.addRoutes([...commonRoutes, ...pageNotRoute])
                pushFlag = true
                next({...to, replace: true})
              })
          } else {
            next()
          }
        }
      } else {
        if (to.path === '/login') {
          next()
        } else {
          next('/login')
        }
      }
    }
  )
})

export default router
