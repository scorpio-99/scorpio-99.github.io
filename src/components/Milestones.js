import React, {useEffect, useRef, useState} from 'react';
import {DateTime, Interval} from 'luxon';

import {useAppContext} from '../context/AppContext';
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
    const {getCurrentDate, startCelebration} = useAppContext();
    const [milestones, setMilestones] = useState([]);
    const [todayMilestone, setTodayMilestone] = useState(null);
    const [nextMilestone, setNextMilestone] = useState(null);
    const [prevMilestone, setPrevMilestone] = useState(null);
    const celebrationRef = useRef(null);

    // Generate milestones
    useEffect(() => {
        const updateMilestones = () => {
            const now = getCurrentDate();
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
        // Check for milestones daily
        const interval = setInterval(updateMilestones, 86400000);
        return () => clearInterval(interval);
    }, [getCurrentDate]);

    // Start celebration if there's a milestone today
    useEffect(() => {
        if (todayMilestone && celebrationRef.current) {
            setTimeout(() => startCelebration(celebrationRef.current), 500);
        }
    }, [todayMilestone, startCelebration]);

    // Calculate days until/since milestones
    const now = getCurrentDate();
    const daysUntilNext = nextMilestone ?
        utils.calculateDaysBetween(now.toJSDate(), nextMilestone.date) : 0;

    const daysSincePrev = prevMilestone ?
        utils.calculateDaysBetween(prevMilestone.date, now.toJSDate()) : 0;

    return (
        <div className="milestones">
            <div className="milestones-container">
                {todayMilestone ? (
                    <TodayMilestone milestone={todayMilestone} ref={celebrationRef}/>
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