<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Firebase from '@/plugins/firebase'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import { UserType } from '../store/modules/profile/types'
import { onAuthStateChanged } from 'firebase/auth'

const Profile = namespace('profile')

@Component
export default class Cc_App extends Vue {
  @Profile.Action('setLoginUser') setLoginUser!: (user: UserType) => void
  @Profile.Action('setPublicData') setPublicData!: (user: UserType) => void

  created() {
    onAuthStateChanged(Firebase.auth, async user => {
      console.log('subscribed user', user)
      if (user) {
        this.setLoginUser(user)

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
        this.setLoginUser(null)
      }
    })
  }
}
</script>
