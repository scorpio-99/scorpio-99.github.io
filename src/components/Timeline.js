import React, {useEffect, useState} from 'react';
import data, {TIMELINE_INTERVAL} from '../data/data';

function Timeline() {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const currentEvent = data.events[currentEventIndex];

    const nextEvent = () => {
        setCurrentEventIndex((currentEventIndex + 1) % data.events.length);
    };

    const prevEvent = () => {
        setCurrentEventIndex((currentEventIndex - 1 + data.events.length) % data.events.length);
    };

    useEffect(() => {
        const interval = setInterval(nextEvent, TIMELINE_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="timeline section-spacing">
            <button className="nav-button hover-grow" onClick={prevEvent}>❮</button>
            <div className="timeline-item card hover-grow">
                <div className="date" id="current-date">{currentEvent.date}</div>
                <div className="event" id="current-event-text">{currentEvent.event}</div>
            </div>
            <button className="nav-button hover-grow" onClick={nextEvent}>❯</button>
        </div>
    );
}

export default Timeline; 