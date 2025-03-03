<script setup>
import IconMenu from '~icons/mdi/menu'
import IconClose from '~icons/mdi/close'
import IconSearch from '~icons/mdi/search'
import IconCalendar from '~icons/mdi/calendar'
import IconClick from '~icons/mdi/cursor-default-click'
import IconMapMarker from '~icons/mdi/map-marker'
import IconEuro from '~icons/mdi/euro'


</script>
<template>
  <nav class="flex justify-between px-8 py-6 items-center max-w-[1000px] mx-auto h-[119.13px]">
    <!-- <NuxtPicture format="avif,webp" src="/logo.png" width="176" class="-rotate-1" quality="10" /> -->
    <img src="/logo-compressed.svg" alt="logo" width="176" height="71.13" />
    <div class="space-x-3 flex" sizes="176px" densities="x1 x2">

      <a class="btn btn-primary md:btn-outline md:!text-black font-display text-xl px-5 max-sm:hidden" contenteditable>✊
        Word actief</a>
      <a class="btn btn-primary font-display text-xl px-5 max-md:hidden" contenteditable>🌍 Word lid</a>

      <div class="drawer drawer-end">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <!-- Page content here -->
          <label for="my-drawer" class="btn font-display btn-ghost text-xl drawer-button">
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

              <a class="btn btn-lg btn-soft btn-primary btn-block text-neutral justify-start" href="#" contenteditable>
                <IconClick class="mr-4" /> Online acties
              </a>
              <a class="btn btn-lg btn-soft btn-primary btn-block text-neutral justify-start" href="#" contenteditable>
                <IconCalendar class="mr-4" /> Evenementen
              </a>
              <a class="btn btn-lg btn-soft btn-primary btn-block text-neutral justify-start" href="#" contenteditable>
                <IconMapMarker class="mr-4" /> Lokale groepen
              </a>
              <a class="btn btn-lg btn-soft btn-primary btn-block text-neutral justify-start" href="#" contenteditable>
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
</template>