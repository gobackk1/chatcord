<template>
  <v-text-field
    required
    outlined
    label="パスワードを入力してください"
    hint="パスワードは 大文字・小文字・数字を含む、8~20文字で入力してください"
    maxlength="20"
    counter="20"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show ? 'text' : 'password'"
    :rules="rules"
    :value="value"
    @click:append="toggleShow"
    @input="$emit('input', $event)"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Cc_FieldPassword',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data: (): { show: boolean; rules: Array<(value: string) => void> } => ({
    show: false,
    rules: [
      value => !!value || 'パスワードは必須です。',
      value => value.length >= 8 || 'パスワードは8文字以上入力してください。',
      value =>
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])/.test(value) ||
        'パスワードには 大文字・小文字・数字を最低でも１つずつ含めてください。',
      value =>
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,}$/.test(value) ||
        '無効な文字が含まれています'
    ]
  }),
  methods: {
    toggleShow(): void {
      this.show = !this.show
    }
  }
})
</script>
