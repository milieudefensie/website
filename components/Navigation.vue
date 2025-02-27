<script setup>
import IconMenu from '~icons/mdi/menu'
import IconClose from '~icons/mdi/close'
import IconSearch from '~icons/mdi/search'

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


          <div class="menu p-10 px-[3.5vw] w-10/12 md:w-7/12 lg:w-5/12 min-h-full bg-base-100 text-base-content
        10">
            <div class="text-right mb-2">
              <label for="my-drawer" aria-label="close sidebar" class="btn btn-ghost btn-circle">
                <IconClose />
              </label>
            </div>


            <div class="text-2xl font-bold flex flex-wrap space-y-5">
              <a class="border-b-4 border-dashed border-primary w-full py-1  hover:border-solid" href="#"
                contenteditable>Online acties</a>
              <a class="border-b-4 border-dashed border-primary w-full py-1  hover:border-solid" href="#"
                contenteditable>Agenda</a>
              <a class="border-b-4 border-dashed border-primary w-full py-1  hover:border-solid" href="#"
                contenteditable>Lokale
                groepen</a>
              <a class="border-b-4 border-dashed border-primary w-full py-1  hover:border-solid" href="#"
                contenteditable>Doneer</a>
            </div>
            <div class="space-y-3 my-10">
              <a class="w-full btn btn-lg btn-primary btn-outline !text-black font-display text-2xl px-5 tracking-wide"
                contenteditable>✊
                Word actief</a>
              <a class="w-full btn btn-lg btn-primary font-display text-2xl px-5 tracking-wide" contenteditable>🌍
                Word
                lid</a>
            </div>
            <div class="text-xl flex flex-wrap gap-x-6 gap-y-4 justify-center">
              <a class="border-b-4 hover:border-black/50" href="#" contenteditable>Over</a>
              <a class="border-b-4 hover:border-black/50" href="#" contenteditable>Nieuws</a>
              <a class="border-b-4 hover:border-black/50" href="#" contenteditable>Ondersteuning </a>
              <a class="border-b-4 hover:border-black/50" href="#" contenteditable>Contact</a>
              <a href="#" class="btn btn-circle btn-sm">
                <IconSearch />
              </a>

            </div>


          </div>
        </div>
      </div>
    </div>

  </nav>
</template>