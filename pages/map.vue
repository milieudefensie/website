<script lang="ts" setup>
import IconAccountGroup from '~icons/mdi/account-group'

import { MapboxMap, MapboxMarker, MapboxGeocoder, MapboxGeolocateControl, MapboxNavigationControl } from '@studiometa/vue-mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';

import 'mapbox-gl/dist/mapbox-gl.css';

const config = useRuntimeConfig()
const zoom = parseFloat(config.public.mapZoom);

const map = ref();

const mapBounds = ref([
  [3.271268, 50.698755], // Southwest coordinates of the Netherlands
  [7.500992, 53.546792]  // Northeast coordinates of the Netherlands
])
const mapBoundsOptions = ref({
  padding: { top: 20, bottom: 20, left: 0, right: 0 },
  animate: false
})
  .value
definePageMeta({
  layout: 'fullscreen',
});

const currentZoomLevel = ref();

function mapboxCreated(mapInstance: mapboxgl.Map) {
  map.value = mapInstance;

  // Update currentZoomLevel every second
  setInterval(() => {
    currentZoomLevel.value = map.value?.getZoom();
  }, 200);
}

const contacts = await useFetch('/api/getContacts')
const groups = await useFetch('/api/getGroups')
</script>
<template>

  <MapboxMap class="w-screen h-screen fixed top-0" :access-token="config.public.mapboxApi"
    mapStyle="mapbox://styles/joppe-milieudefensie/cm7p5awl8001y01r18vay203m?optimize=true" :pitchWithRotate="false"
    :dragRotate="false" logoPosition="bottom-right" @mb-created="mapboxCreated($event)" :bounds="mapBounds"
    :fitBoundsOptions="mapBoundsOptions" :zoom="zoom">
    <MapboxGeocoder />
    <MapboxGeolocateControl />
    <MapboxNavigationControl position="bottom-right" />


    <MapboxMarker v-for="marker in contacts.data.value?.postcodes"
      :lngLat="[marker.coordinates[1], marker.coordinates[0]]">

      <div class="tooltip">

        <div class="tooltip-content">
          <div class="font-bold">Wijk in {{ marker.municipality }}</div>
          <div>{{ marker.count }} veranderaar<span v-if="marker.count > 1">s</span></div>
        </div>

        <span class="relative inline-flex size-2 rounded-full bg-accent opacity-40" :class="{
          'size-3': currentZoomLevel > 9,
          'size-4': currentZoomLevel > 10,
          'size-6': currentZoomLevel > 11,
          'opacity-100': marker.count > 6,
          'opacity-90': marker.count === 6,
          'opacity-80': marker.count === 5,
          'opacity-70': marker.count === 4,
          'opacity-60': marker.count === 3,
          'opacity-50': marker.count === 2
        }"></span>
      </div>


    </MapboxMarker>

    <div v-for="group in groups.data.value">

      <MapboxMarker v-if="group.coordinates" :lngLat="[group.coordinates.longitude, group.coordinates.latitude]">

        <div class="tooltip">

          <div class="tooltip-content">
            <div class="font-bold text-lg">{{ group.title }}</div>
            <div>{{ group.organizer }}</div>
          </div>

          <a :href="`https://veranderaars.milieudefensie.nl/groep/${group.slug}`" target="_blank" class="btn btn-circle btn-xs btn-neutral shadow-md font-display scale-75 hover:scale-100
            transition-transform hover:btn-primary">
            <IconAccountGroup class="text-[12px] -translate-y-[1px]" />
          </a>
        </div>

      </MapboxMarker>

    </div>


  </MapboxMap>

  <div class="fixed left-0 top-[3vh] transition-all duration-500" :class="{ '!-left-[100%]': currentZoomLevel > 8 }">


    <div class="text-black bg-white inline-block px-4 py-2 font-bold">
      🔥 Dagelijks automatisch bijgewerkt
    </div>

    <div class=" mt-4 font-display text-black leading-none bg-white px-12 pb-6" v-if="contacts.data">
      <div class="text-[14vw]">{{ contacts.data.value?.totalCount?.toLocaleString('nl-NL') }}</div>
      <div class="text-[3vw]">Veranderaars</div>
    </div>

    <div class="text-[4vw] mt-4 text-secondary inline-block leading-none bg-white px-8 py-4"
      :class="{ '-l-[100%]': currentZoomLevel > 9 }">
      <span class="font-bold">+ {{ contacts.data.value?.newContacts?.toLocaleString('nl-NL') }}</span> deze week
    </div>

  </div>

  <div class="fixed right-0 bottom-[20vh] transition-all duration-500"
    :class="{ '!-right-[100%]': currentZoomLevel > 8 }">


    <div class="text-[4vw] font-display text-black leading-none bg-white px-4 pb-2" v-if="contacts.data">
      ± {{ groups.data.value?.length }} groepen
    </div>

    <div class="text-[4vw] mt-4 font-display text-black leading-none bg-white px-4 pb-2" v-if="contacts.data">
      * evenementen
    </div>

  </div>




  <div class="fixed bottom-0 bg-white px-4 py-2">
    <div class="font-bold">Met ❤️ gemaakt door het BO Digitale Infrastructuur team</div>
    <div class="text-xs">Data uit Hubspot, op basis van geanonimiseerde postcodes (de eerste 4 cijfers)</div>
  </div>

</template>