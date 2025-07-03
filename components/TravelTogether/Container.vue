<script setup lang="ts">
import TrainIcon from '~icons/mdi/train';

const step = ref(1)
const chatExists = ref(false)

const city = ref('Utrecht')
const inviteLink = ref()
const email = ref()

export interface TravelTogetherProps {
  event: {
    title: string
    date: string
    location: string
  }
}

const props = defineProps<TravelTogetherProps>()

const { onLoaded } = useScriptNpm({
  packageName: 'js-confetti',
  file: 'dist/js-confetti.browser.js',
  version: '0.12.0',
  scriptOptions: {
    use() {
      // @ts-ignore
      return { JSConfetti: window.JSConfetti }
    },
  },
})

function nextStep() {
  step.value += 1


  onLoaded(({ JSConfetti }) => {
    // using the real API instance
    const confetti = new JSConfetti()

    confetti.addConfetti({ emojis: ['✊', '⚡️', '💥', '✨', '💚', '🎉'] })
  })
}


</script>
<template>



  <div class=" bg-white shadow rounded-lg" id="travel-together">

    <div class="space-y-8 p-8">

      <h2 class="font-display text-4xl md:text-6xl text-balance flex gap-4 text-secondary ">

        <div>
          <TrainIcon class="text-3xl md:text-5xl" />
        </div>
        <div>Reis samen vanuit {{ city || '...' }}</div>

      </h2>


      <div class="mb-3 flex gap-2 w-full">

        <label class="floating-label  w-full">
          <span class="!bg-white">Ik reis vanuit</span>
          <input class="input bg-white validator w-full" placeholder="Ik reis vanuit..." autocomplete="address-level2"
            name="city" v-model="city" required />

          <div class="validator-hint">Vul je woonplaats in</div>

        </label>

        <button class="btn btn-secondary">Plan reis</button>

      </div>


      <!-- No chat exists yet for this location, so we'll show the steps to create a travel-together chat. -->
      <div v-if="!chatExists" class="space-y-8">
        <div class="space-y-4" :class="{ 'opacity-50 hover:opacity-60 cursor-pointer': step !== 1 }">

          <div class=" text-2xl  font-bold t flex items-center gap-4" @click="step = 1">
            <div class="bg-secondary rounded-full size-12 flex items-center justify-center text-secondary-content">
              1</div>
            <div>Maak een chat groep</div>
          </div>

          <div v-if="step === 1" class="space-y-4">
            <p> Maak een <NuxtLink to="https://signal.me/#eu" class="text-secondary font-bold underline"
                target="_blank">
                Signal</NuxtLink> chat groep (Signal werkt net als WhatsApp). Voeg
              alvast een paar mensen toe die je
              wil uitnodigen om
              mee te reizen.
            </p>

            <button class="btn btn-secondary md:btn-lg" @click="nextStep()">✅ Ik heb een groep chat aangemaakt</button>

            <p class="text-sm text-neutral/80 italic">Kom je er niet uit? Stuur een e-mail naar doemee@milieudefensie.nl
            </p>

          </div>

        </div>


        <div class="space-y-4" :class="{ 'opacity-50 hover:opacity-60 cursor-pointer': step !== 2 }">

          <div class=" text-2xl  font-bold t flex items-center gap-4" @click="step = 2">
            <div class="bg-secondary rounded-full size-12 flex items-center justify-center text-secondary-content">
              2</div>
            <div>Deel de uitnodigingslink met ons</div>
          </div>

          <div v-if="step === 2" class="space-y-4">
            <p><strong>Kopieer de uitnodigingslink van jou groep chat in Signal. Plak deze hieronder.</strong> Wij
              nodigen
              vervolgens
              veranderaars in Utrecht
              uit om
              met jou samen te
              reizen.</p>

            <div class=" space-y-4">

              <!-- <input class="input w-full" placeholder="https://invite-link..." v-model="inviteLink" /> -->

              <label class="floating-label">
                <span class="!bg-white">Uitnodigingslink groep chat</span>
                <input class="input w-full bg-white validator" placeholder="https://invite-link..." autocomplete="url"
                  type="url" v-model="inviteLink" required />


              </label>

              <label class="floating-label">
                <span class="!bg-white">E-mail</span>
                <input class="input w-full bg-white validator" placeholder="E-mail" autocomplete="email" type="email"
                  v-model="email" required />


              </label>


              <button class="btn btn-secondary w-full md:btn-lg" @click="nextStep()">👉 Publiceer link</button>

            </div>

            <p class="text-sm text-neutral/80 italic">Wij controleren de link en delen deze openbaar op deze website,
              zodat
              iedereen zich makkelijk kan aanmelden om samen te reizen. Je e-mail adres blijft prive. We sturen je
              eenmalig
              wat tips om je te helpen met je samenreisevenement.</p>

          </div>



        </div>

        <div class="space-y-4" :class="{ 'opacity-50 hover:opacity-60 cursor-pointer': step !== 3 }">

          <div class=" text-2xl  font-bold t flex items-center gap-4" @click="step = 3">
            <div class="bg-secondary rounded-full size-12 flex items-center justify-center text-secondary-content">
              3</div>
            <div>Stem af hoe je samen reist</div>
          </div>

          <div v-if="step === 3" class="space-y-4">
            <TravelTogetherConclusion :event="event" :invite-link="inviteLink" />

          </div>
        </div>
      </div>

      <!-- A travel-together chat already exists for this location -->
      <div v-else class="space-y-8">

        <div class="space-y-4" :class="{ 'opacity-50 hover:opacity-60 cursor-pointer': step !== 1 }">

          <div class=" text-2xl  font-bold t flex items-center gap-4" @click="step = 1">
            <div class="bg-secondary rounded-full size-12 flex items-center justify-center text-secondary-content">
              1</div>
            <div>Ga in de chat groep</div>
          </div>

          <div v-if="step === 1" class="space-y-4">


            <ContentCardCollection :cards="[{
              id: '1',
              title: 'Ga in de chat groep',
              subtitle: `Reis samen vanuit ${city}`,
              content: `Een veranderaar uit ${city} heeft een Signal chat groep aangemaakt. In deze chat spreken jullie samen af hoe jullie gaan reizen. `,
              variant: 'border',
              reverse: false,
              hideImagesOnMobile: true,
              images: [{
                src: '/qr.png',
                alt: 'Fabriek'
              }],
              buttons: {
                size: 'lg',
                buttons: [{
                  label: '💬 Open de Signal groep',
                  link: '/test',
                  color: 'secondary',
                  style: 'default',
                  width: 'default',
                },

                ]
              },
            }]" />

            <p class="text-sm text-neutral/80 italic">Kom je er niet uit? Stuur een e-mail naar doemee@milieudefensie.nl
            </p>

          </div>

        </div>

        <div class="space-y-4" :class="{ 'opacity-50 hover:opacity-60 cursor-pointer': step !== 2 }">

          <div class=" text-2xl  font-bold t flex items-center gap-4" @click="step = 2">
            <div class="bg-secondary rounded-full size-12 flex items-center justify-center text-secondary-content">
              2</div>
            <div>Nodig anderen uit en reis samen</div>
          </div>

          <div v-if="step === 2" class="space-y-4">


            <TravelTogetherConclusion :event="event" :invite-link="inviteLink" />

          </div>




        </div>

      </div>

    </div>

    <!-- All travel-together chats -->


  </div>

  <div class="border-2 border-neutral-200 rounded-lg mt-12">
    <div class="p-6 text-2xl font-display ">
      Reis samen vanuit andere steden
    </div>
    <ContentList :items="[
      {
        title: 'Utrecht',
        subtitle: 'Signal chat groep',
        type: 'group',
        link: '/test',
      },
      {
        title: 'Amsterdam',
        subtitle: 'Signal chat groep',
        type: 'group',
        link: '/test',
      },
      {
        title: 'Den Haag',
        subtitle: 'Signal chat groep',
        type: 'group',
        link: '/test',
      },
      {
        title: 'Enschede',
        subtitle: 'Signal chat groep',
        type: 'group',
        link: '/test',
      },
      {
        title: 'Groningen',
        subtitle: 'Signal chat groep',
        type: 'group',
        link: '/test',
      }
    ]" color="secondary" />
  </div>



  <label class="fixed bottom-0 left-0 bg-base-200 shadow-4xl p-2 text-sm">
    <input type="checkbox" class="toggle toggle-xs" v-model="chatExists" /> Devtool: A chat group already exists for
    this city
  </label>




</template>