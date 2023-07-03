<template>
  <form @submit.prevent="handleAddCity(inputValue)">
    <v-row no-gutters>
      <v-col cols="10">
        <v-text-field label="Enter a city" variant='outlined' v-model="inputValue"></v-text-field>
      </v-col>

      <v-col cols="2" class="pl-6">
        <v-btn class="button-height" density="compact" color="blue-darken-2" width="100%" type="submit">Add a city</v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWeatherStore } from '@/stores/weather';

const inputValue = ref('');

const store = useWeatherStore();

const handleAddCity = (city: string) => {
  store.fetchWeatherData(city);
};
</script>

<style scoped>
.button-height {
  height: 56px !important;
}
</style>