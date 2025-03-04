<!-- Elements
- Icon / Image / Video
- Title
- Description
- Buttons
-->

<script setup lang="ts">
import type { Button, ButtonSizes } from '@/components/Buttons.vue';
import type { ListItem } from './List.vue';

export interface CardImage {
  url: string;
  alt: string;
}

export interface Card {
  image?: CardImage;
  title: string;
  content?: string;
  buttons?: Button[];
  buttonSize?: ButtonSizes;
  listItems?: ListItem[];
}

export type CardsProps = {
  columns: "automatic" | "1" | "2" | "3";
  cards: Card[]
  reverse: boolean;
}

const props = defineProps<CardsProps>()

const router = useRouter()

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
</script>

<template>
  <div class="gap-4" :class="[columnClasses]">
    <div class="card shadow-sm bg-white overflow-hidden" v-for="(card, index) in props.cards" :key="index">

      <div class="flex flex-wrap group"
        :class="[{ 'cursor-pointer': singleLink(card), 'md:flex-row': props.columns === '1', 'max-md:flex-col-reverse md:flex-row-reverse': props.reverse && props.columns === '1', 'flex-col-reverse': props.reverse && props.columns !== '1' }]"
        @click="handleCardClick(card)">

        <NuxtPicture v-if="card.image" format="avif,webp" :src="card.image.url" width="1000px" height="1000px"
          sizes="calc(100vw - 26px) md:40vw" densities="x1 x2"
          :class="{ 'md:w-1/2 lg:w-2/6': props.columns === '1' }" />

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


</template>
