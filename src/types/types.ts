export type Coord = {
  lon: number;
  lat: number;
}

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
}

type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

type Wind = {
  speed: number;
  deg: number;
  gust: number;
}

type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

type Rain = {
  '1h': number;
  '3h': number;
}

type Clouds = {
  all: number;
}

export type CityWeather = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain?: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: string;
}

export type Hour = {
  datetime: string;
  temp: number;
}

export type CityWeatherForecast = {
  address: string;
  hoursData: Hour[];
  datetimeEpoch: number;
}
