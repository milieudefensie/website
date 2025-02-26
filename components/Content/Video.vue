<template>
  <Container>
    <Video :youtubeURL="props.youtubeURL" />
  </Container>
</template>
<script setup lang="ts" `>
export type VideoProps = {
  youtubeURL: string
}

const props = defineProps<VideoProps>()
</script>
