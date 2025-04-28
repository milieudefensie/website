<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'


export interface Button {
  label: string;
  link?: RouteLocationRaw;
  color: "neutral" | "primary" | "secondary" | "accent";
  style: "default" | "soft" | "outline" | "dash" | "ghost";
  width: "default" | "wide" | "full";
}

export type ButtonSizes = "sm" | "md" | "lg" | "xl";

export type ButtonProps = {
  buttons: Button[],
  size?: ButtonSizes;
}

const props = defineProps<ButtonProps>()

</script>

<template>
  <div class="card-actions">

    <NuxtLink class="btn group-hover:scale-105 transition-transform" v-for="(button, index) in props.buttons"
      :to="button.link" :key="index" :class="[
        {
          'btn-soft text-neutral': button.style === 'soft',
          'btn-outline text-neutral': button.style === 'outline',
          'btn-dash text-neutral': button.style === 'dash',
          'btn-ghost text-neutral': button.style === 'ghost',
          'btn-neutral': button.color === 'neutral',
          'btn-primary': button.color === 'primary',
          'btn-secondary': button.color === 'secondary',
          'btn-accent': button.color === 'accent',
          'btn-sm': props.size === 'sm',
          'btn-md': props.size === 'md',
          'btn-lg': props.size === 'lg',
          'btn-xl': props.size === 'xl',
          'btn-wide': button.width === 'wide',
          'btn-block': button.width === 'full'
        },
      ]">
      {{ button.label }}
    </NuxtLink>
  </div>

</template>
