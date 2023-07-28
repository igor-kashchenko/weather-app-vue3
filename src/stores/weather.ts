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
    try {
      const responseData: CityWeather = await fetchCityWeatherData(city);

      const isSucceeded = responseData.cod !== '404';

      const hasCityAlreadyFetched = weatherData.value.some((cityWeather) => cityWeather.name === city);

      if (!hasCityAlreadyFetched && isSucceeded) {
        weatherData.value.push(responseData);
      } else {
        return;
      }

      return responseData;
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error fetching weather data: ${error.message}`);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
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
      try {
        const responseData = await fetchCityForecast(city) as CityWeatherForecast;

        cityWeatherForecasts.value.push(responseData);
        
        return responseData;
      } catch (error) {
        if (error instanceof Error) {
          alert(`Error fetching weather data: ${error.message}`);
        } else {
          console.error('Unknown error occurred:', error);
        }

        return undefined;
      }
    } else {
      return;
    }
  };

  return { weatherData, fetchWeatherData, deleteCityWeather, displayedWeatherData, updateCityWeather, fetchCityWeatherForecast, cityWeatherForecasts };
});
