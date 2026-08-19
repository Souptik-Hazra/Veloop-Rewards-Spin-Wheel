import React from 'react';
import styles from './WaysToEarn.module.css';
import { Calendar, CheckCircle2, RefreshCw, Users, Trophy, Sparkles, ChevronRight, Zap } from 'lucide-react';

const earnMethods = [
  {
    id: 1,
    title: 'Daily Check-In Bonus',
    desc: 'Log in every day to claim your guaranteed 3 free spins resetting every midnight.',
    icon: Calendar,
    colorClass: 'iconGold',
    reward: '+3 Spins / Day',
    tagType: 'goldTag',
    actionText: 'Available Daily',
    isPassive: true
  },
  {
    id: 2,
    title: 'Complete Daily Quests',
    desc: 'Finish short surveys, video tasks, and daily platform activities to earn bonus spins.',
    icon: CheckCircle2,
    colorClass: 'iconGreen',
    reward: '+1 to +5 Spins',
    tagType: 'greenTag',
    actionText: 'Start Quests',
    isAction: true
  },
  {
    id: 3,
    title: 'Convert VEs & Gems',
    desc: 'Exchange your accumulated VE coins or gems directly into extra spin credits.',
    icon: RefreshCw,
    colorClass: 'iconPurple',
    reward: 'Instant Exchange',
    tagType: 'purpleTag',
    actionText: 'Redeem Spins',
    isAction: true
  },
  {
    id: 4,
    title: 'Invite Friends (Referral)',
    desc: 'Share your referral code. Get bonus spins instantly when your friend spins for the first time.',
    icon: Users,
    colorClass: 'iconCyan',
    reward: '+2 Spins / Friend',
    tagType: 'cyanTag',
    actionText: 'Invite Friends',
    isAction: true
  },
  {
    id: 5,
    title: 'Level-Up Milestones',
    desc: 'Gain XP with every spin and unlock mega spin gift bundles at every account tier upgrade.',
    icon: Trophy,
    colorClass: 'iconPink',
    reward: 'Tier Bundles',
    tagType: 'pinkTag',
    actionText: 'Tier Perk',
    isPassive: true
  }
];

const WaysToEarn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <div className={styles.headerIcon}>
            <Zap size={18} />
          </div>
          <div>
            <h3 className={styles.title}>WAYS TO GET MORE SPINS</h3>
            <p className={styles.subtitle}>Never run out of spins! Complete activities and level up.</p>
          </div>
        </div>
        <div className={styles.boostPill}>
          <Sparkles size={13} />
          <span>Earn Daily</span>
        </div>
      </div>
      
      <div className={styles.cardsGrid}>
        {earnMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div key={method.id} className={styles.earnCard}>
              <div className={styles.cardHeaderRow}>
                <div className={`${styles.iconContainer} ${styles[method.colorClass]}`}>
                  <Icon size={19} className={styles.cardIcon} />
                </div>

                <div className={styles.titleAndTag}>
                  <h4 className={styles.cardTitle}>{method.title}</h4>
                  <span className={`${styles.rewardTag} ${styles[method.tagType]}`}>
                    {method.reward}
                  </span>
                </div>

                <div className={styles.actionCol}>
                  <button 
                    className={`${styles.actionBtn} ${method.isAction ? styles.activeActionBtn : styles.passiveActionBtn}`}
                  >
                    <span>{method.actionText}</span>
                    {method.isAction && <ChevronRight size={13} className={styles.chevron} />}
                  </button>
                </div>
              </div>

              <p className={styles.cardDesc}>{method.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WaysToEarn;

