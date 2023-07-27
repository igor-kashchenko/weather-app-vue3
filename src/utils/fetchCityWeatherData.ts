import { VUE_APP_API_KEY, VUE_APP_API_URL, VUE_APP_ICON_URL } from '@/config';

export const API_KEY = VUE_APP_API_KEY;
export const API_URL = VUE_APP_API_URL;
export const ICON_URL = VUE_APP_ICON_URL;

export const fetchCityWeatherData = async (city: string) => {
  try {
    const cityWeatherURL = `${API_URL}&q=${city}&appid=${API_KEY}`;
    const cityWeatherAPIResponse = await fetch(cityWeatherURL);
    const cityWeatherData = await cityWeatherAPIResponse.json();

    if (cityWeatherData.cod === '404') {
      alert(cityWeatherData.message);

      return;
    } 

    return cityWeatherData;
  } catch (error) {
    if(error instanceof Error) {
      alert(error.message);
    } else {
      console.error(error);
    }
  }
};

