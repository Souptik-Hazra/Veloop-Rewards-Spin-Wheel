import React from 'react';
import { Gem, Crown, Gift, Zap } from 'lucide-react';
import styles from './WalletBalances.module.css';

const WalletBalances = ({ balances }) => {
  if (!balances) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Your Inventory</h3>
      <div className={styles.grid}>
        <div className={styles.item}>
          <div className={`${styles.iconWrapper} ${styles.gemIcon}`}>
            <Gem size={18} />
          </div>
          <div className={styles.info}>
            <span className={styles.value}>{balances.gems}</span>
            <span className={styles.label}>Gems</span>
          </div>
        </div>
        
        <div className={styles.item}>
          <div className={`${styles.iconWrapper} ${styles.veIcon}`}>
            <Crown size={18} />
          </div>
          <div className={styles.info}>
            <span className={styles.value}>{balances.ves}</span>
            <span className={styles.label}>VEs</span>
          </div>
        </div>

        <div className={styles.item}>
          <div className={`${styles.iconWrapper} ${styles.giftIcon}`}>
            <Gift size={18} />
          </div>
          <div className={styles.info}>
            <span className={styles.value}>₹{balances.giftCard}</span>
            <span className={styles.label}>Gift Cards</span>
          </div>
        </div>

        <div className={styles.item}>
          <div className={`${styles.iconWrapper} ${styles.xpIcon}`}>
            <Zap size={18} />
          </div>
          <div className={styles.info}>
            <span className={styles.value}>{balances.xp}</span>
            <span className={styles.label}>XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalances;
