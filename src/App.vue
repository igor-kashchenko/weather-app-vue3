<script setup lang="ts">
import { watch } from 'vue';
import { RouterView } from 'vue-router';
import { useWeatherStore } from './stores/weather';

const store = useWeatherStore();

const weatherData = store.weatherData;

watch(weatherData, (newValue) => {
  console.log(newValue);
});
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  h2 {
    font-family: 'Mont', sans-serif !important;
  }

  .container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
