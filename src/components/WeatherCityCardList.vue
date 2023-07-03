<template>
  <v-container class="container">
    <v-row>
      <WeatherCityCard v-for="weather in weatherData" :key="weather.id" :weather="weather"/>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import WeatherCityCard from './WeatherCityCard.vue';
import { useWeatherStore } from '@/stores/weather';

const store = useWeatherStore();

const weatherData = store.weatherData;
</script>

<style scoped>
  .container {
    padding: 0 !important;
  }
</style>