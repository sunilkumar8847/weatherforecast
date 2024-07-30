import React from 'react';
import { formatToLocalTime, iconUrlFromCode } from '../weatherService';
import './CurrentWeather.css';

const CurrentWeather = ({ weather }) => {
  const { temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed, timezone } = weather;

  return (
    <div className="current-weather-container">
      <h2>{name}, {country}</h2>
      <img src={iconUrlFromCode(icon)} alt={details} />
      <p>{details}</p>
      <p>Temperature: {temp}°C (min: {temp_min}°C, max: {temp_max}°C)</p>
      <p>Feels like: {feels_like}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Sunrise: {formatToLocalTime(sunrise, timezone, "hh:mm a")}</p>
      <p>Sunset: {formatToLocalTime(sunset, timezone, "hh:mm a")}</p>
      <p>Wind Speed: {speed} m/s</p>
    </div>
  );
};

export default CurrentWeather;
