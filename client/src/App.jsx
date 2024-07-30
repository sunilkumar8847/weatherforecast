import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage'
import WeatherPage from './pages/WeatherPage';
import Map from './pages/Map';
import Navbar from './components/Navbar';
import About from './pages/About';

const AppContent = () => {

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<WeatherPage />} />
        <Route path="/map" element={<Map center={{ lat: 20.2961, lng: 85.8189 }} zoom={13} />} />
        <Route path="/about" element={<About />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
