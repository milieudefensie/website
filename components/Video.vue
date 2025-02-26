<script setup lang="ts">
import IconPlay from '~icons/mdi/play'

// A computed property that extracts the video ID from the URL
// The URL can look like this: https://www.youtube.com/watch?v=VIDEO-ID
// Or this: https://youtu.be/VIDEO-ID
// Or this: https://youtu.be/VIDEO-ID?feature=shared
const props = defineProps<{
  youtubeURL: string
}>()

const videoID = computed(() => {
  // return videoId
  const url = new URL(props.youtubeURL);
  const params = new URLSearchParams(url.search);
  const id = url.hostname === 'youtu.be' ? url.pathname.substring(1) : params.get('v');
  if (id) return id
  else return ""
})

const isLoaded = ref(false)
const isPlaying = ref(false)
const video = ref()
async function play() {
  await video.value.player.playVideo()
}
function stateChange(event: any) {
  isPlaying.value = event.data === 1
}
</script>

<template>
  <div>
    <div class="flex items-center justify-center group  hover:shadow-lg rounded-md overflow-hidden ">
      <ScriptYouTubePlayer ref="video" :video-id="videoID" @ready="isLoaded = true" @state-change="stateChange">
        <template #awaitingLoad>
          <div
            class="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300">
            <button
              class="btn btn-circle btn-xl group-hover:scale-150 group-hover:bg-primary transition-all duration-300 ">
              <IconPlay />
            </button>
          </div>
        </template>
      </ScriptYouTubePlayer>
    </div>
  </div>
</template>