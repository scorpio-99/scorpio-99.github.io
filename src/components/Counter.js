import React, {useEffect, useState} from 'react';

import Section from './common/Section';
import {ANNIVERSARY_DATE} from "../data/constants";

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
        <div className="counter">
            <TimeBlock value={Math.abs(timeUnits.days)} label="Days"/>
            <TimeBlock value={Math.abs(timeUnits.hours)} label="Hours"/>
            <TimeBlock value={Math.abs(timeUnits.minutes)} label="Minutes"/>
            <TimeBlock value={Math.abs(timeUnits.seconds)} label="Seconds"/>
        </div>
    );
}

// Extracted reusable component
function TimeBlock({value, label}) {
    return (
        <Section card hover className="time-block">
            <div className="number">{value}</div>
            <div className="label">{label}</div>
        </Section>
    );
}

export default Counter; 