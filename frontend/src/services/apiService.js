import { apiClient } from './apiClient';
import { API_CONFIG } from '../config/api.config';
import { REWARDS } from '../config/constants';

// --- MOCK DATABASE FOR OFFLINE / FALLBACK DEVELOPMENT ---
const MOCK_STATE = {
  availableSpins: 8,
  spinsTaken: 0,
  balances: {
    gems: 150,
    ves: 1200,
    giftCard: 250,
    xp: 4500,
    coins: 1200
  },
  dailyBonus: {
    isClaimable: true,
    resetsInSeconds: 0,
    bonusSpins: 3
  },
  milestone: {
    spinsTaken: 0,
    totalMilestone: 3,
    isClaimed: false
  },
  history: [
    { id: 1, reward: '10 VEs', type: 'Spin Reward', time: 'Aug 19 · 1:15 PM', month: 'August 2026' },
    { id: 2, reward: 'Gift Card ₹2', type: 'Spin Reward', time: 'Aug 19 · 11:30 AM', month: 'August 2026' },
    { id: 3, reward: '2 Gems', type: 'Spin Reward', time: 'Aug 18 · 6:45 PM', month: 'August 2026' },
    { id: 4, reward: 'Lose', type: 'Better luck next time', time: 'Aug 18 · 2:10 PM', month: 'August 2026' },
    { id: 5, reward: '30 XP', type: 'Spin Reward', time: 'Aug 17 · 4:20 PM', month: 'August 2026' }
  ]
};

/**
 * Service providing high-level business operations for the Spin & Win feature.
 * Connects directly to backend endpoints, with smooth mock fallback when live backend is offline.
 */
export const apiService = {
  /**
   * Fetch current user profile, spin counts, balances, and daily bonus status.
   * Backend Endpoint: GET /api/spin-wheel/user-data
   * Expected Response: {
   *   availableSpins: number,
   *   spinsTaken: number,
   *   balances: { gems: number, ves: number, giftCard: number, xp: number, coins: number },
   *   dailyBonus: { isClaimable: boolean, resetsInSeconds: number, bonusSpins: number }
   * }
   */
  getUserData: async () => {
    if (!API_CONFIG.USE_MOCK_API) {
      try {
        return await apiClient.get(API_CONFIG.ENDPOINTS.USER_DATA);
      } catch (err) {
        console.warn('[apiService] Backend unreachable or failed, using mock data fallback:', err.message);
      }
    }

    // Mock Simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          availableSpins: MOCK_STATE.availableSpins,
          spinsTaken: MOCK_STATE.spinsTaken,
          balances: { ...MOCK_STATE.balances },
          dailyBonus: { ...MOCK_STATE.dailyBonus },
          milestoneIsClaimed: MOCK_STATE.milestone.isClaimed
        });
      }, 400);
    });
  },

  /**
   * Securely request a spin from the backend.
   * The backend validates available spins, deducts one, chooses the winning segment, updates balances in DB, and returns the result.
   * 
   * Backend Endpoint: POST /api/spin-wheel/spin
   * Expected Payload: { idempotencyKey?: string }
   * Expected Response: {
   *   winningIndex: number,
   *   reward: { label: string, value: number, type: string, icon: string, ... },
   *   availableSpins: number,
   *   spinsTaken: number,
   *   balances: { gems: number, ves: number, giftCard: number, xp: number, coins: number }
   * }
   */
  performSpin: async (payload = {}) => {
    if (!API_CONFIG.USE_MOCK_API) {
      try {
        return await apiClient.post(API_CONFIG.ENDPOINTS.PERFORM_SPIN, payload);
      } catch (err) {
        console.warn('[apiService] Real spin API request failed, using mock fallback:', err.message);
      }
    }

    // Mock Simulation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (MOCK_STATE.availableSpins <= 0) {
          return reject(new Error('Out of spins! Complete tasks or claim daily bonus to earn more.'));
        }

        const winningIndex = Math.floor(Math.random() * REWARDS.length);
        const reward = REWARDS[winningIndex];

        // Deduct spin
        MOCK_STATE.availableSpins = Math.max(0, MOCK_STATE.availableSpins - 1);
        
        // Track consecutive wins streak
        if (reward.type !== 'None') {
          MOCK_STATE.consecutiveWins = (MOCK_STATE.consecutiveWins || 0) + 1;
        } else {
          MOCK_STATE.consecutiveWins = 0; // Reset streak on Lose
        }
        MOCK_STATE.spinsTaken = MOCK_STATE.consecutiveWins;

        // Credit reward
        if (reward.type === 'VEs') {
          MOCK_STATE.balances.ves += reward.value;
          MOCK_STATE.balances.coins += reward.value;
        } else if (reward.type === 'Gems') {
          MOCK_STATE.balances.gems += reward.value;
        } else if (reward.type === 'XP') {
          MOCK_STATE.balances.xp += reward.value;
        } else if (reward.type === 'RS') {
          MOCK_STATE.balances.giftCard += reward.value;
        } else if (reward.type === 'Spin') {
          MOCK_STATE.availableSpins += reward.value;
        }

        // Record history
        MOCK_STATE.history.unshift({
          id: Date.now(),
          reward: reward.label || reward.wheelLabel,
          type: reward.type === 'None' ? 'Better luck next time' : 'Spin Reward',
          time: 'Just now',
          month: 'August 2026'
        });

        resolve({
          winningIndex,
          reward,
          availableSpins: MOCK_STATE.availableSpins,
          spinsTaken: MOCK_STATE.consecutiveWins,
          consecutiveWins: MOCK_STATE.consecutiveWins,
          balances: { ...MOCK_STATE.balances }
        });
      }, 500);
    });
  },

  /**
   * Claim daily bonus spins.
   * Backend Endpoint: POST /api/spin-wheel/claim-daily-bonus
   * Expected Response: {
   *   success: boolean,
   *   addedSpins: number,
   *   availableSpins: number,
   *   nextResetInSeconds: number,
   *   message: string
   * }
   */
  claimDailyBonus: async () => {
    if (!API_CONFIG.USE_MOCK_API) {
      try {
        return await apiClient.post(API_CONFIG.ENDPOINTS.CLAIM_DAILY_BONUS);
      } catch (err) {
        console.warn('[apiService] Daily bonus API request failed, using mock fallback:', err.message);
      }
    }

    // Mock Simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        MOCK_STATE.availableSpins += 3;
        MOCK_STATE.dailyBonus.isClaimable = false;
        MOCK_STATE.dailyBonus.resetsInSeconds = 86400; // 24 hours

        resolve({
          success: true,
          addedSpins: 3,
          availableSpins: MOCK_STATE.availableSpins,
          nextResetInSeconds: 86400,
          message: 'Claimed 3 Daily Bonus Spins!'
        });
      }, 600);
    });
  },

  /**
   * Claim milestone journey bonus (e.g. after taking 3 spins).
   * Backend Endpoint: POST /api/spin-wheel/claim-milestone
   * Expected Payload: { milestoneId?: number }
   * Expected Response: {
   *   success: boolean,
   *   addedSpins: number,
   *   availableSpins: number,
   *   spinsTaken: number,
   *   message: string
   * }
   */
  claimMilestoneBonus: async (payload = {}) => {
    if (!API_CONFIG.USE_MOCK_API) {
      try {
        return await apiClient.post(API_CONFIG.ENDPOINTS.CLAIM_MILESTONE, payload);
      } catch (err) {
        console.warn('[apiService] Milestone claim API request failed, using mock fallback:', err.message);
      }
    }

    // Mock Simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        MOCK_STATE.availableSpins += 1;
        MOCK_STATE.milestone.isClaimed = true;
        
        resolve({
          success: true,
          addedSpins: 1,
          availableSpins: MOCK_STATE.availableSpins,
          spinsTaken: MOCK_STATE.spinsTaken, // retains 3/3 wins until 24h reset
          isClaimed: true,
          message: 'Bonus Spin Unlocked and Claimed!'
        });
      }, 500);
    });
  },

  /**
   * Fetch paginated user spin history.
   * Backend Endpoint: GET /api/spin-wheel/history?month=...&page=...&limit=...
   * Expected Response: {
   *   data: Array<{ id, reward, type, time, month }>,
   *   meta: { currentPage, totalPages, totalItems, availableMonths }
   * }
   */
  getSpinHistory: async ({ month = 'August 2026', page = 1, limit = 5 } = {}) => {
    if (!API_CONFIG.USE_MOCK_API) {
      try {
        return await apiClient.get(API_CONFIG.ENDPOINTS.SPIN_HISTORY, { month, page, limit });
      } catch (err) {
        console.warn('[apiService] History API request failed, using mock fallback:', err.message);
      }
    }

    // Mock Simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = MOCK_STATE.history.filter(h => h.month === month);
        const totalItems = filtered.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / limit));
        const start = (page - 1) * limit;
        const paginated = filtered.slice(start, start + limit);

        resolve({
          data: paginated,
          meta: {
            currentPage: page,
            totalPages,
            totalItems,
            availableMonths: ['August 2026', 'July 2026', 'June 2026']
          }
        });
      }, 300);
    });
  }
};
