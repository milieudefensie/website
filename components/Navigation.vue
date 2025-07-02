<script setup lang="ts">
import IconMenu from '~icons/mdi/menu'
import IconClose from '~icons/mdi/close'
import IconSearch from '~icons/mdi/search'
import IconCalendar from '~icons/mdi/calendar'
import IconClick from '~icons/mdi/cursor-default-click'
import IconMapMarker from '~icons/mdi/map-marker'
import IconEuro from '~icons/mdi/euro'
import { createDirectus, readItems, rest } from '@directus/sdk'

export type NavigationProps = {
  fullWidth?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'accent' | 'neutral'
}

const props = defineProps<NavigationProps>()

const config = useRuntimeConfig()

export interface NavigationItem {
  status: string
  label: string
  link: string
  icon: string
  type: string
}

interface Schema {
  navigation_items: NavigationItem[]
}

const directus = createDirectus<Schema>(config.public.directusServer).with(rest())

const { data, error } = await useAsyncData(`navigation_items`, async () => {

  const navItems = await directus.request(readItems('navigation_items', {
    filter: {
      status: { _eq: 'published' },
    },
  }));

  return navItems

})

</script>
<template>
  <div :class="{
    'bg-base-100': props.color === 'default',
    'bg-primary': props.color === 'primary',
    'bg-secondary': props.color === 'secondary',
    'bg-accent': props.color === 'accent',
    'bg-neutral': props.color === 'neutral',
  }">
    <nav class="flex justify-between px-6 py-6 items-center mx-auto h-[119.13px] w-full" :class="{
      'max-w-[1000px]': !fullWidth,
    }">
      <!-- <NuxtPicture format="avif,webp" src="/logo.png" width="176" class="-rotate-1" quality="10" /> -->
      <!-- <img src="/logo-compressed-176x70-V2.svg" alt="Milieudefensie" width="176" height="71.13" /> -->
      <!-- <NuxtImg format="avif" src="/logo-352x140.png" width="176" height="70" densities="x1 x2" quality="20" /> -->
      <Logo />

      <div class="space-x-3 flex" sizes="176px" densities="x1 x2">

        <!-- Secondary CTA -->
        <a class="btn shadow-none font-display text-xl px-5 max-md:hidden" :class="{
          'bg-base-100 border-primary text-neutral  hover:border-neutral hover:bg-neutral hover:text-neutral-content': props.color === 'default',
          'bg-primary border-primary-content text-primary-content hover:bg-primary-contrast hover:text-primary-content': props.color === 'primary',
          'bg-secondary border-secondary-content text-secondary-content hover:bg-secondary-contrast hover:text-secondary-content': props.color === 'secondary',
          'bg-accent border-accent-content text-accent-content hover:bg-accent-contrast hover:text-accent-content': props.color === 'accent',
          'bg-neutral border-neutral-content text-neutral-content hover:bg-neutral-content/10 hover:border-neutral-content': props.color === 'neutral',
        }">✊
          Word actief
        </a>

        <!-- Primary CTA -->

        <a class="btn shadow-none font-display text-xl px-5 max-md:hidden" :class="{
          'btn-primary': props.color === 'default',
          'bg-primary-content border-primary-content text-primary-contrast hover:bg-primary-contrast hover:text-primary-content hover:border-primary-contrast': props.color === 'primary',
          'bg-secondary-content border-secondary-content text-secondary-contrast hover:bg-secondary-contrast hover:text-secondary-content hover:border-secondary-contrast': props.color === 'secondary',
          'bg-accent-content border-accent-content text-accent-contrast hover:bg-accent-contrast hover:text-accent-content hover:border-accent-contrast': props.color === 'accent',
          'bg-neutral-content border-neutral-content text-neutral-contrast hover:bg-neutral-content/80 hover:border-neutral-content hover:!text-neutral': props.color === 'neutral',
        }">
          🌍 Word lid
        </a>

        <div class="drawer drawer-end">
          <input id="my-drawer" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content">
            <!-- Page content here -->
            <label for="my-drawer" class="btn font-display shadow-none text-xl drawer-button" :class="{
              'bg-base-100 border-base-100 hover:border-neutral/30 ': props.color === 'default',
              'bg-primary border-primary text-primary-content hover:border-neutral/30': props.color === 'primary',
              'bg-secondary border-secondary text-secondary-content hover:border-neutral/30': props.color === 'secondary',
              'bg-accent border-accent text-accent-content hover:border-neutral/30': props.color === 'accent',
              'bg-neutral border-neutral text-neutral-content hover:border-neutral-content/30': props.color === 'neutral',
            }">
              <IconMenu /> Menu
            </label>
          </div>
          <div class="drawer-side z-10">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>


            <div class="menu pt-3 pb-16 px-[3.5vw] w-full  md:w-7/12 lg:w-5/12 min-h-full bg-base-100 text-base-content
        10">
              <div class="text-right mb-3">
                <label for="my-drawer" aria-label="close sidebar" class="btn btn-ghost btn-circle">
                  <IconClose />
                </label>
              </div>


              <div class="text-xl font-bold flex flex-wrap space-y-2">

                <a class="btn btn-lg btn-soft btn-primary btn-block text-neutral justify-start" href="#"
                  v-for="item in data">
                  {{ item.label }}
                </a>

                <a class="btn btn-lg btn-soft btn-primary btn-block text-neutral justify-start" href="#"
                  contenteditable>
                  <IconClick class="mr-4" /> Online acties
                </a>
                <a class="btn btn-lg btn-soft btn-primary btn-block text-neutral justify-start" href="#"
                  contenteditable>
                  <IconCalendar class="mr-4" /> Evenementen
                </a>
                <a class="btn btn-lg btn-soft btn-primary btn-block text-neutral justify-start" href="#"
                  contenteditable>
                  <IconMapMarker class="mr-4" /> Lokale groepen
                </a>
                <a class="btn btn-lg btn-soft btn-primary btn-block text-neutral justify-start" href="#"
                  contenteditable>
                  <IconEuro class="mr-4" /> Doneer
                </a>
              </div>
              <div class="space-y-2 my-4 sm:my-6">
                <a class="w-full btn btn-xl btn-primary btn-outline !text-black justify-start font-display !text-2xl"
                  contenteditable><span class="mr-4">✊</span>
                  Word actief</a>
                <a class="w-full btn btn-xl btn-primary justify-start font-display !text-2xl" contenteditable><span
                    class="mr-4">🌍</span>
                  Word
                  lid</a>
              </div>
              <div class="text-sm sm:text-lg flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-4 justify-center items-center">
                <a class="border-b-2 hover:border-black/50" href="#" contenteditable>Over</a>
                <a class="border-b-2 hover:border-black/50" href="#" contenteditable>Nieuws</a>
                <a class="border-b-2 hover:border-black/50" href="#" contenteditable>Ondersteuning </a>
                <a class="border-b-2 hover:border-black/50" href="#" contenteditable>Contact</a>
                <a href="#" class="btn btn-circle btn-xs sm:btn-sm">
                  <IconSearch />
                </a>

              </div>


            </div>
          </div>
        </div>
      </div>

    </nav>
  </div>

</template>