<template>


  <!-- Right Column: Map -->
  <Map class="w-full md:w-2/3 h-[80vh] md:h-[100vh] fixed top-30 right-0 z-1">
  </Map>



  <!-- Left Column: Local Groups -->
  <div
    class="w-full md:h-full md:w-1/3 absolute top-[80vh] md:top-30  left-0 z-2 overflow-y-scroll bg-base-100 p-4 border-t border-neutral/20">
    <!-- <h1 class="text-6xl font-display m-4 mt-8">Lokale groepen</h1> -->
    <ContentBuilder :content="content" />

    <!-- <ContentGroupList :groups="localGroups" /> -->
  </div>


</template>

<script lang="ts" setup>


type LocalGroups = {
  name: string;
  description: string;
  location: [number, number];
  slug: string;
}[];

// definePageMeta({
//   layout: 'fullscreen',
// });

const content = ref([
  {
    type: "ContentProse",
    props: {
      content: `
      <h1>Lokale groepen</h1>
      <p>Iets doen aan het klimaat kan gewoon bij jou in de buurt. Samen met anderen.</p>
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
          title: 'Milieudefensie Utrecht',
          subtitle: 'Lokale groep',
          variant: 'shadow',
          reverse: false,
          image: {
            src: '/fabriek.jpeg',
            alt: 'Fabriek'
          },
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
        },
      ]
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
          subtitle: 'Lokale groep',
          variant: 'shadow',
          reverse: false,
          image: {
            src: '/jong.jpg',
            alt: 'Fabriek'
          },
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'default',
              width: 'default'
            }]
          },

        },
        {
          title: 'Milieudefensie Amsterdam',
          subtitle: 'Lokale groep',
          variant: 'shadow',
          reverse: false,
          image: {
            src: '/jong.jpg',
            alt: 'Fabriek'
          },
          buttons: {
            buttons: [{
              label: 'Meld je aan',
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