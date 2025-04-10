import React, { useEffect, useState } from 'react';
import { CELEBRATION_EMOJIS } from '../../data/constants';

const ConfettiAnimation = ({ duration = 5000 }) => {
  const [confetti, setConfetti] = useState([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const initialConfetti = Array.from({ length: 30 }, () => ({
      id: Math.random(),
      emoji: CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${1 + Math.random() * 3}s`,
      animationDelay: `${Math.random() * 2}s`,
      fontSize: `${1 + Math.random() * 2}rem`,
      rotation: `${Math.random() * 360}deg`
    }));
    
    setConfetti(initialConfetti);

    // Set timeout to remove confetti after duration
    const timer = setTimeout(() => {
      setIsActive(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isActive) return null;

  return (
    <div className="confetti-container">
      {confetti.map(item => (
        <div
          key={item.id}
          className="confetti-item"
          style={{
            position: 'absolute',
            left: item.left,
            top: item.top,
            fontSize: item.fontSize,
            transform: `rotate(${item.rotation})`,
            animation: `fall ${item.animationDuration} ease-in-out ${item.animationDelay} infinite`
          }}
        >
          {item.emoji}
        </div>
      ))}
      <style jsx>{`
        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 10;
        }
        
        @keyframes fall {
          0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ConfettiAnimation; 