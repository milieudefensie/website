<template>


  <!-- Right Column: Map -->
  <Map class="w-full lg:w-2/3 h-[calc(60vh+18px)] lg:h-[100vh] absolute lg:fixed top-0 left-0 z-1">
  </Map>

  <Navigation class="absolute top-0 left-0 z-10 lg:!w-2/3" full-width />


  <!-- Left Column: Local Groups -->
  <div
    class="w-full shadow-lg lg:h-full lg:w-1/3  absolute top-[calc(60vh+18px)] lg:top-0  right-0 z-2 lg:overflow-y-scroll bg-base-100 p-2 py-8">

    <div class="px-2 lg:px-4 space-y-4">
      <!-- <ContentProse content="<h1>Lokale groepen</h1>" /> -->

      <div class="card bg-white shadow max-lg:-mt-18 p-4">
        <label class="floating-label">
          <span>Locatie</span>
          <input type="search" class="input input-sm w-full" value="Utrecht" />
        </label>
      </div>



      <ContentCardCollection :cards="[{
        title: 'Milieudefensie Utrecht',
        content: 'Lokale organizer: Angela',
        variant: 'shadow',
        reverse: true,
        images: [{
          src: 'https://picsum.photos/805',
          alt: 'Fabriek'
        }, {
          src: 'https://picsum.photos/806',
          alt: 'Fabriek'
        }, {
          src: 'https://picsum.photos/807',
          alt: 'Fabriek'
        }],
        buttons: {
          buttons: [{
            label: 'Bekijk de groep',
            link: '/test',
            color: 'secondary',
            style: 'default',
            width: 'default'
          }]
        },
        list: {
          color: 'secondary',
          items: [{
            title: 'Morgen 20:00',
            subtitle: 'Online',
            description: 'Intro-avond',
            type: 'event',
            link: '/'
          },
          {
            title: 'Woe, 12 maart 20:00',
            subtitle: 'Online',
            description: 'Intro-avond',
            type: 'event',
            link: '/'
          },
          ]
        },
      },]" />

    </div>


    <!-- <h1 class="text-6xl font-display m-4 mt-8">Lokale groepen</h1> -->
    <ContentBuilder :content="content" />

    <!-- <ContentGroupList :groups="localGroups" /> -->
  </div>


</template>

<script lang="ts" setup>

import type { ContentItem } from '~/components/ContentBuilder.vue';
type LocalGroups = {
  name: string;
  description: string;
  location: [number, number];
  slug: string;
}[];

definePageMeta({
  layout: 'fullscreen',
});

const content = ref<ContentItem[]>([



  {
    type: "ContentTestimonial",
    props: {
      testimonials: [
        {
          author: 'Jan de Boer',
          content: 'Ik ben lid geworden van de lokale groep in mijn buurt. We organiseren samen acties en evenementen om het klimaat te beschermen.'
        },
        {
          author: 'Marie Jansen',
          content: 'De lokale groep is een geweldige manier om nieuwe mensen te ontmoeten en samen te werken aan een betere toekomst voor onze planeet.'
        }
      ]
    }
  },

  {
    type: "ContentProse",
    props: {
      content: `
      <h2>Wat kan ik doen?</h2>
      <p>  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt commodi aspernatur ratione adipisci quibusdam laboriosam sequi ea nesciunt, esse qui amet earum nulla tempora inventore facere ut, beatae explicabo voluptas.</p>
      `
    }
  },

  {
    type: "ContentProse",
    props: {
      content: `
      <h2>Alle lokale groepen</h2>
      `
    }
  },

  {
    type: "ContentCardCollection",
    props: {
      noColumns: false,
      carousel: false,
      cards: [
        {
          title: 'Milieudefensie Amersfoort',
          variant: 'shadow',
          reverse: false,
          images: [{
            src: 'https://picsum.photos/801',
            alt: 'Fabriek'
          },
          {
            src: 'https://picsum.photos/802',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Bekijk groep',
              link: '/test',
              color: 'secondary',
              style: 'default',
              width: 'default'
            }]
          },

        },
        {
          title: 'Milieudefensie Amsterdam',
          variant: 'shadow',
          reverse: false,
          images: [{
            src: 'https://picsum.photos/803',
            alt: 'Fabriek'
          },
          {
            src: 'https://picsum.photos/804',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Bekijk groep',
              link: '/test',
              color: 'secondary',
              style: 'default',
              width: 'default'
            }]
          },

        },

      ]
    }
  },


]
)


// Example list of local groups
const localGroups = ref<LocalGroups>([
  {
    name: 'Group A',
    description: 'Description for Group A',
    location: [52.3676, 4.9041],
    slug: 'group-a',
  },
  {
    name: 'Group B',
    description: 'Description for Group B',
    location: [51.9244, 4.4777],
    slug: 'group-b',
  },
  {
    name: 'Group C',
    description: 'Description for Group C',
    location: [50.8503, 4.3517],
    slug: 'group-c',
  },
]);

// Map markers derived from local groups
const mapMarkers = ref(
  localGroups.value.map(group => ({
    title: group.name,
    coordinates: group.location,
  }))
);
</script>

<style scoped>
/* Add any additional styling if needed */
</style>