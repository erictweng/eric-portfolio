# DECISIONS.md

## Animation Style
- **Intensity:** Subtle and professional (Mannan.io-style)
- **Cursor:** Clean, no custom cursor effects
- **Scroll:** Flat scroll (no parallax)
- **Loading:** Brief loading animation/splash screen on initial load
- **Principles:** Smooth fade-ins, gentle hover states, nothing flashy

## Hero Design
- Giant outlined `ERIC WENG` — Orbitron font, weight 900, transparent fill, stroke-only
- Accent-colored horizontal line cuts through center of name
- `FORWARD DEPLOYED ENGINEER` subtitle in accent color, Orbitron, wide tracking
- Tilted skills marquee ribbon at bottom (2° tilt, accent bg, inverted text color)
- Bouncing scroll-down arrow at bottom
- NO CTA buttons, NO one-liner — pure visual statement
- Hero image sits behind the outlined wordmark
- Staggered entrance animations: name → line → subtitle → arrow

## Navbar
- Minimal: `Eric Weng` in Orbitron (left), GitHub/LinkedIn/Mail icons (right)
- NO nav links, NO theme toggle in nav, NO hamburger menu

## Portfolio Strategy
- Current copy/design leans **freelance-first** targeting small businesses
- Sell outcomes, not tech skills
- Ship fast, iterate after
- Pivot to job-seeker portfolio later if needed

## Hero One-Liner
Used as positioning guidance, not displayed on hero:

> Full stack engineer who's shipped production systems at scale. Now building for businesses that need to get online.

## Theme
- Current visible product defaults to dark mode
- Dark: black bg, white text, orange (#F97316) accent
- Light variables still exist: white bg, black text, navy (#1E3A5F) accent
- `ThemeProvider` is mounted once in `main.tsx`
- Context/types live in `src/context/theme.ts`; provider component lives in `src/context/ThemeContext.tsx`

## Architecture
- Single-page scroll site
- React 19 + Vite + TypeScript + Tailwind CSS v4 + Framer Motion
- Use inline styles with `var()` for theme colors — Tailwind v4 utility classes for custom colors are not reliable in this project
- GitHub Pages deployment uses `.github/workflows/deploy.yml` and publishes `dist`

## Projects
1. **UNCOLYMPICS / VROlympics** — project link direction was updated from the older Olympics-only entry
2. **Golf Leaderboard** — match/tournament tracking app
3. **Equipment & Shift Management Platform** — real-time tracking for 24/7 robotic ops (NDA, kept vague)

## Tech Stack
- Languages: Python, Java, C/C++, JavaScript, TypeScript, Rust
- Frameworks: React
- Tools/Data: Git, NoSQL, Claude/Cursor, ESP32
- Platforms: Unix/Linux, macOS, Windows

## Experience
- Database Engineer — TTS-Wireless (2017)
- UC Santa Cruz — B.S. (Fall 2022 – Fall 2025)
- The Bot Company — Robotics Operator & Full Stack Engineer (Oct 2025 – Present)
