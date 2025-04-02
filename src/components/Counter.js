import React, {useEffect, useState} from 'react';
import {ANNIVERSARY_DATE} from '../data/data';

function Counter() {
    const [timeUnits, setTimeUnits] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const updateCounter = () => {
            const now = new Date();
            const timeDifference = now - ANNIVERSARY_DATE;

            setTimeUnits({
                days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
            });
        };

        updateCounter();
        const interval = setInterval(updateCounter, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="counter section-spacing">
            <div className="time-block card hover-grow">
                <div className="number" id="days">{Math.abs(timeUnits.days)}</div>
                <div className="label">Days</div>
            </div>
            <div className="time-block card hover-grow">
                <div className="number" id="hours">{Math.abs(timeUnits.hours)}</div>
                <div className="label">Hours</div>
            </div>
            <div className="time-block card hover-grow">
                <div className="number" id="minutes">{Math.abs(timeUnits.minutes)}</div>
                <div className="label">Minutes</div>
            </div>
            <div className="time-block card hover-grow">
                <div className="number" id="seconds">{Math.abs(timeUnits.seconds)}</div>
                <div className="label">Seconds</div>
            </div>
        </div>
    );
}

export default Counter; 