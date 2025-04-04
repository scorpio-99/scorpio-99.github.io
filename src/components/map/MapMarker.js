import React from 'react';
import { Marker, Popup } from 'react-leaflet';

function MapMarker({ place, icon }) {
  return (
    <Marker
      position={place.coordinates}
      icon={icon}
    >
      <Popup maxWidth={300} minWidth={200}>
        <div className="place-popup">
          <div className="place-name">{place.name}</div>
          <div className="place-date">{place.date}</div>
          {place.description && (
            <div className="place-description" 
                 dangerouslySetInnerHTML={{ __html: place.description }} />
          )}
        </div>
      </Popup>
    </Marker>
  );
}

export default MapMarker; 