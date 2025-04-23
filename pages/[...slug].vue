<script setup lang="ts">
// import type { ContentItem } from '~/components/ContentBuilder.vue';

export interface Article {
  id: number
  path: string
  title: string
  content: string
}

export interface Event {
  title: string
  path: string
  date: Date
  location: string
}

interface Schema {
  articles: Article[]
  events: Event[]
}

import { createDirectus, rest, readItems, graphql } from '@directus/sdk'
const config = useRuntimeConfig()

const directus = createDirectus<Schema>(config.public.directusServer).with(
  graphql()
)

// // Fetches the article from Directus based on the current slug, using the useAsyncData function
const { slug } = useRoute().params

const { data, error } = await useAsyncData(`article:${slug[0]}`, async () => {
  const query = {
    filter: { path: { _eq: slug } },
    limit: 1,
  }

  const articles = await directus.query<Article[]>(`
    query {
      articles {
        id
        path
        title
        content
      }
    }
  `)

  console.log('articles', articles)

  return articles

  // if (!articles[0]) {
  //   throw new Error('Article not found')
  // } else {
  //   return articles[0]
  // }

})
prerenderRoutes(["/sluit-je-aan"]);


// if (!data.value) {
//   throw createError({
//     statusCode: 404,
//     statusMessage: 'Page Not Found'
//   })
// }


// const content = ref<ContentItem[]>([
//   {
//     type: "ContentButtonGroup",
//     props: {
//       buttons: [
//         { label: 'Klik mij!', link: '', color: 'primary', style: 'default', width: 'default' }
//       ],
//       size: 'lg'
//     }
//   },
//   {
//     type: "ContentCardCollection",
//     props: {
//       columns: '1',
//       reverse: true,
//       cards: [
//         {
//           title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', buttonSize: 'lg', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Click me', link: '/test', color: 'secondary', style: 'default', width: 'default' }], listItems: [{ title: 'Item 1', subtitle: 'Subtitle 1', description: 'Description 1', type: 'event', link: '/' }, { title: 'Item 2', subtitle: 'Subtitle 2', description: 'Description 2', type: 'group', link: '/' }]
//         },
//         {
//           title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident quibusdam corporis laboriosam temporibus, perferendis reprehenderit deleniti maxime facere impedit optio.', buttonSize: 'lg', buttons: [{ label: 'Click me', link: '', color: 'secondary', style: 'default', width: 'default' }]
//         }
//       ]
//     }
//   },
//   {
//     type: "ContentCardCollection",
//     props: {
//       columns: 'automatic',
//       reverse: false,
//       carousel: true,

//       cards: [
//         {
//           title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident quibusdam corporis laboriosam temporibus, perferendis reprehenderit deleniti maxime facere impedit optio.', buttonSize: 'lg', buttons: [{ label: 'Click me', link: '', color: 'secondary', style: 'default', width: 'default' }]
//         },
//         {
//           title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', buttonSize: 'lg', buttons: [{ label: 'Click me', link: '', color: 'secondary', style: 'default', width: 'default' }]
//         },
//         {
//           title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident quibusdam corporis laboriosam temporibus.', buttonSize: 'lg', buttons: [{ label: 'Click me', link: '', color: 'secondary', style: 'default', width: 'default' }]
//         },
//         {
//           title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident quibusdam corporis laboriosam temporibus.', buttonSize: 'lg', buttons: [{ label: 'Click me', link: '', color: 'secondary', style: 'default', width: 'default' }]
//         },
//         {
//           title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident quibusdam corporis laboriosam temporibus.', buttonSize: 'lg', buttons: [{ label: 'Click me', link: '', color: 'secondary', style: 'default', width: 'default' }]
//         },
//         {
//           title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident quibusdam corporis laboriosam temporibus.', buttonSize: 'lg', buttons: [{ label: 'Click me', link: '', color: 'secondary', style: 'default', width: 'default' }]
//         }
//       ]
//     }
//   },

//   {
//     type: "ContentTestimonial",
//     props: {
//       testimonials: [
//         { author: 'Test', content: 'Lorem ipsum...' }
//       ]
//     }
//   },
//   {
//     type: "ContentImage",
//     props: {
//       caption: "Lorem ipsum",
//       imageURL: "/fabriek.jpeg",
//       alt: "Fabriek"
//     }
//   },
//   {
//     type: "ContentVideo",
//     props: {
//       youtubeURL: "https://www.youtube.com/watch?v=Vz4Rzh16mac"
//     }
//   },
//   {
//     type: "ContentAccordion",
//     props: {
//       items: [
//         {
//           title: 'Accordion Item 1',
//           content: 'Content for accordion item 1'
//         },
//         {
//           title: 'Accordion Item 2',
//           content: 'Content for accordion item 2'
//         },
//         {
//           title: 'Accordion Item 3',
//           content: 'Content for accordion item 3'
//         }
//       ]
//     }
//   },
//   {
//     type: "ContentCountdown",
//     props: {
//       title: "We starten om 19:00 met onze online introductie. Ben jij er bij?",
//       countToDate: new Date('2025-03-04T14:30:00.000Z'),
//       buttons: [{ label: 'Open Zoom', link: '', color: 'primary', style: 'default', width: 'default' }],
//       finishedTitle: "🔴 We zijn live! Sluit nu aan bij onze online introductie.",
//       finishedButtons: [{ label: 'Open Zoom', link: '', color: 'primary', style: 'default', width: 'default' }]
//     }
//   },
//   {
//     type: "ContentSteps",
//     props: {
//       steps: [
//         { title: 'Lorem ipsum dolor' },
//         { title: 'Groepen organiseren', link: '/' },
//         { title: 'Boodschap communiceren', link: '/test' },
//         { title: 'Les 4' },
//         { title: 'Les 5' },
//         { title: 'Les 6' },
//         { title: 'Les 7' },
//         { title: 'Les 8' },
//         { title: 'Les 9' }
//       ]
//     }
//   }
// ]
// )


</script>

<template>
  <div class="my-10">

    <ContentHero />

    {{ data }}

    {{ error }}


  </div>
</template>