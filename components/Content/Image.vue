<template>
  <figure>
    <div class="rounded-md overflow-hidden">
      <NuxtPicture format="avif,webp" :src="props.imageURL" :alt="props.alt" width="2000px" height="1000px"
        class="w-full " loading="lazy" />
    </div>

    <figcaption class="text-neutral-600 italic text-sm text-right" v-if="props.caption">{{ props.caption }}
    </figcaption>
  </figure>

</template>
<script lang="ts" setup>
export type ImageProps = {
  caption?: string
  alt: string
  imageURL: string
}

const props = defineProps<ImageProps>()
</script>