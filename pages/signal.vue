<script setup lang="ts">
import type { ContentItem } from '~/components/ContentBuilder.vue';

const content = ref<ContentItem[]>([

  {
    type: "ContentCardCollection",
    props: {
      noColumns: false,
      carousel: false,
      cards: [{
        id: '1',
        title: 'Ontvang updates via Signal',
        subtitle: 'Milieudefensie Utrecht',
        content: 'Blijf op de hoogte van Milieudefensie en ontvang nieuws van Angela, de lokale organizer van Milieudefensie Utrecht.',
        variant: 'shadow',
        reverse: false,
        images: [{
          src: '/qr.svg',
          alt: 'Fabriek'
        }],
        buttons: {
          size: 'lg',
          buttons: [{
            label: '💬 Open de Signal groep',
            link: '/test',
            color: 'primary',
            style: 'default',
            width: 'default',
          },
          {
            label: '👉 Ik woon niet in Utrecht',
            link: '/test',
            color: 'primary',
            style: 'soft',
            width: 'default',
          },
          ]
        },
      },]
    }
  },

  {
    type: "ContentAccordion",
    props: {
      items: [
        {
          title: "Hoe werkt Signal?",
          content: `
            <p>Signal werkt net als WhatsApp, maar dan veiliger. Klik op de knop of scan de QR code met je telefoon om de Signal groep te openen.</p>
          `
        },
        {
          title: "Wat is het verschil met WhatsApp?",
          content: `
            <p>Signal is een chatapp vergelijkbaar met WhatsApp, maar dan veel veiliger. WhatsApp deelt en verkoop jouw gegevens, zoals wanneer je met wie en waar communiceert. Signal bewaart alleen je telefoonnummer en wanneer je de app voor het laatst hebt gebruikt. Daardoor is het een stuk beter voor jouw privacy.</p>
            <p>Daarnaast is Signal een onafhankelijke non-profitorganisatie. Dit past goed bij Milieudefensie, omdat wij graag zoveel mogelijk gebruik maken van Open Source software en transparante, eerlijke diensten.</p>
            <p>We hopen het goede voorbeeld te geven, zodat steeds meer mensen in Nederland Signal gaan gebruiken in plaats van WhatsApp. Doe jij ook mee?</p>
          `
        }
      ]
    }
  },

  {
    type: "ContentVideo",
    props: {
      youtubeURL: 'https://www.youtube.com/watch?v=5RfUQOniGy4',
    },
  },

  {
    type: "ContentProse",
    props: {
      content: `
      <h2>Alle Signal groepen</h2>
      `
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



]
)
</script>
<template>
  <Navigation color="primary" />
  <ContentHeroSimple title="Blijf op de hoogte"
    description="Maak jij je ook zorgen over het klimaat? Blijf op de hoogte van Milieudefensie via een van onze Signal groepen."
    color="primary" />
  <ContentBuilder :content="content" />
</template>