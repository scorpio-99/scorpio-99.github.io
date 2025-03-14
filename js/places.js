function initMap() {
    const map = L.map('map').setView([50.761, 7.431], 7);
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