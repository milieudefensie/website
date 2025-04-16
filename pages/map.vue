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

definePageMeta({
  layout: 'fullscreen',
});

const contacts = await useFetch('/api/getContacts')
console.log(contacts)
const groups = await useFetch('/api/getGroups')

</script>
<template>

  <MapboxMap class="w-screen h-screen fixed top-0" :access-token="config.public.mapboxApi"
    mapStyle="mapbox://styles/joppe-milieudefensie/cm7p5awl8001y01r18vay203m?optimize=true" :pitchWithRotate="false"
    :dragRotate="false" logoPosition="bottom-right" @mb-created="(mapboxInstance) => map = mapboxInstance"
    :bounds="mapBounds" :fitBoundsOptions="mapBoundsOptions" :scrollZoom="false" :zoom="zoom">
    <MapboxGeocoder />
    <MapboxGeolocateControl />
    <MapboxNavigationControl position="bottom-right" />


    <MapboxMarker v-for="marker in contacts.data.value?.postcodes"
      :lngLat="[marker.coordinates[1], marker.coordinates[0]]">
      <span class="relative flex size-2">
        <span v-if="marker.ping"
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary scale-[500%]"></span>
        <span class="relative inline-flex size-2 rounded-full bg-accent opacity-40" :class="{
          'opacity-100': marker.count > 6,
          'opacity-90': marker.count === 6,
          'opacity-80': marker.count === 5,
          'opacity-70': marker.count === 4,
          'opacity-60': marker.count === 3,
          'opacity-50': marker.count === 2
        }"></span>
      </span>


    </MapboxMarker>

    {{ groups.data.value.length }}

    <div v-for="group in groups.data.value">

      <MapboxMarker v-if="group.coordinates" :lngLat="[group.coordinates.longitude, group.coordinates.latitude]">

        <div class="tooltip" :data-tip="group.title">

          <button
            class="btn btn-circle btn-xs btn-neutral shadow-md font-display scale-75 hover:scale-100 transition-transform hover:btn-primary">
            <IconAccountGroup class="text-[12px] -translate-y-[1px]" />
          </button>
        </div>

      </MapboxMarker>

    </div>


  </MapboxMap>
  <div class="text-[14vw] fixed left-0 top-[5vw] font-display text-black leading-none bg-white px-12 pb-6"
    v-if="contacts.data">
    {{ contacts.data.value?.totalCount?.toLocaleString('nl-NL') }}
  </div>

  <div class="text-[4vw] fixed left-0 top-[22vw] text-secondary leading-none bg-white px-8 py-4">
    <span class="font-bold">+ {{ contacts.data.value?.newContacts?.toLocaleString('nl-NL') }}</span> deze week
  </div>

</template>