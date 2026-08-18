import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import styles from './MainWheel.module.css';
import SpinLoader from '../SpinLoader/SpinLoader';
import WheelPointer from '../WheelPointer/WheelPointer';

// Premium Fintech dark metallic segments
const segmentColors = ['#1A1D24', '#222630'];

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
      // 1. Get the pre-determined result from the parent / backend
      const winningIndex = await onSpinRequest();

      // 2. Calculate the target rotation based on the winning index
      // Smooth, premium spin (not infinitely spinning, just a long smooth physical rotation)
      const extraRotations = 5 * 360; 
      
      // The pointer is at the top (0 degrees).
      const segmentCenter = (winningIndex * segmentAngle) + (segmentAngle / 2);
      const targetAngle = 360 - segmentCenter;
      
      const finalRotation = rotation + extraRotations + targetAngle + (360 - (rotation % 360));

      setRotation(finalRotation);

      setTimeout(() => {
        setIsSpinning(false);
        onSpinComplete(rewards[winningIndex]);
      }, 4000);
    } catch {
      // Handle the error visually, reset spinning state
      setIsSpinning(false);
    }
  };

  return (
    <div className={styles.mainWheelWrapper}>
      <div className={styles.wheelContainer}>
        {/* Tangible Ticking Pointer Component */}
        <WheelPointer isSpinning={isSpinning} />

        {/* Floating SpinLoader */}
        {isSpinning && <SpinLoader />}
        
        <div className={styles.wheelOuter}>
          {disabled && !isSpinning && (
            <div className={styles.lockOverlay}>
              <div className={styles.lockIconWrapper}>
                <Lock size={32} />
              </div>
            </div>
          )}
          
          <div 
            className={styles.wheelInner}
            style={{ 
              background: getWheelBackground(),
              transform: `rotate(${rotation}deg)`
            }}
          >
            {/* Subtle lighting overlay to add physical depth */}
            <div className={styles.wheelOverlay}></div>

            {rewards.map((reward, index) => {
              const rotationAngle = (index * segmentAngle) + (segmentAngle / 2);
              // Alternate text color between gold and silver for premium look
              const textColor = index % 2 === 0 ? '#D4AF37' : '#E0E6ED';
              
              // Text upright correction
              // If the segment's base angle falls between 90° and 270° (the bottom half of the wheel),
              // it renders upside-down because it's rotated outwards. We counter-rotate it by 180°.
              const isBottomHalf = rotationAngle > 90 && rotationAngle < 270;
              const contentRotation = isBottomHalf ? 180 : 0;
              // When flipped 180°, we also flip flex-direction so the icon stays near the center.
              const flexDirection = isBottomHalf ? 'column' : 'column-reverse';

              return (
                <div 
                  key={index} 
                  className={styles.segmentLabelWrapper}
                  style={{
                    transform: `rotate(${rotationAngle}deg)`
                  }}
                >
                  {/* Text rotates outwards. Solid elegant colors. Upright text correction. */}
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
            onClick={spin}
            disabled={disabled || isSpinning}
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
