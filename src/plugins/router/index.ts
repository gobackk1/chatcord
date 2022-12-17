import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import ChatPage from '@/components/pages/_Cc_ChatPage'
import LoginPage from '@/components/pages/_Cc_LoginPage'
import SignUpPage from '@/components/pages/_Cc_SignUpPage'
import EmailVerificationPage from '@/components/pages/_Cc_EmailVerificationPage'

Vue.use(VueRouter)

export const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatPage
  },
  {
    path: '/chat/:roomId',
    component: ChatPage
  },
  {
    path: '/chat/:roomId/channel/:channelId',
    component: ChatPage
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
  },
  {
    path: '/email_verification',
    name: 'email_verification',
    component: EmailVerificationPage
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
