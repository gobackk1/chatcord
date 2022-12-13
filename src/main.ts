import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import store from '@/store'
import Firebase from '@/plugins/firebase/index'
import { FIREBASE_CONFIG } from '@/constant'
import App from '@/components/App'

Vue.config.productionTip = false

// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// const analytics = getAnalytics(app)

Firebase.init(FIREBASE_CONFIG)
Firebase.initVueApp(
  new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
  })
)
