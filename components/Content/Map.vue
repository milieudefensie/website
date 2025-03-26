<script setup lang="ts">
import IconZoomOut from '~icons/mdi/zoom-out'
import IconAddBold from '~icons/mdi/add-bold'
import IconClose from '~icons/mdi/close'

import {
  MapboxMap
} from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export type MapMarker = {
  title: string,
  coordinates: [number, number],
}

export type MapProps = {
  markers: MapMarker[]
}

const props = defineProps<MapProps>()

const config = useRuntimeConfig()

const map = ref();

const center: [number, number] = [parseFloat(config.public.mapCenterLng), parseFloat(config.public.mapCenterLat)];
const zoom = parseFloat(config.public.mapZoom);
const minZoom = parseFloat(config.public.mapMinZoom);

const mapBounds = ref([
  [3.271268, 50.698755], // Southwest coordinates of the Netherlands
  [7.500992, 53.546792]  // Northeast coordinates of the Netherlands
])
const mapBoundsOptions = ref({
  padding: { top: 20, bottom: 50, left: 0, right: 0 },
  animate: false
})
const currentZoomLevel = ref();

// const primaryColor = ref();

const selectedMarker = ref<MapMarker>();
const selectedMarkerPopup = ref(false);

const fullscreen = ref(false);


onMounted(() => {
  console.log('mounted')
})

function mapboxCreated(mapInstance: mapboxgl.Map) {
  map.value = mapInstance;

  // Update currentZoomLevel every second
  setInterval(() => {
    currentZoomLevel.value = map.value?.getZoom();
  }, 1000);
}

function flyTo(marker: any) {
  console.log('flyTo', marker);
  selectedMarker.value = marker;
  selectedMarkerPopup.value = true;
  // const currentZoomLevel = map.value.getZoom();
  const defaultZoomLevel = 8;
  let newZoomLevel;;

  if (currentZoomLevel.value > defaultZoomLevel) {
    newZoomLevel = currentZoomLevel.value;
  } else {
    newZoomLevel = defaultZoomLevel;
  }

  if (window.innerWidth > 640) {
    map.value.flyTo({
      center: marker.coordinates,
      zoom: newZoomLevel,
      speed: 0.2,
      essential: true
    });
  }

}

function restoreDefaultZoom() {
  currentZoomLevel.value = zoom;

  // map.value.flyTo({
  //   center: center,
  //   zoom: zoom,
  //   essential: true
  // });

  map.value.fitBounds([
    [3.271268, 50.698755], // Southwest coordinates of the Netherlands
    [7.500992, 53.546792]  // Northeast coordinates of the Netherlands
  ], {
    padding: { top: 20, bottom: 50, left: 0, right: 0 },
  });
}

function openFullscreen() {
  if (!fullscreen.value && window.innerWidth <= 640) {
    console.log('open fullscreen')
    fullscreen.value = true
    nextTick(() => {
      map.value.resize()
      map.value.scrollZoom.enable()
    })
  }
}

function closeFullscreen() {
  console.log('close fullscreen')
  fullscreen.value = false
  nextTick(() => {
    map.value.resize()
    map.value.scrollZoom.disable()
  })
}


</script>

<template>

  <div>
    <div class="w-full h-[95vh] flex justify-stretch content-stretch max-h-[100vw]"
      :class="{ '!fixed !size-full !top-0 !left-0 max-h-none z-10': fullscreen }">
      <MapboxMap :accessToken="config.public.mapboxApi"
        mapStyle="mapbox://styles/joppe-milieudefensie/cm7p5awl8001y01r18vay203m?optimize=true" :pitchWithRotate="false"
        :dragRotate="false" logoPosition="bottom-right" @mb-created="mapboxCreated($event)" :bounds="mapBounds"
        :fitBoundsOptions="mapBoundsOptions" :scrollZoom="false" :zoom="zoom"
        class="w-full sm:rounded-md overflow-hidden shadow-sm bg-accent/10 " @click="openFullscreen()">

        <template #default>

          <MapMarker v-for="(marker, index) in markers" :marker="marker" :currentZoomLevel="currentZoomLevel"
            @popup-opened="flyTo(marker)" :active="marker === selectedMarker" :key="index" />


        </template>

        <!-- <template #loader>
          <div>Loading...</div>
        </template> -->
      </MapboxMap>


    </div>

    <div class="absolute -mt-12 sm:-mt-14 ml-2 space-x-2" :class="{ 'fixed bottom-2 left-0 z-20': fullscreen }">

      <button v-if="currentZoomLevel > zoom + 1" class="btn btn-accent btn-dash bg-white text-neutral max-sm:btn-sm"
        @click="restoreDefaultZoom">
        <IconZoomOut />Toon heel Nederland
      </button>

      <button v-else class="btn btn-accent max-sm:btn-sm 1">
        <IconAddBold />Organiseer een evenement
      </button>

    </div>

    <button v-if="fullscreen" class="btn btn-primary fixed top-4 left-4 z-20" @click="closeFullscreen()">
      <IconClose />Sluit kaart
    </button>


    <MapPopup :marker="selectedMarker" :open="selectedMarkerPopup" @popup-closed="selectedMarkerPopup = false" />


  </div>
  <div role="alert" class="alert mt-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-accent h-6 w-6 shrink-0">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span>Bekijk ook wat <strong>lokale groepen</strong> bij jou in de buurt doen, of <strong>organiseer zelf een
        evenement</strong>.</span>
  </div>
</template>