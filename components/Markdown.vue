<script setup lang="ts">
import { computedAsync } from '@vueuse/core'

import DOMPurify from 'dompurify';
import { marked } from 'marked';

export type MarkdownProps = {
  markdown: string,
}

const props = defineProps<MarkdownProps>()

const safeHTML = computedAsync(
  async () => {
    const unsafeHTML = await marked.parse(props.markdown, {

    })
    const safeHTML = DOMPurify.sanitize(unsafeHTML)

    return safeHTML
  },
  null
);

// const { data: user } = useAsyncData(
//   userId,
//   () => fetchUserById(route.params.id)
// )

// onMounted(async () => {
//   const unsafeHTML = await marked.parse(props.markdown)
//   safeHTML.value = DOMPurify.sanitize(unsafeHTML)
// })

</script>
<template>
  <div v-html="safeHTML" class="prose [&>:last-child]:mb-0 [&>:first-child]:mt-0 ">
  </div>
</template>