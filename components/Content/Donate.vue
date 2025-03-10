<script setup lang="ts">

const { onLoaded } = useScriptNpm({
  packageName: 'js-confetti',
  file: 'dist/js-confetti.browser.js',
  version: '0.12.0',
  scriptOptions: {
    use() {
      return { JSConfetti: window.JSConfetti }
    },
  },
})

let confetti;
onLoaded(({ JSConfetti }) => {
  // using the real API instance
  confetti = new JSConfetti()

})


const monthlyIncome = ref<number | null>(null)
const customMonthlyIncome = ref<number | null>(null)
const percentage = ref<number | null>(1)
const donationAmount = ref<number | null>(null)

function changeMonthlyIncome(value: number) {
  monthlyIncome.value = value
  customMonthlyIncome.value = null
  calculateDonation()
}

function changeCustomMonthlyIncome() {
  monthlyIncome.value = null
  calculateDonation()
}

watch(percentage, (value) => {
  calculateDonation()
  if (value === 0.5) {
    confetti.addConfetti({ emojis: ['🇳🇱'], confettiNumber: 15, emojiSize: 100 })
  } else if (value === 1) {
    confetti.addConfetti({ emojis: ['❤️'], confettiNumber: 15, emojiSize: 100 })
  } else if (value === 2) {
    confetti.addConfetti({ emojis: ['🦄'], confettiNumber: 15, emojiSize: 100 })
  } else if (value === 5) {
    confetti.addConfetti({ emojis: ['💰'], confettiNumber: 15, emojiSize: 100 })
  }
})


function calculateDonation() {
  let newDonationAmount = null
  if (percentage.value) {
    if (customMonthlyIncome.value) {
      newDonationAmount = customMonthlyIncome.value / 100 * percentage.value
    } else if (monthlyIncome.value) {
      newDonationAmount = monthlyIncome.value / 100 * percentage.value
    } else {
      donationAmount.value = null
    }
  }

  if (newDonationAmount) {
    if (newDonationAmount < 2) {
      donationAmount.value = 2
    } else {
      donationAmount.value = parseFloat(newDonationAmount.toFixed(2))
    }

  }

}

function updatePercentage() {
  percentage.value = null
}
</script>
<template>
  <div class="space-y-6">
    <div class="card bg-white shadow-sm">
      <div class="card-body space-y-2">
        <h2 class="text-xl font-bold">Hoeveel procent van je maandinkomen wil je doneren?</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button class="btn btn-lg" :class="{ 'btn-secondary': percentage === 0.5 }"
            @click="percentage = 0.5">0.5%</button>
          <button class="btn btn-lg" :class="{ 'btn-secondary': percentage === 1 }" @click="percentage = 1">1%</button>
          <button class="btn btn-lg" :class="{ 'btn-secondary': percentage === 2 }" @click="percentage = 2">2%</button>
          <button class="btn btn-lg" :class="{ 'btn-secondary': percentage === 5 }" @click="percentage = 5">5%</button>
        </div>
        <div class="text-xl font-display text-primary flex flex-wrap gap-x-2">
          <span class="text-neutral-400" v-if="percentage">Jij bent een: </span>
          <span v-if="percentage === 0.5">🇳🇱 Hollands gulle gever</span>
          <span v-if="percentage === 1">❤️‍🔥Democratische Verzetsheld</span>
          <span v-if="percentage === 2">🦄 Solidariteitsstrijder</span>
          <span v-if="percentage === 5">🤑 Revolutionaire Donald Duck</span>
        </div>

      </div>

    </div>

    <div class="card bg-white shadow-sm">
      <div class="card-body  space-y-2">
        <h2 class="text-xl font-bold">Wat is je inkomen ongeveer?</h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          <button class="btn btn-lg" :class="{ 'btn-secondary': monthlyIncome === 1000 }"
            @click="changeMonthlyIncome(1000)">€1000</button>
          <button class="btn btn-lg" :class="{ 'btn-secondary': monthlyIncome === 1500 }"
            @click="changeMonthlyIncome(1500)">€1500</button>
          <button class="btn btn-lg" :class="{ 'btn-secondary': monthlyIncome === 2000 }"
            @click="changeMonthlyIncome(2000)">€2000</button>
          <button class="btn btn-lg" :class="{ 'btn-secondary': monthlyIncome === 2500 }"
            @click="changeMonthlyIncome(2500)">€2500</button>
          <label class="input input-lg max-md:col-span-2 w-full">
            €
            <input type="number" v-model="customMonthlyIncome" placeholder="Inkomen"
              @input="changeCustomMonthlyIncome()" />
          </label>
        </div>

      </div>

    </div>


    <div class="card bg-white shadow-sm">
      <div class="card-body space-y-2">
        <h2 class="text-2xl font-bold">Jou eerlijke maandelijkse solidariteitsbijdrage</h2>
        <div>
          <label class="input validator w-full input-xl">
            €
            <input type="number" v-model="donationAmount" placeholder="Donatiebedrag" min="2"
              @input="updatePercentage()" required />


          </label>
          <p class="validator-hint hidden">
            Vanwege onze transactiekosten is de
            minimumbijdrage €2</p>
        </div>

        <button class="btn btn-primary btn-xl">Doneer nu</button>
        <!-- <p v-if="donationAmount">Your donation amount is: {{ donationAmount }}</p> -->
      </div>
    </div>



  </div>

</template>
