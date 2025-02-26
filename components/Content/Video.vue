<template>
  <Container>

    <div
      class="relative hover:scale-105 hover:rotate-1 hover:shadow-lg transition-all duration-300 cursor-pointer group rounded-md overflow-hidden "
      @click="openVideo()">
      <figure>
        <NuxtPicture format="avif,webp" :src="`http://i.ytimg.com/vi/${videoID}/maxresdefault.jpg`"
          alt="Video thumbnail" width="2000px" height="1000px" class="w-full" />
        <div class="absolute inset-0 flex items-center justify-center ">
          <button class="btn btn-circle btn-xl group-hover:scale-150 transition-transform duration-400 ">
            <IconPlay />
          </button>
        </div>
      </figure>
    </div>

    <dialog id="my_modal_2" class="modal" ref="dialog" @close="onClose()">
      <div class="modal-box p-0 w-11/12 max-w-none max-h-none">
        <div id="ytplayer"> </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

  </Container>
</template>
<script setup lang="ts">
import IconPlay from '~icons/mdi/play'

useHead({
  script: [{ src: "https://www.youtube.com/player_api", defer: true }],
});

const props = defineProps<{
  youtubeURL: string
}>()

let player: any;
const dialog = ref();

// A computed property that extracts the video ID from the URL
// The URL can look like this: https://www.youtube.com/watch?v=VIDEO-ID
// Or this: https://youtu.be/VIDEO-ID
// Or this: https://youtu.be/VIDEO-ID?feature=shared
const videoID = computed(() => {
  // return videoId
  const url = new URL(props.youtubeURL);
  const params = new URLSearchParams(url.search);
  return url.hostname === 'youtu.be' ? url.pathname.substring(1) : params.get('v');
})


onMounted(async () => {
  // @ts-ignore
  player = new YT.Player('ytplayer', {
    height: '600px',
    width: '100%',
    videoId: videoID.value,
    events: {
      // 'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });


})

function openVideo() {
  dialog.value.showModal();
  player.playVideo();
}

function onClose() {
  player.pauseVideo();
}
</script>