<script setup lang="ts">
import WhatsAppIcon from '~icons/mdi/whatsapp';

export interface TravelTogetherConclusionProps {
  event: {
    title: string
    date: string
    location: string
  }
  inviteLink?: string
}

const route = useRoute()

const props = defineProps<TravelTogetherConclusionProps>()
</script>
<template>

  <p>
    Stem met elkaar af hoe je samen reist. Voeg aan de beschrijving van de groep bijvoorbeeld toe welke trein je
    neemt, of deel een auto. 🚂</p>
  <p>Je kent elkaar misschien nog niet. Stel jezelf voor en verwelkom nieuwe mensen. Je kan ook van tevoren bij iemand
    thuis samen wat
    eten en protestborden verven om elkaar te leren kennen. 🍕🪧</p>

  <div class="bg-secondary/20 p-8 rounded-lg space-y-4">

    <div class="font-bold">Nodig meer mensen uit:</div>

    <div class="border-2 border-neutral/10 bg-white p-4 rounded-lg italic break-all">
      Ik ga hier samen met een paar andere mensen heen. Wie reist er nog meer met mij mee vanuit Utrecht?<br />
      <br />
      {{ event.title }}<br />
      {{ event.date }}<br />
      {{ event.location }}<br />
      <br />
      {{ inviteLink || `https://beweging.milieudefensie.nl${route.fullPath}` }}
    </div>

    <ShareButtons color="primary" :message="`Ik ga hier samen met een paar andere mensen heen. Wie reist er nog meer met mij mee vanuit Utrecht?

${event.title}
${event.date}
${event.location}

${inviteLink || `https://beweging.milieudefensie.nl${route.fullPath}`}`" />

  </div>


  <div class="bg-primary/20 p-8 rounded-lg space-y-4">

    <p class="text-xl text-balance">Vergeet niet om je aan te melden voor dit evenement zodat je op de hoogte
      blijft van
      belangrijke updates:
    </p>
    <button class="btn btn-primary">👉 Meld je aan voor evenement</button>

  </div>
</template>