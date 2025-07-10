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
      <p><strong>Op woensdag 29 oktober zijn de verkiezingen. Drie dagen daarvoor, op zondag 26 oktober, gaan wij massaal de straat op voor het klimaat. Nederland zit op slot. Daarom komen wij nu in actie en bouwen een beweging die niet te negeren is. Doe jij mee?</strong></p>
      <h2>Niet zomaar een mars 💪</h2>
      <p>Sinds 2019 zijn we al 7 keer massaal de straat op gegaan voor het klimaat. Iedere keer zetten de politiek en vervuilende bedrijven heel kleine stapjes in de goede richting. Te kleine stapjes.</p>
      <p>We hebben een nieuw plan nodig. Wij gaan <strong>vlak voor de verkiezingen</strong> massaal de straat op. Maar daar blijft het niet bij. Dat is pas het begin. </p>
      <p>Met deze mars gaan we <strong>heel veel nieuwe mensen bij onze beweging betrekken</strong>. En met die beweging gaan we nog veel meer mensen betrekken. Zo worden we iedere maand groter en sterker. En zo blijven we druk zetten ná de verkiezingen.</p>
      `
    }
  },

  {
    type: "ContentTestimonial",
    props: {
      testimonials: [
        {
          author: 'Jan de Boer',
          content: 'Ik ben geen activist, maar deze mars is belangrijk. Ik voel me machteloos. Deze mars geeft me hoop, want we zijn met heel veel mensen. Samen kunnen we écht iets veranderen. Zeker als we blijven doorgaan na de verkiezingen.'
        },
        {
          author: 'Marie',
          content: 'De meeste mensen willen meer klimaatactie. Maar de politiek en vervuilende bedrijven doen bijna niets. Dat is niet democratisch. Dat maakt me boos. Daarom nodig ik zo veel mogelijk vrienden en familie uit om mee te gaan.'
        },
        {
          author: 'Joppe Hoekstra',
          content: 'Mensen in Nederland, Europa en de rest van de wereld gaan nu al dood door hittegolven, overstromingen, en andere weersextremen. Ondertussen maken grote vervuilende bedrijven miljardenwinsten. Dat vindt ik niet eerlijk. Ik ga verdorie niet toekijken vanaf de zijlijn.'
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
          title: 'Actiepakket: Polsbandjes, stickets en posters',
          content: 'Laat zien dat je het klimaat belangrijk vindt, en gebruik het polsbandje als gespreksstarter.',
          variant: 'shadow',
          reverse: false,
          images: [
            {
              src: '/polsbandje.jpg',
              alt: 'Actiepakket'
            }
          ],
          buttons: {
            buttons: [
              {
                label: 'Bestel nu',
                link: '/actiepakket-bestellen',
                color: 'secondary',
                style: 'outline',
                width: 'default'
              }
            ]
          }
        },
        // {
        //   id: 'protestbord',
        //   title: 'Knutsel samen een protestbord',
        //   variant: 'shadow',
        //   reverse: false,
        //   images: [
        //     {
        //       src: '/schilderen.jpeg',
        //       alt: 'Protestbord knutselen'
        //     }
        //   ],
        //   // content: 'Kom samen en maak creatieve protestborden voor de volgende actie of demonstratie.',
        //   buttons: {
        //     buttons: [
        //       {
        //         label: 'Bekijk tips',
        //         link: '/protestbord-tips',
        //         color: 'secondary',
        //         style: 'outline',
        //         width: 'default'
        //       }
        //     ]
        //   }
        // },
        // {
        //   id: 'organiseren',
        //   title: 'Help mee met organiseren',
        //   variant: 'shadow',
        //   reverse: false,
        //   images: [
        //     {
        //       src: '/fabriek-vierkant.jpeg',
        //       alt: 'Meehelpen organiseren'
        //     }
        //   ],
        //   // content: 'Word actief in de organisatie en draag bij aan het succes van lokale klimaatacties.',
        //   buttons: {
        //     buttons: [
        //       {
        //         label: 'Doe mee',
        //         link: '/help-organiseren',
        //         color: 'secondary',
        //         style: 'outline',
        //         width: 'default'
        //       }
        //     ]
        //   }
        // }
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
          title: 'Klimaatmars: Keerpunt voor Nederland',
          subtitle: 'Amsterdam, De Dam',
          content: 'Dit is niet zomaar een klimaatmars. Wij hebben een plan om dit een keerpunt voor Nederland te maken. Deze mars is pas het begin. Meld je aan om belangrijke informatie te ontvangen over de mars en hoe jij kunt helpen:',
          boldLabel: '26 okt 13:00',
          label: 'Zondag',
          variant: 'ghost',
          reverse: false,
          form: true,
          images: [{
            src: '/klimaatmars.jpg',
            alt: 'Fabriek'
          }],


        },]" />

        <div class="flex flex-wrap justify-between items-center mt-8 gap-4">

          <div class="bg-neutral/10  font-display lg:text-2xl px-4 py-2 rounded-full">
            13.809 aanmeldingen
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