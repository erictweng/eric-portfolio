# DESIGN.md — Eric's Portfolio

## Overview
Personal portfolio for Eric Weng — a single-page scroll site showcasing projects, skills, experience, and contact links. Current direction leans freelance-first while staying reusable for SWE job-search positioning.

## Tech Stack
- **Framework:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS v4 plus CSS custom properties
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** GitHub Pages

## Theme System
The site currently defaults to dark mode through `ThemeProvider`. Light-theme CSS variables still exist, but the visible product is intentionally dark-first until positioning is finalized.

### Dark Theme
- **Accent:** Orange (#F97316)
- **Background:** Black (#000000)
- **Text:** White (#FFFFFF)

### Light Theme Variables
- **Accent:** Navy Blue (#1E3A5F)
- **Background:** White (#FFFFFF)
- **Text:** Black (#000000)

### Tailwind v4 Note
Use inline styles with `var(--color-accent)`, `var(--color-bg)`, and `var(--color-text)` for theme-aware colors. Do not assume custom Tailwind color utilities are available.

## Sections (scroll order)

### 1. Hero
- Giant outlined `ERIC WENG` wordmark in Orbitron 900.
- Orange accent line through the name.
- Subtitle: `FORWARD DEPLOYED ENGINEER`.
- Hero image behind wordmark.
- Tilted scrolling skill marquee.
- Bouncing scroll indicator.

### 2. About
- Narrative section explaining Eric's motivation and working style.

### 3. Services
- Five service/outcome cards with Lucide icons.
- Current content is freelance/business oriented.

### 4. Projects
- Project cards for Eric's work, currently including real project direction rather than blank placeholders.

### 5. Tech Stack
- Categorized technology badges.
- Live GitHub feed from the public GitHub Events API.
- Handles empty/fetch-failure state by showing no recent activity.

### 6. Experience
- Timeline-style experience section.

### 7. Contact
- Contact/social links for GitHub, LinkedIn, and email.

## Navigation
- Minimal fixed top nav.
- Left: `Eric Weng` wordmark.
- Right: GitHub, LinkedIn, and Mail icons.
- No nav links, hamburger, or visible theme toggle in the current design.

## Design Principles
- **Dark-first visual identity** — black/white/orange system.
- **Typography-driven** — Orbitron for identity moments.
- **Minimal navigation** — social/contact actions only.
- **Smooth but restrained motion** — Framer Motion reveal and marquee effects.
- **Fast static deployment** — Vite build served by GitHub Pages.

## Success Criteria
- [x] All seven sections render correctly.
- [x] Lint passes.
- [x] Production build passes.
- [x] Preview smoke test renders the page and sections.
- [ ] Finalize portfolio positioning: freelance, SWE jobs, or hybrid.
- [ ] Finalize whether light mode remains product behavior or is removed.
- [ ] Run a full accessibility/responsive QA pass.
