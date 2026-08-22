import React from 'react';
import { Gem, Crown, Gift, Zap, Wallet } from 'lucide-react';
import styles from './WalletBalances.module.css';

const WalletBalances = ({ balances }) => {
  if (!balances) return null;

  const inventoryItems = [
    {
      id: 'gems',
      label: 'Gems',
      value: balances.gems || 0,
      icon: Gem,
      typeClass: 'gemTile',
      iconClass: 'gemIcon'
    },
    {
      id: 'ves',
      label: 'VE Tokens',
      value: balances.ves || 0,
      icon: Crown,
      typeClass: 'veTile',
      iconClass: 'veIcon'
    },
    {
      id: 'giftCard',
      label: 'Gift Cards',
      value: `₹${balances.giftCard || 0}`,
      icon: Gift,
      typeClass: 'giftTile',
      iconClass: 'giftIcon'
    },
    {
      id: 'xp',
      label: 'Level XP',
      value: balances.xp || 0,
      icon: Zap,
      typeClass: 'xpTile',
      iconClass: 'xpIcon'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerBadge}>
            <Wallet size={16} className={styles.walletIcon} />
          </div>
          <div>
            <h3 className={styles.title}>YOUR INVENTORY</h3>
            <span className={styles.subtitle}>Current wallet assets</span>
          </div>
        </div>
        <div className={styles.livePill}>
          <span className={styles.liveDot}></span>
          <span>Live</span>
        </div>
      </div>

      <div className={styles.grid}>
        {inventoryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className={`${styles.item} ${styles[item.typeClass]}`}>
              <div className={`${styles.iconWrapper} ${styles[item.iconClass]}`}>
                <Icon size={18} />
              </div>
              <div className={styles.info}>
                <span className={styles.value}>{item.value}</span>
                <span className={styles.label}>{item.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WalletBalances;

