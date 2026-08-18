import React from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { BookOpen, AlertCircle } from 'lucide-react';

const SpinRules = ({ styles }) => {
  return (
    <div className={styles.bottomWidgets}>
      <div className={styles.fullWidthWidget} style={{marginTop: 0}}>
        <h2 className={styles.widgetTitle}>
          <BookOpen size={20} className={styles.logoIcon} aria-hidden="true"/> 
          How Spin Works
        </h2>
        <div className={styles.stepsList}>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepHeading}>Get a Spin</h3>
              <p className={styles.stepDesc}>Available spins are shown above. Use an eligible spin to participate.</p>
            </div>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepHeading}>Spin the Wheel</h3>
              <p className={styles.stepDesc}>Tap the SPIN button to start the wheel and discover your reward.</p>
            </div>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepHeading}>Discover Your Reward</h3>
              <p className={styles.stepDesc}>The wheel selects the reward automatically.</p>
            </div>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>04</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepHeading}>Keep Earning</h3>
              <p className={styles.stepDesc}>Return and participate again when more spins become available.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.fullWidthWidget} style={{marginTop: 0}}>
        <div 
          className={styles.widgetTitle} 
          style={{display: 'flex', alignItems: 'center'}}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <AlertCircle size={20} className={styles.logoIcon} aria-hidden="true"/> 
            <h2 style={{fontSize: 'inherit', margin: 0}}>Spin Rules</h2>
            <Tooltip id="tooltip-rules" text="Important information about how the Spin the Wheel feature works." />
          </div>
        </div>
        <ul id="spin-rules-list" className={`${styles.rulesList} ${styles.expanded}`}>
          <li>Spins are earned through eligible activities on the platform.</li>
          <li>Available spins are displayed at the top of this page.</li>
          <li>Rewards are added to your account automatically upon winning.</li>
          <li>If you encounter an issue, please contact support before attempting another spin.</li>
          <li>All spins are subject to the platform's standard terms of service.</li>
        </ul>
      </div>
    </div>
  );
};

export default SpinRules;
