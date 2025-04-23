<script lang="ts" setup>
import IconAccountGroup from '~icons/mdi/account-group'
import IconCalendar from '~icons/mdi/calendar'


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
  padding: { top: 20, bottom: 20, left: 350, right: 0 },
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
const events = await useFetch('/api/getEvents')

</script>
<template>

  <div class="drawer drawer-open max-md:hidden">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
        Open drawer
      </label>

      <MapboxMap class="w-full h-screen !fixed top-0 left-0" :access-token="config.public.mapboxApi"
        mapStyle="mapbox://styles/joppe-milieudefensie/cm7p5awl8001y01r18vay203m?optimize=true" :pitchWithRotate="false"
        :dragRotate="false" logoPosition="bottom-right" @mb-created="mapboxCreated($event)" :bounds="mapBounds"
        :fitBoundsOptions="mapBoundsOptions" :zoom="zoom">
        <MapboxGeocoder position="top-left" />
        <MapboxGeolocateControl />
        <MapboxNavigationControl position="bottom-right" />


        <!-- CONTACTS -->
        <MapboxMarker v-for="(marker, index) in contacts.data.value?.postcodesWithContacts" :key="index"
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

        <!-- EVENTS -->
        <div v-for="(event, index) in events.data.value" :key="index">

          <MapboxMarker v-if="event.coordinates" :lngLat="[event.coordinates.longitude, event.coordinates.latitude]">

            <div class="tooltip">

              <div class="tooltip-content">
                <div class="font-bold text-lg">{{ event.title }}</div>
                <div>
                  {{ new Date(event.date).toLocaleDateString('nl-NL') }}
                </div>
              </div>

              <a :href="`https://veranderaars.milieudefensie.nl/agenda/${event.slug}`" target="_blank" class="btn btn-circle btn-xs btn-primary shadow-md font-display scale-75 hover:scale-100
            transition-transform">
                <IconCalendar class="text-[12px]" />
              </a>
            </div>

          </MapboxMarker>

        </div>

        <!-- GROUPS -->
        <div v-for="(group, index) in groups.data.value" :key="index">

          <MapboxMarker v-if="group.coordinates" :lngLat="[group.coordinates.longitude, group.coordinates.latitude]">

            <div class="tooltip">

              <div class="tooltip-content">
                <div class="font-bold text-lg">{{ group.title }}</div>
                <div>{{ group.organizer }}</div>
              </div>

              <a :href="`https://veranderaars.milieudefensie.nl/groep/${group.slug}`" target="_blank" class="btn btn-circle btn-xs btn-neutral shadow-md font-display scale-75 hover:scale-100
            transition-transform">
                <IconAccountGroup class="text-[12px] -translate-y-[1px]" />
              </a>
            </div>

          </MapboxMarker>

        </div>




      </MapboxMap>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="menu min-h-full w-xl p-6 gap-y-4 grid content-stretch">

        <!-- <div class="font-bold">
          Dagelijks automatisch bijgewerkt
        </div> -->

        <div class="stats shadow bg-accent text-accent-content text-center flex items-center">
          <div class="stat py-12">
            <!-- <div class="stat-figure text-primary">
              <IconAccountGroup class="text-[2vw]" />
            </div> -->

            <div class="stat-value text-[200px] font-display leading-none">{{
              contacts.data.value?.totalCount?.toLocaleString('nl-NL') }}</div>
            <div class="stat-title text-6xl font-display -mb-4 text-accent-content">Veranderaars</div>
            <div class="flex justify-center">
              <div class="stat-desc mt-12 text-5xl bg-accent-content text-neutral px-8 py-4 rounded-full">
                <span class="font-bold">+ {{
                  contacts.data.value?.newContactsThisWeek?.toLocaleString('nl-NL') }}</span>
                deze
                week
              </div>
            </div>

            <div class="stat-desc text-2xl mt-2 text-accent-content">
              <span class="font-bold">+ {{ contacts.data.value?.newContactsLastWeek?.toLocaleString('nl-NL') }}</span>
              afgelopen
              week
            </div>
          </div>
        </div>


        <div class="card bg-white shadow grid items-center" v-if="contacts.data">
          <div class="card-body ">
            <div class=" font-display flex items-center gap-8 text-5xl">
              <IconAccountGroup />
              <span>{{ groups.data.value?.length }} groepen</span>
            </div>
          </div>
        </div>

        <div class="card bg-white shadow grid items-center" v-if="contacts.data">
          <div class="card-body">
            <div class=" font-display flex items-center gap-8 text-5xl">
              <IconCalendar />
              <span>{{ events.data.value?.length }} evenementen</span>
            </div>
          </div>
        </div>


        <div class="card bg-white shadow grid items-center" v-if="contacts.data">
          <div class="card-body">
            <div class=" text-xs text-neutral/60">
              <strong>Met ❤️ gemaakt door het BO Digitale Infrastructuur team.</strong> Dagelijks automatisch
              bijgewerkt.
              Data uit Hubspot, ControlShiftLabs en Dato. Op basis van geanonimiseerde postcodes (de eerste 4 cijfers)
            </div>
          </div>
        </div>




      </div>
    </div>
  </div>

  <div class="md:hidden text-center p-8">
    Deze kaart werkt nu alleen nog op grote schermen :(
  </div>














</template>
