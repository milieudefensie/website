<!-- Elements
- Icon / Image / Video
- Title
- Description
- Buttons
-->

<template>
  <div class="gap-4" :class="[columnClasses]">
    <div class="card shadow-sm bg-white overflow-hidden" v-for="(card, index) in props.cards" :key="index">

      <div class="flex flex-wrap"
        :class="[{ 'md:flex-row': props.columns === '1', 'max-md:flex-col-reverse md:flex-row-reverse': props.reverse && props.columns === '1', 'flex-col-reverse': props.reverse && props.columns !== '1' }]">

        <NuxtPicture format="avif,webp" src="/jong.jpg" width="1000px" height="1000px"
          :class="{ 'md:w-1/2 lg:w-2/6': props.columns === '1' }" sizes="calc(100vw - 26px) md:40vw"
          densities="x1 x2" />

        <div class="flex-1" :class="{ 'md:w-1/2 lg:w-4/6': props.columns === '1' }">
          <div class="card-body">
            <h2 class="card-title font-display text-3xl " v-if="card.title">{{ card.title }}</h2>
            <p class="text-md lg:text-lg ">{{ card.content }}
            </p>
            <Buttons :buttons="card.buttons" :size="card.buttonSize" />

          </div>

        </div>

      </div>




      <!-- <ul class="list border-t-2 border-neutral-200 w-full">

        <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Aankomende evenementen</li>

        <li class="list-row">
          <div class="ml-2 mr-0 my-2">
            <IconCalendar />

          </div>

          <div>
            <div>Maandag - 3 maart 19:00</div>
            <div class="text-xs uppercase font-semibold opacity-60">AVA Training</div>
          </div>
        </li>

        <li class="list-row">
          <div class="ml-2 mr-0 my-2">
            <IconCalendar />

          </div>

          <div>
            <div>Maandag - 3 maart 19:00</div>
            <div class="text-xs uppercase font-semibold opacity-60">AVA Training</div>
          </div>
        </li>

        <li class="list-row">
          <div class="ml-2 mr-0 my-2">
            <IconCalendar />

          </div>

          <div>
            <div>Maandag - 3 maart 19:00</div>
            <div class="text-xs uppercase font-semibold opacity-60">AVA Training</div>
          </div>
        </li>

      </ul> -->



    </div>
  </div>


</template>

<script setup lang="ts">
import type { Button, ButtonSizes } from '@/components/Buttons.vue';

import IconCalendar from '~icons/mdi/calendar'

export interface Card {
  title?: string;
  content: string;
  buttons: Button[];
  buttonSize: ButtonSizes;

}

export type CardsProps = {
  columns: "automatic" | "1" | "2" | "3";
  cards: Card[]
  reverse: boolean;
}

const props = defineProps<CardsProps>()



const columnClasses = computed(() => {
  const numCards = props.cards.length;

  if (props.columns === '1' || numCards === 1) {
    return 'grid grid-cols-1';
  } else if (props.columns === '2' || (props.columns === 'automatic' && (numCards === 2 || numCards === 4))) {
    return 'grid grid-cols-1 md:grid-cols-2';
  } else if (props.columns === '3' || (props.columns === 'automatic' && (numCards % 3 === 0 || numCards > 4))) {
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  } else {
    return 'grid grid-cols-1';
  }
});


</script>