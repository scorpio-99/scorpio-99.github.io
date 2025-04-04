import React from 'react';
import Card from '../common/Card';
import utils from '../../utils/utils';

const TodayMilestone = React.forwardRef(({ milestone }, ref) => (
  <Card className="milestone milestone-celebration" ref={ref} hover>
    <div className="milestone-label">🎉 Today's Milestone! 🎉</div>
    <div className="milestone-content">
      <div className="milestone-event">{milestone.milestone}</div>
      <div className="milestone-date">{utils.formatDate(milestone.date)}</div>
      <div className="milestone-days">Today is the day!</div>
    </div>
  </Card>
));

export default TodayMilestone; 