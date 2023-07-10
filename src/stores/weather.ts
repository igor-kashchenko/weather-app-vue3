import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { CityWeather } from '@/types/types';
import { fetchCityWeatherData } from '@/utils/fetchCityWeatherData';

export const useWeatherStore = defineStore('weather', () => {
  const weatherData: Ref<CityWeather[]> = ref([]);

  const displayedWeatherData = computed(() => weatherData);

  const fetchWeatherData = async (city: string): Promise<CityWeather | undefined> => {
    const responseData: CityWeather = await fetchCityWeatherData(city);

    const hasCityAlreadyFetched = weatherData.value.some((cityWeather) => cityWeather.name === city);

    if (!hasCityAlreadyFetched) {
      weatherData.value.push(responseData);
    } else {
      return;
    }

    return responseData;
  };

  const deleteCityWeather = (city: string) => {
    weatherData.value = weatherData.value.filter((cityWeather) => cityWeather.name !== city);
  };

  return { weatherData, fetchWeatherData, deleteCityWeather, displayedWeatherData };
});
