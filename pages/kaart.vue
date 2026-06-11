<template>
  <div class="size-full fixed bg-black text-white top-0 left-0 flex items-center justify-center text-center p-16"
    :class="{ flash: flashing }" :style="{ '--flash-color': flashColor }">
    <div>
      <div class="text-9xl mb-24 font-display">Big Organizing</div>

      <div class="text-8xl font-bold">
        <span>{{ typed }}</span><span class="cursor">|</span>
      </div>
    </div>

  </div>
</template>

<script setup>
const sentences = [
  "You Won't Get a Revolution If You Don't Ask for One",
  'The Revolution Will Not Be Handed to You on a Silver Platter',
  'The Revolution Will Not Be Staffed',
  'Fighting Racism Must Be at the Core of the Message to Everyone',
  'Get on the Phone!',
  'The Work Is Distributed. The Plan Is Centralized',
  'The Revolution Will Be Funded-by Small Donations',
  'Barnstorm!',
  'Fight the Tyranny of the Annoying',
  'Give Away Your Passwords',
  "Don't Let the Perfect Be the Enemy of the Big",
  'Learn the Basics of Good Management',
  "If There Are No Nurses, I Don't Want to Be Part of Your Revolution",
  'Grow Complexity by Solving Problems as They Arise',
  'Only Hire Staff Who Embrace the Rule "The Revolution Will Not Be Staffed"',
  'Best Practices Become Worst Practices',
  "The Revolution Is Not Just Bottom Up; It's Peer to Peer",
  'Repeat "Rinse and Repeat"',
  "There's No Such Thing as a Single-Issue Revolution",
  'Get Ready for the Counterrevolution (to Include Your Friends)',
  'Put Consumer Software at the Center',
  'People New to Politics Make the Best Revolutionaries',
]

// Show "Binnenkort..." between every sentence.
const phrases = sentences.flatMap((s) => ['Binnenkort...', s])

const typed = ref('')
const flashing = ref(false)
const flashColor = ref('#ff00de')

const neonColors = ['#ff00de', '#00fff0', '#aaff00', '#ffea00', '#ff2d00', '#1f51ff']

let phrase = 0
let index = 0
let deleting = false

onMounted(() => {
  // Briefly flicker the background to a neon color at random intervals to grab attention.
  const scheduleFlash = () => {
    setTimeout(() => {
      flashColor.value = neonColors[Math.floor(Math.random() * neonColors.length)]
      flashing.value = true
      setTimeout(() => {
        flashing.value = false
        scheduleFlash()
      }, 250) // matches the flicker animation length
    }, 6000 + Math.random() * 9000) // 6-15s between flickers
  }
  scheduleFlash()

  const tick = () => {
    const word = phrases[phrase]
    if (!deleting) {
      typed.value = word.slice(0, index + 1)
      index++
      if (index === word.length) {
        deleting = true
        return setTimeout(tick, 1800) // pause when fully typed
      }
    } else {
      typed.value = word.slice(0, index - 1)
      index--
      if (index === 0) {
        deleting = false
        phrase = (phrase + 1) % phrases.length // advance to next phrase
        return setTimeout(tick, 500) // pause before retyping
      }
    }
    setTimeout(tick, deleting ? 40 : 90)
  }
  tick()
})
</script>

<style scoped>
.cursor {
  animation: blink 1s step-end infinite;
}

/* Brief neon background flicker to grab attention. */
.flash {
  animation: flicker 0.25s steps(1, end);
}

@keyframes flicker {

  0%,
  40%,
  80% {
    background-color: var(--flash-color);
  }

  20%,
  60%,
  100% {
    background-color: #000;
  }
}

@keyframes blink {

  from,
  to {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
</style>