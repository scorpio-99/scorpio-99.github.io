import {addDays, addMonths, differenceInDays, isSameDay} from 'date-fns';
import {DAY_MILESTONES} from '../../data/constants';

export const createBasicMilestone = (date, milestone) => ({
    date,
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

export const isInTimeWindow = (date, now) => {
    const sixMonthsAgo = addMonths(now, -6);
    const oneYearAhead = addMonths(now, 12);
    return date > sixMonthsAgo && date < oneYearAhead;
};

export const findTodayMilestone = (milestones, now) =>
    milestones.find(m => isSameDay(m.date, now));

export const generateMonthlyMilestones = (anniversary, now) => {
    const monthsToGenerate = 24; // Generate 2 years worth of milestones
    const milestones = [];

    for (let i = 1; i <= monthsToGenerate; i++) {
        const milestoneDate = addMonths(anniversary, i);
        if (!isInTimeWindow(milestoneDate, now)) continue;

        const years = Math.floor(i / 12);
        const months = i % 12;
        milestones.push(createMonthlyMilestone(milestoneDate, years, months));
    }

    return milestones;
};

export const generateDayMilestones = (anniversary, now) => {
    return DAY_MILESTONES
        .map(days => {
            const date = addDays(anniversary, days);
            return isInTimeWindow(date, now) ?
                createBasicMilestone(date, `${days} Days Together`) : null;
        })
        .filter(Boolean);
};

export const calculateDaysBetween = (date1, date2) => {
    return differenceInDays(date2, date1);
}; 