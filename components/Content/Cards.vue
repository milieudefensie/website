<!-- Elements
- Icon / Image / Video
- Title
- Description
- Buttons
-->

<script setup lang="ts">
import IconArrowLeft from '~icons/mdi/keyboard-arrow-left'
import IconArrowRight from '~icons/mdi/keyboard-arrow-right'

import type { Button, ButtonSizes } from '@/components/Buttons.vue';
import type { ListItem } from './List.vue';

export interface CardImage {
  url: string;
  alt: string;
}

export interface CardIcon {
  test: string;

}

export interface CardVideo {
  test: string;
}

export interface Card {
  image?: CardImage;
  icon?: CardIcon;
  video?: CardVideo;
  title: string;
  content?: string;
  buttons?: Button[];
  buttonSize?: ButtonSizes;
  listItems?: ListItem[];
}

export type CardsProps = {
  columns: "automatic" | "1" | "2" | "3"
  carousel?: boolean
  cards: Card[]
  reverse: boolean
}

const props = defineProps<CardsProps>()

const router = useRouter()

const columnClasses = computed(() => {
  const numCards = props.cards.length;

  if (props.columns === '1' || numCards === 1) {
    return 'grid-cols-1';
  } else if (props.columns === '2' || (props.columns === 'automatic' && (numCards === 2 || numCards === 4))) {
    return 'grid-cols-1 md:grid-cols-2';
  } else if (props.columns === '3' || (props.columns === 'automatic' && (numCards % 3 === 0 || numCards > 4))) {
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  } else {
    return 'grid-cols-1';
  }
});

// Returns the link of a card if it has only one button
function singleLink(card: Card) {
  if (card.buttons && card.buttons.length === 1) {
    return card.buttons[0].link;
  } else {
    return undefined;
  }
}

function handleCardClick(card: Card) {
  if (card.buttons && card.buttons.length === 1) {
    const button = card.buttons[0];

    if (button.link) {

      // Check if this button.link is an external link
      if (typeof button.link === 'string' && button.link.startsWith('http')) {
        window.open(button.link, '_blank');
      } else {
        router.push(button.link);
      }
    }
  }
}

const carousel = ref<HTMLElement | null>(null)
function scrollToNextCarouselItem() {
  const windowWidth = window.innerWidth;
  let cardWidth = 0;
  if (windowWidth < 768) {
    // 'md' breakpoint
    cardWidth = windowWidth * 0.75;
  } else {
    windowWidth * 0.4;
  }
  const fullScrollWidth = carousel.value?.scrollWidth || 0;
  const currentScroll = carousel.value?.scrollLeft || 0;

  let scrollBy = null

  if (currentScroll < 10) {
    // First card
    scrollBy = fullScrollWidth / props.cards.length - windowWidth * 0.1
  } else if (currentScroll > fullScrollWidth - 10) {
    // Last card
    return
  } else {
    // Else
    scrollBy = fullScrollWidth / props.cards.length
  }

  carousel.value?.scrollBy({ left: scrollBy, behavior: 'smooth' });
}

function scrollToPreviousCarouselItem() {
  const windowWidth = window.innerWidth;
  let cardWidth = 0;
  if (windowWidth < 768) {
    // 'md' breakpoint
    cardWidth = windowWidth * 0.75;
  } else {
    windowWidth * 0.4;
  }
  const fullScrollWidth = carousel.value?.scrollWidth || 0;
  const currentScroll = carousel.value?.scrollLeft || 0;

  let scrollBy = null

  if (currentScroll < 10) {
    // First card
    return
  } else if (currentScroll > fullScrollWidth - 10) {
    // Last card
    scrollBy = fullScrollWidth / props.cards.length - windowWidth * 0.1
  } else {
    // Else
    scrollBy = fullScrollWidth / props.cards.length
  }

  carousel.value?.scrollBy({ left: -scrollBy, behavior: 'smooth' });
}

const showCarouselButtons = computed(() => {
  const windowWidth = window.innerWidth;
  const fullScrollWidth = carousel.value?.scrollWidth || 0;

  return fullScrollWidth > windowWidth;
})
</script>

<template>
  <div
    :class="[columnClasses, { 'grid gap-4': !props.carousel || cards.length === 1, 'max-lg:-m-4 lg:grid lg:gap-4 max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-scroll max-lg:flex max-lg:p-4 max-lg:space-x-4 max-lg:w-[100vw]': props.carousel && props.cards.length !== 1 }]"
    ref="carousel">
    <div class="card shadow-sm bg-white overflow-hidden"
      :class="{ 'max-lg:flex-none max-lg:snap-center max-sm:max-w-[75vw] max-lg:max-w-[40vw]': props.carousel && props.cards.length !== 1 }"
      v-for="(card, index) in props.cards" :key="index">

      <div class="flex flex-wrap" :class="[
        {
          'cursor-pointer group': singleLink(card),
          'md:flex-row': props.columns === '1',
          'max-md:flex-col-reverse md:flex-row-reverse': props.reverse && props.columns === '1', 'flex-col-reverse': props.reverse && props.columns !== '1'
        }]" @click="handleCardClick(card)">


        <!-- Icon / Image / Video -->
        <div :class="{ 'md:w-1/2 lg:w-2/6': props.columns === '1' }">

          <NuxtPicture v-if="card.image" format="avif,webp" :src="card.image.url" width="1000px" height="1000px"
            sizes="calc(100vw - 26px) md:40vw" densities="x1 x2" />

          <div v-else-if="card.video">Video!</div>
          <div v-else-if="card.icon">Icon!</div>

        </div>



        <div class="flex-1" :class="{ 'md:w-1/2 lg:w-4/6': props.columns === '1' }">
          <div class="card-body">
            <h2 class="card-title font-display text-3xl " v-if="card.title">{{ card.title }}</h2>
            <p class="text-md lg:text-lg ">{{ card.content }}
            </p>
            <Buttons v-if="card.buttons" :buttons="card.buttons" :size="card.buttonSize"
              :disableLink="!singleLink(card)" />

          </div>

        </div>

      </div>

      <ContentList v-if="card.listItems" class="border-t-2 border-neutral-200" :items="card.listItems"
        color="secondary" />

    </div>
  </div>
  <div v-if="props.carousel && showCarouselButtons" class="flex justify-center items-center gap-4 lg:hidden mt-4">
    <button class="btn btn-circle" @click="scrollToPreviousCarouselItem">
      <IconArrowLeft />
    </button>
    <button class="btn btn-circle" @click="scrollToNextCarouselItem">
      <IconArrowRight />
    </button>
  </div>



</template>
