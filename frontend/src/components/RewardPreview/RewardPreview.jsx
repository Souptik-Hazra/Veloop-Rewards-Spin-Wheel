import React from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { Gift } from 'lucide-react';

const RewardPreview = ({ rewards, styles }) => {
  return (
    <div className={styles.fullWidthWidget}>
      <h2 className={styles.widgetTitle}>
        <Gift size={20} className={styles.logoIcon} aria-hidden="true"/> 
        Possible Rewards 
        <Tooltip id="tooltip-rewards" text="A preview of the rewards you can unlock by spinning the wheel." />
      </h2>
      <div className={styles.rewardPreviewGrid}>
        {rewards.map((reward, index) => (
          <div key={index} className={styles.previewCard}>
            <div className={styles.previewIcon}>
              {reward.icon}
            </div>
            <span className={styles.previewLabel}>{reward.gridLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardPreview;
