import React from 'react';
import Tooltip from '../Tooltip/Tooltip';

const SpinHero = ({ availableSpins, styles }) => {
  return (
    <>
      <div className={styles.heroCard}>
        <div className={styles.heroText}>
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            Available Spins 
            <Tooltip id="tooltip-spins" text="Spins you can use right now. Complete tasks to earn more!" />
          </h2>
          <div className={styles.spinsCountContainer}>
            <div className={styles.coinVisual}>
              <span className={styles.spinsNumber}>{availableSpins < 10 ? `0${availableSpins}` : availableSpins}</span>
            </div>
          </div>
        </div>
        <p className={styles.heroSubText}>Use your available spins and discover the reward waiting for you.</p>
        <div className={styles.heroAction}>
          {availableSpins > 0 ? (
            <div style={{color: '#D4AF37', fontWeight: 600, fontSize: '1.1rem'}}>
              Ready to Spin!
            </div>
          ) : (
            <>
              <div className={styles.noSpinsText}>Out of Spins</div>
              <button className={styles.earnMoreBtn}>Earn More →</button>
            </>
          )}
        </div>
      </div>

      <div className={styles.waysToEarnCard}>
        <h3 className={styles.waysToEarnTitle}>Ways to Get More Spins</h3>
        <ul className={styles.waysToEarnList}>
          <li>
            <div className={styles.waysToEarnIconWrapper}>✓</div>
            <div className={styles.waysToEarnText}>
              <strong>Complete eligible tasks</strong>
              <span>Finish daily activities</span>
            </div>
          </li>
          <li>
            <div className={styles.waysToEarnIconWrapper}>🎁</div>
            <div className={styles.waysToEarnText}>
              <strong>Earn rewards</strong>
              <span>Convert points to spins</span>
            </div>
          </li>
          <li className={styles.waysToEarnUpcoming}>
            <div className={styles.waysToEarnIconWrapper} style={{filter: 'grayscale(1)'}}>👥</div>
            <div className={styles.waysToEarnText}>
              <strong>Referral activity</strong>
              <span className={styles.upcomingBadge}>Upcoming</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SpinHero;
