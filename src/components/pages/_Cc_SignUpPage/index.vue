<template>
  <cc-signup-template>
    <v-card ref="form" slot="form">
      <v-form v-model="isFormValid">
        <v-card-title>新規登録</v-card-title>
        <v-card-text>
          <cc-field-email @input="email = $event" />
          <cc-field-password @input="password = $event" />
          <v-alert type="error" v-show="errorMessage" close-text="Close Alert" dismissible>
            {{ errorMessage }}
          </v-alert>
          <v-alert type="info" v-show="successMessage" close-text="Close Alert" dismissible>
            {{ successMessage }}
          </v-alert>
          <v-row justify="center"
            ><v-btn @click="google">googleアカウントでログインする</v-btn></v-row
          >
        </v-card-text>

        <v-divider class="mt-1"></v-divider>
        <v-card-actions>
          <v-btn to="/login">
            ログイン
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="register" :disabled="!isFormValid">
            登録
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </cc-signup-template>
</template>

<script lang="ts">
import Vue from 'vue'
import SignUpTemplate from '@/components/templates/_Cc_SignUpTemplate'
import FieldPassword from '@/components/molecules/_Cc_FieldPassword'
import FieldEmail from '@/components/molecules/_Cc_FieldEmail'
import Firebase from '@/plugins/firebase'
import { State } from 'vuex-class'
import Component from 'vue-class-component'
import { ProfileState } from '@/store/modules/profile/types'

@Component({
  components: {
    'cc-field-password': FieldPassword,
    'cc-field-email': FieldEmail,
    'cc-signup-template': SignUpTemplate
  }
})
export default class Cc_SignUpPage extends Vue {
  @State('profile') profile!: ProfileState

  password = ''
  email = ''
  formHasErrors = false
  errorMessage = ''
  successMessage = ''
  isFormValid = false

  async register() {
    try {
      await Firebase.registerWithEmailAndPassword(this.email, this.password)
      this.successMessage =
        '登録したメールアドレスに確認メールを送信しました。メールを確認してアカウントを有効にしてください。'
    } catch (error) {
      this.errorMessage = error.message
    }
  }
  google() {
    Firebase.loginWithGoogle()
  }
}
</script>
