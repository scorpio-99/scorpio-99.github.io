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
        <div class="milestone-event">${milestone.milestone}</div>
        <div class="milestone-date">${formatDate(milestone.date)}</div>
        <div class="milestone-days">
            ${Math.abs(daysUntil)} days ${daysUntil >= 0 ? 'to go' : 'ago'}
        </div>
    `;
}

function isSameDayAndMonth(date1, date2) {
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth();
}

function updateNextMilestone() {
    const milestones = generateMilestones();
    const now = new Date();

    // Check if today is a milestone
    const todayMilestone = milestones.find(m => isSameDayAndMonth(m.date, now));
    
    if (todayMilestone) {
        // Today is a milestone! Show celebration mode
        const container = document.querySelector('.milestones-container');
        container.innerHTML = `
            <div class="milestone milestone-celebration card hover-grow">
                <div class="milestone-label">🎉 Today's Milestone! 🎉</div>
                <div class="milestone-content">
                    <div class="milestone-event">${todayMilestone.milestone}</div>
                    <div class="milestone-date">${formatDate(todayMilestone.date)}</div>
                    <div class="milestone-days">Today is the day!</div>
                </div>
            </div>
        `;
        
        // Start the celebration effect
        startCelebration();
    } else {
        // Not a milestone day, show regular previous/next view
        const nextMilestone = milestones.find(m => m.date > now);
        const prevMilestone = milestones.reverse().find(m => m.date <= now);

        if (nextMilestone) {
            const daysUntil = Math.ceil((nextMilestone.date - now) / (1000 * 60 * 60 * 24));
            document.querySelector('#next-milestone .milestone-content').innerHTML = 
                formatMilestone(nextMilestone, daysUntil);
        }

        if (prevMilestone) {
            const daysSince = Math.floor((now - prevMilestone.date) / (1000 * 60 * 60 * 24));
            document.querySelector('#previous-milestone .milestone-content').innerHTML = 
                formatMilestone(prevMilestone, -daysSince);
        }
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