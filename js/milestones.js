const { DateTime, Interval } = luxon;

// Milestone Generation
function generateMilestones() {
    const now = DateTime.now();
    const anniversary = DateTime.fromJSDate(ANNIVERSARY_DATE);
    
    const milestones = [
        createBasicMilestone(anniversary, 'Our Anniversary'),
        ...generateMonthlyMilestones(anniversary, now),
        ...generateDayMilestones(anniversary, now)
    ];

    return milestones.sort((a, b) => a.date - b.date);
}

function generateMonthlyMilestones(anniversary, now) {
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
}

function generateDayMilestones(anniversary, now) {
    const dayMilestones =
        [
            100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
            1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000, 3500, 4000,
            4500, 5000, 6000, 7000, 8000, 9000, 10000, 13000, 15000, 20000
        ];

    return dayMilestones
        .map(days => {
            const date = anniversary.plus({ days });
            return isInTimeWindow(date, now) ? 
                createBasicMilestone(date, `${days} Days Together`) : null;
        })
        .filter(Boolean);
}

// Display Functions
function updateNextMilestone() {
    const milestones = generateMilestones();
    const now = DateTime.now();
    const todayMilestone = findTodayMilestone(milestones, now);
    
    todayMilestone ? 
        showCelebrationMilestone(todayMilestone) : 
        showRegularMilestones(milestones, now);
}

function showCelebrationMilestone(milestone) {
    const container = document.querySelector('.milestones-container');
    container.innerHTML = `
        <div class="milestone milestone-celebration card hover-grow-sm">
            <div class="milestone-label">🎉 Today's Milestone! 🎉</div>
            <div class="milestone-content">
                <div class="milestone-event">${milestone.milestone}</div>
                <div class="milestone-date">${utils.formatDate(milestone.date)}</div>
                <div class="milestone-days">Today is the day!</div>
            </div>
        </div>
    `;
    startCelebration();
}

function showRegularMilestones(milestones, now) {
    const nextMilestone = milestones.find(m => DateTime.fromJSDate(m.date) > now);
    const prevMilestone = [...milestones].reverse().find(m => DateTime.fromJSDate(m.date) <= now);

    updateMilestoneDisplay(nextMilestone, prevMilestone, now);
}

// Helper Functions
const createBasicMilestone = (date, milestone) => ({ 
    date: date.toJSDate(), 
    milestone 
});

function createMonthlyMilestone(date, years, months) {
    let milestone;
    if (years === 0) {
        milestone = `${months} Month${months === 1 ? '' : 's'} Anniversary`;
    } else if (months === 0) {
        milestone = `${years} Year${years === 1 ? '' : 's'} Anniversary`;
    } else {
        milestone = `${years} Year${years === 1 ? '' : 's'} and ${months} Month${months === 1 ? '' : 's'} Anniversary`;
    }
    return createBasicMilestone(date, milestone);
}

const isInTimeWindow = (date, now) => 
    date < now.plus({ months: 12 }) && date > now.minus({ months: 6 });

const findTodayMilestone = (milestones, now) => 
    milestones.find(m => DateTime.fromJSDate(m.date).hasSame(now, 'day'));

function updateMilestoneDisplay(nextMilestone, prevMilestone, now) {
    if (nextMilestone) {
        const daysUntil = Math.ceil(
            Interval.fromDateTimes(now, DateTime.fromJSDate(nextMilestone.date))
            .length('days')
        );
        document.querySelector('#next-milestone .milestone-content').innerHTML = 
            formatMilestone(nextMilestone, daysUntil);
    }

    if (prevMilestone) {
        const daysSince = Math.floor(
            Interval.fromDateTimes(DateTime.fromJSDate(prevMilestone.date), now)
            .length('days')
        );
        document.querySelector('#previous-milestone .milestone-content').innerHTML = 
            formatMilestone(prevMilestone, -daysSince);
    }
}

function formatMilestone(milestone, daysUntil) {
    return `
        <div class="milestone-event">${milestone.milestone}</div>
        <div class="milestone-date">${utils.formatDate(milestone.date)}</div>
        <div class="milestone-days">
            ${Math.abs(daysUntil)} day${Math.abs(daysUntil) === 1 ? '' : 's'} 
            ${daysUntil >= 0 ? 'to go' : 'ago'}
        </div>
    `;
}

// Initialize
updateNextMilestone();
