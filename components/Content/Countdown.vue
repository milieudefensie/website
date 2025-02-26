<template>
  <Container>


    <div v-if="!finished" class="card card-side shadow-sm bg-white">

      <div class="card-body flex-none ">

        <div class="grid auto-cols-max grid-flow-col gap-2 text-center">
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
      </div>

      <div class="grid content-center flex-grow ">
        <h1 class="text-2xl font-bold">{{ props.title }}</h1>
      </div>

      <div class="card-body grid content-center flex-none">
        <Buttons :buttons="props.buttons" />
      </div>

    </div>
    <div v-else class="card card-side shadow-sm bg-white">
      <div class="card-body grid content-center ">
        <h1 class="text-2xl font-bold">{{ props.finishedTitle }}</h1>
      </div>
      <div class="card-body grid content-center flex-none">
        <Buttons :buttons="props.finishedButtons" />
      </div>
    </div>

  </Container>

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
  const distance = props.countToDate.getTime() - new Date().getTime()
  if (distance < 0) {
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