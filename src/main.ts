import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import store from '@/store'
import Firebase from '@/plugins/firebase/index'
import { FIREBASE_CONFIG } from '@/constant'
import App from '@/components/App'

// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

Firebase.init(FIREBASE_CONFIG)
// const analytics = getAnalytics(app)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  render: h => h(App)
})
