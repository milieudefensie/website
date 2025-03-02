<template>
  <Video :youtubeURL="props.youtubeURL" />
</template>
<script setup lang="ts" `>
export type VideoProps = {
  youtubeURL: string
}

const props = defineProps<VideoProps>()
</script>
