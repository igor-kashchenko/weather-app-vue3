<template>
  <v-container class="container d-flex justify-space-between pa-0 pt-4">
    <router-link to="/">
      <v-icon icon="mdi-arrow-left icon">
      </v-icon>
    </router-link>

      <v-icon icon="mdi-refresh icon" @click="handleUpdateCity(props.city, props.dt)"></v-icon>
  </v-container>
</template>

<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather';

type Props = {
  city: string,
  dt: number,
}

const props = defineProps<Props>();

const store = useWeatherStore();

const handleUpdateCity = (city: string, dt: number) => {
  store.updateCityWeather(city, dt);
};
</script>

<style scoped>

</style>