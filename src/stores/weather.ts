import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { CityWeather, CityWeatherForecast } from '@/types/types';
import { fetchCityWeatherData } from '@/utils/fetchCityWeatherData';
import { fetchCityForecast } from '@/utils/fetchCityForecast';

export const useWeatherStore = defineStore('weather', () => {
  const weatherData: Ref<CityWeather[]> = ref([]);

  const displayedWeatherData = computed(() => weatherData);
  
  const cityWeatherForecasts = ref<CityWeatherForecast[]>([]);

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

  const updateCityWeather = async (city: string, dt: number) => {
    const responseData: CityWeather = await fetchCityWeatherData(city);

    if (responseData.dt !== dt) {
      weatherData.value = weatherData.value.map((cityWeather) => cityWeather.name === city ? responseData : cityWeather );
    } else {
      alert('City is up to date');
      
      return;
    }
  };

  const fetchCityWeatherForecast = async (city: string): Promise<CityWeatherForecast | undefined> => {
    const isAlreadyExists = cityWeatherForecasts.value.some((cityWeather) => cityWeather.address === city);

    if (!isAlreadyExists) {
      const responseData: CityWeatherForecast = await fetchCityForecast(city);

      cityWeatherForecasts.value.push(responseData);

      return responseData;
    } else {

      return;
    }
    
  };

  return { weatherData, fetchWeatherData, deleteCityWeather, displayedWeatherData, updateCityWeather, fetchCityWeatherForecast, cityWeatherForecasts };
});
