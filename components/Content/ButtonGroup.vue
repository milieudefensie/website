<template>
  <Container class="-mt-6">
    <Buttons :buttons="props.buttons" />
  </Container>
</template>
<script lang="ts" setup>
import type { Button } from '@/components/Buttons.vue';

const props = defineProps<{
  buttons: Button[],
}>()
</script>