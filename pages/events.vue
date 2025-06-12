<!-- 
 Docs: https://docs-4gf.pages.dev/pages/events
-->

<script lang="ts" setup>
import type { Event } from '~/server/api/getEvents';

const today = ref()
const currentDayOfWeek = ref()

export interface EventCategory {
  title: string;
  events: Event[];
}

const eventCategories = ref([])

onMounted(() => {
  today.value = new Date()
  currentDayOfWeek.value = today.value.getDay()

  setEventCategories(currentDayOfWeek.value)
})

function setEventCategories(day: number) {
  switch (day) {
    case 1: // Monday

      break;

    default:
      break;
  }
}

function getHighlightedEvents() {
  return []
}

function getEvensNearYou() {
  return []
}

function getTodayEvents() {
  return []
}

function getTonightEvents() {
  return []
}

function getTomorrowEvents() {
  return []
}

function getLaterThisWeekEvents() {
  return []
}

function getThisWeekendEvents() {
  return []
}

function getNextWeekEvents() {
  return []
}

function getLaterThisMonthEvents() {
  return []
}

function getNextMonthEvents() {
  return []
}

function getMonthEvents(month: number,
  year: number) {
  return []
}

import type { ContentItem } from '~/components/ContentBuilder.vue';

const content = ref<ContentItem[]>([
  {
    type: "ContentCardCollection",
    props: {
      noColumns: false,
      carousel: false,
      cards: [
        {
          title: 'Intro-avond voor nieuwe veranderaars',
          subtitle: 'Online',
          content: 'Iedere woensdagavond 20:00 verwelkomen wij nieuwe veranderaars. Denk jij erover om je aan te sluiten bij Milieudefensie? Sluit aan bij onze online intro-avond en leer wat jij kan doen.',
          variant: 'shadow',
          reverse: true,
          images: [{
            src: '/fabriek.jpeg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
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
              title: 'Woensdag, 12 maart 20:00',
              subtitle: 'Online',
              description: 'Intro-avond',
              type: 'event',
              link: '/'
            },
            {
              title: 'Woensdag, 19 maart 20:00',
              subtitle: 'Online',
              description: 'Intro-avond',
              type: 'event',
              link: '/'
            }]
          },
        },
      ]
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
    type: "ContentProse",
    props: {
      content: `
      <h2>Uitgelichte evenementen</h2>
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
          title: 'Milieudefensie on Tour',
          subtitle: 'Avond met hoop, humor en energie',
          content: "Ingewikkelde zaken, zoals gevaarlijke klimaatverandering uitgelegd, maar dan zonder saaie grafieken en droge cijfers. Kom lachen, ontmoet leuke mensen en ontdek wat jij kan doen.",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/jong.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
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
              title: 'Woensdag, 12 maart 20:00',
              subtitle: 'Online',
              description: 'Intro-avond',
              type: 'event',
              link: '/'
            },
            {
              title: 'Woensdag, 19 maart 20:00',
              subtitle: 'Online',
              description: 'Intro-avond',
              type: 'event',
              link: '/'
            }]
          },
        },
        {
          title: 'Aandeelhouder acties',
          subtitle: 'Stop vervuilende bedrijven',
          content: 'Grote vervuilende bedrijven gaan door met graaien en het veroorzaken van gevaarlijke klimaatverandering. Wij roepen ze ter verantwoording tijdens hun aandeelhoudersvergaderingen. Leer meer tijdens een training!',
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/fabriek.jpeg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'default',
              width: 'default'
            }]
          },
          list: {
            color: 'secondary',
            items: [{
              title: 'Zaterdag, 29 maart 14:00',
              subtitle: 'Rotterdam',
              description: 'Training aandeelhouder acties',
              type: 'event',
              link: '/'
            },
            {
              title: 'Woensdag, 4 april 19:00',
              subtitle: 'Utrecht',
              description: 'Training aandeelhouder acties',
              type: 'event',
              link: '/'
            },
            {
              title: 'Woensdag, 8 april 14:00',
              subtitle: 'Zaandam',
              description: 'Actie Ahold',
              type: 'event',
              link: '/'
            }]
          },
        },

      ]
    }
  },


  {
    type: "ContentProse",
    props: {
      content: `
      <h2>Vandaag</h2>
      `
    }
  },


  {
    type: "ContentCardCollection",
    props: {
      noColumns: false,
      carousel: true,
      cards: [
        {
          title: 'Code oranje: Grote vervuiler ING',
          subtitle: 'Tivoli, Utrecht',
          content: "17 maart 20:00",
          badges: ['🎤  Milieudefensie on Tour'],
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/campagnedag-2.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },
      ]
    }
  },


  {
    type: "ContentProse",
    props: {
      content: `
      <h2>Morgen</h2>
      `
    }
  },

  {
    type: "ContentCardCollection",
    props: {
      noColumns: false,
      carousel: true,
      cards: [
        {
          title: 'Lorem ipsum dolor sit amet',
          subtitle: 'Rotterdam',
          content: "17 maart 20:00",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/campagnedag-1.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },
        {
          title: 'Klimaatcafe: Arnhem klimaatbestendig',
          subtitle: 'Arnhem',
          content: "17 maart 20:00",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/jong.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },
        {
          title: 'Welkom bij Milieudefensie',
          subtitle: 'Online',
          content: "17 maart 20:00",
          badges: ['👋 Intro avond'],
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/fabriek.jpeg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },
      ]
    }
  },



  {
    type: "ContentProse",
    props: {
      content: `
      <h2>Woensdag</h2>
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
          title: 'Lorem ipsum',
          subtitle: 'Tivoli, Utrecht',
          content: "17 maart 20:00",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/campagnedag-2.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },
      ]
    }
  },


  {
    type: "ContentProse",
    props: {
      content: `
      <h2>Dit weekend </h2>
      `
    }
  },


  {
    type: "ContentCardCollection",
    props: {
      noColumns: false,
      carousel: true,
      cards: [
        {
          title: 'Lorem ipsum dolor sit amet',
          subtitle: 'Rotterdam',
          content: "17 maart 20:00",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/campagnedag-1.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },
        {
          title: 'Klimaatcafe: Arnhem klimaatbestendig',
          subtitle: 'Arnhem',
          content: "17 maart 20:00",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/jong.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },


      ]
    }
  },



  {
    type: "ContentProse",
    props: {
      content: `
      <h2>Komende week</h2>
      `
    }
  },

  {
    type: "ContentCardCollection",
    props: {
      noColumns: false,
      carousel: true,
      cards: [
        {
          title: 'Lorem ipsum dolor sit amet',
          subtitle: 'Rotterdam',
          content: "17 maart 20:00",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/campagnedag-1.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },
        {
          title: 'Klimaatcafe: Arnhem klimaatbestendig',
          subtitle: 'Arnhem',
          content: "17 maart 20:00",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/jong.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },
        {
          title: 'Welkom bij Milieudefensie',
          subtitle: 'Online',
          content: "17 maart 20:00",
          badges: ['👋 Intro avond'],
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/fabriek.jpeg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },

        {
          title: 'Lorem ipsum',
          subtitle: 'Online',
          content: "17 maart 20:00",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/fabriek.jpeg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },

        {
          title: 'Lorem ipsum',
          subtitle: 'Online',
          content: "17 maart 20:00",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/campagnedag-1.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },

        {
          title: 'Lorem ipsum',
          subtitle: 'Online',
          content: "17 maart 20:00",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/jong.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },
      ]
    }
  },



  {
    type: "ContentProse",
    props: {
      content: `
      <h2>Later deze maand</h2>
      `
    }
  },

  {
    type: "ContentCardCollection",
    props: {
      noColumns: false,
      carousel: true,
      cards: [
        {
          title: 'Lorem ipsum',
          subtitle: 'Tivoli, Utrecht',
          content: "17 maart 20:00",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/campagnedag-2.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

              width: 'default'
            }]
          },

        },
      ]
    }
  },

  {
    type: "ContentProse",
    props: {
      content: `
      <h2>April</h2>
      `
    }
  },


  {
    type: "ContentCardCollection",
    props: {
      noColumns: false,
      carousel: true,
      cards: [
        {
          title: 'Lorem ipsum',
          subtitle: 'Tivoli, Utrecht',
          content: "17 maart 20:00",
          variant: 'shadow',
          reverse: false,
          images: [{
            src: '/campagnedag-2.jpg',
            alt: 'Fabriek'
          }],
          buttons: {
            buttons: [{
              label: 'Meld je aan',
              link: '/test',
              color: 'secondary',
              style: 'outline',

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

  <Navigation color="accent" />

  <div>
    <div class="bg-accent text-accent-content pt-[4vh] pb-[20vh] px-4 text-center mx-auto space-y-2">
      <h1 class="text-5xl sm:text-7xl md:text-8xl font-display ">Evenementen</h1>
      <p class="text-xl text-balance">Aankomende trainingen,
        acties,
        meetups en gezellige bijeenkomsten</p>
    </div>
    <div class="-mt-[16vh]">
      <ContentBuilder :content="content" />
    </div>

  </div>


</template>