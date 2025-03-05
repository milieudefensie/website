<template>
  <div class="prose lg:prose-xl">
    <div v-html="secureHTML" class="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0"></div>
  </div>
</template>
<script lang="ts" setup>
import xss from "xss";

export type AccordionProps = {
  content: string
}

const props = defineProps<AccordionProps>()

const options = {
  whiteList: {
    p: [],
    h1: [],
    h2: [],
    h3: [],
    ul: [],
    li: [],
    blockquote: [],
    a: ["href", "title", "target"],
  },
};

const secureHTML = ref(xss(props.content, options))
</script>