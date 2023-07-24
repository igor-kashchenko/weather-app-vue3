<template>
  <v-col cols="3">
    <v-container class="cont elevation-4 rounded" >
      <div class="d-flex align-center justify-space-between">
        <router-link :to='`/cityWeather/${weather.name}`' class="link icon">
          <p class="text-h5">{{weather.name}}, {{weather.sys.country}}</p>
        </router-link>

        <v-icon icon="mdi-close" class='icon' @click="handleDeleteCity(props.weather.name)"></v-icon>
      </div>

      <v-row class="align-center justify-space-between py-4 ma-0">
        <v-col cols="4" class="pa-0">
          <v-img :src='`${ICON_URL}/${weather.weather[0].icon}@2x.png`' cover :width="96" :height="96">
          </v-img>
        </v-col>

        <v-col cols="4" class="pa-0">
           <p class="text-h6">{{weather.weather[0].main}}</p>
        </v-col>
        
        <v-col cols="4" class="d-flex flex-column align-end pa-0">
            <p class="text-h6">{{roundTemp(weather.main.temp)}}°C</p>
   
            <span class="text-caption text-end">High: {{roundTemp(weather.main.temp_max)}}°C </span>
            <span class="text-caption text-end">Low: {{roundTemp(weather.main.temp_min)}}°C</span>
        </v-col>
      </v-row>
         

      <div class="d-flex align-center justify-space-between">
        <p class="text-h6">{{parseTimeStamp(weather.dt)}}</p>

        <v-icon icon="mdi-refresh" class='icon' @click="handleUpdateCity(props.weather.name, props.weather.dt)"></v-icon>
      </div>
    </v-container>
</v-col>
</template>

<script setup lang="ts">
import type { CityWeather } from '@/types/types';
import { ICON_URL } from '@/utils/fetchCityWeatherData';
import { roundTemp } from '@/utils/roundTemp';
import { parseTimeStamp } from '@/utils/parseTimeStamp';
import { useWeatherStore } from '@/stores/weather';

type Props = {
  weather: CityWeather;
};

const props = defineProps<Props>();

const store = useWeatherStore();

const handleDeleteCity = (city: string) => {
  store.deleteCityWeather(city);
};

const handleUpdateCity = (city: string, dt: number) => {
  store.updateCityWeather(city, dt);
};
</script>

<style scoped>
p, span {
  font-family: 'Mont', sans-serif !important;
}
.cont {
  padding: 20px !important;
}

.link {
  text-decoration: none;
}
</style>