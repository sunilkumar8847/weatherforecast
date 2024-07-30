// src/pages/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to My Weather App</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Get the latest weather updates, forecasts, and more. Click the button below to check the weather in your location or explore the map.
      </p>
      <button
        onClick={handleGetStarted}
        className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
      >
        Get Started
      </button>
    </div>
  );
};

export default WelcomePage;
