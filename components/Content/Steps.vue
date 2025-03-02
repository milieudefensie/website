<template>

  <div class="flex">
    <div class="mx-auto">
      <ul class="steps steps-vertical lg:steps-horizontal">
        <li class="step step-primary">Les 1</li>
        <li class="step step-primary">Les 2</li>
        <li class="step">Les 3</li>
        <li class="step">Les 4</li>
        <li class="step">Les 5</li>
        <li class="step">Les 6</li>
        <li class="step">Les 7</li>
        <li class="step">Les 8</li>
        <li class="step">Les 9</li>
      </ul>
    </div>

  </div>

</template>
<script lang="ts" setup>
export type Step = {
  title: string;
}

export type StepsProps = {
  testimonials: Step[]
}

const props = defineProps<StepsProps>()
</script>