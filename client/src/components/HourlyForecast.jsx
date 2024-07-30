import React from 'react';
import { iconUrlFromCode } from '../weatherService';

const HourlyForecast = ({ forecast }) => {
  if (!forecast) return null;

  return (
    <div className="bg-primary-color rounded-lg p-4 mb-5 shadow-lg w-full max-w-md md:max-w-4xl overflow-x-auto scrollbar-hide">
      <h3 className="text-black text-xl md:text-2xl mb-3">Hourly Forecast</h3>
      <ul className="flex gap-4 overflow-x-auto">
        {forecast.map((hour, index) => (
          <li key={index} className="bg-secondary-color rounded-lg p-3 w-20 flex-shrink-0 text-center shadow-md">
            <p className="text-black text-sm md:text-base">{hour.title}</p>
            <img src={iconUrlFromCode(hour.icon)} alt="Weather icon" className="w-12 h-12 md:w-15 md:h-15" />
            <p className="text-black text-sm md:text-base">{hour.temp}°C</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyForecast;
