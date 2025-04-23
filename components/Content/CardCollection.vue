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

const rerender = ref(false);


onMounted(() => {

  // This is a fix for a bug in Chrome where the cards suddenly are no longer rendered on window resize. By hiding & then showing the cards we force a rerender.
  // @ts-ignore 
  if (props.cards.length > 1 && window.chrome) {
    const updateWidth = () => {
      rerender.value = true
      nextTick(() => {
        rerender.value = false
      });
    };
    window.addEventListener('resize', updateWidth);
  }

});

</script>
<template>


  <div class="@container/cards-collection" v-if="!rerender">

    <section class="grid gap-4 " :class="{
      '@max-4xl/cards-collection:flex @max-4xl/cards-collection:overflow-x-scroll @max-4xl/cards-collection:-m-4 @max-4xl/cards-collection:p-4 @max-4xl/cards-collection:snap-x @max-4xl/cards-collection:snap-mandatory': carousel && props.cards.length > 2,
      '@xl/cards-collection:grid-cols-2 @max-xl/cards-collection:flex @max-xl/cards-collection:overflow-x-scroll @max-xl/cards-collection:-m-4 @max-xl/cards-collection:p-4 @max-xl/cards-collection:snap-x @max-xl/cards-collection:snap-mandatory': carousel && props.cards.length === 2,
      '@2xl/cards-collection:grid-cols-2': twoColumns,
      '@2xl/cards-collection:grid-cols-2 @4xl/cards-collection:grid-cols-3 ': threeColumns,
      '@2xl/cards-collection:@max-4xl/cards-collection:grid-cols-1': !carousel && props.cards.length === 3 && !props.noColumns
    }">
      <div v-for="(card, index) in props.cards" :key="index" class="@container/cards grid" :class="{
        '@max-xl/cards-collection:w-[75%] @max-4xl/cards-collection:w-[40%] @max-4xl/cards-collection:flex-none @max-4xl/cards-collection:snap-center @max-4xl/cards-collection:snap-always': carousel && props.cards.length > 2,
        '@max-xl/cards-collection:w-[75%] @max-xl/cards-collection:flex-none @max-xl/cards-collection:snap-center @max-xl/cards-collection:snap-always': carousel && props.cards.length === 2,
      }">
        <ContentCard v-bind="card" />
      </div>
    </section>
  </div>


</template>