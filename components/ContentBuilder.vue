<template>
  <!-- Dyamically add content components based on a JSON object. The JSON is an array, with various different components, such as Cards, Buttons, Countdown, Image, Video, etc -->
  <div>
    <component v-for="(item, index) in props.content" :is="components[item.type]" :key="index" v-bind="item.props" />
  </div>

</template>
<script setup lang="ts">
import ContentButtonGroup from './Content/ButtonGroup.vue';
import ContentCards from './Content/Cards.vue';
import ContentTestimonial from './Content/Testimonial.vue';
import ContentImage from './Content/Image.vue';
import ContentVideo from './Content/Video.vue';
import ContentAccordion from './Content/Accordion.vue';
import ContentSteps from './Content/Steps.vue';
import ContentCountdown from './Content/Countdown.vue';

import type { CardsProps } from './Content/Cards.vue';
import type { ButtonGroupProps } from './Content/ButtonGroup.vue';
import type { TestimonialProps } from './Content/Testimonial.vue';
import type { ImageProps } from './Content/Image.vue';
import type { VideoProps } from './Content/Video.vue';
import type { AccordionProps } from './Content/Accordion.vue';
import type { StepsProps } from './Content/Steps.vue';
import type { CountdownProps } from './Content/Countdown.vue';

interface ButtonItem {
  type: 'ContentButtonGroup';
  props: ButtonGroupProps;
}

interface CardItem {
  type: 'ContentCards';
  props: CardsProps;
}

interface TestimonialItem {
  type: 'ContentTestimonial';
  props: TestimonialProps;
}

interface ImageItem {
  type: 'ContentImage';
  props: ImageProps;
}

interface VideoItem {
  type: 'ContentVideo';
  props: VideoProps;
}

interface AccordionItem {
  type: 'ContentAccordion';
  props: AccordionProps;
}

interface StepsItem {
  type: 'ContentSteps';
  props: StepsProps;
}

interface CountdownItem {
  type: 'ContentCountdown';
  props: CountdownProps;
}

export type ContentItem = ButtonItem | CardItem | TestimonialItem | ImageItem | VideoItem | AccordionItem | StepsItem | CountdownItem;

const props = defineProps<{
  content: ContentItem[]
}>()

const components = {
  'ContentButtonGroup': ContentButtonGroup,
  'ContentCards': ContentCards,
  'ContentTestimonial': ContentTestimonial,
  'ContentImage': ContentImage,
  'ContentVideo': ContentVideo,
  'ContentAccordion': ContentAccordion,
  'ContentSteps': ContentSteps,
  'ContentCountdown': ContentCountdown
}
</script>