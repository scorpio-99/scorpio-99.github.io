import React, {useEffect, useState} from 'react';
import {DateTime, Interval} from 'luxon';
import {ANIMATION_SETTINGS, ANNIVERSARY_DATE, CELEBRATION_EMOJIS} from '../data/data';
import utils from '../utils/utils';

function Milestones() {
    const [milestones, setMilestones] = useState([]);
    const [todayMilestone, setTodayMilestone] = useState(null);
    const [nextMilestone, setNextMilestone] = useState(null);
    const [prevMilestone, setPrevMilestone] = useState(null);

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
        date < now.plus({months: 12}) && date > now.minus({months: 6});

    const findTodayMilestone = (milestones, now) =>
        milestones.find(m => DateTime.fromJSDate(m.date).hasSame(now, 'day'));

    // Generate milestones
    const generateMilestones = () => {
        const now = DateTime.now();
        const anniversary = DateTime.fromJSDate(ANNIVERSARY_DATE);

        const monthlyMilestones = generateMonthlyMilestones(anniversary, now);
        const dayMilestones = generateDayMilestones(anniversary, now);

        const allMilestones = [
            createBasicMilestone(anniversary, 'Our Anniversary'),
            ...monthlyMilestones,
            ...dayMilestones
        ];

        return allMilestones.sort((a, b) => a.date - b.date);
    };

    const generateMonthlyMilestones = (anniversary, now) => {
        const currentPeriod = Math.floor(Interval.fromDateTimes(anniversary, now).length('months') / 12);
        const monthsToGenerate = (currentPeriod + 2) * 12;
        const milestones = [];

        for (let i = 1; i <= monthsToGenerate; i++) {
            const milestoneDate = anniversary.plus({months: i});
            if (milestoneDate > now.plus({months: 12})) continue;

            const years = Math.floor(i / 12);
            const months = i % 12;
            milestones.push(createMonthlyMilestone(milestoneDate, years, months));
        }

        return milestones;
    };

    const generateDayMilestones = (anniversary, now) => {
        const dayMilestones = [
            111, 222, 333, 444, 555, 666, 777, 888, 999, 1111,
            100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
            1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000, 3500, 4000,
            4500, 5000, 6000, 7000, 8000, 9000, 10000, 13000, 15000, 20000
        ];

        return dayMilestones
            .map(days => {
                const date = anniversary.plus({days});
                return isInTimeWindow(date, now) ?
                    createBasicMilestone(date, `${days} Days Together`) : null;
            })
            .filter(Boolean);
    };

    // Celebration functions
    const createEmojiConfetti = () => {
        const confetti = utils.createElement('emoji-confetti', utils.createRandomEmoji(CELEBRATION_EMOJIS));

        const card = document.querySelector('.milestone-celebration');
        if (!card) return;

        const cardRect = card.getBoundingClientRect();

        const position = {
            x: cardRect.left + (Math.random() * cardRect.width),
            y: cardRect.top + (Math.random() * cardRect.height)
        };

        Object.assign(confetti.style, {
            left: `${position.x}px`,
            top: `${position.y}px`,
            fontSize: `${Math.random() * 20 + 20}px`
        });

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), ANIMATION_SETTINGS.confettiDuration);
    };

    const startCelebration = () => {
        // Initial burst
        for (let i = 0; i < ANIMATION_SETTINGS.initialBurst; i++) {
            setTimeout(createEmojiConfetti, i * ANIMATION_SETTINGS.burstDelay);
        }

        // Continue celebration
        const celebrationInterval = setInterval(
            createEmojiConfetti,
            ANIMATION_SETTINGS.confettiInterval
        );

        setTimeout(
            () => clearInterval(celebrationInterval),
            ANIMATION_SETTINGS.confettiDuration
        );
    };

    // Format milestone display
    const formatMilestone = (milestone, daysUntil) => {
        return (
            <>
                <div className="milestone-event">{milestone.milestone}</div>
                <div className="milestone-date">{utils.formatDate(milestone.date)}</div>
                <div className="milestone-days">
                    {Math.abs(daysUntil)} day{Math.abs(daysUntil) === 1 ? '' : 's'}
                    {daysUntil >= 0 ? ' to go' : ' ago'}
                </div>
            </>
        );
    };

    // Update milestones
    useEffect(() => {
        const updateMilestones = () => {
            const generatedMilestones = generateMilestones();
            setMilestones(generatedMilestones);

            const now = DateTime.now();
            const today = findTodayMilestone(generatedMilestones, now);
            setTodayMilestone(today);

            if (!today) {
                const next = generatedMilestones.find(m => DateTime.fromJSDate(m.date) > now);
                const prev = [...generatedMilestones].reverse().find(m => DateTime.fromJSDate(m.date) <= now);

                setNextMilestone(next);
                setPrevMilestone(prev);
            }
        };

        updateMilestones();
        // Check for milestones daily
        const interval = setInterval(updateMilestones, 86400000);
        return () => clearInterval(interval);
    }, []);

    // Start celebration if there's a milestone today
    useEffect(() => {
        if (todayMilestone) {
            setTimeout(startCelebration, 500);
        }
    }, [todayMilestone]);

    // Calculate days until/since milestones
    const now = DateTime.now();
    const daysUntilNext = nextMilestone ?
        Math.ceil(Interval.fromDateTimes(now, DateTime.fromJSDate(nextMilestone.date)).length('days')) : 0;

    const daysSincePrev = prevMilestone ?
        Math.floor(Interval.fromDateTimes(DateTime.fromJSDate(prevMilestone.date), now).length('days')) : 0;

    return (
        <div className="milestones section-spacing">
            <div className="milestones-container">
                {todayMilestone ? (
                    <div className="milestone milestone-celebration card hover-grow-sm">
                        <div className="milestone-label">🎉 Today's Milestone! 🎉</div>
                        <div className="milestone-content">
                            <div className="milestone-event">{todayMilestone.milestone}</div>
                            <div className="milestone-date">{utils.formatDate(todayMilestone.date)}</div>
                            <div className="milestone-days">Today is the day!</div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div id="previous-milestone" className="milestone card hover-grow-sm">
                            <div className="milestone-label">Previous</div>
                            <div className="milestone-content">
                                {prevMilestone && formatMilestone(prevMilestone, -daysSincePrev)}
                            </div>
                        </div>
                        <div id="next-milestone" className="milestone card hover-grow-sm">
                            <div className="milestone-label">Next</div>
                            <div className="milestone-content">
                                {nextMilestone && formatMilestone(nextMilestone, daysUntilNext)}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Milestones; 