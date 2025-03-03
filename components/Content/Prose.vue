<template>
  <div class="prose lg:prose-xl">
    <slot></slot>
    <div v-html="secureHTML"></div>
  </div>
</template>
<script lang="ts" setup>
import sanitizeHtml from 'sanitize-html';

export type AccordionProps = {
  content: string
}

const props = defineProps<AccordionProps>()

const secureHTML = ref(sanitizeHtml(props.content))
</script>