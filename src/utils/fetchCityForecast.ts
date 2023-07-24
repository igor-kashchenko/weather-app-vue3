import { VUE_APP_FORECAST_API_KEY, VUE_APP_FORECAST_URL } from '@/config';
import { roundTemp } from './roundTemp';
import type { Hour } from '@/types/types';
import { convertTo12Hour } from './convertTo12Hout';

export const fetchCityForecast = async (city: string) => {
  const forecastWeatherURL = `${VUE_APP_FORECAST_URL}${city}/today?unitGroup=metric&include=hours%2Ccurrent&key=${VUE_APP_FORECAST_API_KEY}&contentType=json`;
  const response = await fetch(forecastWeatherURL);
  const forecastData = await response.json();

  const { address } = forecastData;
  const { hours } = forecastData.days[0];
  const { datetimeEpoch } = forecastData.currentConditions;

  const hoursData = hours.map((hour: Hour) => {
    const { datetime, temp } = hour;
    const formattedDate = convertTo12Hour(datetime);
    const roundedTemp = roundTemp(temp);

    return { datetime: formattedDate, temp: roundedTemp };
  });

  return {
    address,
    hoursData,
    datetimeEpoch,
  };
};
