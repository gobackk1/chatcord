<template>
  <v-text-field
    ref="Cc_FieldUserName"
    required
    outlined
    maxlength="20"
    counter="20"
    label="ユーザー名を入力してください"
    :validate-on-blur="true"
    :rules="[value => !!value || 'ユーザー名は必須です。']"
    :value="value"
    @input="$emit('input', $event)"
  ></v-text-field>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'Cc_FieldUserName',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
})
</script>
