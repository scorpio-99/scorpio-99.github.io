import React from 'react';
import Section from '../common/Section';
import {format} from 'date-fns';

const TodayMilestone = ({milestone}) => {
    return (
        <Section card hover className="milestone milestone-celebration">
            <div className="milestone-container">
                <div className="milestone-label">🎉 Today's Milestone! 🎉</div>
                <div className="milestone-content">
                    <div className="milestone-event">{milestone.milestone}</div>
                    <div className="milestone-date">{format(milestone.date, 'MMMM d, yyyy')}</div>
                    <div className="milestone-days">Today is the day!</div>
                </div>
            </div>
        </Section>
    );
};

export default TodayMilestone; 