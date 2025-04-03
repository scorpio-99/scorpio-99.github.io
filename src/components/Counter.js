import React from 'react';
import { useAppContext } from '../context/AppContext';

function Counter() {
    const { timeUnits } = useAppContext();

    return (
        <div className="counter section-spacing">
            <TimeBlock value={Math.abs(timeUnits.days)} label="Days" />
            <TimeBlock value={Math.abs(timeUnits.hours)} label="Hours" />
            <TimeBlock value={Math.abs(timeUnits.minutes)} label="Minutes" />
            <TimeBlock value={Math.abs(timeUnits.seconds)} label="Seconds" />
        </div>
    );
}

// Extracted reusable component
function TimeBlock({ value, label }) {
    return (
        <div className="time-block card hover-grow">
            <div className="number">{value}</div>
            <div className="label">{label}</div>
        </div>
    );
}

export default Counter; 