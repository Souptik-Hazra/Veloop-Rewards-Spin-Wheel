# VELOOP Rewards – Frontend Development Task Assignment
## Task 15 – Complete Spin the Wheel Redesign
**Project:** Premium, Reward-Focused Spin Experience

### Existing Page Reference

**Current Spin the Wheel Page:** VELOOP Rewards – Spin the Wheel

Use the existing page to understand the current data, reward information, available spins, rules, and functionality.

> **Important**
> The existing page is reference only.
> Do not copy the existing UI, layout, card structure, colors, or interaction design.
> The objective is to completely rethink the Spin the Wheel experience while keeping the existing data and functionality intact.

---

## 1. Project Overview

The Spin the Wheel feature should become one of the most engaging sections of VELOOP Rewards.

The redesigned experience should combine:
**Premium Fintech + Gamification + Rewards + Excitement + Trust**

The user should immediately understand:
- How many spins they have
- What rewards are available
- How the wheel works
- What they can win
- Whether they are eligible to spin
- What happens after the spin
- How they can get additional spins

The experience should create a strong feeling of:
> "I want to come back and try again."

---

## 2. Primary Objective

Completely redesign and redevelop:
`/spin-wheel`

While keeping the existing:
- Reward data
- Spin-related data
- Rules
- Available spin information
- Existing functionality

The visual experience should be completely new.

---

## 3. Design Direction

The final UI should feel:
- Premium
- Modern
- Fintech-inspired
- Reward-focused
- Gamified
- Trustworthy
- Interactive
- Exciting
- Clean
- Sophisticated

It should not look like a cheap casino wheel.

> **Important:**
> The Spin the Wheel feature can be gamified without making VELOOP Rewards look like a gambling/casino platform.
> The visual language should remain consistent with a legitimate rewards and engagement platform.

---

## 4. Completely New UI

Do not simply redesign the current wheel with:
- New colors
- New borders
- New shadows
- Different fonts

Instead, rethink the entire experience.

You may completely change:
- Page layout
- Wheel presentation
- Reward display
- Spin counter
- Rules presentation
- CTA placement
- Result experience
- Progress indicators
- Supporting cards

---

## 5. Recommended Page Experience

One possible concept:

**SPIN & WIN**

Below:
1. Available Rewards
2. How It Works
3. Spin Rules
4. How to Get More Spins

This is only a starting idea. And avoid too many text!!

You are encouraged to develop a much stronger experience.

---

## 6. Hero Section

Create a visually strong hero section.

Possible heading:
> Spin. Discover. Get Rewarded.

Supporting text:
> Use your available spins and discover the reward waiting for you.

You can create your own copy if it improves the experience.

---

## 7. Spin Balance

The number of available spins must be immediately visible.

Example:
```
Available Spins
03 Spins
```

Use the actual user data dynamically.
The counter should have strong visual hierarchy.

---

## 8. Spin Counter Design

Instead of a plain number, create an attractive reward counter.

You may use:
- Ticket visual
- Coin-like counter
- Circular counter
- Progress indicator
- Digital counter

---

## 9. Main Wheel

The wheel should be the visual centerpiece.

It must be:
- Large
- Clear
- Attractive
- Interactive
- Easy to understand

The wheel should contain the same reward categories/data currently used on the existing page.

Do not invent official rewards.

---

## 10. Wheel Design

Create a premium wheel rather than a generic colorful game wheel.

Possible visual direction — **Premium Reward Wheel**. Use:
- Dark metallic wheel
- Gold/silver accents
- Elegant reward segments
- Subtle depth
- Premium center button
- Controlled highlights

Avoid:
- Rainbow wheel
- Neon segments
- Casino-style design
- Excessive flashing
- Cheap 3D effects

---

## 11. Wheel Center

The center of the wheel can contain:
`SPIN` or `SPIN NOW`

The button should feel like a premium interactive control.

Possible animation:
- Subtle pulse
- Light sweep
- Hover elevation

---

## 12. Wheel Pointer

Create a clear pointer/indicator showing where the wheel stops.

The pointer can use:
- Gold
- Silver
- White
- Premium metallic appearance

It should be visually obvious.

---

## 13. Wheel Animation

The actual spin animation should feel satisfying.

When the user clicks **Spin Now**, the wheel should:
1. Enter active state.
2. Rotate smoothly.
3. Accelerate.
4. Maintain momentum.
5. Decelerate naturally.
6. Stop precisely on the selected reward.
7. Trigger the reward result experience.

Avoid an instant rotation.

---

## 14. Spin Animation Quality

The animation should feel: **Physical + Smooth + Premium**

Use easing and controlled motion.
Do not make the wheel spin infinitely or excessively fast.

---

## 15. Reward Result Experience

After the wheel stops, don't simply display:
> You won 100 VEs.

Create a premium reward reveal.

Example:
```
YOU WON!
100 VEs
Added to your rewards
[ Continue ]
```

The actual reward must come from the configured wheel data.

---

## 16. Reward Reveal Animation

Consider:
- Coin movement
- Reward card reveal
- Badge animation
- Subtle particles
- Scale animation
- Glow
- Counter increase

Keep it premium. Avoid excessive confetti.

---

## 17. Reward Confirmation

The result screen/modal should clearly show:
```
Reward Won
+ XXX VEs
```
or the appropriate reward type.

Then:
> Your reward has been added to your account.

Only show "added" if the frontend is actually connected to the backend. Otherwise, use a simulated state clearly for development.

---

## 18. Remaining Spins

After the result:
```
Remaining Spins
02
```

The counter should update visually.

Example flow:
```
03 Spins
   ↓
 Spin
   ↓
02 Spins Remaining
```

---

## 19. No Spins Available State

Create a beautiful empty/locked state.

Instead of simply disabling the wheel:
> **You're Out of Spins**
> Complete eligible activities to unlock more opportunities to spin.

CTA:
> Earn More Rewards →

or the appropriate existing route.

---

## 20. No-Spin Visual

The wheel should still remain attractive. You can:
- Slightly dim it
- Add a subtle lock
- Show a progress indicator
- Show "Next Spin" information if available

Do not make the entire page look disabled.

---

## 21. Get More Spins

If the platform provides ways to earn additional spins, clearly communicate them.

Possible — **Ways to Get More Spins** — cards such as:
- Complete eligible tasks
- Earn rewards
- Referral activity
- Daily engagement

Only use mechanisms that are actually supported by VELOOP Rewards.
If a future mechanism is proposed, label it as **Upcoming**.

---

## 22. Reward Preview

Below or beside the wheel, consider displaying: **Possible Rewards**

Show the available reward types in attractive mini-cards. For example:

| VEs Reward | Gems Reward | Tokens Reward |
|---|---|---|

Use the actual rewards configured on the existing page.

---

## 23. Reward Rarity

If the existing data supports different reward categories, you may introduce visual rarity:
- Standard
- Premium
- Rare
- Special

Do not assign fake probabilities or rarity levels unless they are approved/product-defined.

---

## 24. Rules Section

Create a clean **How Spin Works** section.

Possible steps:
- **01 — Get a Spin** — Use an eligible spin.
- **02 — Spin the Wheel** — Tap Spin Now.
- **03 — Discover Your Reward** — The wheel selects the reward.
- **04 — Keep Earning** — Return and participate again when more spins become available.

Use the actual rules from the existing page.

---

## 25. Spin Rules

Create a dedicated rules area.

Potential information:
- Number of available spins
- Eligibility
- How spins are obtained
- Reward behavior
- Any limitations
- Any expiry rules if applicable

Use the existing platform's actual rules. Do not invent rules.

---

## 26. Information Tooltips

Add `[i]` icons where clarification is useful.

Recommended:
- Available Spins
- Rewards
- Eligibility
- Spin rules
- Reward processing

Keep tooltip text short.

---

## 27. Spin History

If the existing system contains spin history or if the current page supports it, redesign it as: **Your Spin Activity**

Example:
```
+ 50 VEs
Spin Reward
Today · 5:32 PM

+ 10 Gems
Spin Reward
Yesterday · 8:12 PM
```

Use actual available data.
If history does not exist, you may propose it as an optional product idea rather than implementing fake history.

---

## 28. Daily Engagement

If spins are connected to daily engagement, you may introduce a subtle progress indicator.

Example:
```
Daily Progress
2 / 3 tasks completed
█████████████░░░
```

Only include this if it corresponds to the actual spin eligibility logic.

---

## 29. Retention-Oriented Design

The main objective is to increase user return and engagement without misleading users.

Use:
- Progress
- Anticipation
- Achievement
- Reward preview
- Available spin count
- Clear next action
- Future opportunity

The user should understand:
> "What can I do now?"
> "What do I need to do to come back and spin again?"

---

## 30. Streak/Progress Concept

You may propose a supporting progression concept such as:

**Spin Journey**
`Spin 01 → Spin 02 → Spin 03 → Bonus Opportunity`

This is optional. Do not implement additional reward mechanics without approval.

---

## 31. Trust Requirement

Because the feature involves rewards, the UI must communicate transparency.

Avoid making it feel like:
- Gambling
- Casino
- Betting
- Jackpot machine

Instead, it should feel like: **a gamified reward discovery feature.**

Use professional language.

---

## 32. Transparency

Where applicable, clearly communicate:
- What rewards are available
- How many spins the user has
- Eligibility
- What happens after spinning
- What reward was selected

Do not hide important information.

---

## 33. Fintech Visual Language

The page should use the same overall visual philosophy as the rest of VELOOP Rewards.

Think:
- Digital wallet
- Premium rewards
- Fintech dashboard
- Sophisticated gamification

Rather than:
- Arcade
- Casino
- Cartoon game

---

## 34. Background

Maintain the project-wide application background:
`#161827`

All cards and visuals must complement this background.

---

## 35. Color Direction

Recommended:
- Deep navy
- Gold
- Silver
- White
- Soft blue
- Warm yellow
- Muted purple

Use gradients carefully.

Avoid:
- Neon
- Rainbow
- Excessive glow
- Flashing colors
- Overly saturated gaming palettes

---

## 36. Illustrations

The Spin page may include supporting illustrations. Possible:
- Premium reward chest
- Digital coins
- Reward vault
- Wheel illustration
- Floating reward assets
- User/avatar interacting with the wheel

The wheel itself should remain the primary visual.

---

## 37. Responsive Requirements

The complete page must work across:

| Breakpoint | Width |
|---|---|
| Mobile | 320px+ |
| Tablet | 768px+ |
| Laptop | 1280px+ |
| Desktop | 1440px+ |
| Large screens | 1920px+ |

---

## 38. Mobile Wheel

The wheel should remain large enough to interact with comfortably.

On mobile:
- Wheel should fit the viewport
- No horizontal scrolling
- Spin button must be touch-friendly
- Reward information should stack
- Result modal should fit the screen
- Rules should be collapsible if necessary

---

## 39. Desktop Layout

You may use a two-column structure.
This is only a reference. A centered layout may work better.

---

## 40. Tablet Layout

Consider:
```
Hero
  ↓
Wheel + Spin Counter
  ↓
Rewards
  ↓
How It Works
  ↓
Rules
```

Keep the wheel visually dominant.

---

## 41. Animation Requirements

Use subtle animations for:
- Wheel spin
- Spin button
- Reward reveal
- Reward counter
- Card hover
- Method/state changes
- Progress
- Modal transitions

Avoid animation overload.

---

## 42. Accessibility

Ensure:
- Keyboard accessibility
- Focus states
- Accessible buttons
- Proper labels
- Good contrast
- Screen-reader-friendly status
- Touch-friendly controls

The spin result should also be communicated textually, not only visually.

---

## 43. Technology Stack

Use the existing project stack:
- React.js
- Vite
- Bootstrap
- CSS Modules (`.module.css`)
- React Hooks
- React Icons
- Lucide React
- Other relevant React libraries where appropriate

---

## 44. Component Architecture

Use reusable components.

Suggested structure:
```
src/
│
├── components/
│   ├── SpinHero/
│   ├── SpinBalance/
│   ├── SpinWheel/
│   ├── SpinButton/
│   ├── RewardPreview/
│   ├── RewardResult/
│   ├── SpinRules/
│   ├── SpinHowItWorks/
│   ├── SpinHistory/
│   └── NoSpinsState/
│
├── pages/
│   └── SpinWheel/
│
├── data/
├── hooks/
├── assets/
└── styles/
```

---

## 45. Data Requirement

Use the same data currently available on the existing Spin the Wheel page.

Do not remove existing reward values or important information. If the current data is:
- Reward values
- Number of spins
- Rules
- Available options

...keep them.

The redesign is primarily a UI/UX redevelopment, not a change to the reward system.

---

## 46. Dummy Data

If backend integration is not available during development, use dummy state/data for:
- Available spins
- Selected reward
- Spin status
- Loading
- Result
- Error

But structure the code so actual API data can easily replace the dummy values.

---

## 47. Required States

Design all important states.

- **Normal** — User has available spins.
- **Spinning** — Wheel is currently spinning.
- **Reward Revealed** — Spin has completed.
- **No Spins** — User has no available spins.
- **Loading** — Spin data is being loaded.
- **Error** — Spin request fails.
- **Processing** — If applicable.

---

## 48. Error State

Example:
> **Unable to Complete Spin**
> We couldn't process your spin right now. Please try again.

CTA: **Try Again**

Do not show raw technical errors.

---

## 49. Success State

Example:
```
Reward Unlocked
+50 VEs
Your spin reward has been recorded.
[ Continue ]
```

Use the actual reward selected by the system.

---

## 50. Local Development Requirement

Build and test the complete experience on your local system first.

Required process:
1. Visit the existing Spin the Wheel page.
2. Understand its data and functionality.
3. Plan the new experience.
4. Build the new UI locally.
5. Implement wheel animation.
6. Implement reward selection state.
7. Implement result state.
8. Implement no-spin state.
9. Implement responsive design.
10. Test all interactions.
11. Fix console errors.
12. Build production version.
13. Push to GitHub.
14. Deploy.
15. Test the live version.

---

## 51. GitHub Requirement

Push the complete source code to GitHub. Include:
- React components
- CSS Modules
- Assets
- Data
- Hooks
- README.md
- Configuration files

Do not upload:
- node_modules
- .env
- API keys
- Passwords
- Sensitive credentials

---

## 52. Deployment Requirement

Deploy using:
- Vercel, or
- Netlify

Vercel is recommended.

Verify `/spin-wheel` works correctly after deployment.

---

## 53. README.md

Create a professional README containing:
- Project Overview
- Spin the Wheel Features
- Reward System
- Spin Flow
- UI/UX Approach
- Technology Stack
- Installation
- Development Commands
- Folder Structure
- Responsive Behavior
- Animation Details
- Screenshots
- Live Demo
- GitHub Repository
- Author

---

## 54. Final Deliverables

Submit:

1. **GitHub Repository** — Complete source code.
2. **Live Deployment** — Vercel/Netlify URL.
3. **README.md** — Complete documentation.
4. **Screenshots**, including:
   - Desktop Spin Wheel
   - Tablet Spin Wheel
   - Mobile Spin Wheel
   - Available spin state
   - Wheel spinning state
   - Reward result
   - No-spins state
   - Error state
   - Reward preview
   - Rules section

---

## 56. Submission Checklist

- [ ] Existing Spin Wheel data preserved
- [ ] Existing reward information preserved
- [ ] Existing rules preserved
- [ ] Completely new UI created
- [ ] Premium wheel design
- [ ] Available spins displayed
- [ ] Spin CTA redesigned
- [ ] Wheel animation implemented
- [ ] Reward reveal implemented
- [ ] Reward result state implemented
- [ ] Remaining spins updated
- [ ] No-spins state implemented
- [ ] Loading state implemented
- [ ] Error state implemented
- [ ] Reward preview implemented
- [ ] How It Works section
- [ ] Rules section
- [ ] Retention-oriented UX
- [ ] #161827 background maintained
- [ ] No neon/cheap casino styling
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Laptop responsive
- [ ] Desktop responsive
- [ ] Large-screen responsive
- [ ] Animations implemented
- [ ] Accessibility considered
- [ ] Local development completed
- [ ] GitHub repository updated
- [ ] README.md completed
- [ ] Vercel/Netlify deployment completed
- [ ] Live /spin-wheel route tested
- [ ] GitHub link ready
- [ ] Live link ready

---

## 51. Project Timeline & Submission Deadline

*(Note: numbering repeats "51" in the source document)*

To ensure smooth project execution and timely review:

- **Project Assigned On:** 12 August 2026
- **Project Start Date:** 12 August 2026
- **Submission Deadline:** 25 August 2026
- **Submission Time:** 5:30 P.M. (IST)

---

## 57. Creative Freedom

You are encouraged to explore ideas beyond the traditional circular wheel. For example, you may propose:

- **Reward Vault Spin** — A premium vault opens and reveals the selected reward.
- **Digital Fortune Wheel** — A futuristic reward interface with a premium wheel and digital reward indicators.
- **Reward Journey** — The wheel becomes part of a progression system.
- **Interactive Reward Chamber** — The user interacts with a central reward mechanism rather than a conventional wheel.

These are only ideas. If you have a better concept, you are welcome to use it.

The only requirements are that the concept:
- Clearly communicates the Spin the Wheel functionality
- Preserves the existing data/functionality
- Feels trustworthy
- Feels premium
- Encourages engagement
- Fits the VELOOP Rewards ecosystem

---

## 58. Final Product Goal

The redesigned Spin the Wheel should feel like a premium reward experience, not simply a spinning graphic.

The ideal journey is:
> Check Spins → Explore Rewards → Spin → Discover → Receive → Continue Earning → Return

The user should immediately understand:
- How many spins do I have?
- What could I receive?
- What happens when I spin?
- What do I need to do to get more opportunities?

Most importantly, the experience should create positive anticipation and repeat engagement while maintaining the trust and professionalism expected from a modern rewards/fintech platform.

**Final design principle:**
> Make the user want to spin again, without making the product feel like a casino.
