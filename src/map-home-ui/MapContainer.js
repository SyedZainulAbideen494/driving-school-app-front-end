import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    // Fetch driving school data from your API or backend
    axios.get('http://localhost:8080/api/driving-schools')
      .then(response => {
        setSchools(response.data);
      })
      .catch(error => {
        console.error('Error fetching driving schools:', error);
      });
  }, []);

  // Custom icon for markers
  const schoolIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={[37.7749, -122.4194]} // Default center (San Francisco)
      zoom={13}
      style={{ width: '100%', height: '400px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {schools.map(school => (
        <Marker
          key={school.id}
          position={[school.lat, school.lng]}
          icon={schoolIcon}
        >
          <Popup>
            {school.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;