import React, { useState, useEffect } from 'react';
import styles from './SpinWheel.module.css';
import MainWheel from '../../components/MainWheel/MainWheel';
import SpinHero from '../../components/SpinHero/SpinHero';
import RewardPreview from '../../components/RewardPreview/RewardPreview';
import SpinRules from '../../components/SpinRules/SpinRules';
import RewardResult from '../../components/RewardResult/RewardResult';
import SpinJourney from '../../components/SpinJourney/SpinJourney';
import SpinHistory from '../../components/SpinHistory/SpinHistory';
import WalletBalances from '../../components/WalletBalances/WalletBalances';
import WaysToEarn from '../../components/WaysToEarn/WaysToEarn';
import { ChevronLeft, AlertTriangle, ShieldCheck, Sparkles, Coins, Calendar, CalendarDays, Volume2, VolumeX } from 'lucide-react';

import { REWARDS } from '../../config/constants';
import { apiService } from '../../services/apiService';
import { soundFX } from '../../utils/audioService';

const SpinWheel = () => {
  const [availableSpins, setAvailableSpins] = useState(5);
  const [spinsTaken, setSpinsTaken] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [wonReward, setWonReward] = useState(null);
  const [balances, setBalances] = useState(null);
  const [isTitleHidden, setIsTitleHidden] = useState(false);
  const [activeTab, setActiveTab] = useState(typeof window !== 'undefined' && window.innerWidth > 992 ? 'rules' : 'prizes');
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());

  // Subscribe to audio mute changes and clean up active audio on unmount
  useEffect(() => {
    const unsubscribe = soundFX.subscribe(muted => setIsMuted(muted));
    return () => {
      unsubscribe();
      soundFX.stopAll();
    };
  }, []);

  const handleToggleMute = () => {
    const newMuted = soundFX.toggleMute();
    setIsMuted(newMuted);
    if (!newMuted) {
      soundFX.playInteractionTap();
    }
  };

  const handleTabChange = (tabId) => {
    soundFX.playTabSwitch();
    setActiveTab(tabId);
  };

  // Daily Bonus & Timer States
  const [dailyBonus, setDailyBonus] = useState({
    isClaimable: true,
    resetsInSeconds: 0,
    bonusSpins: 3
  });
  const [countdownSeconds, setCountdownSeconds] = useState(0);

  // Loading, Error and Toast Notification states
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [pendingSpinResult, setPendingSpinResult] = useState(null);
  const [isClaimingBonus, setIsClaimingBonus] = useState(false);
  const [isClaimingMilestone, setIsClaimingMilestone] = useState(false);

  const showNotification = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

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

  // Dynamic Countdown Timer
  useEffect(() => {
    if (countdownSeconds <= 0) {
      setDailyBonus(prev => ({ ...prev, isClaimable: true }));
      return;
    }

    const interval = setInterval(() => {
      setCountdownSeconds(prev => {
        if (prev <= 1) {
          setDailyBonus(d => ({ ...d, isClaimable: true }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownSeconds]);

  // Initial API Data Fetch
  const fetchData = async () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      const data = await apiService.getUserData();
      if (data) {
        setAvailableSpins(data.availableSpins ?? 5);
        setSpinsTaken(data.spinsTaken ?? 0);
        setBalances(data.balances || null);
        if (data.dailyBonus) {
          setDailyBonus(data.dailyBonus);
          setCountdownSeconds(data.dailyBonus.resetsInSeconds ?? 45930);
        }
      }
    } catch (err) {
      setHasError(true);
      showNotification(err.message || 'Unable to connect to backend.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSpinRequest = async () => {
    try {
      const idempotencyKey = `spin_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const response = await apiService.performSpin({ idempotencyKey });
      
      setPendingSpinResult(response);
      return response.winningIndex;
    } catch (err) {
      setHasError(true);
      showNotification(err.message || 'Spin failed. Please try again.', 'error');
      throw err;
    }
  };

  const handleSpinComplete = (reward) => {
    const actualReward = pendingSpinResult?.reward || reward;

    if (pendingSpinResult) {
      setAvailableSpins(pendingSpinResult.availableSpins);
      setSpinsTaken(pendingSpinResult.consecutiveWins !== undefined ? pendingSpinResult.consecutiveWins : pendingSpinResult.spinsTaken);
      if (pendingSpinResult.balances) {
        setBalances(pendingSpinResult.balances);
      }
      setWonReward(actualReward);
    } else {
      setWonReward(reward);
      setAvailableSpins(prev => Math.max(0, prev - 1));

      // Track 3 consecutive wins streak
      if (reward && reward.type !== 'None') {
        setSpinsTaken(prev => prev + 1);
      } else {
        setSpinsTaken(0); // Reset consecutive wins streak on loss
      }

      // Optimistic balance update
      if (reward && reward.type !== 'None' && balances) {
        setBalances(prevBalances => {
          const newBalances = { ...prevBalances };
          if (reward.type === 'VEs') newBalances.ves += reward.value;
          if (reward.type === 'Gems') newBalances.gems += reward.value;
          if (reward.type === 'XP') newBalances.xp += reward.value;
          if (reward.type === 'RS') newBalances.giftCard += reward.value;
          return newBalances;
        });
        
        if (reward.type === 'Spin') {
          setAvailableSpins(prev => prev + reward.value);
        }
      }
    }
    
    setShowResult(true);
    setPendingSpinResult(null);
  };

  const closeResult = () => {
    setShowResult(false);
    setWonReward(null);
  };

  const handleClaimDailyBonus = async () => {
    if (isClaimingBonus) return;
    setIsClaimingBonus(true);
    try {
      const response = await apiService.claimDailyBonus();
      if (response && response.success) {
        soundFX.playInteractionTap();
        setAvailableSpins(response.availableSpins);
        setDailyBonus(prev => ({
          ...prev,
          isClaimable: false,
          resetsInSeconds: response.nextResetInSeconds || 86400
        }));
        setCountdownSeconds(response.nextResetInSeconds || 86400);
        showNotification(response.message || 'Claimed 3 Daily Bonus Spins!', 'success');
      }
    } catch (err) {
      showNotification(err.message || 'Failed to claim daily bonus.', 'error');
    } finally {
      setIsClaimingBonus(false);
    }
  };

  const handleClaimMilestone = async () => {
    if (isClaimingMilestone) return;
    setIsClaimingMilestone(true);
    try {
      const response = await apiService.claimMilestoneBonus({ milestoneIndex: 3 });
      if (response && response.success) {
        soundFX.playInteractionTap();
        setAvailableSpins(response.availableSpins);
        setSpinsTaken(response.spinsTaken || 0);
        showNotification(response.message || 'Milestone Bonus Spin Claimed!', 'success');
      }
    } catch (err) {
      showNotification(err.message || 'Failed to claim milestone bonus.', 'error');
    } finally {
      setIsClaimingMilestone(false);
    }
  };

  // Time format helper (HH : MM : SS)
  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return {
      hrs: hrs.toString().padStart(2, '0'),
      mins: mins.toString().padStart(2, '0'),
      secs: secs.toString().padStart(2, '0')
    };
  };

  const timer = formatTime(countdownSeconds);

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
      {toast.show && (
        <div className={styles.toastContainer}>
          <div className={`${styles.toast} ${toast.type === 'error' ? styles.toastError : styles.toastSuccess}`}>
            {toast.type === 'error' ? <AlertTriangle size={18} color="#EF4444" /> : <Sparkles size={18} color="#10B981" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Dynamic Ambient Background Effects */}
      <div className={styles.bgEffectsWrapper} aria-hidden="true">
        <div className={styles.ambientGlowCenter}></div>
        <div className={styles.ambientGlowTopLeft}></div>
        <div className={styles.ambientGlowTopRight}></div>
        <div className={styles.gridOverlay}></div>
        
        {/* Floating Stardust & Confetti */}
        <div className={styles.particlesContainer}>
          {[...Array(28)].map((_, i) => {
            const isStar = i % 4 === 0;
            const isDiamond = i % 4 === 1;
            const color = i % 3 === 0 ? '#8B5CF6' : i % 3 === 1 ? '#FDE047' : '#EC4899';
            return (
              <div 
                key={i} 
                className={`${styles.particle} ${isStar ? styles.starParticle : isDiamond ? styles.diamondParticle : styles.dotParticle}`} 
                style={{
                  '--x': `${(i * 13.7) % 96 + 2}%`,
                  '--y': `${(i * 17.3) % 94 + 3}%`,
                  '--delay': `${(i * 0.7) % 6}s`,
                  '--duration': `${10 + (i % 6) * 2.5}s`,
                  '--color': color
                }}
              >
                {isStar ? '✦' : isDiamond ? '◆' : ''}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.pageContainer}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeftGroup}>
            <button className={styles.backBtn} aria-label="Go back">
              <ChevronLeft size={24} />
            </button>
            <h1 className={styles.headerTitle}>Spin The Wheel</h1>
          </div>
          
          <button 
            className={`${styles.soundToggleBtn} ${isMuted ? styles.soundMuted : ''}`} 
            onClick={handleToggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
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
          <>
            <div className={styles.topHeaderRow}>
              {/* Top Left: Spins */}
              <div className={styles.topStatusCard}>
                <div className={`${styles.topStatusIcon} ${styles.spinsIcon}`}>
                  <Sparkles size={24} color="#FFF" />
                </div>
                <div className={styles.topStatusInfo}>
                  <span className={styles.topStatusLabel}>YOUR SPINS</span>
                  <strong className={styles.topStatusValue}>{availableSpins}</strong>
                  <span className={styles.topStatusSub}>Spins Left</span>
                </div>
              </div>

              {/* Title Section */}
              <div className={styles.titleSection}>
                <div className={styles.kicker}>
                  <Sparkles size={14} className={styles.kickerIcon} /> 
                  SPIN & WIN 
                  <Sparkles size={14} className={styles.kickerIcon} />
                </div>
                <h2 className={styles.wheelTitle}>
                  SPIN THE <span className={styles.wheelGradientText}>WHEEL</span>
                </h2>
                <p className={styles.wheelSubtitle}>Spin the wheel and get exciting rewards!</p>
              </div>

              {/* Top Right: Balance */}
              <div className={styles.topStatusCard}>
                <div className={`${styles.topStatusIcon} ${styles.balanceIcon}`}>
                  <Coins size={24} color="#FFF" />
                </div>
                <div className={styles.topStatusInfo}>
                  <span className={styles.topStatusLabel}>YOUR BALANCE</span>
                  <strong className={styles.topStatusValue}>{balances ? balances.coins || balances.ves || 1200 : 1200}</strong>
                  <span className={styles.topStatusSub}>Coins Available</span>
                </div>
              </div>
            </div>

            <div className={styles.mainContentGrid}>
              {/* Row 1, Column 1: Possible Rewards */}
              <div className={styles.rewardsColumn}>
                <RewardPreview rewards={REWARDS} />
              </div>
              
              {/* Row 1, Column 2: Center Wheel */}
              <div className={styles.wheelSection}>
                <MainWheel 
                  rewards={REWARDS.map(r => ({ label: r.wheelLabel, icon: r.icon, color: r.color, ...r }))}
                  onSpinRequest={handleSpinRequest}
                  onSpinComplete={handleSpinComplete}
                  isSpinning={isSpinning}
                  setIsSpinning={setIsSpinning}
                  disabled={availableSpins === 0}
                />
                <div className={styles.trustBadge}>
                  <ShieldCheck size={15} /> 100% Fair Spin & Secure
                </div>
              </div>

              {/* Row 1, Column 3: Daily Bonus Card */}
              <div className={styles.bonusColumn}>
                <div className={styles.dailyBonusCard}>
                  <div className={styles.dailyBonusHeader}>
                    <Calendar size={18} className={styles.dailyBonusIcon}/>
                    DAILY BONUS
                  </div>
                  <div className={styles.dailyBonusBody}>
                    <p>
                      {dailyBonus.isClaimable ? (
                        <>Claim today for<br/>3 free spins!</>
                      ) : (
                        <>Come back tomorrow for<br/>3 more spins!</>
                      )}
                    </p>
                    <div className={styles.dailyBonusImageWrapper}>
                      <CalendarDays size={64} color="#8B5CF6" />
                      <div className={styles.floatingCoins}>
                        <Coins size={24} color="#F59E0B" />
                      </div>
                    </div>
                    <button 
                      className={`${styles.claimBonusBtn} ${dailyBonus.isClaimable ? styles.claimTodayActive : styles.claimTomorrowDisabled}`}
                      onClick={handleClaimDailyBonus}
                      disabled={isClaimingBonus || !dailyBonus.isClaimable}
                    >
                      {isClaimingBonus ? 'Claiming...' : (dailyBonus.isClaimable ? 'Claim Today' : 'Claim Tomorrow')}
                    </button>
                    <div className={styles.countdownBox}>
                      <span className={styles.countdownLabel}>
                        {dailyBonus.isClaimable ? 'Status' : 'Resets in'}
                      </span>
                      {dailyBonus.isClaimable ? (
                        <div className={styles.readyBadge}>
                          <Sparkles size={16} /> 3 Spins Available
                        </div>
                      ) : (
                        <div className={styles.countdownTimer}>
                          <div className={styles.timeUnit}><strong>{timer.hrs}</strong><span>HRS</span></div>
                          <span className={styles.timeSep}>:</span>
                          <div className={styles.timeUnit}><strong>{timer.mins}</strong><span>MINS</span></div>
                          <span className={styles.timeSep}>:</span>
                          <div className={styles.timeUnit}><strong>{timer.secs}</strong><span>SECS</span></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2, Columns 1 & 2 (Spanning across Left & Center): Spin Journey */}
              <div className={styles.journeySpannedColumn}>
                <SpinJourney 
                  spinsTaken={spinsTaken} 
                  totalMilestone={3}
                  onClaimBonus={handleClaimMilestone}
                  isClaimingBonus={isClaimingMilestone}
                />
              </div>

              {/* Row 2, Column 3: Your Inventory */}
              <div className={styles.inventoryColumn}>
                <WalletBalances balances={balances} />
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabBtn} ${styles.mobileOnlyTab} ${activeTab === 'prizes' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('prizes')}
        >
          Prizes
        </button>
        <button 
          className={`${styles.tabBtn} ${styles.mobileOnlyTab} ${activeTab === 'inventory' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('inventory')}
        >
          Inventory
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'activity' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('activity')}
        >
          Activity
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'rules' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('rules')}
        >
          How It Works
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'earn' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('earn')}
        >
          Get More Spins
        </button>
      </div>

      <div className={styles.tabContentArea}>
        {activeTab === 'prizes' && (
          <div className={styles.mobileOnlyContent}>
            <RewardPreview rewards={REWARDS} />
          </div>
        )}
        {activeTab === 'inventory' && (
          <div className={styles.mobileOnlyContent}>
            <div className={styles.inventoryTabContainer}>
              <WalletBalances balances={balances} />
            </div>
          </div>
        )}
        {activeTab === 'rules' && <SpinRules styles={styles} />}
        {activeTab === 'earn' && (
          <div className={styles.earnTabContainer}>
            <WaysToEarn />
          </div>
        )}
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
