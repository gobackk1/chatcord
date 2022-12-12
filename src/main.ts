import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import store from '@/store'
import MyButton from '@/components/atoms/button.vue'
// import 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'

// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app'
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
initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

if (window.location.hostname === 'localhost') {
  const db = getFirestore()
  connectFirestoreEmulator(db, 'localhost', 8081)
  const auth = getAuth()
  connectAuthEmulator(auth, 'http://localhost:9099')
  const functions = getFunctions(getApp())
  connectFunctionsEmulator(functions, 'localhost', 5001)
}

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
