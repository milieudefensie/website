<template>
  <NuxtLayout>
    <NuxtPage />
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
  script: [
    {
      id: 'hs-script-loader',
      src: '//js-eu1.hs-scripts.com/139720471.js',
      async: true,
      defer: true
    },
  ]
})
</script>
