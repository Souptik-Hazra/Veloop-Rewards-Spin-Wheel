import React, { useEffect, useState } from 'react';
import styles from './SuccessCelebration.module.css';

const SuccessCelebration = ({ isActive }) => {
  const [orbs, setOrbs] = useState([]);

  useEffect(() => {
    if (isActive) {
      // Generate random orbs
      const newOrbs = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 20 + 10}px`,
        delay: `${Math.random() * 1}s`,
        duration: `${Math.random() * 2 + 3}s`,
        type: Math.random() > 0.5 ? 'gold' : 'silver'
      }));
      setOrbs(newOrbs);
    } else {
      setOrbs([]);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className={styles.celebrationContainer}>
      {orbs.map(orb => (
        <div
          key={orb.id}
          className={`${styles.orb} ${styles[orb.type]}`}
          style={{
            left: orb.left,
            width: orb.size,
            height: orb.size,
            animationDelay: orb.delay,
            animationDuration: orb.duration,
          }}
        />
      ))}
    </div>
  );
};

export default SuccessCelebration;
