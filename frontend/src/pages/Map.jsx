import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

const Map = ({ center, zoom }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng);
        setShowButton(true);
      }
    });
    return null;
  };

  const handleCheckWeather = () => {
    if (markerPosition) {
      navigate(`/weather?lat=${markerPosition.lat}&lng=${markerPosition.lng}`);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>
              <div>
                <strong>Location:</strong> {markerPosition.lat.toFixed(4)}, {markerPosition.lng.toFixed(4)}
                {showButton && (
                  <div>
                    <button
                      onClick={handleCheckWeather}
                      style={{
                        marginTop: '10px',
                        padding: '5px 10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Check Weather
                    </button>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )}
        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default Map;
