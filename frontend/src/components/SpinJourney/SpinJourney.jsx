import React from 'react';
import styles from './SpinJourney.module.css';
import { Map, CheckCircle, Circle, Gift, Loader2 } from 'lucide-react';

const SpinJourney = ({ spinsTaken = 0, totalMilestone = 3, onClaimBonus, isClaimingBonus }) => {
  const steps = Array.from({ length: totalMilestone });

  return (
    <div className={styles.journeyContainer}>
      <div className={styles.journeyHeader}>
        <h3 className={styles.journeyTitle}>
          <Map size={16} className={styles.icon} />
          Spin Journey
        </h3>
        <span className={styles.journeyProgress}>{Math.min(spinsTaken, totalMilestone)} / {totalMilestone}</span>
      </div>
      
      <div className={styles.timeline}>
        {steps.map((_, index) => {
          const isCompleted = spinsTaken > index;
          const isCurrent = spinsTaken === index;
          return (
            <React.Fragment key={index}>
              <div className={`${styles.node} ${isCompleted ? styles.completedNode : ''} ${isCurrent ? styles.currentNode : ''}`}>
                {isCompleted ? <CheckCircle size={14} /> : <Circle size={14} />}
                <span className={styles.nodeLabel}>Spin 0{index + 1}</span>
              </div>
              <div className={styles.lineWrapper}>
                <svg preserveAspectRatio="none" viewBox="0 0 100 20" className={styles.waveSvg}>
                  <path d="M0,10 Q25,2 50,10 T100,10" className={styles.wavePathBase} vectorEffect="non-scaling-stroke" />
                  {isCompleted && (
                    <path d="M0,10 Q25,2 50,10 T100,10" className={styles.wavePathActive} vectorEffect="non-scaling-stroke" />
                  )}
                </svg>
              </div>
            </React.Fragment>
          );
        })}
        <div className={`${styles.node} ${styles.bonusNode} ${spinsTaken >= totalMilestone ? styles.bonusAchieved : ''}`}>
          <Gift size={16} />
          <span className={styles.nodeLabel}>Bonus</span>
        </div>
      </div>

      {spinsTaken >= totalMilestone && (
        <div className={styles.bonusUnlockedCard}>
          <div className={styles.bonusGlowBg}></div>
          <div className={styles.bonusIconWrapper}>
            <Gift size={22} className={styles.bonusIcon} />
          </div>
          <div className={styles.bonusTextContent}>
            <h4 className={styles.bonusTitle}>Bonus Spin Unlocked!</h4>
            <p className={styles.bonusDesc}>You've completed the journey. Enjoy your free spin!</p>
          </div>
          <button 
            className={styles.bonusBtn} 
            onClick={onClaimBonus}
            disabled={isClaimingBonus}
          >
            {isClaimingBonus ? <Loader2 size={16} className={styles.spinner} /> : 'Play Now'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SpinJourney;
