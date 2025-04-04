import React, { useEffect, useRef } from 'react';
import Section from '../common/Section';
import utils from '../../utils/utils';
import { CELEBRATION_EMOJIS, ANIMATION_SETTINGS } from '../../data/constants';

const TodayMilestone = React.forwardRef(({ milestone }, ref) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Initial burst of confetti
    for (let i = 0; i < ANIMATION_SETTINGS.initialBurst; i++) {
      setTimeout(() => createConfetti(container), i * ANIMATION_SETTINGS.burstDelay);
    }
    
    // Continue with periodic confetti
    const interval = setInterval(() => {
      createConfetti(container);
    }, ANIMATION_SETTINGS.confettiInterval);
    
    // Clean up
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, ANIMATION_SETTINGS.confettiDuration);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  
  const createConfetti = (container) => {
    const emoji = document.createElement('div');
    emoji.className = 'emoji-confetti';
    emoji.textContent = CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)];
    
    // Random position
    const left = Math.random() * 100;
    emoji.style.left = `${left}%`;
    
    // Random size
    const size = 0.8 + Math.random() * 1.5;
    emoji.style.fontSize = `${size}rem`;
    
    // Random animation duration
    const duration = 4 + Math.random() * 4;
    emoji.style.animationDuration = `${duration}s`;
    
    container.appendChild(emoji);
    
    // Remove after animation completes
    setTimeout(() => {
      if (emoji.parentNode === container) {
        container.removeChild(emoji);
      }
    }, duration * 1000);
  };
  
  return (
    <Section card hover className="milestone milestone-celebration" ref={ref}>
      <div className="milestone-container" ref={containerRef}>
        <div className="milestone-label">🎉 Today's Milestone! 🎉</div>
        <div className="milestone-content">
          <div className="milestone-event">{milestone.milestone}</div>
          <div className="milestone-date">{utils.formatDate(milestone.date)}</div>
          <div className="milestone-days">Today is the day!</div>
        </div>
      </div>
    </Section>
  );
});

export default TodayMilestone; 