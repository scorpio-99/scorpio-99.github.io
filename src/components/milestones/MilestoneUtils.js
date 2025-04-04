import { Interval } from 'luxon';
import utils from '../../utils/utils';
import { DAY_MILESTONES } from '../../data/constants';

export const createBasicMilestone = (date, milestone) => ({
  date: date.toJSDate(),
  milestone
});

export const createMonthlyMilestone = (date, years, months) => {
  let milestone;
  if (years === 0) {
    milestone = `${months} Month${months === 1 ? '' : 's'} Anniversary`;
  } else if (months === 0) {
    milestone = `${years} Year${years === 1 ? '' : 's'} Anniversary`;
  } else {
    milestone = `${years} Year${years === 1 ? '' : 's'} and ${months} Month${months === 1 ? '' : 's'} Anniversary`;
  }
  return createBasicMilestone(date, milestone);
};

export const isInTimeWindow = (date, now) =>
  date < now.plus({ months: 12 }) && date > now.minus({ months: 6 });

export const findTodayMilestone = (milestones, now) =>
  milestones.find(m => utils.isSameDay(m.date, now.toJSDate()));

export const generateMonthlyMilestones = (anniversary, now) => {
  const currentPeriod = Math.floor(Interval.fromDateTimes(anniversary, now).length('months') / 12);
  const monthsToGenerate = (currentPeriod + 2) * 12;
  const milestones = [];

  for (let i = 1; i <= monthsToGenerate; i++) {
    const milestoneDate = anniversary.plus({ months: i });
    if (milestoneDate > now.plus({ months: 12 })) continue;

    const years = Math.floor(i / 12);
    const months = i % 12;
    milestones.push(createMonthlyMilestone(milestoneDate, years, months));
  }

  return milestones;
};

export const generateDayMilestones = (anniversary, now) => {
  return DAY_MILESTONES
    .map(days => {
      const date = anniversary.plus({ days });
      return isInTimeWindow(date, now) ?
        createBasicMilestone(date, `${days} Days Together`) : null;
    })
    .filter(Boolean);
}; 