const specialPlaces = [
    {
        name: "First Date Location",
        date: "24.02.2024",
        coordinates: [51.0311, 7.0155], // Düsseldorf coordinates
        description: "Where it all began..."
    }
];

function initMap() {
    const map = L.map('map').setView([51.0311, 7.0155], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    specialPlaces.forEach(place => {
        L.marker(place.coordinates)
            .bindPopup(`<b>${place.name}</b><br>${place.date}<br>${place.description}`)
            .addTo(map);
    });
}

function displayPlacesList() {
    const container = document.getElementById('places-list');
    container.innerHTML = specialPlaces.map(place => `
        <div class="place-item">
            <h3>${place.name}</h3>
            <div>${place.date}</div>
            <div>${place.description}</div>
        </div>
    `).join('');
}

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    displayPlacesList();
}); 