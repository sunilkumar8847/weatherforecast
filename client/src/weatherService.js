import { DateTime } from 'luxon';

const API_KEY_ONECALL = "dbd3b02d8958d62185d02e944cd5f522";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType, searchParams, API_KEY) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY, units: "metric" });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone
  } = data;
  const { description: details, icon } = weather[0];
  return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed, timezone };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 7).map(d => ({
    title: formatToLocalTime(d.dt, timezone, "cccc"),
    temp: d.temp.day,
    icon: d.weather[0].icon
  }));
  hourly = hourly.slice(1, 11).map(d => ({
    title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
    temp: d.temp,
    icon: d.weather[0].icon
  }));
  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams, API_KEY_ONECALL).then(formatCurrentWeather);
    const { lat, lon } = formattedCurrentWeather;
    const formattedForecastWeather = await getWeatherData('onecall', { lat, lon, exclude: 'current,minutely,alerts', units: "metric" }, API_KEY_ONECALL).then(formatForecastWeather);
    return { formattedCurrentWeather, formattedForecastWeather };
  } catch (error) {
    console.error('Error formatting weather data:', error);
    throw error;
  }
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy'| Local time:'hh:mm a") => 
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export { getFormattedWeatherData, formatToLocalTime, iconUrlFromCode };
