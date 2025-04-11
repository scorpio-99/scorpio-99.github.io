import React, { useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import MapMarker from './MapMarker';

const customIcon = L.icon({
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapUpdater({ selectedPlace }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace) {
      map.flyTo(selectedPlace.coordinates, 12, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [selectedPlace, map]);

  return null;
}

function Map({ places, center, zoom, onMarkerClick, selectedPlace }) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      id="map"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        maxZoom={19}
      />
      <ZoomControl position="topright" />
      <MapUpdater selectedPlace={selectedPlace} />

      {places.map((place, index) => (
        <MapMarker 
          key={index}
          place={place}
          icon={customIcon}
          onMarkerClick={() => onMarkerClick(place)}
          isSelected={selectedPlace === place}
        />
      ))}
    </MapContainer>
  );
}

export default Map; 