import React, {createContext, useContext, useEffect, useState} from 'react';
import {DateTime} from 'luxon';
import {ANIMATION_SETTINGS, ANNIVERSARY_DATE, CELEBRATION_EMOJIS} from '../data/constants';
import utils from '../utils/utils';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({children}) => {
    // Shared state
    const [timeUnits, setTimeUnits] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Update counter
    useEffect(() => {
        const updateCounter = () => {
            const now = new Date();
            const timeDifference = now - ANNIVERSARY_DATE;

            setTimeUnits({
                days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
            });
        };

        updateCounter();
        const interval = setInterval(updateCounter, 1000);
        return () => clearInterval(interval);
    }, []);

    // Shared animation functions
    const createEmojiConfetti = (element) => {
        if (!element) return;

        const confetti = utils.createElement('emoji-confetti', utils.createRandomEmoji(CELEBRATION_EMOJIS));
        const elementRect = element.getBoundingClientRect();

        const position = {
            x: elementRect.left + (Math.random() * elementRect.width),
            y: elementRect.top + (Math.random() * elementRect.height)
        };

        Object.assign(confetti.style, {
            left: `${position.x}px`,
            top: `${position.y}px`,
            fontSize: `${Math.random() * 20 + 20}px`
        });

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), ANIMATION_SETTINGS.confettiDuration);
    };

    const startCelebration = (element) => {
        // Initial burst
        for (let i = 0; i < ANIMATION_SETTINGS.initialBurst; i++) {
            setTimeout(() => createEmojiConfetti(element), i * ANIMATION_SETTINGS.burstDelay);
        }

        // Continue celebration
        const celebrationInterval = setInterval(
            () => createEmojiConfetti(element),
            ANIMATION_SETTINGS.confettiInterval
        );

        setTimeout(
            () => clearInterval(celebrationInterval),
            ANIMATION_SETTINGS.confettiDuration
        );
    };

    // Current date helper
    const getCurrentDate = () => DateTime.now();

    return (
        <AppContext.Provider value={{
            timeUnits,
            startCelebration,
            getCurrentDate
        }}>
            {children}
        </AppContext.Provider>
    );
}; 