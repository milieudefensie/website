<template>
  <div class="@container/prose">
    <div class="prose @2xl/prose:prose-xl">
      <div v-html="secureHTML"
        class="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>h1:only-child]:-mb-6 [&>h2:only-child]:-mb-6 [&>h3:only-child]:-mb-6 [&>h4:only-child]:-mb-6 [&>h5:only-child]:-mb-6 [&>h6:only-child]:-mb-6">
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import xss from "xss";

export type ProseProps = {
  content: string
}

const props = defineProps<ProseProps>()

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