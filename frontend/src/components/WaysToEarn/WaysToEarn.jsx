import React from 'react';
import styles from './WaysToEarn.module.css';
import { Check, Gift, Users } from 'lucide-react';

const ways = [
  { id: 1, title: 'Complete eligible tasks', desc: 'Finish daily activities', icon: Check, active: true },
  { id: 2, title: 'Earn rewards', desc: 'Convert points to spins', icon: Gift, active: true },
  { id: 3, title: 'Referral activity', desc: 'Upcoming', icon: Users, active: false }
];

const WaysToEarn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Ways to Get More Spins</h3>
      </div>
      
      <div className={styles.list}>
        {ways.map((way) => {
          const Icon = way.icon;
          return (
            <div key={way.id} className={`${styles.item} ${!way.active ? styles.inactive : ''}`}>
              <div className={styles.iconWrapper}>
                <Icon size={16} className={styles.cardIcon} />
              </div>
              <div className={styles.itemContent}>
                <h4 className={styles.itemTitle}>{way.title}</h4>
                {way.active ? (
                  <p className={styles.itemDesc}>{way.desc}</p>
                ) : (
                  <span className={styles.upcomingBadge}>{way.desc}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WaysToEarn;
