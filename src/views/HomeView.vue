<template>
  <v-container class="h-screen container">
    <p class="text-h2 text-center mb-6">Weather App</p>

    <WeatherForm />

    <WeatherCityCardList />
  </v-container>
</template>

<script setup lang="ts">
import WeatherForm from '@/components/WeatherForm.vue';
import WeatherCityCardList from '@/components/WeatherCityCardList.vue';
</script>

<style scoped>
  p {
    font-family: 'Mont', sans-serif !important;
  }
</style>