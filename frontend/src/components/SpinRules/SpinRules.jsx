import React from 'react';
import { UserPlus, CircleDot, MousePointerClick, Gift, ShieldCheck, Check, ChevronRight } from 'lucide-react';
import componentStyles from './SpinRules.module.css';
import rulesGraphic from '../../assets/rules-graphic.png';

const SpinRules = () => {
  return (
    <div className={componentStyles.container}>
      {/* HOW IT WORKS SECTION */}
      <div className={componentStyles.howItWorksCard}>
        <div className={componentStyles.sectionTitle}>
          <span className={componentStyles.diamond}>♦</span>
          HOW IT WORKS
          <span className={componentStyles.diamond}>♦</span>
        </div>
        
        <div className={componentStyles.stepsGrid}>
          <div className={componentStyles.stepBox}>
            <div className={`${componentStyles.iconCircle} ${componentStyles.iconPurple}`}>
              <UserPlus size={32} />
            </div>
            <div>
              <div className={componentStyles.stepHeader}>
                <div className={`${componentStyles.stepBadge} ${componentStyles.badgePurple}`}>01</div>
                <h3 className={componentStyles.stepTitle}>Login / Sign Up</h3>
              </div>
              <p className={componentStyles.stepDesc}>Login or create an account to get started.</p>
            </div>
          </div>

          <div className={componentStyles.stepConnector}>
            <ChevronRight size={22} className={componentStyles.connectorArrow} />
          </div>

          <div className={componentStyles.stepBox}>
            <div className={`${componentStyles.iconCircle} ${componentStyles.iconOrange}`}>
              <CircleDot size={32} />
            </div>
            <div>
              <div className={componentStyles.stepHeader}>
                <div className={`${componentStyles.stepBadge} ${componentStyles.badgeOrange}`}>02</div>
                <h3 className={componentStyles.stepTitle}>Get Spins</h3>
              </div>
              <p className={componentStyles.stepDesc}>You get 3 free spins every day.</p>
            </div>
          </div>

          <div className={componentStyles.stepConnector}>
            <ChevronRight size={22} className={componentStyles.connectorArrow} />
          </div>

          <div className={componentStyles.stepBox}>
            <div className={`${componentStyles.iconCircle} ${componentStyles.iconGreen}`}>
              <MousePointerClick size={32} />
            </div>
            <div>
              <div className={componentStyles.stepHeader}>
                <div className={`${componentStyles.stepBadge} ${componentStyles.badgeGreen}`}>03</div>
                <h3 className={componentStyles.stepTitle}>Spin the Wheel</h3>
              </div>
              <p className={componentStyles.stepDesc}>Use your spins to spin the wheel.</p>
            </div>
          </div>

          <div className={componentStyles.stepConnector}>
            <ChevronRight size={22} className={componentStyles.connectorArrow} />
          </div>

          <div className={componentStyles.stepBox}>
            <div className={`${componentStyles.iconCircle} ${componentStyles.iconPink}`}>
              <Gift size={32} />
            </div>
            <div>
              <div className={componentStyles.stepHeader}>
                <div className={`${componentStyles.stepBadge} ${componentStyles.badgePink}`}>04</div>
                <h3 className={componentStyles.stepTitle}>Win Rewards</h3>
              </div>
              <p className={componentStyles.stepDesc}>Win exciting coins, discounts & more!</p>
            </div>
          </div>
        </div>
      </div>

      {/* SPIN RULES SECTION */}
      <div className={componentStyles.rulesCard}>
        <div className={componentStyles.rulesContent}>
          <div className={componentStyles.rulesHeader}>
            <div className={componentStyles.shieldIcon}>
              <ShieldCheck size={28} />
            </div>
            <h2 className={componentStyles.rulesTitle}>SPIN RULES</h2>
          </div>
          
          <ul className={componentStyles.rulesList}>
            <li className={componentStyles.ruleItem}>
              <Check size={18} className={componentStyles.checkIcon} />
              <span className={componentStyles.ruleText}>You get 3 free spins every day.</span>
            </li>
            <li className={componentStyles.ruleItem}>
              <Check size={18} className={componentStyles.checkIcon} />
              <span className={componentStyles.ruleText}>Each spin gives you a random reward.</span>
            </li>
            <li className={componentStyles.ruleItem}>
              <Check size={18} className={componentStyles.checkIcon} />
              <span className={componentStyles.ruleText}>Rewards will be added to your account instantly.</span>
            </li>
            <li className={componentStyles.ruleItem}>
              <Check size={18} className={componentStyles.checkIcon} />
              <span className={componentStyles.ruleText}>Keep spinning and keep winning!</span>
            </li>
          </ul>
        </div>
        
        <div className={componentStyles.rulesImageContainer}>
          <img src={rulesGraphic} alt="Rewards" className={componentStyles.rulesGraphic} />
        </div>
      </div>
    </div>
  );
};

export default SpinRules;
