<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'

export type LottieProps = {
  source: string
  height: number
  width: number
  loop: boolean
}

const props = defineProps<LottieProps>()

type LottieData = {
  v: string
  fr: number
  ip: number
  op: number
  w: number
  h: number
  nm: string
  ddd: number
  assets: any[]
  layers: any[]
  markers: {
    tm: number
    cm: string
    dr: number
  }[]
}
const { data } = await useFetch<LottieData>(`${props.source}`, {
  onRequest({ request, options }) {
    // Set the request headers
    // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
  },
  onRequestError({ request, options, error }) {
    // Handle the request errors
    console.log('Request error:', error)
  },
  onResponse({ request, response, options }) {
    // Process the response data
    console.log('Response data:', response._data)
  },
  onResponseError({ request, response, options }) {
    // Handle the response errors
    console.log('Response error:', response._data)
  }
})


const show = ref(true)
</script>
<template>
  <Transition name="fade" appear>
    <Vue3Lottie v-if="data" ref="lottieContainer" v-show="show" :animationData="data" :height="props.height"
      :width="props.width" :speed="0.2" />
  </Transition>

  {{ data }}
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>