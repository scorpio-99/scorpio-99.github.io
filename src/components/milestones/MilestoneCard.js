import React from 'react';
import Card from '../common/Card';
import utils from '../../utils/utils';

function MilestoneCard({ label, milestone, days }) {
  if (!milestone) return null;

  return (
    <Card className="milestone" hover>
      <div className="milestone-label">{label}</div>
      <div className="milestone-content">
        <div className="milestone-event">{milestone.milestone}</div>
        <div className="milestone-date">{utils.formatDate(milestone.date)}</div>
        <div className="milestone-days">
          {Math.abs(days)} day{Math.abs(days) === 1 ? '' : 's'}
          {days >= 0 ? ' to go' : ' ago'}
        </div>
      </div>
    </Card>
  );
}

export default MilestoneCard; 