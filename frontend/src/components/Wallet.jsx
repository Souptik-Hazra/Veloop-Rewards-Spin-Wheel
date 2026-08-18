import React, { useState } from 'react';
import styles from './Wallet.module.css';
import { 
  ChevronLeft, 
  CheckCircle2, 
  RefreshCw, 
  Copy, 
  Lock, 
  ShieldCheck, 
  CheckCircle,
  Coins,
  Wallet as WalletIcon,
  ArrowUpRight,
  Trophy,
  Info,
  Clock,
  Shield,
  Users
} from 'lucide-react';
import { FaAmazonPay, FaGooglePlay, FaPaypal } from 'react-icons/fa';

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('payment');

  return (
    <div className={styles.walletContainer}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.backBtn}>
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.headerTitle}>Wallet</h1>
      </header>

      {/* Net Worth Section */}
      <section className={styles.netWorthCard}>
        <div className={styles.cardHeader}>
          <div className={styles.badges}>
            <span className={`${styles.badge} ${styles.badgeVerified}`}>
              <CheckCircle2 size={14} /> Verified
            </span>
            <span className={`${styles.badge} ${styles.badgeLevel}`}>
              Lvl 0
            </span>
          </div>
          <div className={styles.actions}>
            <button className={styles.iconBtn}><RefreshCw size={18} /></button>
            <button className={styles.iconBtn}><Copy size={18} /></button>
          </div>
        </div>

        <h2 className={styles.netWorthTitle}>NET WORTH</h2>
        
        <div className={styles.veBalance}>
          <Coins className={styles.veIcon} size={24} />
          <span><strong style={{fontSize: '1.2rem'}}>0</strong> Available VEs</span>
        </div>

        <div className={styles.balanceAmount}>₹0</div>
        <div className={styles.balanceSub}>Current VEs Value | Lifetime: ₹0</div>

        <div className={styles.securityFooter}>
          <div className={styles.securityItem}>
            <Lock size={14} className={styles.securityIcon} /> Encrypted
          </div>
          <div className={styles.securityItem}>
            <ShieldCheck size={14} className={styles.securityIcon} /> Fraud Protection
          </div>
          <div className={styles.securityItem}>
            <CheckCircle size={14} className={styles.securityIcon} /> Protected Withdrawals
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIconWrapper} ${styles.statIconYellow}`}>
            <Coins size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Available VEs</span>
            <span className={styles.statValue}>0</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={`${styles.statIconWrapper} ${styles.statIconBlue}`}>
            <WalletIcon size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Est. Balance</span>
            <span className={styles.statValue}>₹ 0</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIconWrapper} ${styles.statIconGreen}`}>
            <ArrowUpRight size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Withdrawn</span>
            <span className={styles.statValue}>₹ 0</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIconWrapper} ${styles.statIconPurple}`}>
            <Trophy size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Current Rank</span>
            <span className={styles.statValue}>Lvl 0</span>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <section className={styles.tabsSection}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'payment' ? styles.active : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            Payment Methods
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'history' ? styles.active : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Transactions History
          </button>
        </div>

        {activeTab === 'payment' && (
          <div>
            <div className={styles.notice}>
              <Info size={18} />
              Select a withdrawal method to continue.
            </div>

            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Withdraw Funds</h3>
              <p className={styles.sectionSub}>Select your preferred withdrawal method</p>
            </div>

            <div className={styles.paymentGrid}>
              {/* UPI */}
              <div className={styles.paymentCard}>
                <div className={styles.cardTop}>
                  <div className={styles.logoBox}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" />
                  </div>
                  <span className={`${styles.cardBadge} ${styles.badgeInstant}`}>Instant</span>
                </div>
                <h4 className={styles.paymentName}>UPI Transfer</h4>
                <p className={styles.paymentDesc}>Instant Bank Transfer</p>
                <div className={styles.paymentTime}>
                  <Clock size={14} /> Processing within 24 hours
                </div>
              </div>

              {/* Amazon Pay */}
              <div className={styles.paymentCard}>
                <div className={styles.cardTop}>
                  <div className={styles.logoBox}>
                    <FaAmazonPay color="#000" size={32} />
                  </div>
                  <span className={`${styles.cardBadge} ${styles.badgePopular}`}>Popular</span>
                </div>
                <h4 className={styles.paymentName}>Amazon Pay</h4>
                <p className={styles.paymentDesc}>Gift Card Balance</p>
                <div className={styles.paymentTime}>
                  <Clock size={14} /> Instant delivery
                </div>
              </div>

              {/* Google Play */}
              <div className={styles.paymentCard}>
                <div className={styles.cardTop}>
                  <div className={styles.logoBox}>
                    <FaGooglePlay color="#34a853" size={28} />
                  </div>
                  <span className={`${styles.cardBadge} ${styles.badgeFast}`}>Fast</span>
                </div>
                <h4 className={styles.paymentName}>Google Play</h4>
                <p className={styles.paymentDesc}>App Store Credit</p>
                <div className={styles.paymentTime}>
                  <Clock size={14} /> Global redemption
                </div>
              </div>

              {/* PayPal */}
              <div className={`${styles.paymentCard} ${styles.disabled}`}>
                <div className={styles.cardTop}>
                  <div className={styles.logoBox}>
                    <FaPaypal color="#003087" size={28} />
                  </div>
                  <Lock size={16} className={styles.lockIcon} />
                </div>
                <h4 className={styles.paymentName}>PayPal</h4>
                <p className={styles.paymentDesc}>Coming Soon<br/><br/>Currently unavailable in your region</p>
              </div>
            </div>

            {/* Security & Trust */}
            <div className={styles.sectionHeader}>
              <h4 style={{marginBottom: '1rem'}}>Security & Trust</h4>
              <div className={styles.trustRow}>
                <div className={styles.trustItem}>
                  <Shield size={18} className={styles.trustIcon} /> Secure Payments
                </div>
                <div className={styles.trustItem}>
                  <Users size={18} className={styles.trustIcon} /> 100,000+ Users
                </div>
                <div className={styles.trustItem}>
                  <Clock size={18} className={styles.trustIcon} /> 24 Hour Processing
                </div>
                <div className={styles.trustItem}>
                  <CheckCircle size={18} className={styles.trustIcon} /> Verified Transactions
                </div>
              </div>
              <button className={styles.continueBtn}>
                Continue Withdrawal <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div style={{color: 'var(--text-muted)', textAlign: 'center', padding: '3rem'}}>
            <p>No recent transactions.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Wallet;
