<template>
  <button :class="$style.example">{{ text }}</button>
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
