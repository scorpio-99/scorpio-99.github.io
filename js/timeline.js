const events = [
    { date: '14.02.2024', event: 'Match-Day' },
    { date: '24.02.2024', event: 'First Date' },
    { date: '22.03.2024', event: 'Autokino' },
    { date: '02.03.2024', event: 'Roermond' },
    { date: '30.03.2024', event: 'Kirmes' },
    { date: '12.04.2024', event: 'Holding Hands' },
    { date: '19.04.2024', event: 'Pottery in Düsseldorf' },
    { date: '25.04.2024', event: 'Disney in Concert + 1st Kiss' },
    { date: '29.04.2024 - 01.05.2024', event: 'Como Trip' },
    { date: '01.05.2024', event: 'Anniversary' },
    { date: '17.05.2024', event: '"I Love You"' },
    { date: '29.06.2024', event: '❤' },
    { date: '???', event: 'Proposal' }
];

let currentEventIndex = 0;

function updateEventDisplay() {
    const currentEvent = events[currentEventIndex];
    document.getElementById('current-date').textContent = currentEvent.date;
    document.getElementById('current-event-text').textContent = currentEvent.event;
    
    // Reset animation
    const timelineItem = document.getElementById('current-event');
    timelineItem.style.animation = 'none';
    timelineItem.offsetHeight; // Trigger reflow
    timelineItem.style.animation = null;
}

function nextEvent() {
    currentEventIndex = (currentEventIndex + 1) % events.length;
    updateEventDisplay();
}

function prevEvent() {
    currentEventIndex = (currentEventIndex - 1 + events.length) % events.length;
    updateEventDisplay();
}

// Initialize the first event
updateEventDisplay();

// Auto-advance every 5 seconds
setInterval(nextEvent, 5000); 