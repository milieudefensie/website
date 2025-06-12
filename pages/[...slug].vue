<script setup lang="ts">
// import type { ContentItem } from '~/components/ContentBuilder.vue';
import { createDirectus, rest, readItems, staticToken } from '@directus/sdk'
import { setAttr, apply } from "@directus/visual-editing"

export interface ArticleTranslations {
  id: string
  path: string
  title: string
  introduction?: string
  // content: string
  // status: 'draft' | 'published' | 'archived'
}

export interface Article {
  id: string
  path: string
  title: string
  introduction?: string
  content: string
  status: 'draft' | 'published' | 'archived'
}

export interface Event {
  title: string
  path: string
  date: Date
  location: string
}

interface Schema {
  articles_translations: ArticleTranslations[]
  articles: Article[]
  events: Event[]
}

const config = useRuntimeConfig()
const route = useRoute()
let directus;

if (route.query.token) {
  directus = createDirectus<Schema>(config.public.directusServer).with(rest()).with(staticToken(route.query.token as string))
} else {
  directus = createDirectus<Schema>(config.public.directusServer).with(rest())

}

const { slug } = route.params

// Get current locale from the Nuxt i18n
const { locale, locales } = useI18n()
console.log('Current locale:', locale.value, locales.value)

const { data, error, refresh } = await useAsyncData(`article:${slug[0]}`, async () => {

  const slugToFilterBy = Array.isArray(slug) ? slug.join('/') : slug

  let status = {}

  if (!route.query.token) {
    status = { _eq: 'published' }
  }

  const articles = await directus.request(readItems('articles', {
    filter: {
      status,
      path: { _eq: slugToFilterBy }, // Filter by slug
      // languages_code: { _eq: locale.value } // Filter by current locale
    },
    limit: 1,
    // fields: ['id', 'date_created', 'date_updated', 'title', 'introduction', 'path'],
  })).catch((err) => {
    console.error('Error fetching article:', err)
    throw createError(err)
  });

  console.log('articles', articles)

  return articles[0]

})



prerenderRoutes(["/sluit-je-aan"]);

console.log('data', data.value)
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}



</script>

<template>
  <div class="my-10" v-if="data">

    <ContentHero :title="data.title" :description="data!.introduction" :buttons="[]" directus-collection="articles"
      :directus-id="data.id" @directus-update="refresh()" />

    <h1 class="m-8" :data-directus="setAttr({
      collection: 'articles', item: data.id, fields: ['title', 'introduction'],
      mode: 'popover'
    })">
      {{ data!.title }}
    </h1>


    {{ error }}


  </div>
</template>