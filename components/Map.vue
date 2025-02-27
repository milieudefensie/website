<script setup lang="ts">
import IconCalendar from '~icons/mdi/calendar'

import {
  MapboxMap, MapboxMarker, MapboxImage, MapboxCluster, MapboxPopup
} from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
const config = useRuntimeConfig()

const map = ref();

const middleOfNL: [number, number] = [5.3878, 52.1561];
const isOpen = ref(false);
const position = ref([0, 0]);
const content = ref();

const primary = ref();

onMounted(() => {
  const styles = getComputedStyle(document.documentElement);
  primary.value = styles.getPropertyValue("--color-primary-hex");
})

async function openPopup({ geometry, properties }: { geometry: { coordinates: [number, number] }, properties: Record<string, any> }) {
  await nextTick();
  position.value = [...geometry.coordinates];
  isOpen.value = true;

  /**
   * Mapbox GL convert's properties values to JSON, so we need to parse them
   * to retreive any complex data structure such as arrays and objects.
   */
  content.value = Object.fromEntries(
    Object.entries(properties).map(([key, value]) => {
      try {
        return [key, JSON.parse(value)];
      } catch (err) {
        // Silence is golden.
      }

      return [key, value];
    })
  );
}

const pins = {
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": { "id": "ak16994521", "mag": 2.3, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-151.5129, 63.1016, 0.0] } },
    { "type": "Feature", "properties": { "id": "ak16994519", "mag": 1.7, "time": 1507425289659, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-150.4048, 63.1224, 105.5] } },
  ]
}

const cities = ref({
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": { "name": "Tilburg" }, "geometry": { "type": "Point", "coordinates": [5.0833, 51.5500] } },
    { "type": "Feature", "properties": { "name": "Amsterdam" }, "geometry": { "type": "Point", "coordinates": [4.8936, 52.3728] } },
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
      mapStyle="mapbox://styles/joppe-milieudefensie/cm7nhbbbz00yg01r497sj6l9m?optimize=true" :center="middleOfNL"
      :zoom="6.7" @mb-created="(mapboxInstance: mapboxgl.Map) => map = mapboxInstance"
      class="w-full h-[95vh] rounded-md overflow-hidden shadow-sm bg-accent/10" :cooperativeGestures="true">

      <template #default>

        <MapboxPopup v-if="isOpen" :key="position.join('-')" :lng-lat="position" anchor="bottom"
          @mb-close="() => (isOpen = false)">
          <pre>{{ content }}</pre>
        </MapboxPopup>

        <MapboxMarker v-for="city in cities.features" :lng-lat="city.geometry.coordinates" popup>
          <template #default>
            <button
              class="btn btn-circle btn-accent btn-sm border-neutral/50 shadow-md font-display hover:scale-105 transition-transform active:scale-120">
              <IconCalendar class="text-lg" />
            </button>
          </template>
          <template #popup>
            <div class="space-y-2 min-w-96">
              <h2 class="text-2xl font-display">{{ city.properties.name }}</h2>
              <button class="btn btn-accent">Bekijk groep</button>
            </div>

          </template>
        </MapboxMarker>

      </template>

      <template #loading>
        Loading...
      </template>




    </MapboxMap>
  </Container>
</template>