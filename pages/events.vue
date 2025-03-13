<!-- 
This event page was designed by taking inspiration from 

Event categories:
- Highlighted events ⭐️
- Near you ('City') ⭐️
- Today / Tonight
- Tomorrow ('Day')
- Later this week ('Day', 'Day', ...) / 'Friday'
- This weekend (Sat, Sun)
- Next week
- Later this month (‘Month')
- Next month ('Month'): this month +1
- ‘Month’: this month +2, etc

We show different event categories based on the day of the week.

ON ALL DAYS
- Highlighted events ⭐️
- Near you ('City') 
...⭐️based on the day of the week ...
- Later this month: only if the end of 'Next week' is before the end of this month
- Next month
- 'Month'

MONDAY
- Today / Tonight
- Tomorrow (Tue)
- Later this week (Wed, Thu, Fri)
- This weekend
- Next week

TUESDAY
- Today / Tonight
- Tomorrow (Wed)
- Later this week (Thu, Fri)
- This weekend
- Next week

WEDNESDAY
- Today / Tonight
- Tomorrow (Thu)
- Friday
- This weekend
- Next week

THURSDAY
- Today / Tonight
- Tomorrow (Fri)
- This weekend
- Next week

FRIDAY
- Today / Tonight
- This weekend
- Next week

SATURDAY
- Today / Tonight
- Tomorrow (Sun)
- Next week

SUNDAY
- Today / Tonight
- Next week

-->


<script lang="ts" setup>
import type { Event } from '~/stores/directus';

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

function getMonthEvents(month: number, year: number) {
  return []
}

import type { ContentItem } from '~/components/ContentBuilder.vue';

const content = ref<ContentItem[]>([
  {
    type: "ContentCards",
    props: {
      columns: '1',
      reverse: true,
      cards: [
        {
          title: 'Online intro-avond', content: 'Iedere woensdagavond 20:00 verwelkomen wij nieuwe veranderaars. Denk jij erover om je aan te sluiten bij Milieudefensie? Sluit aan bij onze online intro-avond en leer wat jij kan doen.', buttonSize: 'lg', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }], listItems: [{ title: 'Morgen 20:00', subtitle: 'Online intro-avond', type: 'event', link: '/' }, { title: 'Woensdag, 12 maart 20:00', subtitle: 'Online intro-avond', type: 'event', link: '/' }, { title: 'Woensdag, 19 maart 20:00', subtitle: 'Online intro-avond', type: 'event', link: '/' }]
        },
      ]
    }
  },
  {
    type: "ContentMap",
    props: {
      markers: [
        { title: "Tilburg", coordinates: [5.0833, 51.5500] },
        { title: "Amsterdam", coordinates: [4.9003, 52.3791] },
        { title: "Rotterdam", coordinates: [4.4800, 51.9200] },
        { title: "The Hague", coordinates: [4.3100, 52.0800] },
        { title: "Utrecht", coordinates: [5.1217, 52.0908] },
        { title: "Maastricht", coordinates: [5.6833, 50.8500] },
        { title: "Eindhoven", coordinates: [5.4833, 51.4333] },
        { title: "Groningen", coordinates: [6.5675, 53.2189] },
        { title: "Almere", coordinates: [5.2167, 52.3667] },
        { title: "Breda", coordinates: [4.7758, 51.5889] },
        { title: "Nijmegen", coordinates: [5.8625, 51.8475] },
        { title: "Arnhem", coordinates: [5.9167, 51.9833] },
        { title: "Haarlem", coordinates: [4.6333, 52.3833] },
        { title: "Enschede", coordinates: [6.8925, 52.2225] },
        { title: "’s - Hertogenbosch", coordinates: [5.3000, 51.6833] },
        { title: "Amersfoort", coordinates: [5.3833, 52.1500] },
        { title: "Zaanstad", coordinates: [4.8167, 52.4333] },
        { title: "Apeldoorn", coordinates: [5.9667, 52.2167] },
        { title: "Zwolle", coordinates: [6.1000, 52.5167] },
        { title: "Zoetermeer", coordinates: [4.5000, 52.0667] },
        { title: "Leeuwarden", coordinates: [5.7833, 53.2000] },
        { title: "Leiden", coordinates: [4.4900, 52.1600] },
        { title: "Dordrecht", coordinates: [4.6783, 51.7958] },
        { title: "Alphen aan den Rijn", coordinates: [4.6667, 52.1333] },
        { title: "Alkmaar", coordinates: [4.7500, 52.6333] },
        { title: "Delft", coordinates: [4.3592, 52.0117] },
        { title: "Emmen", coordinates: [6.9000, 52.7833] },
        { title: "Deventer", coordinates: [6.1500, 52.2500] },
        { title: "Helmond", coordinates: [5.6500, 51.4833] },
        { title: "Hilversum", coordinates: [5.1667, 52.2333] },
        { title: "Heerlen", coordinates: [5.9833, 50.8833] },
        { title: "Lelystad", coordinates: [5.4833, 52.5000] },
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
    type: "ContentCards",
    props: {
      columns: 'automatic',
      reverse: false,
      cards: [
        {
          title: "Klimaatcafe's", content: "Onze klimaatcafe's zijn een leuke manier om onze lokale groepen te leren kennen.", buttonSize: 'lg', image: { url: '/jong.jpg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }], listItems: [{ title: 'Morgen 20:00', subtitle: 'Online intro-avond', type: 'event', link: '/' }, { title: 'Woensdag, 12 maart 20:00', subtitle: 'Online intro-avond', type: 'event', link: '/' }, { title: 'Woensdag, 19 maart 20:00', subtitle: 'Online intro-avond', type: 'event', link: '/' }]
        },
        {
          title: 'Aandeelhouder acties', content: 'Wij gaan op bezoek bij de aandeelhouders-vergaderingen.', buttonSize: 'lg', image: { url: '/campagnedag-1.jpg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }], listItems: [{ title: 'Dindag, 16 maart 20:00', subtitle: 'Aandeelhouders actie training', type: 'event', link: '/' }, { title: 'Vrijdag, 18 maart 20:00', subtitle: 'Zaandam', description: 'Ahold actie', type: 'event', link: '/' }, { title: 'Zaterdag, 19 maart 20:00', subtitle: 'Amsterdam', description: 'ING actie', type: 'event', link: '/' }]
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
    type: "ContentCards",
    props: {
      columns: 'automatic',
      reverse: false,
      carousel: true,
      cards: [
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Docu & borrel: Once You Care', content: 'Vandaag 19:00 - Hengelo', buttonSize: 'md', image: { url: '/jong.jpg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Online intro-avond', content: 'Vandaag 20:00 - Online', buttonSize: 'md', image: { url: '/campagnedag-2.jpg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
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
    type: "ContentCards",
    props: {
      columns: 'automatic',
      reverse: false,
      carousel: true,
      cards: [
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/campagnedag-1.jpg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Docu & borrel: Once You Care', content: 'Vandaag 19:00 - Hengelo', buttonSize: 'md', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
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
    type: "ContentCards",
    props: {
      columns: '1',
      reverse: false,
      carousel: true,
      cards: [
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
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
    type: "ContentCards",
    props: {
      columns: 'automatic',
      reverse: false,
      carousel: true,
      cards: [
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },

      ]
    },

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
    type: "ContentCards",
    props: {
      columns: 'automatic',
      reverse: false,
      carousel: true,
      cards: [
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/campagnedag-2.jpg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/jong.jpg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
      ]
    },

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
    type: "ContentCards",
    props: {
      columns: 'automatic',
      reverse: false,
      carousel: true,
      cards: [
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/jong.jpg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
      ]
    },

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
    type: "ContentCards",
    props: {
      columns: 'automatic',
      reverse: false,
      carousel: true,
      cards: [
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/jong.jpg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Aandeelhouders actie training', content: 'Vandaag 13:00 - Amsterdam', buttonSize: 'md', image: { url: '/campagnedag-1.jpg', alt: 'Fabriek' }, buttons: [{ label: 'Meld je aan', link: '/test', color: 'secondary', style: 'default', width: 'default' }]
        },
      ]
    },

  },

]
)




</script>
<template>

  <div class="bg-accent text-accent-content py-[12vh] text-center  mx-auto mb-6">
    <h1 class="text-4xl md:text-6xl lg:text-8xl font-display">Evenementen</h1>
    <p class="text-xl">Aankomende trainingen, acties, meetups en gezellige bijeenkomsten</p>
  </div>
  <ContentBuilder :content="content" />


</template>