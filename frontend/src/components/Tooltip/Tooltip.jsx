import React, { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';
import styles from './Tooltip.module.css';

const Tooltip = ({ text, id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const toggleTooltip = () => setIsVisible(!isVisible);

  return (
    <div className={styles.tooltipContainer} ref={containerRef}>
      <button
        type="button"
        className={styles.triggerButton}
        onClick={toggleTooltip}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-label="More information"
        aria-describedby={isVisible ? id : undefined}
      >
        <Info size={16} />
      </button>
      
      {isVisible && (
        <div id={id} className={styles.popover} role="tooltip">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
