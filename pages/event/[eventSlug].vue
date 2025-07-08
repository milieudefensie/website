<!-- 
 Docs: https://docs-4gf.pages.dev/pages/events
-->

<!-- 
 Docs: https://docs-4gf.pages.dev/pages/events
-->

<script lang="ts" setup>

import type { ContentItem } from '~/components/ContentBuilder.vue';
import type { CardProps } from '~/components/Content/Card.vue';

import TrainIcon from '~icons/mdi/train';

const content = ref<ContentItem[]>([


  {
    type: "ContentProse",
    props: {
      content: `
      <p><strong>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt commodi aspernatur ratione adipisci quibusdam laboriosam sequi ea nesciunt, esse qui amet earum nulla tempora inventore facere ut, beatae explicabo voluptas.</strong></p>
      <h2>Lorem ipsum</h2>
      <p>  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt commodi aspernatur ratione adipisci quibusdam laboriosam sequi ea nesciunt, esse qui amet earum nulla tempora inventore facere ut, beatae explicabo voluptas.</p>
      `
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
    type: "ContentCardCollection",
    props: {
      cards: [
        {
          id: 'actiepakket',
          title: 'Bestel een actiepakket',
          variant: 'shadow',
          reverse: false,
          images: [
            {
              src: '/campagnedag-1.jpg',
              alt: 'Actiepakket'
            }
          ],
          content: 'Ontvang een compleet actiepakket met materialen om direct aan de slag te gaan voor het klimaat.',
          buttons: {
            buttons: [
              {
                label: 'Bestel nu',
                link: '/actiepakket-bestellen',
                color: 'primary',
                style: 'outline',
                width: 'default'
              }
            ]
          }
        },
        {
          id: 'protestbord',
          title: 'Knutsel samen een protestbord',
          variant: 'shadow',
          reverse: false,
          images: [
            {
              src: '/campagnedag-2.jpg',
              alt: 'Protestbord knutselen'
            }
          ],
          content: 'Kom samen en maak creatieve protestborden voor de volgende actie of demonstratie.',
          buttons: {
            buttons: [
              {
                label: 'Bekijk tips',
                link: '/protestbord-tips',
                color: 'primary',
                style: 'outline',
                width: 'default'
              }
            ]
          }
        },
        {
          id: 'organiseren',
          title: 'Help mee met organiseren',
          variant: 'shadow',
          reverse: false,
          images: [
            {
              src: '/fabriek-vierkant.jpeg',
              alt: 'Meehelpen organiseren'
            }
          ],
          content: 'Word actief in de organisatie en draag bij aan het succes van lokale klimaatacties.',
          buttons: {
            buttons: [
              {
                label: 'Doe mee',
                link: '/help-organiseren',
                color: 'primary',
                style: 'outline',
                width: 'default'
              }
            ]
          }
        }
      ]
    }
  },




]
)

</script>
<template>

  <Navigation color="default" focus />
  <div>

    <div>

      <div class="max-w-7xl mx-auto p-4">

        <ContentCardCollection :cards="[{
          id: '7',
          title: 'Code oranje: Grote vervuiler ING',
          subtitle: 'Dirk Smitsstraat 76, 3031 XE Rotterdam',
          boldLabel: 'Zondag 13:00',
          badges: ['Milieudefensie on Tour'],
          secondaryBadges: ['Door lokale groep'],
          label: '1 april',
          variant: 'ghost',
          reverse: false,
          form: true,
          images: [{
            src: '/fabriek.jpeg',
            alt: 'Fabriek'
          }],


        },]" />

        <div class="flex flex-wrap justify-between items-center mt-8 gap-4">

          <div class="bg-neutral/10  font-display lg:text-2xl px-4 py-2 rounded-full">
            300 aanmeldingen
          </div>
          <div class="flex gap-2 flex-wrap">
            <ShareButtons color="primary" message="Ik ga naar dit evenement: https://beweging.milieudefensie.nl/agenda/xyz?utm_medium=social&utm_source=whatsapp

Titel
Datum
Locatie

Lijkt het je leuk om hier samen met mij heen te gaan?" />
            <NuxtLink class="btn btn-primary  max-md:btn-sm" to="#travel-together">
              <TrainIcon class="w-6 h-6 mr-2" />
              Reis samen vanuit Utrecht
            </NuxtLink>

          </div>


        </div>


      </div>


      <ContentBuilder :content="content" />

      <Container>
        <TravelTogetherContainer :event="{
          title: 'Wij klagen ING aan',
          date: 'Zondag 1 april, 13:00',
          location: 'Tivoli, Utrecht'
        }" />
      </Container>




    </div>
  </div>






  <!-- <ContentBuilder :content="content" /> -->






  <!-- <ContentBuilder :content="content" /> -->



</template>