import React from 'react';
import { Gift, ChevronRight } from 'lucide-react';
import styles from './RewardPreview.module.css';

const RewardPreview = ({ rewards }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Gift size={18} className={styles.titleIcon} aria-hidden="true"/> 
        POSSIBLE REWARDS 
      </h2>
      <div className={styles.list}>
        {rewards.map((reward, index) => (
          <div key={index} className={styles.listItem}>
            <div className={styles.iconWrapper}>
              {reward.icon}
            </div>
            <span className={styles.label}>{reward.gridLabel || reward.wheelLabel}</span>
            <ChevronRight size={16} className={styles.arrowIcon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardPreview;
