<script lang="ts" setup>
import type { ButtonProps } from '@/components/Buttons.vue';

const props = defineProps<ButtonProps>()
</script>

<template>
  <div class="-mt-6">
    <Buttons v-bind="props" />
  </div>
</template>