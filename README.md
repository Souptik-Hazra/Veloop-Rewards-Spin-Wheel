# 🎡 VELoop Rewards Spin Wheel

> A luxury gamified rewards and engagement spin wheel interface for the **VELoop** ecosystem.

[![Netlify Status](https://api.netlify.com/api/v1/badges/ada727ff-62e7-4e65-8ef3-3aad94c7c961/deploy-status)](https://app.netlify.com/projects/veloop-spin-wheel/deploys)
[![Frontend CI](https://github.com/Souptik-Hazra/Veloop-Rewards-Spin-Wheel/actions/workflows/ci.yml/badge.svg)](https://github.com/Souptik-Hazra/Veloop-Rewards-Spin-Wheel/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ Key Features

### 🎡 1. Mechanical 3D Spin Wheel
- **Physical Arcade Experience**: Features alternating dark metallic slate segments, 24 synchronized rotating marquee lightbulbs with rapid-chase animations, and a 3D needle pointer casting layered depth shadows over passing pins.
- **Center "SPIN" Hub**: Brushed metallic button with interactive hover scaling, 24k gold text gradient, and breathing ambient glow.
- **100% Fair Spin & Secure**: Docked glassmorphic trust badge affirming cryptographic fairness and client-server determinism.

### 🗺️ 2. Gamified Spin Journey
- **2:1 Column Alignment**: Harmoniously spans Columns 1 & 2 on desktop to align directly alongside *Your Inventory* on an identical baseline.
- **3D Medallions & Glowing Conduits**: 3D gold coins for completed steps, pulsating active beacons with floating star indicators, and illuminated mystery treasure vaults.
- **Universal Multi-Device Celebration**: Shimmering celebration card with a gold CTA button that adapts from desktop banners down to compact vertical mobile cards.

### 🎒 3. Live Inventory & Wallet Balances
- **Real-Time Asset Tracking**: Color-coded illuminated medallions for **Gems** (Cyan), **VE Tokens** (Gold), **Gift Cards** (Ruby Coral), and **Level XP** (Amber).
- **Glassmorphic Finish**: Frosted glass (`backdrop-filter: blur(16px)`), subtle gold interior rim light, and a pulsing live status indicator.

### 🎁 4. Ways to Get More Spins
- **Gamified Quest Hub**: 5 structured earn cards covering Daily Check-Ins (`+3 Spins/Day`), Daily Quests, VE/Gem conversions, Referral Bonuses (`+2 Spins/Friend`), and Level-Up Milestone Bundles.
- **High-Density Responsive Cards**: 2-tier card architecture preventing line-wrapping issues across mobile and desktop.

### 🔊 5. Tactile Web Audio Engine (`TactileAudioService`)
- **Frame-Perfect Angular Synchronization**: Mechanical clicks are tracked along the wheel's actual cubic-bezier deceleration curve using `requestAnimationFrame`, triggering sound only when a physical segment pin crosses the pointer needle.
- **Zero-Dependency Native Synthesis**: Uses the Web Audio API with centralized master `GainNode`, active node tracking/cleanup on unmount, and click-free mute transitions with `localStorage` persistence.
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
│   │   │   ├── SpinJourney/      # 3D Milestone quest timeline & bonus card
│   │   │   ├── SpinLoader/       # Floating spin state indicator
│   │   │   ├── SpinRules/        # 'How It Works' guide with animated connectors
│   │   │   ├── SuccessCelebration/ # Physics-based golden confetti particle bursts
│   │   │   ├── Tooltip/          # Accessible tooltip helpers
│   │   │   ├── WalletBalances/   # Your Inventory asset cards with live indicator
│   │   │   ├── WaysToEarn/       # 'Get More Spins' actionable quest cards
│   │   │   └── WheelPointer/     # 3D needle pointer with physics ticking animation
│   │   ├── config/
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

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
