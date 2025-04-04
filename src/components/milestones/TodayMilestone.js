import React from 'react';
import Section from '../common/Section';
import utils from '../../utils/utils';

const TodayMilestone = React.forwardRef(({ milestone }, ref) => (
  <Section card hover className="milestone milestone-celebration" ref={ref}>
    <div className="milestone-label">🎉 Today's Milestone! 🎉</div>
    <div className="milestone-content">
      <div className="milestone-event">{milestone.milestone}</div>
      <div className="milestone-date">{utils.formatDate(milestone.date)}</div>
      <div className="milestone-days">Today is the day!</div>
    </div>
  </Section>
));

export default TodayMilestone; 