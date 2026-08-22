import React, { useState, useEffect, useRef } from 'react';
import { Lock } from 'lucide-react';
import styles from './MainWheel.module.css';
import SpinLoader from '../SpinLoader/SpinLoader';
import WheelPointer from '../WheelPointer/WheelPointer';
import { soundFX } from '../../utils/audioService';

const normalSegmentColors = ['#334155', '#1E293B', '#475569'];
// 9 Guaranteed Unique Vibrant Colors for all 9 Wheel Slices (Zero Adjacent Duplicates)
const goldenSegmentColors = [
  '#F59E0B', // 0: Amber Gold (10 VEs)
  '#EC4899', // 1: Hot Pink (2 Gems)
  '#8B5CF6', // 2: Imperial Purple (30 VEs)
  '#10B981', // 3: Emerald Green (Free Spin)
  '#06B6D4', // 4: Electric Cyan (Gift Card ₹2)
  '#2563EB', // 5: Cobalt Blue (Gift Card ₹5)
  '#EF4444', // 6: Ruby Crimson (10 XP)
  '#F97316', // 7: Sunset Orange (30 XP)
  '#7C3AED'  // 8: Deep Amethyst (Lose)
];

const MainWheel = ({ rewards, onSpinRequest, onSpinComplete, isSpinning, setIsSpinning, disabled, isGoldenSpin = false }) => {
  const [rotation, setRotation] = useState(0);
  const [isIntroAnimating, setIsIntroAnimating] = useState(true);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroAnimating(false);
    }, 1900);
    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const safeRewards = Array.isArray(rewards) && rewards.length > 0 ? rewards : [];
  const numSegments = safeRewards.length || 8;
  const segmentAngle = 360 / numSegments;

  // Wheel background uses alternating dark metallic or Golden Bonus colors
  const getWheelBackground = () => {
    let gradientParts = [];
    const activeSegmentColors = isGoldenSpin ? goldenSegmentColors : normalSegmentColors;
    for (let i = 0; i < numSegments; i++) {
      const startAngle = i * segmentAngle;
      const endAngle = (i + 1) * segmentAngle;
      const color = activeSegmentColors[i % activeSegmentColors.length];
      
      const blendStart = i === 0 ? 0 : startAngle + 0.5;
      gradientParts.push(`${color} ${blendStart}deg ${endAngle}deg`);
    }
    return `conic-gradient(${gradientParts.join(', ')})`;
  };

  const spin = async () => {
    if (disabled || isSpinning) return;
    setIsIntroAnimating(false);
    setIsSpinning(true);

    try {
      // Ensure audio context is ready on user click
      await soundFX.ensureAudioContext();

      // 1. Get the pre-determined result from backend
      const rawWinningIndex = await onSpinRequest();
      const winningIndex = (Number.isInteger(rawWinningIndex) && rawWinningIndex >= 0 && rawWinningIndex < numSegments)
        ? rawWinningIndex
        : 0;

      // 2. Calculate target rotation
      const extraRotations = 5 * 360; 
      const segmentCenter = (winningIndex * segmentAngle) + (segmentAngle / 2);
      const targetAngle = 360 - segmentCenter;
      const startRot = rotation;
      const finalRotation = startRot + extraRotations + targetAngle + (360 - (startRot % 360));

      setRotation(finalRotation);

      // 3. Frame-perfect segment pin tracking via requestAnimationFrame
      const duration = 4000;
      const startTime = performance.now();
      let lastPinCrossed = Math.floor(startRot / segmentAngle);

      const trackSpinPhysics = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        
        // Easing curve matching CSS cubic-bezier(0.1, 0.7, 0.1, 1)
        const ease = 1 - Math.pow(1 - progress, 3.2);
        const currentAngle = startRot + (finalRotation - startRot) * ease;

        const currentPin = Math.floor(currentAngle / segmentAngle);
        if (currentPin > lastPinCrossed) {
          const speedMultiplier = 1.0 + (1 - progress) * 0.25;
          soundFX.playTactileTick(speedMultiplier);
          lastPinCrossed = currentPin;
        }

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(trackSpinPhysics);
        } else {
          soundFX.playMechanicalStop();
        }
      };

      animFrameRef.current = requestAnimationFrame(trackSpinPhysics);

      setTimeout(() => {
        setIsSpinning(false);
        const won = rewards[winningIndex];
        if (won && won.type !== 'None') {
          soundFX.playRewardConfirmation();
        } else {
          soundFX.playMissTone();
        }
        onSpinComplete(won);
      }, 4000);
    } catch {
      // Handle error, reset spinning state
      setIsSpinning(false);
    }
  };

  const handleCenterClick = () => {
    if (disabled && !isSpinning) {
      soundFX.playEmptyTap();
      return;
    }
    spin();
  };

  return (
    <div className={styles.mainWheelWrapper}>
      <div className={styles.wheelContainer}>
        {/* Tangible Ticking Pointer Component */}
        <WheelPointer isSpinning={isSpinning} />

        {/* Floating SpinLoader */}
        {isSpinning && <SpinLoader />}
        
        <div className={`${styles.wheelOuter} ${isGoldenSpin ? styles.goldenWheelOuter : ''} ${isIntroAnimating ? styles.intro3DSpinLeftToRight : ''}`}>
          {/* Rotating Outer Rim Lightbulbs */}
          <div 
            className={styles.rimLightsContainer}
            style={{ 
              transform: `rotate(${rotation}deg)`
            }}
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={`dot-${i}`}
                className={styles.lightbulbWrapper}
                style={{ transform: `rotate(${i * 15}deg)` }}
              >
                <div className={`${styles.lightbulb} ${isSpinning || isIntroAnimating ? styles.lightbulbSpinning : ''}`} />
              </div>
            ))}
          </div>

          <div 
            className={`${styles.wheelInner} ${isGoldenSpin ? styles.goldenWheelInner : ''}`}
            style={{ 
              background: getWheelBackground(),
              transform: `rotate(${rotation}deg)`
            }}
          >
            {/* Subtle lighting overlay to add physical depth */}
            <div className={styles.wheelOverlay}></div>

            {disabled && !isSpinning && (
              <div className={styles.lockOverlay}>
                <div 
                  className={styles.lockIconWrapper} 
                  style={{ '--lock-rotation': `${-rotation}deg` }}
                >
                  <Lock size={32} />
                </div>
              </div>
            )}

            {safeRewards.map((reward, index) => {
              const rotationAngle = (index * segmentAngle) + (segmentAngle / 2);
              // Vibrant white text for Golden Spin slices, gold/silver for normal
              const textColor = isGoldenSpin ? '#FFFFFF' : (index % 2 === 0 ? '#D4AF37' : '#E0E6ED');
              
              // Text upright correction
              const isBottomHalf = rotationAngle > 90 && rotationAngle < 270;
              const contentRotation = isBottomHalf ? 180 : 0;
              const flexDirection = isBottomHalf ? 'column' : 'column-reverse';

              return (
                <div 
                  key={index} 
                  className={styles.segmentLabelWrapper}
                  style={{
                    transform: `rotate(${rotationAngle}deg)`
                  }}
                >
                  <div 
                    className={styles.segmentContent}
                    style={{ 
                      color: textColor,
                      textShadow: isGoldenSpin ? '0 2px 5px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.9)' : undefined,
                      transform: `translateX(-50%) rotate(${contentRotation}deg)`,
                      flexDirection: flexDirection
                    }}
                  >
                    <span className={styles.segmentIcon}>{reward.icon}</span>
                    <span className={styles.segmentText}>{reward.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Brushed Metal Center Button */}
          <button 
            className={`${styles.wheelCenter} ${isGoldenSpin ? styles.goldenWheelCenter : ''}`} 
            onClick={handleCenterClick}
            disabled={isSpinning}
          >
            <div className={`${styles.centerInner} ${isGoldenSpin ? styles.goldenCenterInner : ''}`}>
              {isSpinning ? (
                <span className={styles.spinText}>...</span>
              ) : isGoldenSpin ? (
                <div className={styles.goldenSpinBadge}>
                  <span className={styles.crownIcon}>👑</span>
                  <span className={styles.goldenTextTitle}>GOLDEN</span>
                  <span className={styles.goldenTextSub}>SPIN</span>
                </div>
              ) : (
                <span className={styles.spinText}>SPIN</span>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainWheel;
