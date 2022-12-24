<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Firebase from '@/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { loginUserStore, chatRoomsStore } from '@/store'

export default Vue.extend({
  data() {
    return {
      loginUserActions: loginUserStore.actions,
      loginUser: loginUserStore.state,
      chatRoomsActions: chatRoomsStore.actions
    }
  },
  created() {
    onAuthStateChanged(Firebase.auth, async (user) => {
      console.log('subscribed user', user)
      if (user) {
        this.loginUserActions.setUserData(user)
        await this.chatRoomsActions.fetchRooms(this.loginUser.userData!.uid)

        if (user.emailVerified) {
          // Googleログインのリダイレクトから戻ってきた時、アプリ内へリダイレクトさせる
          if (this.$route.name && this.$route.name.match(/(signup|login|email_verification)/)) {
            this.$router.push('/chat')
          }
        } else {
          if (this.$route.name && !this.$route.name.match(/email_verification/)) {
            this.$router.push('/email_verification')
          }
        }
      } else {
        this.loginUserActions.setUserData(null)
      }
    })
  }
})
</script>
