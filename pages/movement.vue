<!-- 
 Docs: https://docs-4gf.pages.dev/pages/events
-->

<script lang="ts" setup>

import type { ContentItem } from '~/components/ContentBuilder.vue';

const content = ref<ContentItem[]>([
  {
    type: "ContentVideo",
    props: {
      youtubeURL: 'https://www.youtube.com/watch?v=M8LZlnJHzXQ',
    },
  },

  {
    type: "ContentCardCollection",
    props: {
      noColumns: false,
      carousel: false,
      cards: [{
        title: 'Milieudefensie Utrecht',
        subtitle: 'Lokale organizer: Angela',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        variant: 'shadow',
        reverse: false,
        images: [{
          src: '/fabriek.jpeg',
          alt: 'Fabriek'
        }, {
          src: 'campagnedag-1.jpg',
          alt: 'Fabriek'
        }, {
          src: 'campagnedag-2.jpg',
          alt: 'Fabriek'
        }],
        buttons: {
          buttons: [{
            label: 'Bekijk de groep',
            link: '/test',
            color: 'secondary',
            style: 'default',
            width: 'default'
          },
            // {
            //   label: 'Ga in Signal groep',
            //   link: '/test',
            //   color: 'secondary',
            //   style: 'outline',
            //   width: 'default'
            // }
          ]
        },
        list: {
          color: 'secondary',
          items: [
            {
              title: 'Morgen 20:00',
              subtitle: 'Utrecht',
              description: 'Picknick',
              type: 'event',
              link: '/'
            },
            {
              title: 'Woe, 12 maart 20:00',
              subtitle: 'Utrecht',
              description: 'Actie bij Albert Heijn',
              type: 'event',
              link: '/'
            },
            {
              title: 'Woe, 12 maart 20:00',
              subtitle: 'Utrecht',
              description: 'Borrel',
              type: 'event',
              link: '/'
            },
          ]
        },
      },]
    }
  },
  {
    type: "ContentMap",
    props: {
      markers: [
        {
          title: "Tilburg",
          coordinates: [5.0833,
            51.5500]
        },
        {
          title: "Amsterdam",
          coordinates: [4.9003,
            52.3791]
        },
        {
          title: "Rotterdam",
          coordinates: [4.4800,
            51.9200]
        },
        {
          title: "The Hague",
          coordinates: [4.3100,
            52.0800]
        },
        {
          title: "Utrecht",
          coordinates: [5.1217,
            52.0908]
        },
        {
          title: "Maastricht",
          coordinates: [5.6833,
            50.8500]
        },
        {
          title: "Eindhoven",
          coordinates: [5.4833,
            51.4333]
        },
        {
          title: "Groningen",
          coordinates: [6.5675,
            53.2189]
        },
        {
          title: "Almere",
          coordinates: [5.2167,
            52.3667]
        },
        {
          title: "Breda",
          coordinates: [4.7758,
            51.5889]
        },
        {
          title: "Nijmegen",
          coordinates: [5.8625,
            51.8475]
        },
        {
          title: "Arnhem",
          coordinates: [5.9167,
            51.9833]
        },
        {
          title: "Haarlem",
          coordinates: [4.6333,
            52.3833]
        },
        {
          title: "Enschede",
          coordinates: [6.8925,
            52.2225]
        },
        {
          title: "’s - Hertogenbosch",
          coordinates: [5.3000,
            51.6833]
        },
        {
          title: "Amersfoort",
          coordinates: [5.3833,
            52.1500]
        },
        {
          title: "Zaanstad",
          coordinates: [4.8167,
            52.4333]
        },
        {
          title: "Apeldoorn",
          coordinates: [5.9667,
            52.2167]
        },
        {
          title: "Zwolle",
          coordinates: [6.1000,
            52.5167]
        },
        {
          title: "Zoetermeer",
          coordinates: [4.5000,
            52.0667]
        },
        {
          title: "Leeuwarden",
          coordinates: [5.7833,
            53.2000]
        },
        {
          title: "Leiden",
          coordinates: [4.4900,
            52.1600]
        },
        {
          title: "Dordrecht",
          coordinates: [4.6783,
            51.7958]
        },
        {
          title: "Alphen aan den Rijn",
          coordinates: [4.6667,
            52.1333]
        },
        {
          title: "Alkmaar",
          coordinates: [4.7500,
            52.6333]
        },
        {
          title: "Delft",
          coordinates: [4.3592,
            52.0117]
        },
        {
          title: "Emmen",
          coordinates: [6.9000,
            52.7833]
        },
        {
          title: "Deventer",
          coordinates: [6.1500,
            52.2500]
        },
        {
          title: "Helmond",
          coordinates: [5.6500,
            51.4833]
        },
        {
          title: "Hilversum",
          coordinates: [5.1667,
            52.2333]
        },
        {
          title: "Heerlen",
          coordinates: [5.9833,
            50.8833]
        },
        {
          title: "Lelystad",
          coordinates: [5.4833,
            52.5000]
        },
      ]
    }
  },


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
      <h2>Blijf op de hoogte via Signal</h2>
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




</script>
<template>

  <Navigation color="secondary" />
  <div>
    <div class="bg-secondary text-secondary-content pt-[4vh] pb-[20vh] px-4 text-center mx-auto space-y-2">
      <h1 class="text-5xl sm:text-7xl md:text-8xl font-display">Onze beweging</h1>
      <p class="text-xl text-balance">Sluit je aan bij een lokale groep bij jou in de buurt. Samen staan we sterker!</p>
    </div>
    <div class="-mt-[16vh]">
      <ContentBuilder :content="content" />
    </div>

  </div>


</template>