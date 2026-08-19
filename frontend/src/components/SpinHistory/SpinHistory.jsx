import React, { useState, useEffect } from 'react';
import styles from './SpinHistory.module.css';
import { ChevronLeft, ChevronRight, Calendar, Loader2, History } from 'lucide-react';

// --- MOCK BACKEND SERVICE ---
// This simulates an API call to a backend database.
// Ready to be replaced by a real fetch/axios call to your backend.

const MOCK_MONTHS = ['August 2026', 'July 2026', 'June 2026'];
const MOCK_DB = (() => {
  const data = [];
  const rewards = ['+ 50 VEs', '+ 2 Gems', '+ 10 XP', 'Gift Card ₹5', 'No Reward'];
  let id = 1;
  MOCK_MONTHS.forEach(month => {
    const count = Math.floor(Math.random() * 4) + 12; // 12-15 items per month
    for (let i = 0; i < count; i++) {
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      data.push({
        id: id++,
        reward: reward,
        type: reward === 'No Reward' ? 'Better luck next time' : 'Spin Reward',
        time: `${month.split(' ')[0]} ${Math.floor(Math.random() * 28) + 1} · ${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 50) + 10} PM`,
        month: month
      });
    }
  });
  return data;
})();

// Simulated API endpoint
const fetchSpinHistoryAPI = async (month, page, limit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = MOCK_DB.filter(item => item.month === month);
      const totalItems = filteredData.length;
      const totalPages = Math.ceil(totalItems / limit);
      
      const start = (page - 1) * limit;
      const paginatedItems = filteredData.slice(start, start + limit);
      
      resolve({
        data: paginatedItems,
        meta: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalItems,
          availableMonths: MOCK_MONTHS
        }
      });
    }, 600); // 600ms network delay simulation
  });
};
// -----------------------------

const ITEMS_PER_PAGE = 5;

const SpinHistory = () => {
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Backend-ready states
  const [historyItems, setHistoryItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [availableMonths, setAvailableMonths] = useState(MOCK_MONTHS);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data whenever month or page changes
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const loadData = async () => {
      try {
        // In the future, replace this with your real API call:
        // const response = await api.get(`/spin-history?month=${selectedMonth}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
        const response = await fetchSpinHistoryAPI(selectedMonth, currentPage, ITEMS_PER_PAGE);
        
        if (isMounted) {
          setHistoryItems(response.data);
          setTotalPages(response.meta.totalPages);
          setAvailableMonths(response.meta.availableMonths);
        }
      } catch (error) {
        console.error("Failed to fetch spin history:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [selectedMonth, currentPage]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1); // Reset to first page when month changes
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <History size={18} className={styles.titleIcon} />
          Your Spin Activity
        </h3>
        <div className={styles.filterWrapper}>
          <Calendar size={14} className={styles.filterIcon} />
          <select 
            className={styles.monthSelect} 
            value={selectedMonth} 
            onChange={handleMonthChange}
            aria-label="Filter activity by month"
            disabled={isLoading}
          >
            {availableMonths.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className={styles.list}>
        {isLoading ? (
          <div className={styles.loadingState}>
            <Loader2 className={styles.spinner} size={24} />
            <span>Loading activity...</span>
          </div>
        ) : historyItems.length > 0 ? (
          historyItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemMain}>
                <span className={styles.reward} style={{ color: item.reward === 'No Reward' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                  {item.reward}
                </span>
                <span className={styles.type}>{item.type}</span>
              </div>
              <div className={styles.time}>{item.time}</div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>No activity found for this month.</div>
        )}
      </div>

      {!isLoading && totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageBtn} 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <span className={styles.pageInfo}>
            Page <span>{currentPage}</span> of {totalPages}
          </span>
          <button 
            className={styles.pageBtn} 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SpinHistory;
