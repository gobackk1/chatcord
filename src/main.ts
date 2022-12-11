import Vue from "vue";
import MyButton from '@/components/atoms/button.vue'

Vue.config.productionTip = false

new Vue({
  el: "#app",
  components: {MyButton},
  template:
    `<div class="app">
      <h1>Hello Vue.js! </h1>
      <MyButton text="update" />
    </div>`,
});