import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import store from '@/store'
import MyButton from '@/components/atoms/button.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB-_3PGHCl3qHT0Y-ogJIDXBezPXcfoPg0',
  authDomain: 'chat-cord-4af6e.firebaseapp.com',
  projectId: 'chat-cord-4af6e',
  storageBucket: 'chat-cord-4af6e.appspot.com',
  messagingSenderId: '811151546699',
  appId: '1:811151546699:web:df7471edefcd2084a2b0ce',
  measurementId: 'G-GB9CFS777E'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

Vue.config.productionTip = false
new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  components: { MyButton },
  template: `<v-app>
      <router-link to="/">to home</router-link>
      <router-link to="/about">to about</router-link>
      <router-view />
      <MyButton text="update" />
      {{$store.state.test}}
   </v-app>`
})
