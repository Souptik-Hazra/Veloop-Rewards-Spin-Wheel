import React, { useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import WaysToEarn from '../WaysToEarn/WaysToEarn';
import WalletBalances from '../WalletBalances/WalletBalances';

const SpinHero = ({ availableSpins, balances, styles }) => {
  const [activeTab, setActiveTab] = useState('available');

  return (
    <div style={{ gridArea: 'hero' }}>
      <div className={styles.heroMobileTabs}>
        <button 
          className={`${styles.heroMobileTabBtn} ${activeTab === 'available' ? styles.heroMobileTabActive : ''}`}
          onClick={() => setActiveTab('available')}
        >
          Spins
        </button>
        <button 
          className={`${styles.heroMobileTabBtn} ${activeTab === 'inventory' ? styles.heroMobileTabActive : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button 
          className={`${styles.heroMobileTabBtn} ${activeTab === 'ways' ? styles.heroMobileTabActive : ''}`}
          onClick={() => setActiveTab('ways')}
        >
          Earn More
        </button>
      </div>

      <div className={`${styles.heroCard} ${activeTab === 'available' ? styles.showOnMobile : styles.hideOnMobile}`}>
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
      
      <div className={`${styles.inventoryWrapper} ${activeTab === 'inventory' ? styles.showOnMobile : styles.hideOnMobile}`}>
        <WalletBalances balances={balances} />
      </div>

      <div className={`${styles.waysWrapper} ${activeTab === 'ways' ? styles.showOnMobile : styles.hideOnMobile}`}>
        <WaysToEarn />
      </div>
    </div>
  );
};

export default SpinHero;
