<script setup lang="ts">
const config = useRuntimeConfig()

export interface Link {
  label: string;
  link: string;
}

export interface Column {
  title: string;
  links: Link[];
}

export type FooterProps = {
  columns: Column[],
}

const props = defineProps<FooterProps>()

</script>
<template>
  <footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10 mt-24">
    <aside>
      <Logo />
    </aside>
    <nav v-for="(column, index) in props.columns" :key="index">
      <h6 class="footer-title">{{ column.title }}</h6>
      <a class="link link-hover" v-for="(link, index) in column.links" :key="index">{{ link.label }}</a>
    </nav>
  </footer>
  <div class="bg-base-100 text-neutral-500 text-sm py-4 px-10 gap-6 flex flex-wrap">
    <NuxtLink to="/" class="underline">Privacybeleid</NuxtLink>
    <NuxtLink to="/" class="underline">Disclaimer</NuxtLink>
    <NuxtLink to="/" class="underline">Diversiteit & Inclusiviteit</NuxtLink>
    <NuxtLink to="/" class="underline">Open source</NuxtLink>
  </div>
</template>