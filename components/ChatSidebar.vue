<script setup lang="ts">
import type { ListProps } from './Content/List.vue';
import IconHeart from '~icons/mdi/heart';
import IconPodium from '~icons/mdi/podium-gold';

const color = ref<'primary' | 'secondary' | 'accent'>('primary')

const list = ref<ListProps>({
  items: [
    {
      title: 'Pietje',
      subtitle: 'Utrecht',
      description: 'Ja wel eens, maar nooit aan toegekomen',
      type: 'group',
      link: '/'
    },
    {
      title: 'Pietje',
      subtitle: 'Utrecht',
      description: 'Ik snap je frustratie helemaal. Het is echt om moedeloos van te...',
      type: 'group',
      link: '/'
    },


  ],
  color: "accent"
})

const online = ref(true)
</script>
<template>
  <div class="px-6 p-8 bg-accent text-accent-content border-b-1 border-neutral/5 space-y-4 ">
    <div class="text-5xl font-display">Live chat</div>
    <label class="flex gap-4 items-center cursor-pointer">
      <input type="checkbox" v-model="online" class="toggle toggle-xl" />
      <div>
        <div class="font-bold text-xl ">
          <span v-if="online">Ik ben beschikbaar ✅</span>
          <span v-else>Ik ben niet beschikbaar 🔕</span>
        </div>

        <div class="text-xs text-accent-content/70">
          <span v-if="online">Match mij met veranderaars die online zijn</span>
          <span v-else>Match mij nu niet met veranderaars</span>
        </div>
      </div>
    </label>

  </div>

  <div class="m-4">
    <div class="card border-2 border-neutral/10 bg-white w-full">
      <div class="p-6">
        <div class="text-lg font-bold">Jou chatheld score</div>
        <div class="text-accent mb-2  flex items-center gap-1">
          <span class="font-display text-6xl ">32</span>
          <IconHeart class="text-4xl" />
        </div>
        <div class="text-xs">Je verdient punten als een veranderaar zich aanmeldt voor een evenement, zich aansluit bij
          een lokale groep, in een Signal groep gaat of een donatie doet.</div>
        <button class="btn btn-soft btn-accent mt-4">
          <IconPodium /> Bekijk leaderboard
        </button>
      </div>
    </div>
  </div>

  <ContentList :items="list.items" :color="list.color" />


</template>