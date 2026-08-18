import React from 'react';
import styles from './SpinLoader.module.css';

const SpinLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderBox}>
        <div className={styles.dotsWrapper}>
          <div className={`${styles.dot} ${styles.dot1}`}></div>
          <div className={`${styles.dot} ${styles.dot2}`}></div>
          <div className={`${styles.dot} ${styles.dot3}`}></div>
          <div className={`${styles.dot} ${styles.dot4}`}></div>
        </div>
        <span className={styles.loaderText}>Spinning...</span>
      </div>
    </div>
  );
};

export default SpinLoader;
