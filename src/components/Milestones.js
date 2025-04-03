import React, { useEffect, useState, useRef } from 'react';
import { DateTime, Interval } from 'luxon';
import { ANNIVERSARY_DATE, DAY_MILESTONES } from '../data/constants';
import { useAppContext } from '../context/AppContext';
import utils from '../utils/utils';

function Milestones() {
    const { getCurrentDate, startCelebration } = useAppContext();
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

    // Helper functions
    const createBasicMilestone = (date, milestone) => ({ 
        date: date.toJSDate(), 
        milestone 
    });

    const createMonthlyMilestone = (date, years, months) => {
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

    const isInTimeWindow = (date, now) => 
        date < now.plus({ months: 12 }) && date > now.minus({ months: 6 });

    const findTodayMilestone = (milestones, now) => 
        milestones.find(m => utils.isSameDay(m.date, now.toJSDate()));

    const generateMonthlyMilestones = (anniversary, now) => {
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

    const generateDayMilestones = (anniversary, now) => {
        return DAY_MILESTONES
            .map(days => {
                const date = anniversary.plus({ days });
                return isInTimeWindow(date, now) ? 
                    createBasicMilestone(date, `${days} Days Together`) : null;
            })
            .filter(Boolean);
    };

    // Calculate days until/since milestones
    const now = getCurrentDate();
    const daysUntilNext = nextMilestone ? 
        utils.calculateDaysBetween(now.toJSDate(), nextMilestone.date) : 0;
    
    const daysSincePrev = prevMilestone ? 
        utils.calculateDaysBetween(prevMilestone.date, now.toJSDate()) : 0;

    return (
        <div className="milestones section-spacing">
            <div className="milestones-container">
                {todayMilestone ? (
                    <TodayMilestone milestone={todayMilestone} ref={celebrationRef} />
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

// Extracted components for better organization
const TodayMilestone = React.forwardRef(({ milestone }, ref) => (
    <div className="milestone milestone-celebration card hover-grow-sm" ref={ref}>
        <div className="milestone-label">🎉 Today's Milestone! 🎉</div>
        <div className="milestone-content">
            <div className="milestone-event">{milestone.milestone}</div>
            <div className="milestone-date">{utils.formatDate(milestone.date)}</div>
            <div className="milestone-days">Today is the day!</div>
        </div>
    </div>
));

const MilestoneCard = ({ label, milestone, days }) => {
    if (!milestone) return null;
    
    return (
        <div className="milestone card hover-grow-sm">
            <div className="milestone-label">{label}</div>
            <div className="milestone-content">
                <div className="milestone-event">{milestone.milestone}</div>
                <div className="milestone-date">{utils.formatDate(milestone.date)}</div>
                <div className="milestone-days">
                    {Math.abs(days)} day{Math.abs(days) === 1 ? '' : 's'} 
                    {days >= 0 ? ' to go' : ' ago'}
                </div>
            </div>
        </div>
    );
};

export default Milestones; 