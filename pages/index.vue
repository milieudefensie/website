<script setup lang="ts">
import type { ContentItem } from '~/components/ContentBuilder.vue';

const content = ref<ContentItem[]>([
  {
    type: "ContentButtonGroup",
    props: {
      buttons: [
        { label: 'Klik mij!', link: '', color: 'primary', style: 'default', width: 'default' }
      ],
      size: 'lg'
    }
  },
  {
    type: "ContentCards",
    props: {
      columns: '1',
      reverse: true,
      cards: [
        {
          title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', buttonSize: 'lg', image: { url: '/fabriek.jpeg', alt: 'Fabriek' }, buttons: [{ label: 'Click me', link: '/test', color: 'secondary', style: 'default', width: 'default' }], listItems: [{ title: 'Item 1', subtitle: 'Subtitle 1', description: 'Description 1', type: 'event', link: '/' }, { title: 'Item 2', subtitle: 'Subtitle 2', description: 'Description 2', type: 'group', link: '/' }]
        },
        {
          title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident quibusdam corporis laboriosam temporibus, perferendis reprehenderit deleniti maxime facere impedit optio.', buttonSize: 'lg', buttons: [{ label: 'Click me', link: '', color: 'secondary', style: 'default', width: 'default' }]
        }
      ]
    }
  },
  {
    type: "ContentCards",
    props: {
      columns: 'automatic',
      reverse: false,
      cards: [
        {
          title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident quibusdam corporis laboriosam temporibus, perferendis reprehenderit deleniti maxime facere impedit optio.', buttonSize: 'lg', buttons: [{ label: 'Click me', link: '', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', buttonSize: 'lg', buttons: [{ label: 'Click me', link: '', color: 'secondary', style: 'default', width: 'default' }]
        },
        {
          title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident quibusdam corporis laboriosam temporibus.', buttonSize: 'lg', buttons: [{ label: 'Click me', link: '', color: 'secondary', style: 'default', width: 'default' }]
        }
      ]
    }
  },

  {
    type: "ContentTestimonial",
    props: {
      testimonials: [
        { author: 'Test', content: 'Lorem ipsum...' }
      ]
    }
  },
  {
    type: "ContentImage",
    props: {
      caption: "Lorem ipsum",
      imageURL: "/fabriek.jpeg",
      alt: "Fabriek"
    }
  },
  {
    type: "ContentVideo",
    props: {
      youtubeURL: "https://www.youtube.com/watch?v=Vz4Rzh16mac"
    }
  },
  {
    type: "ContentAccordion",
    props: {
      items: [
        {
          title: 'Accordion Item 1',
          content: 'Content for accordion item 1'
        },
        {
          title: 'Accordion Item 2',
          content: 'Content for accordion item 2'
        },
        {
          title: 'Accordion Item 3',
          content: 'Content for accordion item 3'
        }
      ]
    }
  },
  {
    type: "ContentCountdown",
    props: {
      title: "We starten om 19:00 met onze online introductie. Ben jij er bij?",
      countToDate: new Date('2025-03-04T14:30:00.000Z'),
      buttons: [{ label: 'Open Zoom', link: '', color: 'primary', style: 'default', width: 'default' }],
      finishedTitle: "🔴 We zijn live! Sluit nu aan bij onze online introductie.",
      finishedButtons: [{ label: 'Open Zoom', link: '', color: 'primary', style: 'default', width: 'default' }]
    }
  },
  {
    type: "ContentSteps",
    props: {
      steps: [
        { title: 'Lorem ipsum dolor' },
        { title: 'Groepen organiseren', link: '/' },
        { title: 'Boodschap communiceren', link: '/test' },
        { title: 'Les 4' },
        { title: 'Les 5' },
        { title: 'Les 6' },
        { title: 'Les 7' },
        { title: 'Les 8' },
        { title: 'Les 9' }
      ]
    }
  }
]
)
</script>

<template>
  <div class="my-10">



    <ContentBuilder :content="content" />

    <!-- <NuxtIsland name="ContentProse" :content="`<p>Test test!</p>`">
    </NuxtIsland> -->

    <Container>

      <ContentProse content="<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident
          quibusdam corporis laboriosam temporibus, perferendis reprehenderit deleniti maxime facere impedit optio
          voluptatum sint, ratione rem! <a href='/test'>Test!</a></p>
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic bread with cheese to their
          children, with the food earning such an iconic status in our culture that kids will often dress
          up as warm, cheesy loaf for Halloween.
        </p>
        <blockquote>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod dolorum, a aut, adipisci veniam maxime animi
          odio
          labore deleniti totam doloribus suscipit? Impedit nobis ipsum eos, iure dignissimos voluptas commodi.
        </blockquote>
        <ul>
          <li>Garlic bread with cheese: A retrospective</li>
          <li>Garlic bread with cheese: A comprehensive review</li>
          <li>Garlic bread with cheese: A new hope</li>
        </ul>
        <p>Klik deze knoppen:</p>" />

    </Container>


    <Container>
      <ContentList class="card shadow-sm bg-white"
        :items="[{ title: 'Item 1', subtitle: 'Subtitle 1', description: 'Description 1', type: 'event', link: '/' }, { title: 'Item 2', subtitle: 'Subtitle 2', description: 'Description 2', type: 'group', link: '/' }]"
        color="primary" />
    </Container>



    <Map hydrate-on-visible />




  </div>
</template>