<script setup lang="ts">
import IconBack from '~icons/mdi/keyboard-arrow-left'
import IconInfo from '~icons/mdi/info'
</script>
<template>
  <div class="bg-white p-2 border-b-2 border-neutral/10 flex items-center justify-between gap-4">
    <div class="flex items-center gap-4">
      <label for="chat-drawer" class="btn btn-soft btn-circle btn-accent drawer-button md:hidden z-1">
        <IconBack class="text-2xl" />
      </label>
      <div class="font-bold text-lg md:ml-4">
        Pietje
      </div>
    </div>

    <button class="btn btn-soft btn-accent">
      <IconInfo />Info
    </button>
  </div>
</template>