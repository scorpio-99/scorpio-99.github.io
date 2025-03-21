const { DateTime, Interval } = luxon;

function generateMilestones() {
    const milestones = [];
    const now = DateTime.now();
    const anniversary = DateTime.fromJSDate(ANNIVERSARY_DATE);
    
    // Add anniversary start
    milestones.push({
        date: anniversary.toJSDate(),
        milestone: 'Our Anniversary'
    });

    // Calculate current period
    const monthsInterval = Interval.fromDateTimes(anniversary, now);
    const totalMonths = Math.floor(monthsInterval.length('months'));
    const currentPeriod = Math.floor(totalMonths / 12);

    // Generate milestones for current period and next 12 months
    const monthsToGenerate = (currentPeriod + 2) * 12; // Current period + next year
    
    for (let i = 1; i <= monthsToGenerate; i++) {
        const milestoneDate = anniversary.plus({ months: i });
        const months = i;
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        // Skip if milestone is more than 12 months in the future from now
        if (milestoneDate > now.plus({ months: 12 })) continue;
        
        let milestone;
        if (years === 0) {
            milestone = `${months} Month${months === 1 ? '' : 's'} Anniversary`;
        } else if (remainingMonths === 0) {
            milestone = `${years} Year${years === 1 ? '' : 's'} Anniversary`;
        } else {
            milestone = `${years} Year${years === 1 ? '' : 's'} and ${remainingMonths} Month${remainingMonths === 1 ? '' : 's'} Anniversary`;
        }

        milestones.push({
            date: milestoneDate.toJSDate(),
            milestone: milestone
        });
    }

    // Add 100-day milestones that are still in the future or recent past
    [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 15000, 20000].forEach(days => {
        const milestoneDate = anniversary.plus({ days });
        // Only add if within our window of interest
        if (milestoneDate < now.plus({ months: 12 }) && milestoneDate > now.minus({ months: 6 })) {
            milestones.push({
                date: milestoneDate.toJSDate(),
                milestone: `${days} Days Together`
            });
        }
    });

    return milestones.sort((a, b) => a.date - b.date);
}

function formatDate(date) {
    return DateTime.fromJSDate(date).toFormat('dd.MM.yyyy');
}

function formatMilestone(milestone, daysUntil) {
    return `
        <div class="milestone-event">${milestone.milestone}</div>
        <div class="milestone-date">${formatDate(milestone.date)}</div>
        <div class="milestone-days">
            ${Math.abs(daysUntil)} days ${daysUntil >= 0 ? 'to go' : 'ago'}
        </div>
    `;
}

function isSameDayAndMonth(date1, date2) {
    const d1 = DateTime.fromJSDate(date1);
    const d2 = DateTime.fromJSDate(date2);
    return d1.hasSame(d2, 'day');
}

function updateNextMilestone() {
    const milestones = generateMilestones();
    const now = new Date();

    // Check if today is a milestone
    const todayMilestone = milestones.find(m => isSameDayAndMonth(m.date, now));
    
    if (todayMilestone) {
        showCelebrationMilestone(todayMilestone);
    } else {
        showRegularMilestones(milestones);
    }
}

function showCelebrationMilestone(milestone) {
    const container = document.querySelector('.milestones-container');
    container.innerHTML = `
        <div class="milestone milestone-celebration card hover-grow">
            <div class="milestone-label">🎉 Today's Milestone! 🎉</div>
            <div class="milestone-content">
                <div class="milestone-event">${milestone.milestone}</div>
                <div class="milestone-date">${formatDate(milestone.date)}</div>
                <div class="milestone-days">Today is the day!</div>
            </div>
        </div>
    `;
    startCelebration();
}

function showRegularMilestones(milestones) {
    const now = DateTime.now();
    
    const nextMilestone = milestones.find(m => DateTime.fromJSDate(m.date) > now);
    const prevMilestone = [...milestones].reverse().find(m => DateTime.fromJSDate(m.date) <= now);

    if (nextMilestone) {
        const interval = Interval.fromDateTimes(now, DateTime.fromJSDate(nextMilestone.date));
        const daysUntil = Math.ceil(interval.length('days'));
        document.querySelector('#next-milestone .milestone-content').innerHTML = 
            formatMilestone(nextMilestone, daysUntil);
    }

    if (prevMilestone) {
        const interval = Interval.fromDateTimes(DateTime.fromJSDate(prevMilestone.date), now);
        const daysSince = Math.floor(interval.length('days'));
        document.querySelector('#previous-milestone .milestone-content').innerHTML = 
            formatMilestone(prevMilestone, -daysSince);
    }
}

// Update immediately and then every hour
updateNextMilestone();
setInterval(updateNextMilestone, 1000 * 60 * 60);

// Add these functions
function createEmojiConfetti() {
    const emoji = CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)];
    const confetti = document.createElement('div');
    confetti.className = 'emoji-confetti';
    confetti.textContent = emoji;
    
    // Position relative to the milestone card
    const card = document.querySelector('.milestone-celebration');
    const cardRect = card.getBoundingClientRect();
    
    // Random position around the card
    const randomX = cardRect.left + (Math.random() * cardRect.width);
    const randomY = cardRect.top + (Math.random() * cardRect.height);
    
    confetti.style.left = `${randomX}px`;
    confetti.style.top = `${randomY}px`;
    confetti.style.fontSize = (Math.random() * 20 + 20) + 'px';
    
    document.body.appendChild(confetti); // Append to body instead of milestones
    
    setTimeout(() => confetti.remove(), 5000);
}

function startCelebration() {
    // Initial burst
    for (let i = 0; i < 30; i++) {
        setTimeout(createEmojiConfetti, i * 100);
    }
    
    // Continue celebration with fewer emojis
    const celebrationInterval = setInterval(createEmojiConfetti, 200);
    
    // Stop after 5 seconds
    setTimeout(() => clearInterval(celebrationInterval), 5000);
}