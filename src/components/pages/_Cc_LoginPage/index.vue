<template>
  <cc-login-template>
    <v-form v-model="isFormValid" slot="form">
      <v-card ref="form">
        <v-card-title>ログイン</v-card-title>
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
            ><v-btn @click="loginWithGoogle">googleアカウントでログインする</v-btn></v-row
          >
        </v-card-text>

        <v-divider class="mt-1"></v-divider>
        <v-card-actions>
          <v-btn to="/signup">
            新規登録
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login" :disabled="!isFormValid">
            ログイン
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </cc-login-template>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginTemplate from '@/components/templates/_Cc_LoginTemplate'
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
    'cc-login-template': LoginTemplate
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

  async login() {
    try {
      await Firebase.loginWithEmailAndPassword(this.email, this.password)
    } catch (error) {
      this.errorMessage = error.message
    }
  }
  async loginWithGoogle() {
    await Firebase.loginWithGoogle()
  }
}
</script>
