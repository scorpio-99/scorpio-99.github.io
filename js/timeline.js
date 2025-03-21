let currentEventIndex = 0;

function updateEventDisplay() {
    const currentEvent = data.events[currentEventIndex];
    const elements = {
        date: document.getElementById('current-date'),
        text: document.getElementById('current-event-text')
    };

    elements.date.textContent = currentEvent.date;
    elements.text.textContent = currentEvent.event;
}

function nextEvent() {
    currentEventIndex = (currentEventIndex + 1) % data.events.length;
    updateEventDisplay();
}

function prevEvent() {
    currentEventIndex = (currentEventIndex - 1 + data.events.length) % data.events.length;
    updateEventDisplay();
}

updateEventDisplay();
setInterval(nextEvent, TIMELINE_INTERVAL); 