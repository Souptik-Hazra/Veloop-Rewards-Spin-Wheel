import React from 'react';
import styles from './SpinJourney.module.css';
import { Compass, Check, Gift, Sparkles, Loader2 } from 'lucide-react';

const SpinJourney = ({ spinsTaken = 0, totalMilestone = 3, onClaimBonus, isClaimingBonus }) => {
  const steps = Array.from({ length: totalMilestone });
  const isAllCompleted = spinsTaken >= totalMilestone;

  return (
    <div className={styles.journeyContainer}>
      <div className={styles.journeyHeader}>
        <div className={styles.journeyTitleWrapper}>
          <div className={styles.iconBadge}>
            <Compass size={16} className={styles.icon} />
          </div>
          <div>
            <h3 className={styles.journeyTitle}>SPIN JOURNEY</h3>
            <span className={styles.journeySubtitle}>Complete 3 spins to unlock a mystery reward</span>
          </div>
        </div>
        <div className={styles.progressPill}>
          <Sparkles size={13} className={styles.pillSparkle} />
          <span>{Math.min(spinsTaken, totalMilestone)} / {totalMilestone}</span>
        </div>
      </div>
      
      <div className={styles.timeline}>
        {steps.map((_, index) => {
          const isCompleted = spinsTaken > index;
          const isCurrent = spinsTaken === index;
          const isUpcoming = spinsTaken < index;

          return (
            <React.Fragment key={index}>
              {/* Step Node */}
              <div 
                className={`
                  ${styles.node} 
                  ${isCompleted ? styles.completedNode : ''} 
                  ${isCurrent ? styles.currentNode : ''}
                  ${isUpcoming ? styles.upcomingNode : ''}
                `}
              >
                {/* Active Beacon Sparkle Indicator */}
                {isCurrent && (
                  <div className={styles.beaconIndicator} aria-hidden="true">
                    <span className={styles.beaconStar}>✦</span>
                  </div>
                )}

                {/* Token Badge */}
                <div className={styles.tokenBadge}>
                  {isCompleted ? (
                    <Check size={14} strokeWidth={3} className={styles.checkIcon} />
                  ) : (
                    <span className={styles.stepNum}>0{index + 1}</span>
                  )}
                </div>

                {/* Step Label */}
                <span className={styles.nodeLabel}>Spin 0{index + 1}</span>
              </div>

              {/* Connecting Energy Conduit Track */}
              <div className={styles.lineWrapper}>
                <div className={styles.trackBase}></div>
                <div 
                  className={`
                    ${styles.trackProgress} 
                    ${isCompleted ? styles.trackCompleted : isCurrent ? styles.trackActive : ''}
                  `}
                ></div>
              </div>
            </React.Fragment>
          );
        })}

        {/* Final Bonus Mystery Box Node */}
        <div 
          className={`
            ${styles.node} 
            ${styles.bonusNode} 
            ${isAllCompleted ? styles.bonusAchieved : ''}
          `}
        >
          {isAllCompleted && (
            <div className={styles.bonusHalo} aria-hidden="true"></div>
          )}
          <div className={styles.tokenBadgeBonus}>
            <Gift size={18} className={styles.bonusGiftIcon} />
            {isAllCompleted && <span className={styles.bonusRewardTag}>+1</span>}
          </div>
          <span className={styles.nodeLabelBonus}>Free Spin</span>
        </div>
      </div>

      {/* Celebration Card when Milestone Reached */}
      {isAllCompleted && (
        <div className={styles.bonusUnlockedCard}>
          <div className={styles.bonusGlowBg}></div>
          <div className={styles.bonusIconWrapper}>
            <Gift size={24} className={styles.bonusIcon} />
          </div>
          <div className={styles.bonusTextContent}>
            <h4 className={styles.bonusTitle}>Bonus Spin Unlocked!</h4>
            <p className={styles.bonusDesc}>You've completed today's journey. Enjoy your free bonus spin!</p>
          </div>
          <button 
            className={styles.bonusBtn} 
            onClick={onClaimBonus}
            disabled={isClaimingBonus}
          >
            {isClaimingBonus ? (
              <Loader2 size={16} className={styles.spinner} />
            ) : (
              <>
                <Sparkles size={16} /> Play Now
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SpinJourney;

