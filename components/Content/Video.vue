<script setup lang="ts">
import IconPlay from '~icons/mdi/play'



export type VideoProps = {
  youtubeURL: string;
}
const props = defineProps<VideoProps>()


// A computed property that extracts the video ID from the URL
// The URL can look like this: https://www.youtube.com/watch?v=VIDEO-ID
// Or this: https://youtu.be/VIDEO-ID
// Or this: https://youtu.be/VIDEO-ID?feature=shared
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
    <div class="video-player flex items-center justify-center group shadow rounded-lg overflow-hidden ">
      <!-- FIX NEEDED: [error] [ nuxi ] Nuxt Build Error: [vite]: Rollup failed to resolve import "unenv/runtime/mock/noop"
      from
      "/opt/buildhome/repo/node_modules/.pnpm/@nuxt+scripts@0.10.5_@types+youtube@0.1.0_@unhead+vue@1.11.20_typescript@5.8.2/node_modules/@nuxt/scripts/dist/runtime/validation/mock.js" -->
      <ScriptYouTubePlayer ref="video" :video-id="videoID" @ready="isLoaded = true" @state-change="stateChange"
        thumbnail-size="hqdefault">
        <template #awaitingLoad>
          <div
            class="absolute inset-0 flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
            <button class="btn btn-accent btn-lg group-hover:scale-120 transition-all duration-300 ">
              <IconPlay />
              Bekijk video
            </button>
          </div>
        </template>
      </ScriptYouTubePlayer>
    </div>
  </div>
</template>
<style lang="css">
.video-player img {
  object-fit: cover !important;
}
</style>