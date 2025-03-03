<template>
  <div class="overflow-x-hidden w-full py-4">
    <div class="px-4 pt-2 -rotate-1 max-w-[1300px] mx-auto">
      <div
        class="flex flex-row bg-accent text-white  max-md:flex-col max-sm:flex-col-reverse flex-wrap overflow-hidden mx-auto rounded-xl ">

        <hgroup
          class="basis-full md:basis-1/2  lg:basis-7/12 content-center px-4 xl:px-[4vw] lg:px-6 py-6 space-y-2 xl:space-y-4 ">
          <h1 class="w-full text-3xl lg:text-5xl xl:text-6xl font-display">Lorem ipsum dolor
          </h1>
          <p class="w-full text-md lg:text-lg text-white/75">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Quibusdam possimus consectetur optio.</p>

          <div class="w-full" v-if="form">
            <!-- <Form></Form> -->
          </div>
          <button v-else class="btn lg:btn-lg bg-white font-display border-none text-xl lg:text-2xl">👉 Teken nu de
            petitie</button>

        </hgroup>
        <div class="basis-full md:basis-1/2 lg:basis-5/12 flex justify-center items-center bg-white">

          <NuxtPicture format="avif,webp" src="/jong.jpg" width="1000px" height="1000px"
            sizes="lg:528px md:calc(31.76vw + 90px) sm:50vw calc(100vw - 32px)" densities="x1 x2" quality="20" />
        </div>

      </div>
      <div class="text-xs text-neutral/50 mt-2 md:text-balance italic align-end">
        We houden je op de hoogte over onze beweging en acties bij jou in de buurt via je ingevulde e-mailadres. Deze
        website wordt beschermd door Google reCAPTCHA (zie privacybeleid en voorwaarden). Lees onze
        privacybepaling voor alle details.
      </div>
    </div>
  </div>




</template>
<script setup lang="ts">
const form = false

// const props = defineProps<{
//   formID: string,
// }>()

</script>