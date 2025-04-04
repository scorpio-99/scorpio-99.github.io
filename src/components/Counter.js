import React from 'react';

import {useAppContext} from '../context/AppContext';
import Section from './common/Section';

function Counter() {
    const {timeUnits} = useAppContext();

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