import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AboutPage from '@/components/pages/_Cc_AboutPage'
import LoginPage from '@/components/pages/_Cc_LoginPage'
import SignUpPage from '@/components/pages/_Cc_SignUpPage'

Vue.use(VueRouter)

export const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/login'
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
