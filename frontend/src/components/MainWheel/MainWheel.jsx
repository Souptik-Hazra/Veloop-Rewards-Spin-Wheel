import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import styles from './MainWheel.module.css';
import SpinLoader from '../SpinLoader/SpinLoader';
import WheelPointer from '../WheelPointer/WheelPointer';
import { soundFX } from '../../utils/audioService';

// Premium Fintech metallic segments - Distinct medium-dark slate (visible but not white)
const segmentColors = ['#334155', '#1E293B', '#475569'];

const MainWheel = ({ rewards, onSpinRequest, onSpinComplete, isSpinning, setIsSpinning, disabled }) => {
  const [rotation, setRotation] = useState(0);

  const numSegments = rewards.length;
  const segmentAngle = 360 / numSegments;

  // Wheel background uses alternating dark metallic colors
  const getWheelBackground = () => {
    let gradientParts = [];
    for (let i = 0; i < numSegments; i++) {
      const startAngle = i * segmentAngle;
      const endAngle = (i + 1) * segmentAngle;
      const color = segmentColors[i % segmentColors.length];
      
      // Add a tiny 0.5deg interpolation between segments to fix sub-pixel rendering gaps in browsers
      const blendStart = i === 0 ? 0 : startAngle + 0.5;
      gradientParts.push(`${color} ${blendStart}deg ${endAngle}deg`);
    }
    return `conic-gradient(${gradientParts.join(', ')})`;
  };

  const spin = async () => {
    if (disabled || isSpinning) return;
    setIsSpinning(true);

    try {
      // Ensure audio context is ready on user click
      await soundFX.ensureAudioContext();

      // 1. Get the pre-determined result from backend
      const winningIndex = await onSpinRequest();

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
          requestAnimationFrame(trackSpinPhysics);
        } else {
          soundFX.playMechanicalStop();
        }
      };

      requestAnimationFrame(trackSpinPhysics);

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
        
        <div className={styles.wheelOuter}>
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
                <div className={`${styles.lightbulb} ${isSpinning ? styles.lightbulbSpinning : ''}`} />
              </div>
            ))}
          </div>

          <div 
            className={styles.wheelInner}
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

            {rewards.map((reward, index) => {
              const rotationAngle = (index * segmentAngle) + (segmentAngle / 2);
              // Alternate text color between gold and silver for premium look
              const textColor = index % 2 === 0 ? '#D4AF37' : '#E0E6ED';
              
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
            className={styles.wheelCenter} 
            onClick={handleCenterClick}
            disabled={isSpinning}
          >
            <div className={styles.centerInner}>
              <span className={styles.spinText}>{isSpinning ? '...' : 'SPIN'}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainWheel;
