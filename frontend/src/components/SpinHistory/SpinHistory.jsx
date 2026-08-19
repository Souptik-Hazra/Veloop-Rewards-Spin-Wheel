import React, { useState, useEffect } from 'react';
import styles from './SpinHistory.module.css';
import { ChevronLeft, ChevronRight, Calendar, Loader2, History } from 'lucide-react';
import { apiService } from '../../services/apiService';

const ITEMS_PER_PAGE = 5;

const SpinHistory = () => {
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Backend-ready states
  const [historyItems, setHistoryItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [availableMonths, setAvailableMonths] = useState(['August 2026', 'July 2026', 'June 2026']);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data whenever month or page changes
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const loadData = async () => {
      try {
        const response = await apiService.getSpinHistory({
          month: selectedMonth,
          page: currentPage,
          limit: ITEMS_PER_PAGE
        });
        
        if (isMounted && response) {
          setHistoryItems(response.data || []);
          if (response.meta) {
            setTotalPages(response.meta.totalPages || 1);
            if (response.meta.availableMonths) {
              setAvailableMonths(response.meta.availableMonths);
            }
          }
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
