import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import Map from './pages/Map';
import Navbar from './components/Navbar';
import About from './pages/About';
import Signup from './pages/Signup';
import Login from './pages/Login';

const AppContent = () => {
  const location = useLocation();
  const shouldHideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<WeatherPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<Map center={{ lat: 20.2961, lng: 85.8189 }} zoom={13} />} />
        <Route path="/about" element={<About />} />
        <Route path="/weather" element={<WeatherPage />} /> {/* Updated route to handle weather page */}
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
