import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/pages/HomePage'
import AboutPage from '@/components/pages/AboutPage'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
