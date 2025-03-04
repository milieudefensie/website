<template>
  <div class="flex w-full">
    <div class="mx-auto">
      <ul class="steps steps-vertical lg:steps-horizontal">


        <NuxtLink :to="step.to" class="step"
          :class="{ 'group cursor-pointer hover:after:scale-120 hover:after:shadow-md hover:after:!bg-primary hover:after:!border-primary hover:after:!text-primary-content after:transition-all': step.to, 'step-primary': index <= activeStepIndex }"
          v-for="(step, index) in props.steps" :key="index">
          <li class="text-sm font-bold group-hover:badge-primary transition-all">{{ step.title }}</li>
        </NuxtLink>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter()

export type Step = {
  title: string;
  // TO-DO: Set this to the 'to' property type of the <NuxtLink/> component:
  to?: string;
}

export type StepsProps = {
  steps: Step[]
}

const props = defineProps<StepsProps>()


const activeStepIndex = ref<number>()

// Find the currently active route. The step that is active and all steps before will visually be marked as completed.
for (let index = 0; index < props.steps.length; index++) {
  const step = props.steps[index];
  if (step.to && router.resolve(step.to).href === router.currentRoute.value.fullPath) {
    activeStepIndex.value = index
  }
}

</script>