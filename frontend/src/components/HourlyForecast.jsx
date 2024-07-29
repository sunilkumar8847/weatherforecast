import React from 'react';
import { iconUrlFromCode } from '../weatherService';
import './HourlyForecast.css';

const HourlyForecast = ({ forecast }) => {
  if (!forecast) return null;

  return (
    <div className="hourly-forecast-container">
      <h3>Hourly Forecast</h3>
      <ul>
        {forecast.map((hour, index) => (
          <li key={index} className="hourly-forecast-item">
            <p>{hour.title}</p>
            <img src={iconUrlFromCode(hour.icon)} alt="Weather icon" />
            <p>{hour.temp}°C</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyForecast;
