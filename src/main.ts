import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import MyButton from '@/components/atoms/button.vue'

Vue.config.productionTip = false
new Vue({
  el: '#app',
  vuetify,
  router,
  components: { MyButton },
  template: `<v-app>
      <router-link to="/">to home</router-link>
      <router-link to="/about">to about</router-link>
      <router-view />
      <MyButton text="update" />
   </v-app>`
})
