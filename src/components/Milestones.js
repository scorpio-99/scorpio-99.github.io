import React, {useEffect, useState} from 'react';
import {DateTime} from 'luxon';

import utils from '../utils/utils';
import {ANNIVERSARY_DATE} from '../data/constants';
import TodayMilestone from './milestones/TodayMilestone';
import MilestoneCard from './milestones/MilestoneCard';
import { 
    findTodayMilestone, 
    generateMonthlyMilestones, 
    generateDayMilestones 
} from './milestones/MilestoneUtils';

function Milestones() {
    const [milestones, setMilestones] = useState([]);
    const [todayMilestone, setTodayMilestone] = useState(null);
    const [nextMilestone, setNextMilestone] = useState(null);
    const [prevMilestone, setPrevMilestone] = useState(null);

    // Generate milestones
    useEffect(() => {
        const updateMilestones = () => {
            const now = DateTime.now();
            const anniversary = DateTime.fromJSDate(ANNIVERSARY_DATE);

            // Generate all milestones
            const allMilestones = [
                ...generateMonthlyMilestones(anniversary, now),
                ...generateDayMilestones(anniversary, now)
            ].sort((a, b) => a.date - b.date);

            setMilestones(allMilestones);

            // Find today's milestone if any
            const today = findTodayMilestone(allMilestones, now);
            setTodayMilestone(today);

            // If no milestone today, find next and previous
            if (!today) {
                const next = allMilestones.find(m => DateTime.fromJSDate(m.date) > now);
                const prev = [...allMilestones].reverse().find(m => DateTime.fromJSDate(m.date) <= now);

                setNextMilestone(next);
                setPrevMilestone(prev);
            }
        };

        updateMilestones();
    }, []);

    // Get current date for calculations
    const currentDate = DateTime.now();

    // Calculate days until/since milestones
    const daysUntilNext = nextMilestone ?
        utils.calculateDaysBetween(currentDate.toJSDate(), nextMilestone.date) : 0;

    const daysSincePrev = prevMilestone ?
        utils.calculateDaysBetween(prevMilestone.date, currentDate.toJSDate()) : 0;

    return (
        <div className="milestones">
            <div className="milestones-container">
                {todayMilestone ? (
                    <TodayMilestone milestone={todayMilestone}/>
                ) : (
                    <>
                        <MilestoneCard
                            label="Previous"
                            milestone={prevMilestone}
                            days={-daysSincePrev}
                        />
                        <MilestoneCard
                            label="Next"
                            milestone={nextMilestone}
                            days={daysUntilNext}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default Milestones; 