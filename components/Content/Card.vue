<!-- 
CARDS
Cards are very flexibly containers for small bits of content. They are usually used as navigation blocks. For example, they are used for listing events, groups or articles. Below, some of the features are explained.

Layout:
- Horizontal: If the card container^ is wide enough (on desktop, when not using columns), the media and text content are displayed side by side.
- Vertical: If the card container^ is narrow, the media and text content are displayed on top of each other. This happens both on mobile, as well as on desktop when using multiple columns.

^The card container can also be smaller than the viewport width. The card will automatically adapt to its container size, not the viewport width. this makes it easiler to use these cards anywhere on the website.

Style:
- Shadow
- Border

Text content:
- Title
- Subtitle
- Content
- Badges: Small labels that can be used to a certain category that this card belongs to.
- Buttons: When using a single button, the whole card automatically becomes clickable.

Media:
- Image
- Icon
- Video

Lists: Cards can contain lists of items at the bottom of the card. For example, this is useful for displaying a list of events that belong to a certain category.

-->
<script lang="ts" setup>
import type { ButtonProps } from '@/components/Buttons.vue'
import type { ListItem, ListProps } from '@/components/Content/List.vue';


export interface CardImage {
  src: string;
  alt: string;
}

export interface CardIcon {
  test: string;

}

export interface CardVideo {
  test: string;
}

export interface CardProps {
  image?: CardImage;
  icon?: CardIcon;
  video?: CardVideo;
  title: string;
  subtitle?: string;
  content?: string;
  badges?: string[];
  buttons?: ButtonProps;
  list?: ListProps;
  variant: "shadow" | "border";
  reverse: boolean;
}

const props = defineProps<CardProps>()


const singleLink = computed(() => {
  if (props.buttons && props.buttons.buttons.length === 1) {
    return props.buttons.buttons[0].link
  } else return null
})
</script>
<template>
  <article class="card grid overflow-hidden " :class="{
    'hover:-translate-y-1 active:translate-y-1 transition-transform cursor-pointer': singleLink,
    'bg-white shadow-sm': props.variant === 'shadow',
    'border-2 border-neutral/10': props.variant === 'border',
  }">

    <!-- REVERSABLE ITEMS (media and text content positions can be reversed) -->
    <div class="flex" :class="{
      'flex-col-reverse @2xl/cards:flex-row-reverse': props.reverse,
      'flex-col @2xl/cards:flex-row': !props.reverse,
    }">

      <!-- MEDIA (Icon, image or video) -->
      <div class="bg-primary @2xl/cards:w-1/2 @4xl/cards:w-2/6">
        <NuxtPicture v-if="props.image" format="avif,webp" :src="props.image.src" :alt="props.image.alt" width="1000px"
          height="1000px" sizes="calc(100vw - 26px) md:40vw" densities="x1 x2" />
      </div>

      <!-- TEXT CONTENT -->
      <div class="card-body @2xl/cards:w-1/2 @4xl/cards:w-4/6 grid content-between">

        <div class="space-y-2">

          <!-- Badges -->
          <div v-if="props.badges" class="flex gap-2">
            <span class="badge badge-secondary badge-lg font-bold" v-for="(badge, index) in props.badges" :key="index">
              {{ badge }}
            </span>
          </div>

          <!-- Title -->
          <h2 class="card-title font-display text-3xl " v-if="props.title">
            {{ props.title }}
          </h2>

          <!-- Subtitle -->
          <div class="text-md uppercase font-semibold opacity-60" v-if="props.subtitle">
            {{ props.subtitle }}
          </div>

          <!-- Content -->
          <div class="text-md @4xl/cards:text-lg ">
            {{ props.content }}
          </div>

        </div>



        <!-- Buttons -->
        <Buttons v-if="props.buttons" v-bind="props.buttons" />

      </div>

    </div>

    <!-- LIST ITEMS (always at bottom of card) -->
    <ContentList v-if="props.list" class="border-t-2 border-neutral-200" v-bind="props.list" />

  </article>


</template>