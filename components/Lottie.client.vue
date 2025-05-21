<script setup lang="ts">
import { templateRef } from '@vueuse/core'
import { Vue3Lottie } from 'vue3-lottie'

export type LottieProps = {
  source: string
  height: number
  width: number
  loop: boolean
}

const props = defineProps<LottieProps>()
const lottieContainer = templateRef("lottieContainer")

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
const { data } = await useFetch<LottieData>(`${props.source}`)


const show = ref(true)
function init() {




  const restMarker = data.value?.markers.find((marker: any) => marker.cm === "rest")?.tm


  if (lottieContainer.value && restMarker) {
    lottieContainer.value.playSegments([0, restMarker], true)
    show.value = true
  }
}



</script>
<template>
  <Vue3Lottie ref="lottieContainer" v-show="show" :animationData="data" :height="props.height" :width="props.width"
    :speed="0.2" />
</template>