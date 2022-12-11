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
  /* margin-bob: 3px; */
  user-select: none;
  transform: translate(0, 0);
}
</style>
