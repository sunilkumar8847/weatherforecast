// pages/WeatherPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getFormattedWeatherData } from "../weatherService";
import CurrentWeather from '../components/CurrentWeather';
import DailyForecast from '../components/DailyForecast';
import HourlyForecast from '../components/HourlyForecast';
import './WeatherPage.css';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get('lat');
  const lng = queryParams.get('lng');

  useEffect(() => {
    const fetchWeather = async () => {
      let data;
      if (lat && lng) {
        data = await getFormattedWeatherData({ lat, lon: lng });
      } else {
        data = await getFormattedWeatherData({ q: 'Bhubaneswar' }); // Default location
      }
      setWeatherData(data);
    };
    fetchWeather();
  }, [lat, lng]);

  const handleSearch = () => {
    if (searchTerm) {
      // Fetch weather data for the searched city
      getFormattedWeatherData({ q: searchTerm }).then(data => setWeatherData(data));
    }
  };

  return (
    <div className="weather-page">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search city"
      />
      <button onClick={handleSearch}>Search</button>
      {weatherData && (
        <>
          <div className="current-weather-container">
            <CurrentWeather weather={weatherData.formattedCurrentWeather} />
          </div>
          <div className="daily-forecast-container">
            <DailyForecast forecast={weatherData.formattedForecastWeather.daily} />
          </div>
          <div className="hourly-forecast-container">
            <HourlyForecast forecast={weatherData.formattedForecastWeather.hourly} />
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherPage;
