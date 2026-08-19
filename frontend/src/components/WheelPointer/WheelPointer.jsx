import React from 'react';
import styles from './WheelPointer.module.css';

const WheelPointer = ({ isSpinning }) => {
  return (
    <div className={styles.pointerContainer}>
      <div className={`${styles.pointerWrapper} ${isSpinning ? styles.ticking : ''}`}>
        <svg viewBox="0 0 100 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D8B4FE" />
              <stop offset="20%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#5B21B6" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Pin Outer Border (creates the rounded 3D lip) */}
          <path 
            d="M50 5 C20 5 5 25 5 50 C5 80 47 135 48.5 137 C49.2 138 50.8 138 51.5 137 C53 135 95 80 95 50 C95 25 80 5 50 5 Z" 
            fill="#B45309"
          />

          {/* Pin Inner Body */}
          <path 
            d="M50 8 C23 8 9 27 9 50 C9 77 48 128 50 131 C52 128 91 77 91 50 C91 27 77 8 50 8 Z" 
            fill="url(#goldGradient)"
          />

          {/* Purple Circle Border */}
          <circle cx="50" cy="48" r="30" fill="#4C1D95" />

          {/* Purple Circle Inner */}
          <circle cx="50" cy="48" r="27" fill="url(#purpleGradient)" />

          {/* Star */}
          <path
            d="M50 28 Q50 48 30 48 Q50 48 50 68 Q50 48 70 48 Q50 48 50 28 Z"
            fill="#FFFFFF"
            filter="url(#glow)"
          />
        </svg>
      </div>
    </div>
  );
};

export default WheelPointer;
