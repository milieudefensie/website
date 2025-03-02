<script setup lang="ts">
import IconZoomOut from '~icons/mdi/zoom-out'
import IconAddBold from '~icons/mdi/add-bold'
import IconClose from '~icons/mdi/close'

import {
  MapboxMap, MapboxGeolocateControl, MapboxNavigationControl
} from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
const config = useRuntimeConfig()

const map = ref();

const center: [number, number] = [parseFloat(config.public.mapCenterLng), parseFloat(config.public.mapCenterLat)];
const zoom = parseFloat(config.public.mapZoom);
const minZoom = parseFloat(config.public.mapMinZoom);
const currentZoomLevel = ref();

// const primaryColor = ref();

export type MapMarker = {
  title: string,
  coordinates: [number, number],
}

const selectedMarker = ref<MapMarker>();
const selectedMarkerPopup = ref(false);

const fullscreen = ref(false);

onMounted(() => {
  const styles = getComputedStyle(document.documentElement);
  // primaryColor.value = styles.getPropertyValue("--color-primary-hex");

  map.value.scrollZoom.disable()
  map.value.pi

  map.value.fitBounds([
    [3.271268, 50.698755], // Southwest coordinates of the Netherlands
    [7.500992, 53.546792]  // Northeast coordinates of the Netherlands
  ], {
    padding: { top: 20, bottom: 50, left: 0, right: 0 },
    animate: false
  });

  // Update currentZoomLevel every second
  setInterval(() => {
    currentZoomLevel.value = map.value?.getZoom();
  }, 1000);
})

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

const markers = ref<MapMarker[]>([
  { title: "Tilburg", coordinates: [5.0833, 51.5500] },
  { title: "Amsterdam", coordinates: [4.9003, 52.3791] },
  { title: "Rotterdam", coordinates: [4.4800, 51.9200] },
  { title: "The Hague", coordinates: [4.3100, 52.0800] },
  { title: "Utrecht", coordinates: [5.1217, 52.0908] },
  { title: "Maastricht", coordinates: [5.6833, 50.8500] },
  { title: "Eindhoven", coordinates: [5.4833, 51.4333] },
  { title: "Groningen", coordinates: [6.5675, 53.2189] },
  { title: "Almere", coordinates: [5.2167, 52.3667] },
  { title: "Breda", coordinates: [4.7758, 51.5889] },
  { title: "Nijmegen", coordinates: [5.8625, 51.8475] },
  { title: "Arnhem", coordinates: [5.9167, 51.9833] },
  { title: "Haarlem", coordinates: [4.6333, 52.3833] },
  { title: "Enschede", coordinates: [6.8925, 52.2225] },
  { title: "’s - Hertogenbosch", coordinates: [5.3000, 51.6833] },
  { title: "Amersfoort", coordinates: [5.3833, 52.1500] },
  { title: "Zaanstad", coordinates: [4.8167, 52.4333] },
  { title: "Apeldoorn", coordinates: [5.9667, 52.2167] },
  { title: "Zwolle", coordinates: [6.1000, 52.5167] },
  { title: "Zoetermeer", coordinates: [4.5000, 52.0667] },
  { title: "Leeuwarden", coordinates: [5.7833, 53.2000] },
  { title: "Leiden", coordinates: [4.4900, 52.1600] },
  { title: "Dordrecht", coordinates: [4.6783, 51.7958] },
  { title: "Alphen aan den Rijn", coordinates: [4.6667, 52.1333] },
  { title: "Alkmaar", coordinates: [4.7500, 52.6333] },
  { title: "Delft", coordinates: [4.3592, 52.0117] },
  { title: "Emmen", coordinates: [6.9000, 52.7833] },
  { title: "Deventer", coordinates: [6.1500, 52.2500] },
  { title: "Helmond", coordinates: [5.6500, 51.4833] },
  { title: "Hilversum", coordinates: [5.1667, 52.2333] },
  { title: "Heerlen", coordinates: [5.9833, 50.8833] },
  { title: "Lelystad", coordinates: [5.4833, 52.5000] },
]);

</script>

<template>
  <Container>
    <div class="w-full h-[95vh] flex justify-stretch content-stretch max-h-[100vw]"
      :class="{ '!fixed !size-full !top-0 !left-0 max-h-none': fullscreen }">
      <MapboxMap :accessToken="config.public.mapboxApi"
        mapStyle="mapbox://styles/joppe-milieudefensie/cm7p5awl8001y01r18vay203m?optimize=true" :pitchWithRotate="false"
        :dragRotate="false" logoPosition="bottom-right"
        @mb-created="(mapboxInstance: mapboxgl.Map) => map = mapboxInstance"
        class="w-full sm:rounded-md overflow-hidden shadow-sm bg-accent/10 " @click="openFullscreen()">


        <template #default>

          <MapboxGeolocateControl />

          <MapboxNavigationControl position=" top-right" :showCompass="false" />

          <MapMarker v-for="(marker, index) in markers" :marker="marker" :currentZoomLevel="currentZoomLevel"
            @popup-opened="flyTo(marker)" :active="marker === selectedMarker" :key="index" />



        </template>

        <!-- <template #loader>
        <div>Loading...</div>
      </template> -->




      </MapboxMap>


    </div>

    <div class="absolute -mt-12 sm:-mt-14 ml-2 space-x-2" :class="{ 'fixed bottom-4 left-0': fullscreen }">

      <button v-if="currentZoomLevel > zoom + 1" class="btn btn-accent btn-dash bg-base-100 text-neutral max-sm:btn-sm"
        @click="restoreDefaultZoom">
        <IconZoomOut />Toon heel Nederland
      </button>

      <button v-else class="btn btn-accent max-sm:btn-sm">
        <IconAddBold />Organiseer een evenement
      </button>

    </div>

    <button v-if="fullscreen" class="btn btn-primary fixed top-4 left-4" @click="closeFullscreen()">
      <IconClose />Sluit kaart
    </button>

  </Container>

  <MapPopup :marker="selectedMarker" :open="selectedMarkerPopup" @popup-closed="selectedMarkerPopup = false" />
</template>