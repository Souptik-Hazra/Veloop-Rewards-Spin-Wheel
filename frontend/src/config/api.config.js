/**
 * Backend API Configuration
 * 
 * To connect to a live backend:
 * 1. Set VITE_API_BASE_URL in your .env file (e.g. VITE_API_BASE_URL=https://api.veloop.com/api)
 * 2. Set VITE_USE_MOCK_API=false (or leave undefined if backend is reachable)
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API === 'true' || false,
  TIMEOUT_MS: 15000,
  ENDPOINTS: {
    // User & Account Data
    USER_DATA: '/spin-wheel/user-data',
    
    // Spin Mechanics
    PERFORM_SPIN: '/spin-wheel/spin',
    
    // Bonuses & Milestones
    CLAIM_DAILY_BONUS: '/spin-wheel/claim-daily-bonus',
    CLAIM_MILESTONE: '/spin-wheel/claim-milestone',
    
    // History & Activity
    SPIN_HISTORY: '/spin-wheel/history',
    
    // Dynamic Ways to Earn
    WAYS_TO_EARN: '/spin-wheel/ways-to-earn',
  }
};

/**
 * Returns standard authentication and JSON headers for API calls.
 */
export const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('veloop_auth_token') || sessionStorage.getItem('veloop_auth_token') : null;
  
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};
