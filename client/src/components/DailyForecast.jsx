import React from 'react';
import { iconUrlFromCode } from '../weatherService';

const DailyForecast = ({ forecast }) => {
  if (!forecast) return null;

  return (
    <div className="bg-primary-color rounded-lg p-4 mb-5 shadow-lg w-full max-w-md md:max-w-4xl">
      <h3 className="text-black text-xl md:text-2xl mb-3">Daily Forecast</h3>
      <ul className="flex flex-col gap-4">
        {forecast.map((day, index) => (
          <li key={index} className="flex items-center justify-between bg-secondary-color rounded-lg p-3 shadow-md">
            <p className="text-black text-sm md:text-base">{day.title}</p>
            <img src={iconUrlFromCode(day.icon)} alt="Weather icon" className="w-10 h-10 md:w-12 md:h-12" />
            <p className="text-black text-sm md:text-base">{day.temp}°C</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyForecast;
