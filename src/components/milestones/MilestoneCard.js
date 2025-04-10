import React from 'react';
import {format} from 'date-fns';
import Section from '../common/Section';
import {DATE_FORMAT} from '../../data/constants'

function MilestoneCard({label, milestone, days}) {
    if (!milestone) return null;

    const getDaysText = () => {
        const absDays = Math.abs(days);
        return `${absDays} day${absDays === 1 ? '' : 's'} ${days >= 0 ? 'to go' : 'ago'}`;
    };

    return (
        <Section card hover className="milestone">
            <div className="milestone-label">{label}</div>
            <div className="milestone-content">
                <div className="milestone-event">{milestone.milestone}</div>
                <div className="milestone-date">{format(milestone.date, DATE_FORMAT)}</div>
                <div className="milestone-days">{getDaysText()}</div>
            </div>
        </Section>
    );
}

export default MilestoneCard; 