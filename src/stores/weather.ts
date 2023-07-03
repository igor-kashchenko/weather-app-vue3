import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { CityWeather } from '@/types/types';
import { fetchCityWeatherData } from '@/utils/fetchCityWeatherData';

export const useWeatherStore = defineStore('weather', () => {
  const weatherData: Ref<CityWeather[]> = ref([]);

  const fetchWeatherData = async (city: string): Promise<CityWeather>  => {
    const responseData: CityWeather = await fetchCityWeatherData(city);

    weatherData.value.push(responseData);

    console.log(weatherData);
    return responseData;
  };

  return { weatherData, fetchWeatherData };
});