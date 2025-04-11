import React, { useEffect, useState } from 'react';
import { CELEBRATION_EMOJIS } from '../../data/constants';

const ConfettiAnimation = ({ duration = 5000 }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const initialConfetti = Array.from({ length: 50 }, () => ({
      id: Math.random(),
      emoji: CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
      left: `${Math.random() * 100}%`,
      animationDuration: `${1 + Math.random() * 3}s`,
      fontSize: `${0.75 + Math.random() * 1.5}rem`,
      rotation: `${Math.random() * 360}deg`
    }));

    setConfetti(initialConfetti);
  }, [duration]);

  return (
    <div className="confetti-container">
      {confetti.map(item => (
        <div
          key={item.id}
          className="confetti-item"
          style={{
            position: 'absolute',
            left: item.left,
            top: 0,
            fontSize: `${0.75 + Math.random() * 1.5}rem`,
            transform: `rotate(${item.rotation})`,
            animation: `fall ${item.animationDuration} ease-in-out infinite`
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};

export default ConfettiAnimation; 