<template>
  <Container>
    <Video :youtubeURL="props.youtubeURL" />
  </Container>
</template>
<script setup lang="ts" `>
const props = defineProps<{
  youtubeURL: string
}>()
</script>
