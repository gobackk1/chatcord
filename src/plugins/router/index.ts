import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/pages/_Cc_HomePage'
import AboutPage from '@/components/pages/_Cc_AboutPage'
import LoginPage from '@/components/pages/_Cc_LoginPage'
import SignUpPage from '@/components/pages/_Cc_SignUpPage'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpPage
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
