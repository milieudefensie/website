<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  color?: "primary" | "secondary" | "accent" | "neutral";
}>();
</script>
<template>
  <div class="pt-[4vh] pb-[20vh] px-4 text-center mx-auto space-y-2 -mb-[16vh]" :class="{
    'bg-primary text-primary-content': props.color === 'primary',
    'bg-secondary text-secondary-content': props.color === 'secondary',
    'bg-accent text-accent-content': props.color === 'accent',
    'bg-neutral text-neutral-content': props.color === 'neutral',

  }">
    <h1 class="text-5xl sm:text-7xl md:text-8xl font-display ">{{ props.title }}</h1>
    <p class="text-xl text-balance">{{ props.description }}</p>
  </div>
</template>