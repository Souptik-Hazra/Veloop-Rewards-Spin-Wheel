import React from 'react';
import styles from './WheelPointer.module.css';

const WheelPointer = ({ isSpinning }) => {
  return (
    <div className={styles.pointerContainer}>
      <div className={`${styles.pointer} ${isSpinning ? styles.ticking : ''}`}></div>
    </div>
  );
};

export default WheelPointer;
