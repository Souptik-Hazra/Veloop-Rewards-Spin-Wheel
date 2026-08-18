import React, { useState, useEffect } from 'react';
import styles from './SpinWheel.module.css';
import MainWheel from '../../components/MainWheel/MainWheel';
import SpinHero from '../../components/SpinHero/SpinHero';
import RewardPreview from '../../components/RewardPreview/RewardPreview';
import SpinRules from '../../components/SpinRules/SpinRules';
import RewardResult from '../../components/RewardResult/RewardResult';
import { ChevronLeft, AlertTriangle } from 'lucide-react';

import { REWARDS } from '../../config/constants';
import { apiService } from '../../services/apiService';

const SpinWheel = () => {
  const [availableSpins, setAvailableSpins] = useState(5);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [wonReward, setWonReward] = useState(null);

  // Loading and Error states
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Simulated API Fetch
  const fetchData = async () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      const data = await apiService.getUserData();
      setAvailableSpins(data.availableSpins);
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
    setAvailableSpins(prev => Math.max(0, prev - 1));
    setShowResult(true);
  };

  const closeResult = () => {
    setShowResult(false);
    setWonReward(null);
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
            <h2 className={styles.wheelTitle}>Spin. Discover. Get Rewarded.</h2>
            <MainWheel 
              rewards={REWARDS.map(r => ({ label: r.wheelLabel, icon: r.icon, color: r.color, ...r }))}
              onSpinRequest={handleSpinRequest}
              onSpinComplete={handleSpinComplete}
              isSpinning={isSpinning}
              setIsSpinning={setIsSpinning}
              disabled={availableSpins === 0}
            />
          </div>
        )}

        <SpinHero availableSpins={availableSpins} styles={styles} />
      </div>

      <RewardPreview rewards={REWARDS} styles={styles} />
      <SpinRules styles={styles} />
      
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
