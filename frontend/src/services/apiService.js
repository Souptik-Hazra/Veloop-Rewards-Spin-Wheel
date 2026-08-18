import { REWARDS } from '../config/constants';

export const apiService = {
  /**
   * Fetch initial user data (e.g., available spins)
   * This is a mock implementation that will be replaced with a real API call.
   */
  getUserData: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 5% chance to simulate an error
        if (Math.random() < 0.05) {
          reject(new Error("Network Error"));
        } else {
          resolve({ availableSpins: 5 });
        }
      }, 1200);
    });
  },

  /**
   * Request a spin result from the backend.
   * Instead of calculating the winner on the frontend, the frontend asks the backend
   * for the result.
   */
  performSpin: async () => {
    return new Promise((resolve) => {
      // Simulate network delay for API request
      setTimeout(() => {
        // The backend securely determines the winner
        const numSegments = REWARDS.length;
        const winningIndex = Math.floor(Math.random() * numSegments);
        
        resolve({ winningIndex });
      }, 500); // 500ms delay to simulate API roundtrip
    });
  }
};
