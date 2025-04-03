import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import data from '../data/data';
import 'leaflet/dist/leaflet.css';

function Places() {
    const mapRef = useRef(null);
    
    useEffect(() => {
        if (!mapRef.current) return;
        
        const map = initializeMap();
        addMapTiles(map);
        addMarkers(map);
        setupMapInteractions(map);
        
        return () => {
            map.remove();
        };
        
        // Helper functions
        function initializeMap() {
            const defaultView = {
                coords: [50.933, 6.950],
                zoom: 7
            };
            
            return L.map(mapRef.current, {
                center: defaultView.coords,
                zoom: defaultView.zoom,
                zoomControl: false,
                scrollWheelZoom: false
            });
        }
        
        function addMapTiles(map) {
            // Add zoom control to top-right
            L.control.zoom({
                position: 'topright'
            }).addTo(map);
            
            // Add a beautiful map style
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19
            }).addTo(map);
        }
        
        function addMarkers(map) {
            // Custom marker icon
            const customIcon = L.icon({
                iconUrl: 'assets/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            
            data.places.forEach(place => {
                const popupContent = createPopupContent(place);
                
                L.marker(place.coordinates, { icon: customIcon })
                    .bindPopup(popupContent, {
                        className: 'custom-popup',
                        maxWidth: 300,
                        minWidth: 200
                    })
                    .addTo(map);
            });
        }
        
        function createPopupContent(place) {
            return `
                <div class="place-popup">
                    <div class="place-name">${place.name}</div>
                    <div class="place-date">${place.date}</div>
                    ${place.description ? `<div class="place-description">${place.description}</div>` : ''}
                </div>
            `;
        }
        
        function setupMapInteractions(map) {
            // Enable scroll zoom only when map is focused
            map.on('click', () => {
                if (!map.scrollWheelZoom.enabled()) {
                    map.scrollWheelZoom.enable();
                }
            });
            
            document.addEventListener('click', (e) => {
                if (!map.getContainer().contains(e.target)) {
                    map.scrollWheelZoom.disable();
                }
            });
        }
    }, []);

    return (
        <div className="our-places card section-spacing">
            <h2>Our Special Places</h2>
            <div id="map" ref={mapRef}></div>
        </div>
    );
}

export default Places; 