function initMap() {
    const map = L.map('map').setView([51.0311, 7.0155], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    data.places.forEach(place => {
        L.marker(place.coordinates)
            .bindPopup(`<b>${place.name}</b><br>${place.date}<br>${place.description}`)
            .addTo(map);
    });
}

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});