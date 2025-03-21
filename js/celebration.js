function createEmojiConfetti() {
    const confetti = utils.createElement('emoji-confetti', utils.createRandomEmoji());
    
    const card = document.querySelector('.milestone-celebration');
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
}

function startCelebration() {
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
} 