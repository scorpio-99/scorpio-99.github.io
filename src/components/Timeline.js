import React, { useEffect, useState, useCallback } from 'react';
import data from '../data/data';
import { TIMELINE_INTERVAL } from '../data/constants';

function Timeline() {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const currentEvent = data.events[currentEventIndex];

    const nextEvent = useCallback(() => {
        setCurrentEventIndex((prevIndex) => (prevIndex + 1) % data.events.length);
    }, []);

    const prevEvent = useCallback(() => {
        setCurrentEventIndex((prevIndex) => 
            (prevIndex - 1 + data.events.length) % data.events.length
        );
    }, []);

    useEffect(() => {
        const interval = setInterval(nextEvent, TIMELINE_INTERVAL);
        return () => clearInterval(interval);
    }, [nextEvent]);

    return (
        <div className="timeline section-spacing">
            <button className="nav-button hover-grow" onClick={prevEvent}>❮</button>
            <div className="timeline-item card hover-grow">
                <div className="date">{currentEvent.date}</div>
                <div className="event">{currentEvent.event}</div>
            </div>
            <button className="nav-button hover-grow" onClick={nextEvent}>❯</button>
        </div>
    );
}

export default Timeline; 