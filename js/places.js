function initMap() {
    const defaultView = {
        coords: [50.933, 6.950],
        zoom: 7
    };

    const map = L.map('map').setView(defaultView.coords, defaultView.zoom);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    data.places.forEach(place => {
        const popupContent = `
            <div class="place-name">${place.name}</div>
            <div class="place-date">${place.date}
            ${place.description ? `<div class="place-description">${place.description}` : ''}
        `;

        L.marker(place.coordinates)
            .bindPopup(popupContent)
            .addTo(map);
    });
}

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});