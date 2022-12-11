import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import MyButton from '@/components/atoms/button.vue'

Vue.config.productionTip = false
new Vue({
  el: '#app',
  vuetify,
  components: { MyButton },
  template: `<v-app>
      <h1>Hello Vue.js! </h1>
      <MyButton text="update" />
   </v-app>`
})
