<template>
  <v-btn :class="$style.example">{{ text }}</v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CcBtn',
  props: { text: String }
})
</script>

<style module>
.example {
  font-weight: bold;
  padding: 0.5px;
  opacity: 0.8;
  /* margin-bob: 3px; */
  background: pink;
}
</style>
