<template>
  <div>
    登録したメールに本人確認のメールを送信しました。メールを確認しアカウントを有効にしてください

    <v-btn color="primary" @click="logout">ログアウト</v-btn><br />
    <v-btn color="primary" @click="sendEmailVerification">確認メールを再度送る</v-btn>
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
    },
    async sendEmailVerification() {
      await Firebase.sendEmailVerification()
    }
  }
})
</script>
