<script setup lang="ts">
import IconZoomOut from '~icons/mdi/zoom-out'
import IconAddBold from '~icons/mdi/add-bold'

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

const primary = ref();

onMounted(() => {
  const styles = getComputedStyle(document.documentElement);
  primary.value = styles.getPropertyValue("--color-primary-hex");

  // Update currentZoomLevel every second
  setInterval(() => {
    currentZoomLevel.value = map.value?.getZoom();
  }, 1000);
})

function flyTo(coordinates: number[]) {
  // const currentZoomLevel = map.value.getZoom();
  const defaultZoomLevel = 7.2;
  let newZoomLevel;;

  if (currentZoomLevel.value > defaultZoomLevel) {
    newZoomLevel = currentZoomLevel.value;
  } else {
    newZoomLevel = defaultZoomLevel;
  }

  map.value.flyTo({
    center: coordinates,
    zoom: newZoomLevel,
    speed: 0.2,
    essential: true
  });
}

function restoreDefaultZoom() {
  currentZoomLevel.value = zoom;

  map.value.flyTo({
    center: center,
    zoom: zoom,
    essential: true
  });
}

const cities = ref({
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": { "name": "Tilburg" }, "geometry": { "type": "Point", "coordinates": [5.0833, 51.5500] } },
    { "type": "Feature", "properties": { "name": "Amsterdam" }, "geometry": { "type": "Point", "coordinates": [4.9003, 52.3791] } },
    { "type": "Feature", "properties": { "name": "Rotterdam" }, "geometry": { "type": "Point", "coordinates": [4.4800, 51.9200] } },
    { "type": "Feature", "properties": { "name": "The Hague" }, "geometry": { "type": "Point", "coordinates": [4.3100, 52.0800] } },
    { "type": "Feature", "properties": { "name": "Utrecht" }, "geometry": { "type": "Point", "coordinates": [5.1217, 52.0908] } },
    { "type": "Feature", "properties": { "name": "Maastricht" }, "geometry": { "type": "Point", "coordinates": [5.6833, 50.8500] } },
    { "type": "Feature", "properties": { "name": "Eindhoven" }, "geometry": { "type": "Point", "coordinates": [5.4833, 51.4333] } },
    { "type": "Feature", "properties": { "name": "Groningen" }, "geometry": { "type": "Point", "coordinates": [6.5675, 53.2189] } },
    { "type": "Feature", "properties": { "name": "Almere" }, "geometry": { "type": "Point", "coordinates": [5.2167, 52.3667] } },
    { "type": "Feature", "properties": { "name": "Breda" }, "geometry": { "type": "Point", "coordinates": [4.7758, 51.5889] } },
    { "type": "Feature", "properties": { "name": "Nijmegen" }, "geometry": { "type": "Point", "coordinates": [5.8625, 51.8475] } },
    { "type": "Feature", "properties": { "name": "Arnhem" }, "geometry": { "type": "Point", "coordinates": [5.9167, 51.9833] } },
    { "type": "Feature", "properties": { "name": "Haarlem" }, "geometry": { "type": "Point", "coordinates": [4.6333, 52.3833] } },
    { "type": "Feature", "properties": { "name": "Enschede" }, "geometry": { "type": "Point", "coordinates": [6.8925, 52.2225] } },
    { "type": "Feature", "properties": { "name": "’s - Hertogenbosch" }, "geometry": { "type": "Point", "coordinates": [5.3000, 51.6833] } },
    { "type": "Feature", "properties": { "name": "Amersfoort" }, "geometry": { "type": "Point", "coordinates": [5.3833, 52.1500] } },
    { "type": "Feature", "properties": { "name": "Zaanstad" }, "geometry": { "type": "Point", "coordinates": [4.8167, 52.4333] } },
    { "type": "Feature", "properties": { "name": "Apeldoorn" }, "geometry": { "type": "Point", "coordinates": [5.9667, 52.2167] } },
    { "type": "Feature", "properties": { "name": "Zwolle" }, "geometry": { "type": "Point", "coordinates": [6.1000, 52.5167] } },
    { "type": "Feature", "properties": { "name": "Zoetermeer" }, "geometry": { "type": "Point", "coordinates": [4.5000, 52.0667] } },
    { "type": "Feature", "properties": { "name": "Leeuwarden" }, "geometry": { "type": "Point", "coordinates": [5.7833, 53.2000] } },
    { "type": "Feature", "properties": { "name": "Leiden" }, "geometry": { "type": "Point", "coordinates": [4.4900, 52.1600] } },
    { "type": "Feature", "properties": { "name": "Dordrecht" }, "geometry": { "type": "Point", "coordinates": [4.6783, 51.7958] } },
    { "type": "Feature", "properties": { "name": "Alphen aan den Rijn" }, "geometry": { "type": "Point", "coordinates": [4.6667, 52.1333] } },
    { "type": "Feature", "properties": { "name": "Alkmaar" }, "geometry": { "type": "Point", "coordinates": [4.7500, 52.6333] } },
    { "type": "Feature", "properties": { "name": "Delft" }, "geometry": { "type": "Point", "coordinates": [4.3592, 52.0117] } },
    { "type": "Feature", "properties": { "name": "Emmen" }, "geometry": { "type": "Point", "coordinates": [6.9000, 52.7833] } },
    { "type": "Feature", "properties": { "name": "Deventer" }, "geometry": { "type": "Point", "coordinates": [6.1500, 52.2500] } },
    { "type": "Feature", "properties": { "name": "Helmond" }, "geometry": { "type": "Point", "coordinates": [5.6500, 51.4833] } },
    { "type": "Feature", "properties": { "name": "Hilversum" }, "geometry": { "type": "Point", "coordinates": [5.1667, 52.2333] } },
    { "type": "Feature", "properties": { "name": "Heerlen" }, "geometry": { "type": "Point", "coordinates": [5.9833, 50.8833] } },
    { "type": "Feature", "properties": { "name": "Lelystad" }, "geometry": { "type": "Point", "coordinates": [5.4833, 52.5000] } },
  ]
})

</script>

<template>
  <Container>
    <MapboxMap :accessToken="config.public.mapboxApi"
      mapStyle="mapbox://styles/joppe-milieudefensie/cm7p5awl8001y01r18vay203m?optimize=true" :center="center"
      :zoom="zoom" :min-zoom="minZoom" :pitchWithRotate="false" :dragRotate="false" logoPosition="bottom-right"
      @mb-created="(mapboxInstance: mapboxgl.Map) => map = mapboxInstance"
      class="w-full h-[95vh] sm:rounded-md overflow-hidden shadow-sm bg-accent/10" :cooperativeGestures="true">


      <template #default>

        <MapboxGeolocateControl />

        <MapboxNavigationControl position="top-right" :showCompass="false" />

        <MapMarker v-for="(city, index) in cities.features" :title="city.properties.name"
          :coordinates="city.geometry.coordinates" :currentZoomLevel="currentZoomLevel"
          @popup-opened="flyTo(city.geometry.coordinates)" />

        <div class="absolute -mt-16 ml-4 space-x-2">



          <button v-if="currentZoomLevel > zoom + 1" class="btn btn-accent btn-dash bg-base-100 text-neutral"
            @click="restoreDefaultZoom">
            <IconZoomOut />Toon heel Nederland
          </button>

          <button v-else class="btn btn-accent">
            <IconAddBold />Organiseer een evenement
          </button>

        </div>



      </template>

      <!-- <template #loader>
        <div>Loading...</div>
      </template> -->




    </MapboxMap>
  </Container>
</template>