<template>
  <Container>
    <figure class="rounded-md overflow-hidden">
      <NuxtPicture format="avif,webp" :src="props.imageURL" :alt="props.alt" width="2000px" height="1000px"
        class="w-full " />
      <figcaption class="text-neutral-600 italic text-sm text-right" v-if="props.caption">{{ props.caption }}
      </figcaption>
    </figure>
  </Container>

</template>
<script lang="ts" setup>
const props = defineProps<{
  caption?: string
  alt: string
  imageURL: string
}>()
</script>