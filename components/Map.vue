<script setup lang="ts">
import { MapboxMap, MapboxMarker, MapboxGeocoder, MapboxGeolocateControl, MapboxNavigationControl } from '@studiometa/vue-mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';

import 'mapbox-gl/dist/mapbox-gl.css';

const map = ref();
const currentZoomLevel = ref();

const config = useRuntimeConfig()
const zoom = parseFloat(config.public.mapZoom);

const mapBounds = ref([
  [3.271268, 50.698755], // Southwest coordinates of the Netherlands
  [7.500992, 53.546792]  // Northeast coordinates of the Netherlands
])
const mapBoundsOptions = ref({
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
  animate: false
})

function mapboxCreated(mapInstance: mapboxgl.Map) {
  map.value = mapInstance;

  // Update currentZoomLevel every second
  setInterval(() => {
    currentZoomLevel.value = map.value?.getZoom();
  }, 200);
}

</script>
<template>
  <div class="flex items-stretch">
    <MapboxMap :access-token="config.public.mapboxApi"
      mapStyle="mapbox://styles/joppe-milieudefensie/cm7p5awl8001y01r18vay203m?optimize=true" :pitchWithRotate="false"
      :dragRotate="false" logoPosition="bottom-right" @mb-created="mapboxCreated($event)" :bounds="mapBounds"
      :fitBoundsOptions="mapBoundsOptions" :zoom="zoom" class="w-full">
      <MapboxGeocoder position="top-left" />
      <MapboxGeolocateControl />
      <MapboxNavigationControl position="bottom-right" />
      <slot name="default"></slot>
    </MapboxMap>
  </div>

</template>