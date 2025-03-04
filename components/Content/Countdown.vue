<template>


  <div v-if="!finished" class="card card-side shadow-sm bg-white flex flex-wrap">

    <div class="card-body p-6 md:flex-none grid auto-cols-max grid-flow-col gap-2 text-center place-content-center">
      <div class="bg-primary rounded-box text-primary-content flex flex-col p-2" v-if="countDownStart.days > 0">
        <span class="countdown font-display text-5xl">
          <span :style="`--value:${countDown.days};`">{{ countDown.days }}</span>
        </span>
        dagen
      </div>
      <div class="bg-primary rounded-box text-primary-content flex flex-col p-2" v-if="countDownStart.hours > 0">
        <span class="countdown font-display text-5xl">
          <span :style="`--value:${countDown.hours};`">{{ countDown.hours }}</span>
        </span>
        uren
      </div>
      <div class="bg-primary rounded-box text-primary-content flex flex-col p-2">
        <span class="countdown font-display text-5xl">
          <span :style="`--value:${countDown.minutes};`">{{ countDown.minutes }}</span>
        </span>
        min
      </div>
      <div class="bg-primary rounded-box text-primary-content flex flex-col p-2">
        <span class="countdown font-display text-5xl">
          <span :style="`--value:${countDown.seconds};`">{{ countDown.seconds }}</span>
        </span>
        sec
      </div>
    </div>

    <div class="grid content-center max-md:mx-8 max-md:text-center md:flex-1 ">
      <h1 class="text-2xl font-bold">{{ props.title }}</h1>
    </div>

    <div class="card-body p-6 grid content-center md:flex-none place-content-center">
      <Buttons :buttons="props.buttons" size="lg" />
    </div>

  </div>
  <div v-else class="card  card-side shadow-sm bg-white flex flex-wrap">
    <div class="card-body p-6 grid content-center md:flex-1 max-md:text-center">
      <h1 class="text-2xl font-bold">{{ props.finishedTitle }}</h1>
    </div>
    <div class="card-body p-6 max-md:pt-0 grid content-center md:flex-none place-content-center">
      <Buttons :buttons="props.finishedButtons" size="lg" />
    </div>
  </div>


</template>
<script setup lang="ts">
import type { Button } from '../Buttons.vue';

export type CountdownProps = {
  title: string
  countToDate: Date
  buttons: Button[]
  finishedTitle: string
  finishedButtons: Button[]
}

const props = defineProps<CountdownProps>()

const countDown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
const countDownStart = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })

const finished = ref(false)

const updateCountDown = () => {
  const countToDate = new Date(props.countToDate)
  const now = new Date()

  const distance = props.countToDate.getTime() - now.getTime()

  if (now > countToDate) {
    countDown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    finished.value = true
  } else {
    countDown.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60)
    }
  }
  if (countDownStart.value.days === 0 && countDownStart.value.hours === 0 && countDownStart.value.minutes === 0 && countDownStart.value.seconds === 0) {
    countDownStart.value = countDown.value
  }

}

onMounted(() => {
  updateCountDown()
  setInterval(updateCountDown, 1000)
})

</script>