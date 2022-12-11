<template>
  <v-btn :class="$style.example">{{ text }}</v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: String
  }
})
</script>

<style module>
.example {
  font-weight: bold;
}
</style>
