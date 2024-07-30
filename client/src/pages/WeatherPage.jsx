import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getFormattedWeatherData } from "../weatherService";
import CurrentWeather from '../components/CurrentWeather';
import DailyForecast from '../components/DailyForecast';
import HourlyForecast from '../components/HourlyForecast';

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-primary-color">
      <div className="w-full max-w-md md:max-w-4xl">
        <div className='flex flex-col justify-center items-center mx-80'>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search city"
            className="p-2 rounded border border-secondary-color mb-4 w-full text-lg focus:outline-none focus:border-blue-400 focus:shadow-outline"
          />
          <button 
            onClick={handleSearch}
            className="p-2 bg-orange-600 rounded bg-secondary-color text-white text-lg cursor-pointer hover:bg-orange-700 mb-8 w-full">
              Search
          </button>
        </div>
        
        {weatherData && (
          <>
            <div className="w-full mb-4">
              <CurrentWeather weather={weatherData.formattedCurrentWeather} />
            </div>
            <div className="w-full mb-4">
              <HourlyForecast forecast={weatherData.formattedForecastWeather.hourly} />
            </div>
            <div className="w-full mb-4">
              <DailyForecast forecast={weatherData.formattedForecastWeather.daily} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
