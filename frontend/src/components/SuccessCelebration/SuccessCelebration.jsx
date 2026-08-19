import React, { useEffect, useState } from 'react';
import styles from './SuccessCelebration.module.css';

const SuccessCelebration = ({ isActive }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isActive) {
      const types = ['goldConfetti', 'purpleConfetti', 'goldStar', 'lightOrb'];
      const newParticles = Array.from({ length: 36 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 92 + 4}%`,
        size: `${Math.random() * 12 + 8}px`,
        delay: `${Math.random() * 0.6}s`,
        duration: `${Math.random() * 1.5 + 2}s`,
        type: types[i % types.length],
        rotate: `${Math.random() * 360}deg`
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className={styles.celebrationContainer}>
      {particles.map(p => (
        <div
          key={p.id}
          className={`${styles.particle} ${styles[p.type]}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            '--initial-rotate': p.rotate
          }}
        >
          {p.type === 'goldStar' && '✦'}
        </div>
      ))}
    </div>
  );
};

export default SuccessCelebration;
