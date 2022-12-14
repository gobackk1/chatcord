<template>
  <v-text-field
    label="メールアドレスを入力して下さい。"
    hint="example@mail.com"
    required
    outlined
    counter="30"
    :validate-on-blur="true"
    :rules="rules"
    :value="value"
    @input="$emit('input', $event)"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'
type data = {
  rules: Array<(value: string) => void>
}
export default Vue.extend({
  name: 'Cc_FieldEmail',
  data: (): data => ({
    rules: [
      value => !!value || 'メールアドレスは必須です。',
      value => {
        // 以下を参考に実装
        // https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)
        const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        return pattern.test(value) || '無効なメールアドレスです。'
      }
    ]
  }),
  props: {
    value: {
      type: String,
      default: ''
    }
  }
})
</script>
