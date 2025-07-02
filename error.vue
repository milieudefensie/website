<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

console.error('Error', props.error)
</script>

<template>
  <div>
    <h2>{{ error?.message }}</h2>
    <p>{{ error?.statusCode }}</p>
  </div>
</template>
