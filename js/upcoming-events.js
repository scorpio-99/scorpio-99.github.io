const upcomingEvents = [
    { date: '2024-07-14', event: 'Our 3 Month Anniversary' },
    { date: '2024-08-24', event: '6 Months Since First Date' },
    { date: '2024-11-01', event: '6 Month Anniversary' },
    { date: '2025-05-01', event: '1 Year Anniversary' }
];

function updateNextEvent() {
    const now = new Date();
    const nextEvent = upcomingEvents.find(event => new Date(event.date) > now);
    
    if (nextEvent) {
        const daysUntil = Math.ceil((new Date(nextEvent.date) - now) / (1000 * 60 * 60 * 24));
        document.getElementById('next-event').innerHTML = `
            ${nextEvent.event}<br>
            <small>${daysUntil} days to go</small>
        `;
    }
}

updateNextEvent();
setInterval(updateNextEvent, 1000 * 60 * 60); // Update every hour 