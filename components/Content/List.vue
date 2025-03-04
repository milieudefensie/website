<script setup lang="ts">
import IconCalendar from '~icons/mdi/calendar'
import IconBook from '~icons/mdi/book'
import IconAccountGroup from '~icons/mdi/account-group'

import type { RouteLocationRaw } from 'vue-router'

export type ListItem = {
  title?: string;
  subtitle?: string;
  description?: string;
  type: "event" | "group" | "guide";
  link: RouteLocationRaw;
}

export type ListProps = {
  items: ListItem[]
  color: "primary" | "secondary" | "accent";

}

const props = defineProps<ListProps>()

</script>
<template>
  <div>
    <div class="p-4 pb-2 text-sm opacity-60 tracking-wide">Aankomende evenementen</div>

    <ul class="list w-full">

      <NuxtLink v-for="(item, index) in props.items" :key="index" :to="item.link" class="transition-all" :class="{
        'hover:bg-primary/20': props.color === 'primary',
        'hover:bg-secondary/20': props.color === 'secondary',
        'hover:bg-accent/20': props.color === 'accent'
      }">
        <li class="list-row items-center mx-0">
          <div class="size-10 items-center justify-center flex rounded-full" :class="{
            'bg-primary/10 text-primary': props.color === 'primary',
            'bg-secondary/10 text-secondary': props.color === 'secondary',
            'bg-accent/10 text-accent': props.color === 'accent'
          }">
            <IconCalendar v-if="item.type === 'event'" />
            <IconBook v-if="item.type === 'guide'" />
            <IconAccountGroup v-if="item.type === 'group'" />
          </div>

          <div class="flex-1">
            <div v-if="item.title" class="font-bold">{{ item.title }}</div>
            <div v-if="item.subtitle" class="text-xs uppercase font-semibold opacity-60">{{ item.subtitle }}</div>
            <div v-if="item.description" class="list-col-wrap text-sm">
              {{ item.description }}
            </div>
          </div>

          <!-- <button class="btn btn-sm btn-circle btn-ghost">
            <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button> -->
        </li>
      </NuxtLink>

    </ul>
  </div>

</template>