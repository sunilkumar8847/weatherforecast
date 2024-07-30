import React from 'react';
import { formatToLocalTime, iconUrlFromCode } from '../weatherService';

const CurrentWeather = ({ weather }) => {
  const { temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed, timezone } = weather;

  return (
    <div className="flex flex-col gap-2 items-center bg-primary-color rounded-lg p-4 mb-5 pb-16 shadow-lg w-full max-w-md text-center md:max-w-4xl">
      <h2 className="mb-2 text-xl md:text-2xl text-black">{name}, {country}</h2>
      <img src={iconUrlFromCode(icon)} alt={details} className="w-20 h-20 md:w-24 md:h-24" />
      <p className="text-black text-sm md:text-base">{details}</p>
      <p className="text-black text-sm md:text-base">Temperature: {temp}°C (min: {temp_min}°C, max: {temp_max}°C)</p>
      <p className="text-black text-sm md:text-base">Feels like: {feels_like}°C</p>
      <p className="text-black text-sm md:text-base">Humidity: {humidity}%</p>
      <p className="text-black text-sm md:text-base">Sunrise: {formatToLocalTime(sunrise, timezone, "hh:mm a")}</p>
      <p className="text-black text-sm md:text-base">Sunset: {formatToLocalTime(sunset, timezone, "hh:mm a")}</p>
      <p className="text-black text-sm md:text-base">Wind Speed: {speed} m/s</p>
    </div>
  );
};

export default CurrentWeather;
