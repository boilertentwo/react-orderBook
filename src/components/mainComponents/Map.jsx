// src/GeolocationComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const libraries= ['places', 'marker']

const GeolocationComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_googleMapsApiKey,
    libraries
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (isLoaded && location.latitude && location.longitude && mapRef.current) {
      const map = mapRef.current;
      if (markerRef.current) {
        markerRef.current.map = null;
      }
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: location.latitude, lng: location.longitude },
        map: map,
      });
    }
  }, [isLoaded, location]);

  const mapStyles = {
    height: '100vh',
    width: '100%'
  };

  const defaultCenter = {
    lat: location.latitude || 0,
    lng: location.longitude || 0
  };

  return (
    <div>
      <h1>User Geolocation</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        isLoaded && location.latitude && location.longitude && (
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
            onLoad={map => {
              mapRef.current = map;
            }}
          >
          </GoogleMap>
        )
      )}
    </div>
  );
};

export default GeolocationComponent;
