<template>
  <!-- Dyamically add content components based on a JSON object. The JSON is an array, with various different components, such as Cards, Buttons, Countdown, Image, Video, etc -->
  <Container v-for="(item, index) in props.content" :key="index">
    <component :is="components[item.type]" v-bind="item.props" />
  </Container>

</template>
<script setup lang="ts">
import ContentButtonGroup from './Content/ButtonGroup.vue';
import ContentCardCollection from './Content/CardCollection.vue';
import ContentTestimonial from './Content/Testimonial.vue';
import ContentImage from './Content/Image.vue';
import ContentVideo from './Content/Video.vue';
import ContentAccordion from './Content/Accordion.vue';
import ContentSteps from './Content/Steps.vue';
import ContentCountdown from './Content/Countdown.vue';
import ContentMap from './Content/Map.vue';
import ContentProse from './Content/Prose.server.vue';

import type { CardCollectionProps } from './Content/CardCollection.vue';
import type { ButtonProps } from './Buttons.vue';
import type { TestimonialProps } from './Content/Testimonial.vue';
import type { ImageProps } from './Content/Image.vue';
import type { VideoProps } from './Content/Video.vue';
import type { AccordionProps } from './Content/Accordion.vue';
import type { StepsProps } from './Content/Steps.vue';
import type { CountdownProps } from './Content/Countdown.vue';
import type { MapProps } from './Content/Map.vue';
import type { ProseProps } from './Content/Prose.server.vue';


interface ButtonItem {
  type: 'ContentButtonGroup';
  props: ButtonProps;
}

interface CardCollectionItem {
  type: 'ContentCardCollection';
  props: CardCollectionProps;
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

interface MapItem {
  type: 'ContentMap';
  props: MapProps;
}

interface ProseItem {
  type: 'ContentProse';
  props: ProseProps;
}

export type ContentItem = ButtonItem | CardCollectionItem | TestimonialItem | ImageItem | VideoItem | AccordionItem | StepsItem | CountdownItem | MapItem | ProseItem;

const props = defineProps<{
  content: ContentItem[]
}>()

const components = {
  'ContentButtonGroup': ContentButtonGroup,
  'ContentCardCollection': ContentCardCollection,
  'ContentTestimonial': ContentTestimonial,
  'ContentImage': ContentImage,
  'ContentVideo': ContentVideo,
  'ContentAccordion': ContentAccordion,
  'ContentSteps': ContentSteps,
  'ContentCountdown': ContentCountdown,
  'ContentMap': ContentMap,
  'ContentProse': ContentProse
}
</script>