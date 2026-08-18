# VELOOP Rewards – Premium Spin the Wheel

A fully responsive, premium fintech-inspired Spin the Wheel feature built with React, Vite, and CSS Modules.

## Project Overview
This project replaces a generic casino-style spinning wheel with a sophisticated, gamified rewards experience designed for the VELOOP platform. It adheres strictly to modern UI/UX practices, emphasizing trust, transparency, and engagement without relying on gambling tropes.

## Features
- **Premium Gamification**: Dark metallic wheel with gold and silver accents (`#161827` base theme).
- **Smooth Physics Engine**: Custom CSS `cubic-bezier` timing ensures a natural acceleration and deceleration curve during spins.
- **Dynamic Reward Injection**: Supports dynamic injection of rewards into the wheel and automatically rotates text to remain upright on the bottom half of the wheel.
- **Robust State Management**: Includes built-in support for Loading, Error, Successful Result, and Out-of-Spins locked states.
- **100% Accessible**: Fully navigable via keyboard, complete with `:focus-visible` styling, screen-reader friendly ARIA Live regions, and accessible tooltip controls.
- **Fully Responsive**: Adapts flawlessly across Mobile (320px+), Tablet, Laptop, and Desktop viewports via CSS Grid and Flexbox ordering.

## Technology Stack
- **Framework**: React.js 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS Modules (`.module.css`) for locally scoped styling
- **Icons**: Lucide React

## Component Architecture
The application features a clean, highly modular structure for maximum reusability:
```text
src/
├── components/
│   ├── MainWheel/        # The spinning wheel physics & rendering
│   ├── RewardPreview/    # Grid displaying potential rewards
│   ├── RewardResult/     # Success modal popup
│   ├── SpinHero/         # Top-level balance and user controls
│   ├── SpinRules/        # Collapsible instructions and rules
│   └── Tooltip/          # Custom accessible popover
└── pages/
    └── SpinWheel/        # Main route coordinating all components
```

## Installation & Setup

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Development Decisions
- **Gambling Tropes Eradicated**: All percentage odds and neon colors were removed from the UI to maintain trust. The section is named "Possible Rewards", focusing on discovery.
- **No Overflow Clipping**: The Hero card originally clipped Tooltips due to `overflow: hidden`. This was resolved by migrating the gold glow into the parent container's multiple-background layer.
- **Collapsible Mobile Rules**: To save valuable vertical space on smaller viewports, the "Spin Rules" component utilizes state to function as a toggleable accordion specifically on mobile devices.

## Author
Developed for the VELOOP Rewards platform.
