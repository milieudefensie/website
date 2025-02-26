<template>
  <div class="card-actions">

    <button class="btn" v-for="button in props.buttons" :class="[
      {
        'btn-soft text-neutral': button.style === 'soft',
        'btn-outline text-neutral': button.style === 'outline',
        'btn-dash text-neutral': button.style === 'dash',
        'btn-ghost text-neutral': button.style === 'ghost',
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
    ]">{{
      button.label }}</button>
  </div>

</template>
<script setup lang="ts">

export interface Button {
  label: string;
  url?: string;
  to?: string;
  color: "default" | "primary" | "secondary" | "accent";
  style: "default" | "soft" | "outline" | "dash" | "ghost";
  width: "default" | "wide" | "full";
}

export type ButtonSizes = "sm" | "md" | "lg" | "xl";

export type ButtonProps = {
  buttons: Button[],
  size: ButtonSizes;
}

const props = defineProps<ButtonProps>()

</script>