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
- Form

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
  id: string;
  images?: CardImage[];
  hideImagesOnMobile?: boolean;
  icon?: CardIcon;
  video?: CardVideo;
  title: string;
  subtitle?: string;
  boldLabel?: string;
  label?: string;
  content?: string;
  badges?: string[];
  secondaryBadges?: string[];
  buttons?: ButtonProps;
  form?: boolean;
  list?: ListProps;
  variant: "shadow" | "border" | "ghost";
  reverse: boolean;
}

const props = defineProps<CardProps>()


const singleLink = computed(() => {
  if (props.buttons && props.buttons.buttons.length === 1) {
    return props.buttons.buttons[0].link
  } else return null
})

const bool = ref(false);

onMounted(() => {
  setInterval(() => {
    bool.value = !bool.value;
  }, 1000);
});


const rerender = ref(false);

</script>
<template>
  <article class="card grid shadow-transition" :class="{
    'cursor-pointer hover:shadow-2xl ': singleLink,
    'bg-white shadow': props.variant === 'shadow',
    'border-2 border-neutral/10': props.variant === 'border',
    'border-b-2 border-neutral/10 pb-6 rounded-none': props.variant === 'ghost',
    'overflow-hidden': props.variant !== 'ghost',
  }" :style="`view-transition-name: card-${props.id}`">

    <!-- REVERSABLE ITEMS (media and text content positions can be reversed) -->
    <div class="flex" :class="{
      'flex-col-reverse @2xl/cards:flex-row-reverse': props.reverse,
      'flex-col @2xl/cards:flex-row': !props.reverse,
    }">

      <!-- MEDIA (Icon, image or video) -->
      <div class="@2xl/cards:w-1/2 @4xl/cards:w-2/6 flex items-start" :class="{
        'max-md:hidden': props.hideImagesOnMobile,

      }" @click="singleLink ? $router.push(singleLink) : null" :style="`view-transition-name: card-image-${props.id}`">
        <NuxtPicture v-for="(image, index) in props.images" format="avif,webp" :src="image.src" :alt="image.alt"
          width="1000px" height="1000px" sizes="calc(100vw - 26px) md:40vw" densities="x1 x2" :class="{
            'border-l-2 border-white': index > 0,
            '@2xl/cards:hidden': index > 0,
            'rounded-lg overflow-hidden': props.variant === 'ghost',

          }" />



      </div>

      <!-- TEXT CONTENT -->
      <div class="card-body @2xl/cards:w-1/2 @4xl/cards:w-4/6 grid content-between space-y-4" :class="{
        'p-0 @max-2xl/cards:pt-4  @2xl/cards:pl-4 @6xl/cards:pl-8': props.variant === 'ghost',
      }" @click="singleLink ? $router.push(singleLink) : null">

        <div class="space-y-2 @6xl/cards:space-y-6">

          <div class="@4xl:flex items-center  flex-wrap gap-x-4 gap-y-2">

            <div
              class="text-secondary text-lg @md/cards:text-xl @4xl:text-2xl @6xl:text-3xl font-stretch-extra-condensed @max-4xl:mb-2"
              v-if="props.boldLabel || props.label">

              <span class="font-bold">{{ props.boldLabel }}</span>
              <span v-if="props.boldLabel && props.label"> - </span>
              <span class="">{{ props.label }}</span>
            </div>

            <!-- Badges -->
            <div v-if="props.badges" class="flex gap-2">
              <span class="badge badge-secondary badge-sm @md/cards:badge-lg @lg/cards:badge-xl font-bold"
                v-for="(badge, index) in props.badges" :key="index">
                {{ badge }}
              </span>
            </div>

          </div>



          <!-- Title -->
          <h2
            class="card-title font-display text-2xl/6 @md/cards:text-3xl/8 @4xl/cards:text-5xl/10 @6xl:text-8xl/20 text-balance hyphens-auto"
            v-if="props.title" :style="`view-transition-name: card-title-${props.id}`" lang="nl">
            {{ props.title }}
          </h2>

          <!-- Subtitle -->
          <div class="@6xl:text-xl flex flex-wrap  gap-2 items-center" v-if="props.subtitle"
            :style="`view-transition-name: card-subtitle-${props.id}`">
            <div class=" font-semibold uppercase opacity-60 font-stretch-condensed">
              {{
                props.subtitle }}</div>
            <div v-for="badge in secondaryBadges"
              class="badge py-0 badge-sm  bg-white font-stretch-extra-condensed opacity-50 ">{{ badge
              }}</div>
          </div>

          <!-- Content -->
          <div class="text-md @4xl/cards:text-lg ">
            {{ props.content }}
          </div>


        </div>



        <!-- Buttons -->
        <div>

          <ContentForm v-if="props.form" label="👉 Ik ben er bij!" />


          <Buttons v-if="props.buttons" v-bind="props.buttons" />
        </div>


      </div>

    </div>

    <!-- LIST ITEMS (always at bottom of card) -->
    <ContentList v-if="props.list" class="border-t-2 border-neutral-200" v-bind="props.list" />

  </article>


</template>
<style scoped>
.shadow-transition {
  transition: box-shadow .2s ease-in-out;
}
</style>