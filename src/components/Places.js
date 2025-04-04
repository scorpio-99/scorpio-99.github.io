import React from 'react';
import {MapContainer, Marker, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import Card from './common/Card';
import data from '../data/data';


const customIcon = L.icon({
    iconUrl: 'assets/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function Places() {
    return (
        <Card title="Our Special Places" className="our-places">
            <MapContainer
                center={[50.933, 6.950]}
                zoom={7}
                scrollWheelZoom={false}
                id="map"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    maxZoom={19}
                />
                <ZoomControl position="topright"/>

                {data.places.map((place, index) => (
                    <Marker
                        key={index}
                        position={place.coordinates}
                        icon={customIcon}
                    >
                        <Popup maxWidth={300} minWidth={200}>
                            <div className="place-popup">
                                <div className="place-name">{place.name}</div>
                                <div className="place-date">{place.date}</div>
                                {place.description && (
                                    <div className="place-description">{place.description}</div>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Card>
    );
}

export default Places; 