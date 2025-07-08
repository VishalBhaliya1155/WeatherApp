
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
console.log(API_KEY,"key")
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = (city) =>
  axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric'
    }
  });

export const fetchForecast = (city) =>
  axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric'
    }
  });
