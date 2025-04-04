import React from 'react';
import Section from '../common/Section';
import utils from '../../utils/utils';

function MilestoneCard({ label, milestone, days }) {
  if (!milestone) return null;

  return (
    <Section card hover className="milestone">
      <div className="milestone-label">{label}</div>
      <div className="milestone-content">
        <div className="milestone-event">{milestone.milestone}</div>
        <div className="milestone-date">{utils.formatDate(milestone.date)}</div>
        <div className="milestone-days">
          {Math.abs(days)} day{Math.abs(days) === 1 ? '' : 's'}
          {days >= 0 ? ' to go' : ' ago'}
        </div>
      </div>
    </Section>
  );
}

export default MilestoneCard; 