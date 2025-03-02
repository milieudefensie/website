<template>
  <div class="grid gap-2">
    <div class="collapse collapse-arrow bg-base-200" v-for="item in props.items">
      <input type="radio" name="my-accordion-2" />
      <div class="collapse-title font-semibold text-xl px-8 py-6 after:!top-10">{{ item.title }}</div>
      <div class="collapse-content prose lg:prose-lg max-w-none">
        <div class="px-4 pb-4">
          {{ item.content }}
        </div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

interface AccordionItem {
  title: string;
  content: string;
}

export type AccordionProps = {
  items: AccordionItem[]
}

const props = defineProps<AccordionProps>()

</script>