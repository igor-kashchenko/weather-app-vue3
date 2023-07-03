<template>
  <v-col cols="4">
    <v-container class="container elevation-10 rounded" >
      <h3>{{weather.name}}</h3>

      <span>{{ weather.main.temp }} °C</span>
    </v-container>
</v-col>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'; 
import type { CityWeather } from '@/types/types';

type Props = {
  weather: CityWeather;
};

const props = defineProps<Props>();

const { weather } = toRefs(props);
</script>

<style scoped>
.container {
  padding: 20px !important;
 
}
</style>