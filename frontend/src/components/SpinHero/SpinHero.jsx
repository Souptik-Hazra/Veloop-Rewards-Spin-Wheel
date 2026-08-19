import React from 'react';
import Tooltip from '../Tooltip/Tooltip';
import WaysToEarn from '../WaysToEarn/WaysToEarn';

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
      <div style={{ marginTop: '1.5rem' }}>
        <WaysToEarn />
      </div>
    </>
  );
};

export default SpinHero;
