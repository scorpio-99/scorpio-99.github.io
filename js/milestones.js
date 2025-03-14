// ToDo: when milestone => different layout + animation

function generateMilestones() {
    const milestones = [];

    // Generate monthly milestones for the first year
    for (let i = 1; i <= 12; i++) {
        const monthMilestone = new Date(ANNIVERSARY_DATE);
        monthMilestone.setMonth(ANNIVERSARY_DATE.getMonth() + i);

        milestones.push({
            date: monthMilestone,
            milestone: i === 12 ? '1 Year Anniversary' : `${i} Month${i === 1 ? '' : 's'} Anniversary`
        });
    }

    // Generate 100-day milestones for the first year
    for (let i = 1; i <= 3; i++) {
        const dayMilestone = new Date(ANNIVERSARY_DATE);
        dayMilestone.setDate(ANNIVERSARY_DATE.getDate() + (i * 100));

        milestones.push({
            date: dayMilestone,
            milestone: `${i * 100} Days Together`
        });
    }

    // Generate yearly milestones up to 100 years
    for (let i = 2; i <= 100; i++) {
        const yearMilestone = new Date(ANNIVERSARY_DATE);
        yearMilestone.setFullYear(ANNIVERSARY_DATE.getFullYear() + i);

        milestones.push({
            date: yearMilestone,
            milestone: `${i} Year${i === 1 ? '' : 's'} Anniversary`
        });
    }

    // Add the anniversary start date
    milestones.push({
        date: new Date(ANNIVERSARY_DATE),
        milestone: 'Our Anniversary'
    });

    // Sort milestones by date
    return milestones.sort((a, b) => a.date - b.date);
}

function formatDate(date) {
    return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function formatMilestone(milestone, daysUntil) {
    return `
        ${milestone.milestone}<br>
        <small>${Math.abs(daysUntil)} days ${daysUntil >= 0 ? 'to go' : 'ago'}</small><br>
        <small>(${formatDate(milestone.date)})</small>
    `;
}

function updateNextMilestone() {
    const milestones = generateMilestones();
    const now = new Date();

    // Find the next and previous milestones
    const nextMilestone = milestones.find(m => m.date > now);
    const prevMilestone = milestones.reverse().find(m => m.date <= now);

    if (nextMilestone) {
        const daysUntil = Math.ceil((nextMilestone.date - now) / (1000 * 60 * 60 * 24));
        document.querySelector('#next-milestone .milestone-content').innerHTML = formatMilestone(nextMilestone, daysUntil);
    }

    if (prevMilestone) {
        const daysSince = Math.floor((now - prevMilestone.date) / (1000 * 60 * 60 * 24));
        document.querySelector('#previous-milestone .milestone-content').innerHTML = formatMilestone(prevMilestone, -daysSince);
    }
}

// Update immediately and then every hour
updateNextMilestone();
setInterval(updateNextMilestone, 1000 * 60 * 60);