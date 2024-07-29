import React from 'react';
import { iconUrlFromCode } from '../weatherService';
import './DailyForecast.css';

const DailyForecast = ({ forecast }) => {
  if (!forecast) return null;

  return (
    <div className="daily-forecast-container">
      <h3>Daily Forecast</h3>
      <ul>
        {forecast.map((day, index) => (
          <li key={index} className="daily-forecast-item">
            <p>{day.title}</p>
            <img src={iconUrlFromCode(day.icon)} alt="Weather icon" />
            <p>{day.temp}°C</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyForecast;
