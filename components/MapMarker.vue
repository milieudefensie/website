<template>
  <MapboxMarker :lng-lat="props.coordinates" :offset="[0, -22]">
    <template #default>


      <div :class="{ 'tooltip': !active, 'tooltip-open': props.currentZoomLevel > 9 }" :data-tip="props.title">

        <button
          class="btn btn-circle btn-accent border-neutral/20 shadow-md font-display hover:scale-120 transition-transform hover:btn-primary"
          :class="{ 'btn-primary btn-sm': active, 'btn-xs': !active }" ref="marker" @click="openPopup()">
          <IconCalendar class="text-[15px]" />
        </button>
      </div>

    </template>
    <!-- <template #popup>
      <div class="space-y-2 w-full" ref="popup">
        <h2 class="text-2xl font-display">{{ title }}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur maxime assumenda et cupiditate provident.
        </p>
        <button class="btn btn-accent btn-block">Bekijk groep</button>
      </div>

    </template> -->
  </MapboxMarker>


</template>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { MapboxMarker } from '@studiometa/vue-mapbox-gl';
import IconCalendar from '~icons/mdi/calendar'

export type MapMarkerProps = {
  title: string,
  coordinates: number[],
  currentZoomLevel: number,
}

const props = defineProps<MapMarkerProps>()

const emit = defineEmits(['popupOpened'])

const marker = useTemplateRef<HTMLElement>('marker')
const popup = useTemplateRef<HTMLElement>('popup')

const active = ref(false)

function openPopup() {
  active.value = true
  emit('popupOpened')
}

onClickOutside(marker, () => {
  console.log('click outside')
  active.value = false
}, { ignore: [popup] })


</script>