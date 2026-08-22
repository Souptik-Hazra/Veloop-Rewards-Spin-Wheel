# 🎡 VELoop Rewards Spin Wheel

> A luxury gamified rewards and engagement spin wheel interface for the **VELoop** ecosystem.

[![Netlify Status](https://api.netlify.com/api/v1/badges/ada727ff-62e7-4e65-8ef3-3aad94c7c961/deploy-status)](https://app.netlify.com/projects/veloop-spin-wheel/deploys)
[![Frontend CI](https://github.com/Souptik-Hazra/Veloop-Rewards-Spin-Wheel/actions/workflows/ci.yml/badge.svg)](https://github.com/Souptik-Hazra/Veloop-Rewards-Spin-Wheel/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

---

## ✨ Key Features

### 🎡 1. Mechanical 3D Spin Wheel & GPU Acceleration
- **Physical Arcade Experience**: Features alternating dark metallic slate segments (`#1E293B`, `#334155`, `#475569`), 24 synchronized rotating marquee lightbulbs with rapid-chase animations, and a 3D needle pointer.
- **Multi-Device 60fps/120fps Smoothness**: Hardware-accelerated compositor layer promotion (`will-change: transform`, `backface-visibility: hidden`) and smooth `cubic-bezier(0.15, 0.85, 0.15, 1)` deceleration curves eliminating micro-stuttering across mobile and high-refresh desktop monitors.
- **Center "SPIN" Hub**: Brushed metallic button with interactive hover scaling, 24k gold text gradient, and breathing ambient glow.
- **100% Fair Spin & Secure**: Docked glassmorphic trust badge affirming cryptographic fairness and client-server determinism.

### 🗺️ 2. Win Streak Journey (3 Consecutive Wins)
- **3 Consecutive Wins Progress**: Tracks consecutive winning spins and resets progress back to `0` when landing on `Lose` (`reward.type === 'None'`).
- **Dynamic Timeline Nodes**: Displays step-by-step progress (`Win 01`, `Win 02`, `Win 03`) with active glowing beacons, completed gold medallions, and mystery treasure vaults.
- **Celebration Banner**: Shimmering celebration card with a gold CTA button that rewards players upon reaching 3 consecutive wins.

### 🎒 3. Live Inventory & Wallet Balances
- **Real-Time Asset Tracking**: Color-coded illuminated medallions for **Gems** (Cyan), **VE Tokens** (Gold), **Gift Cards** (Ruby Coral), and **Level XP** (Amber).
- **Glassmorphic Finish**: Frosted glass (`backdrop-filter: blur(16px)`), subtle gold interior rim light, and a pulsing live status indicator.

### 🎁 4. Ways to Get More Spins
- **Gamified Quest Hub**: Structured earn cards covering Daily Check-Ins (`+3 Spins/Day`), Daily Quests, VE/Gem conversions, Referral Bonuses (`+2 Spins/Friend`), and Level-Up Milestone Bundles.
- **Frosted Glassmorphism**: Transparent glassmorphic background (`linear-gradient` with `backdrop-filter: blur(10px)`) seamless with Spin History and Spin Rules.

### 🔊 5. Tactile Web Audio Engine (`TactileAudioService`)
- **Zero-Hang Lifecycle Management**: Instant Web Audio node disconnect on completion + `cancelAnimationFrame` cleanup preventing main-thread freezes or memory leaks.
- **Frame-Perfect Angular Synchronization**: Mechanical clicks are tracked along the wheel's actual cubic-bezier deceleration curve using `requestAnimationFrame`, triggering sound only when a physical segment pin crosses the pointer needle.
- **5-Spin 3D Intro Sound Sequence**: Synthesizes 5 synchronized metallic clicks ($1800\text{Hz} \to 600\text{Hz}$) matching 3D revolutions on page navigation underlaid by an $850\text{Hz} \to 160\text{Hz}$ whirring glide.
- **Contextual Soundscapes**:
  - 🎯 **Tactile Pin Ticks**: Dual-layered transient click + metallic snap.
  - 🔒 **Mechanical Stop**: Solid lock-in latch click.
  - 🏆 **Win Confirmation**: 3-note harmonic crystal arpeggio (`A5 → C#6 → E6`).
  - 🥺 **Miss / No Reward**: Gentle, sympathetic soft chord (`A4 → G4 → F4`).
  - ⚠️ **Empty Spin Tap**: Soft double-thud on 0 spins.
  - 📑 **Tab Switch**: Crisp UI micro-click.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Bundler & Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: Modular CSS (CSS Modules) + Custom Luxury Fintech Design Tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio**: Native Web Audio API (`AudioContext`, `GainNode`, `BiquadFilterNode`, `OscillatorNode`)
- **Linter & Code Quality**: [Oxlint](https://oxc.rs/)
- **CI / CD**: GitHub Actions (concurrency cancellation, path filtering, and artifact archiving)

---

## 📁 Repository Structure

```text
Veloop/
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated CI pipeline with concurrency & artifact archiving
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MainWheel/        # Wheel rendering, marquee rotation & spin physics
│   │   │   ├── RewardPreview/    # Possible rewards preview with rarity badges
│   │   │   ├── RewardResult/     # Prize unlock dialog modal
│   │   │   ├── SpinHistory/      # Activity & spin history logs
│   │   │   ├── SpinJourney/      # 3 Consecutive Wins streak timeline & celebration card
│   │   │   ├── SpinLoader/       # Floating spin state indicator
│   │   │   ├── SpinRules/        # 'How It Works' guide with animated connectors
│   │   │   ├── SuccessCelebration/ # Physics-based golden confetti particle bursts
│   │   │   ├── Tooltip/          # Accessible tooltip helpers
│   │   │   ├── WalletBalances/   # Your Inventory asset cards with live indicator
│   │   │   ├── WaysToEarn/       # 'Get More Spins' actionable quest cards
│   │   │   └── WheelPointer/     # 3D needle pointer with physics ticking animation
│   │   ├── config/
│   │   │   ├── api.config.js     # Backend API endpoints & mock fallback configuration
│   │   │   └── constants.js      # Reward tiers, probability weights, and rarity definitions
│   │   ├── pages/
│   │   │   └── SpinWheel/        # Main layout, 2:1 desktop grid, and tab views
│   │   ├── services/
│   │   │   └── apiService.js     # Backend integration & optimistic updates
│   │   ├── utils/
│   │   │   └── audioService.js   # Production-hardened TactileAudioService engine
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v22 LTS recommended)
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Souptik-Hazra/Veloop-Rewards-Spin-Wheel.git
   cd Veloop-Rewards-Spin-Wheel/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 🧪 Verification & Build Scripts

```bash
# Run lightning-fast linter
npm run lint

# Compile production bundle with Vite
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 Security & Fair Play

- **Deterministic Server-Side Verification**: Results can be calculated server-side with cryptographic seeds before the animation is initiated.
- **Optimistic State Management**: Balances and spin counts update optimistically with rollback handling on network failure.
- **Strict Audio & Animation Isolation**: Audio synthesis and confetti particle generation run entirely on the UI thread without influencing prize determination.
