<template>
  <v-container class="h-screen container" max-width="1200">
    <h2 class="text-h2 text-center mb-6">Weather App</h2>

    <WeatherForm />

    <WeatherCityCardList />
  </v-container>  
</template>

<script setup lang="ts">
import WeatherForm from '@/components/WeatherForm.vue';
import WeatherCityCardList from '@/components/WeatherCityCardList.vue';
</script>

<style scoped>

</style>