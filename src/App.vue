<script setup lang="ts">
import WeatherCityCardList from './components/WeatherCityCardList.vue';
import WeatherForm from './components/WeatherForm.vue';

</script>

<template>
  <v-container class="h-screen">
    <v-row justify="center">
      <v-col lg="8">
        <h2 class="text-h2 text-center mb-6">Weather App</h2>

        <WeatherForm />

        <WeatherCityCardList />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  h2 {
    font-family: 'Mont', sans-serif !important;
  }
</style>
