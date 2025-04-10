import React, { useEffect, useState } from 'react';
import Section from '../common/Section';
import {format} from 'date-fns';
import {DATE_FORMAT} from '../../data/constants'
import ConfettiAnimation from './ConfettiAnimation';

const TodayMilestone = ({milestone}) => {
    const [showConfetti, setShowConfetti] = useState(true);

    // Reset confetti when milestone changes
    useEffect(() => {
        setShowConfetti(true);
    }, [milestone]);

    return (
        <Section card hover className="milestone milestone-celebration">
            {showConfetti && <ConfettiAnimation />}
            <div className="milestone-container">
                <div className="milestone-label">🎉 Today's Milestone! 🎉</div>
                <div className="milestone-content">
                    <div className="milestone-event">{milestone.milestone}</div>
                    <div className="milestone-date">{format(milestone.date, DATE_FORMAT)}</div>
                    <div className="milestone-days">Today is the day!</div>
                </div>
            </div>
        </Section>
    );
};

export default TodayMilestone; 