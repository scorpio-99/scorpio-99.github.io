import React, {useEffect, useState} from 'react';
import data from '../data/data.json';
import TodayMilestone from './milestones/TodayMilestone';
import MilestoneCard from './milestones/MilestoneCard';
import {
    calculateDaysBetween,
    findTodayMilestone,
    generateDayMilestones,
    generateMonthlyMilestones
} from './milestones/MilestoneUtils';

function Milestones() {
    const [milestones, setMilestones] = useState([]);
    const [todayMilestone, setTodayMilestone] = useState(null);
    const [nextMilestone, setNextMilestone] = useState(null);
    const [prevMilestone, setPrevMilestone] = useState(null);

    useEffect(() => {
        const updateMilestones = () => {
            const now = new Date();
            const anniversary = new Date(data.anniversaryDate);

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
                const next = allMilestones.find(m => m.date > now);
                const prev = [...allMilestones].reverse().find(m => m.date <= now);

                setNextMilestone(next);
                setPrevMilestone(prev);
            }
        };

        updateMilestones();
    }, []);

    // Calculate days until/since milestones
    const daysUntilNext = nextMilestone ? calculateDaysBetween(new Date(), nextMilestone.date) : 0;
    const daysSincePrev = prevMilestone ? calculateDaysBetween(prevMilestone.date, new Date()) : 0;

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