import React from 'react';
import SuccessCelebration from '../SuccessCelebration/SuccessCelebration';

const RewardResult = ({ showResult, wonReward, availableSpins, closeResult, styles }) => {
  if (!showResult) return null;

  return (
    <div 
      className={styles.modalOverlay} 
      role="dialog" 
      aria-labelledby="modal-title" 
      aria-describedby="modal-desc"
      aria-live="assertive"
    >
      <SuccessCelebration isActive={wonReward?.type !== 'None'} />
      <div className={styles.modalContent}>
        <div className={styles.modalIcon} aria-hidden="true">{wonReward?.icon}</div>
        
        {wonReward?.type !== 'None' ? (
          <>
            <h2 id="modal-title" className={styles.modalTitle}>Reward Unlocked</h2>
            <div id="modal-desc" className={styles.modalReward}>+ {wonReward?.label}</div>
            <p className={styles.modalDesc}>Your spin reward has been recorded.</p>
          </>
        ) : (
          <>
            <h2 id="modal-title" className={styles.modalTitle}>No Reward</h2>
            <div id="modal-desc" className={styles.modalReward} style={{color: '#E0E6ED'}}>Better luck next time.</div>
            <p className={styles.modalDesc}>Keep completing tasks to earn more spins.</p>
          </>
        )}

        <div style={{color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem'}}>
          Remaining Spins: <strong style={{color: 'var(--gold-light)', fontSize: '1.1rem', marginLeft: '0.2rem'}}>{availableSpins < 10 ? `0${availableSpins}` : availableSpins}</strong>
        </div>

        <button className={styles.modalBtn} onClick={closeResult}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default RewardResult;
