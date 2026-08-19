import React, { useState, useEffect } from 'react';
import styles from './SpinWheel.module.css';
import MainWheel from '../../components/MainWheel/MainWheel';
import SpinHero from '../../components/SpinHero/SpinHero';
import RewardPreview from '../../components/RewardPreview/RewardPreview';
import SpinRules from '../../components/SpinRules/SpinRules';
import RewardResult from '../../components/RewardResult/RewardResult';
import SpinJourney from '../../components/SpinJourney/SpinJourney';
import SpinHistory from '../../components/SpinHistory/SpinHistory';
import { ChevronLeft, AlertTriangle, ShieldCheck } from 'lucide-react';

import { REWARDS } from '../../config/constants';
import { apiService } from '../../services/apiService';

const SpinWheel = () => {
  const [availableSpins, setAvailableSpins] = useState(5);
  const [spinsTaken, setSpinsTaken] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [wonReward, setWonReward] = useState(null);
  const [balances, setBalances] = useState(null);
  const [isTitleHidden, setIsTitleHidden] = useState(false);
  const [activeTab, setActiveTab] = useState('prizes');

  // Loading and Error states
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      setIsTitleHidden(true);
    } else if (isTitleHidden) {
      const timer = setTimeout(() => {
        setIsTitleHidden(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

  // Simulated API Fetch
  const fetchData = async () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      const data = await apiService.getUserData();
      setAvailableSpins(data.availableSpins);
      setBalances(data.balances);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSpinRequest = async () => {
    try {
      const { winningIndex } = await apiService.performSpin();
      return winningIndex;
    } catch (err) {
      setHasError(true);
      throw err;
    }
  };

  const handleSpinComplete = (reward) => {
    setWonReward(reward);
    setSpinsTaken(prev => prev + 1);
    
    // Deduct the spin we just took
    setAvailableSpins(prev => Math.max(0, prev - 1));

    // Update local balances optimistically
    if (reward && reward.type !== 'None' && balances) {
      setBalances(prevBalances => {
        const newBalances = { ...prevBalances };
        if (reward.type === 'VEs') newBalances.ves += reward.value;
        if (reward.type === 'Gems') newBalances.gems += reward.value;
        if (reward.type === 'XP') newBalances.xp += reward.value;
        if (reward.type === 'RS') newBalances.giftCard += reward.value;
        return newBalances;
      });
      
      // If they won a free spin, add it to their available spins
      if (reward.type === 'Spin') {
        setAvailableSpins(prev => prev + reward.value);
      }
    }
    
    setShowResult(true);
  };

  const closeResult = () => {
    setShowResult(false);
    setWonReward(null);
  };

  const [isClaimingBonus, setIsClaimingBonus] = useState(false);

  const handleClaimBonus = async () => {
    if (isClaimingBonus) return;
    setIsClaimingBonus(true);
    try {
      // Simulate backend API call to claim bonus
      // e.g. await apiService.claimBonusSpin();
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setAvailableSpins(prev => prev + 1);
      setSpinsTaken(0);
    } catch (err) {
      console.error("Failed to claim bonus", err);
    } finally {
      setIsClaimingBonus(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.pageContainer}>
          <header className={styles.header}>
            <button className={styles.backBtn} aria-label="Go back">
              <ChevronLeft size={24} />
            </button>
            <h1 className={styles.headerTitle}>Spin The Wheel</h1>
          </header>
          <div className={styles.loadingContainer}>
            <div className={styles.premiumSpinner}></div>
            <div className={styles.loadingText}>Loading rewards...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        {/* Header */}
        <header className={styles.header}>
        <button className={styles.backBtn} aria-label="Go back">
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.headerTitle}>Spin The Wheel</h1>
      </header>

      <div className={styles.mainLayout}>
        {hasError ? (
          <div className={styles.errorContainer}>
            <AlertTriangle size={48} className={styles.errorIcon} />
            <h2 className={styles.errorTitle}>Unable to Complete Spin</h2>
            <p className={styles.errorDesc}>We couldn't process your request right now. Please try again.</p>
            <button className={styles.errorBtn} onClick={fetchData}>Try Again</button>
          </div>
        ) : (
          <div className={styles.wheelSection}>
            <h2 
              className={styles.wheelTitle} 
              style={{ 
                opacity: isTitleHidden ? 0 : 1, 
                transition: 'opacity 0.5s ease',
                pointerEvents: isTitleHidden ? 'none' : 'auto'
              }}
            >
              Spin. Discover. Get Rewarded.
            </h2>
            <MainWheel 
              rewards={REWARDS.map(r => ({ label: r.wheelLabel, icon: r.icon, color: r.color, ...r }))}
              onSpinRequest={handleSpinRequest}
              onSpinComplete={handleSpinComplete}
              isSpinning={isSpinning}
              setIsSpinning={setIsSpinning}
              disabled={availableSpins === 0}
            />
            <div className={styles.trustBadge}>
              <ShieldCheck size={16} /> 100% Fair Spin & Secure
            </div>
            
            <div style={{marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center'}}>
              <SpinJourney 
                spinsTaken={spinsTaken} 
                totalMilestone={3}
                onClaimBonus={handleClaimBonus}
                isClaimingBonus={isClaimingBonus}
              />
            </div>
          </div>
        )}

        <SpinHero 
          availableSpins={availableSpins} 
          balances={balances}
          styles={styles} 
        />
      </div>

      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'prizes' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('prizes')}
        >
          Prizes
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'rules' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          How It Works
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'activity' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
      </div>

      <div className={styles.tabContentArea}>
        {activeTab === 'prizes' && <RewardPreview rewards={REWARDS} styles={styles} />}
        {activeTab === 'rules' && <SpinRules styles={styles} />}
        {activeTab === 'activity' && (
          <div className={styles.bottomWidgetsGrid}>
            <SpinHistory />
          </div>
        )}
      </div>
      
      <footer className={styles.footer}>
        <div className={styles.footerText}>
          &copy; 2025-2026 VELoop Rewards &middot; All rights reserved
        </div>
        <div className={styles.footerLinks}>
          <span className={styles.footerLink}>Spin the Wheel</span>
          <span className={styles.footerLink}>Terms</span>
          <span className={styles.footerLink}>Privacy</span>
          <span className={styles.footerLink}>Support</span>
        </div>
      </footer>

      <RewardResult 
        showResult={showResult} 
        wonReward={wonReward} 
        availableSpins={availableSpins} 
        closeResult={closeResult} 
        styles={styles} 
      />
      </div>
    </div>
  );
};

export default SpinWheel;
