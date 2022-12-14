<template>
  <div>
    about page

    <button @click="logout">logout</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Firebase from '@/plugins/firebase'
export default Vue.extend({
  name: 'Cc_AboutPage',
  methods: {
    async logout() {
      await Firebase.logout()
      this.$router.push('/login')
    }
  }
})
</script>
