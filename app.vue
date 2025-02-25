<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>

useHead({
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
