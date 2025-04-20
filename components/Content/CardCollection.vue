<!-- 
CARD COLLECTION
This component displays multiple card components together. It automagically calculates the appropriate number of columns based on the current screen size and the number of cards. 

No columns: Set this prop to true if you always want cards to take up the full width of the screen, even if there is enough space to display multiple columns next to each other.

Carousel: Set this prop to true if you want a horizontal scoll bar on mobile devices, instead of showing all cards underneath each other. This is useful if a page contains important information below this card collection. 

-->
<script setup lang="ts">
import type { CardProps } from './Card.vue';

export interface CardCollectionProps {
  cards: CardProps[];
  noColumns?: boolean;
  carousel?: boolean;
}

const props = defineProps<CardCollectionProps>()

const oneColumn = computed(() => {
  if (props.noColumns || props.cards.length === 1) {
    return true
  } else return false
})

const twoColumns = computed(() => {
  if (!props.noColumns && (props.cards.length === 2 || props.cards.length === 4)) {
    return true
  } else return false
})

const threeColumns = computed(() => {
  if (!props.noColumns && (props.cards.length === 3 || props.cards.length > 4)) {
    return true
  } else return false
})

</script>
<template>
  <section class="grid gap-4 " :class="{
    'max-lg:flex max-lg:overflow-x-scroll max-lg:-m-4 max-lg:p-4 max-lg:snap-x max-lg:snap-mandatory': carousel && props.cards.length > 2,
    'sm:grid-cols-2 max-sm:flex max-sm:overflow-x-scroll max-sm:-m-4 max-sm:p-4 max-sm:snap-x max-sm:snap-mandatory': carousel && props.cards.length === 2,
    'md:grid-cols-2': twoColumns,
    'md:grid-cols-2 lg:grid-cols-3 ': threeColumns,
    'md:max-lg:grid-cols-1': !carousel && props.cards.length === 3 && !props.noColumns
  }">
    <div v-for="(card, index) in props.cards" :key="index" class="@container/cards grid" :class="{
      'max-sm:w-[75vw] max-lg:w-[40vw] max-lg:flex-none max-lg:snap-center max-lg:snap-always': carousel && props.cards.length > 2,
      'max-sm:w-[75vw]  max-sm:flex-none max-sm:snap-center max-sm:snap-always': carousel && props.cards.length === 2,
    }">
      <ContentCard v-bind="card" />
    </div>
  </section>
</template>