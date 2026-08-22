import React from 'react';
import styles from './SpinJourney.module.css';
import { Compass, Check, Gift, Sparkles, Loader2 } from 'lucide-react';

const SpinJourney = ({ spinsTaken = 0, totalMilestone = 3, onClaimBonus, isClaimingBonus, isClaimed = false }) => {
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
            <h3 className={styles.journeyTitle}>WIN STREAK JOURNEY</h3>
            <span className={styles.journeySubtitle}>Win 3 consecutive spins to unlock a free bonus spin</span>
          </div>
        </div>
        <div className={styles.progressPill}>
          <Sparkles size={13} className={styles.pillSparkle} />
          <span>{Math.min(spinsTaken, totalMilestone)} / {totalMilestone} Wins</span>
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
                <span className={styles.nodeLabel}>Win 0{index + 1}</span>
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
          <span className={styles.nodeLabelBonus}>Bonus Spin</span>
        </div>
      </div>

      {/* Celebration Card when Milestone Reached */}
      {isAllCompleted && (
        <div className={styles.bonusUnlockedCard}>
          <div className={styles.bonusShimmerLine}></div>
          <div className={styles.bonusIconWrapper}>
            <Gift size={22} className={styles.bonusIcon} />
          </div>
          <div className={styles.bonusTextContent}>
            <div className={styles.bonusTitleRow}>
              <h4 className={styles.bonusTitle}>
                {isClaimed ? '3 Consecutive Wins Completed!' : '3 Consecutive Wins Unlocked!'}
              </h4>
              <span className={isClaimed ? styles.claimedBadge : styles.freeBadge}>
                {isClaimed ? '✓ CLAIMED' : '+1 FREE'}
              </span>
            </div>
            <p className={styles.bonusDesc}>
              {isClaimed 
                ? 'Bonus spin added to your available spins! Resets in 24 hours.' 
                : "You've conquered the 3-win streak! Enjoy your free bonus spin."}
            </p>
          </div>
          <button 
            className={`${styles.bonusBtn} ${isClaimed ? styles.bonusBtnClaimed : ''}`} 
            onClick={onClaimBonus}
            disabled={isClaimingBonus || isClaimed}
          >
            {isClaimingBonus ? (
              <Loader2 size={16} className={styles.spinner} />
            ) : isClaimed ? (
              <>
                <Check size={15} /> Claimed (+1 Spin)
              </>
            ) : (
              <>
                <Sparkles size={15} /> Play Now
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SpinJourney;

