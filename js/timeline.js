let currentEventIndex = 0;

function updateEventDisplay() {
    const currentEvent = events[currentEventIndex];
    document.getElementById('current-date').textContent = currentEvent.date;
    document.getElementById('current-event-text').textContent = currentEvent.event;
    
    const timelineItem = document.getElementById('current-event');
    timelineItem.style.animation = 'none';
    timelineItem.offsetHeight;
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

updateEventDisplay();
setInterval(nextEvent, 5000); 