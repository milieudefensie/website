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
        {
          title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident quibusdam corporis laboriosam temporibus, perferendis reprehenderit deleniti maxime facere impedit optio.', buttonSize: 'lg', buttons: [{ label: 'Click me', link: '', color: 'secondary', style: 'default', width: 'default' }]
        }
      ]
    }
  }
]
)
</script>
<template>

  <div class="space-y-4">
    <div class="bg-accent text-accent-content py-[12vh] text-center  mx-auto">
      <h1 class="text-8xl font-display ">Evenementen</h1>
      <p class="text-xl">Aankomende trainingen, acties en gezellige evenementen</p>
    </div>
    <ContentBuilder :content="content" />
  </div>



</template>