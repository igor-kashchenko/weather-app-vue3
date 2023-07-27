<template>
  <v-container class="h-screen container">
    <p class="text-center text-h3">Weather Forecast</p>

    <BreadCrumbs :city="cityName" :dt="dt"/>

    <v-container class="mt-4 pa-0">
      <v-row no-gutters class="flex-nowrap">
        <v-col cols="6" class="elevation-10 rounded pa-4 mr-4">
          <div class="d-flex justify-space-between mb-2">
            <p class="text-body-1">
              {{ parseTimeStamp(dt) }}
            </p>

            <p class="text-body-1">
              {{ coordinates }}
            </p>
          </div>

          <div class="d-flex justify-space-between mb-2">
            <p class="text-h5">{{cityName }}, {{country}}</p>

            <p class="text-h5">{{timeZoneGMT}}</p>
          </div>

          <v-row class="pa-4 ma-0 elevation-4 rounded mb-6">
            <v-col cols="4" class="d-flex flex-column justify-center pa-4">
              <v-img :src='`${ICON_URL}/${icon}@4x.png`' contain>
              </v-img>
            </v-col>

            <v-col cols="4" class="d-flex flex-column justify-center pa-4">
              <p class="text-h4">{{main}}</p>
              <p class="">{{description}}</p>
              <p class="text-h5">{{roundTemp(temp)}}°C</p>
            </v-col>
            
            <v-col cols="4" class="d-flex flex-column justify-center pa-4 text-start">
              <p class="text-body-1">Feels like: {{roundTemp(feels_like)}}°C</p>
    
              <span class="text-body-1">High: {{roundTemp(temp_max)}}°C </span>
              <span class="text-body-1">Low: {{roundTemp(temp_min)}}°C</span>
            </v-col>
          </v-row>

          <v-row class="pa-0 ma-0 borderRight">
            <v-col cols="4" class="pa-0 pl-4">
              <div class="d-flex mb-2">
                <v-icon icon="mdi-weather-windy mr-2"></v-icon>

                <p>{{speed}}m/s</p>

                <v-icon :icon="src"></v-icon>
              </div>

              <div class="d-flex mb-2">
                <v-icon icon="mdi-hydraulic-oil-temperature mr-2"></v-icon>

                <p>{{ pressure }}hPa</p>
              </div>

              <div class="d-flex mb-2">
                <v-icon icon="mdi-water-percent mr-2"></v-icon>

                <p>{{ humidity }}%</p>
              </div>

              <div class="d-flex" v-if="rain1h">
                <v-icon icon="mdi-weather-pouring mr-2"></v-icon>

                <p>{{ rain1h }}mm</p>
              </div>
            </v-col>

            <v-col cols="4" class="pa-0">
                <div class="d-flex mb-2">
                  <v-icon icon="mdi-cloud-percent-outline mr-2"></v-icon>

                  <p>{{ all }}%</p>
                </div>

                <div class="d-flex mb-2">
                  <v-icon icon="mdi-eye-outline mr-2"></v-icon>

                  <p>{{ visibility }}m</p>
                </div>

                <div class="d-flex mb-2" v-if="sea_level">
                  <v-icon icon="mdi-waves-arrow-up mr-2"></v-icon>

                  <p>{{sea_level}}m</p>
                </div>

                <div class="d-flex" v-if="grnd_level">
                  <v-icon icon="mdi-image-filter-hdr-outline mr-2"></v-icon>

                  <p>{{grnd_level}}m</p>
                </div>
            </v-col>

            <v-col cols="4" class="pa-0">
                <div class="d-flex mb-2">
                  <v-icon icon="mdi-weather-sunset-up mr-2"></v-icon>

                  <p>{{ sunriseTime }}</p>
                </div>

                <div class="d-flex">
                  <v-icon icon="mdi-weather-sunset-down mr-2 mr-2"></v-icon>

                  <p>{{ sunsetTime }}</p>
                </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6" class="elevation-10 rounded pa-4">
          <LineChart />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import { useWeatherStore } from '@/stores/weather';
import type { CityWeather } from '@/types/types';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { parseTimeStamp } from '@/utils/parseTimeStamp';
import { formatCoordinates } from '@/utils/formatCoordinates';
import { formatTimezone } from '@/utils/formatTimezone';
import { ICON_URL } from '@/utils/fetchCityWeatherData';
import { roundTemp } from '@/utils/roundTemp';
import { formatWindDirection } from '@/utils/formatWindDirection';
import LineChart from '@/components/LineChart.vue';
import router from '@/router';

const store = useWeatherStore();
const weatherData = store.weatherData;

const foundCity = ref<CityWeather>();

const mockCityData: CityWeather = {
  base: '',
  cod: 'mock',
  id: 0,
  coord: { lon: 0, lat: 0 },
  weather: [{ id: 0, main: '', description: '', icon: '' }],
  main: { temp: 0, feels_like: 0, temp_min: 0, temp_max: 0, pressure: 0, humidity: 0, sea_level: 0, grnd_level: 0 },
  visibility: 0,
  wind: { speed: 0, deg: 0, gust: 0 }, 
  rain: { '1h': 0, '3h': 0 }, 
  clouds: { all: 0 },
  dt: 0,
  sys: { country: '', sunrise: 0, sunset: 0, type: 0, id: 0 }, 
  timezone: 0,
  name: '',
};

onMounted(async () => {
  if(cityName) {
    await store.fetchCityWeatherForecast(cityName);
  }
});

const route = useRoute();
const paramsName = route.params.name;

foundCity.value = weatherData.find((city) => city.name === paramsName) || mockCityData;

if (foundCity.value.cod === 'mock') {
  router.push('/');
}

const {
  coord: { lon, lat },
  weather: [{ main, description, icon }],
  main: { temp, feels_like, temp_min, temp_max, pressure, humidity, sea_level, grnd_level },
  visibility,
  wind: { speed, deg },
  rain: { '1h': rain1h = '1h' } = {},
  clouds: { all },
  dt,
  sys: { country, sunrise, sunset },
  timezone,
  name: cityName
} = foundCity.value; 

const coordinates = formatCoordinates(lat, lon);
const timeZoneGMT = formatTimezone(timezone);

const { src } = formatWindDirection(deg);

const sunriseTime = parseTimeStamp(sunrise, 'sun');
const sunsetTime = parseTimeStamp(sunset, 'sun');
</script>

<style scoped>
p, span {
  font-family: 'Mont', sans-serif !important;
}

.borderRight {
  border-left: 2px solid #000;
}
</style>
