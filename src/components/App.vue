<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import Firebase from '@/plugins/firebase'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import { Cc_User } from '../store/modules/profile/types'

const Profile = namespace('profile')

@Component
export default class Cc_App extends Vue {
  @Profile.Action('setLoginUser') setLoginUser!: (user: Cc_User) => void

  created() {
    onAuthStateChanged(Firebase.auth, user => {
      if (user) {
        this.setLoginUser(user)

        // Googleログインのリダイレクトから戻ってきた時、アプリ内へリダイレクトさせる
        if (this.$route.name && this.$route.name.match(/(signup|login)/)) {
          this.$router.push('/about')
        }

        // TODO: メール認証の確認メール実装
        if (user.emailVerified) {
          // TODO: メールによるアカウント有効化が終わったユーザーはリダイレクトさせる
        } else {
          // TODO: メールによる有効化が終わっていないユーザーをリダイレクトさせる
          // this.$router.push('/emailverify')
          // TODO: メールによる有効化が終わっていないユーザーに、確認メールを送る
          // user.sendEmailVerification()
        }
      } else {
        this.setLoginUser(null)
      }
    })
  }
}
</script>
