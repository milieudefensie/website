<template>
  <NuxtLayout>
    <NuxtPage />
    <!-- <div v-if="firebase.authError"
      class="fixed bottom-0 left-0  bg-primary text-primary-content flex items-center justify-center z-50 p-2 text-xs">
      Het is niet gelukt om te verifiëren dat je geen bot bent.
    </div> -->
  </NuxtLayout>

</template>
<script setup>

useHead({
  link: [
    {
      rel: 'preload',
      type: 'font/woff2',
      href: '/Ringold-Soft.woff2',
      as: 'font',
      crossorigin: ''
    },
  ],
  // script: [
  //   {
  //     id: 'hs-script-loader',
  //     src: '//js-eu1.hs-scripts.com/139720471.js',
  //     async: true,
  //     defer: true
  //   },
  // ]
})

</script>
