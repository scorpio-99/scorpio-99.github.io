function initMap() {
    const defaultView = {
        coords: [50.933, 6.950],
        zoom: 7
    };

    // Create map with custom options
    const map = L.map('map', {
        center: defaultView.coords,
        zoom: defaultView.zoom,
        zoomControl: false,
        scrollWheelZoom: false
    });
    
    // Add zoom control to top-right
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // Add a beautiful map style
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
    }).addTo(map);
    
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
        const popupContent = `
            <div class="place-popup">
                <div class="place-name">${place.name}</div>
                <div class="place-date">${place.date}</div>
                ${place.description ? `<div class="place-description">${place.description}</div>` : ''}
            </div>
        `;

        L.marker(place.coordinates, { icon: customIcon })
            .bindPopup(popupContent, {
                className: 'custom-popup',
                maxWidth: 300,
                minWidth: 200
            })
            .addTo(map);
    });

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

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', initMap);