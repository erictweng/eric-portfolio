# ARCHITECTURE-AUDIT.md — Eric Portfolio

Audited: 2026-09-29
Repo: `git@github.com:erictweng/eric-portfolio.git`
Local path: `/Users/aibert/projects/eric-portfolio`

## Summary

Eric Portfolio is a single-page React/Vite/TypeScript portfolio site with Tailwind CSS v4, Framer Motion animations, Lucide icons, and a CSS-variable theme system. It is currently structured as a section-based scroll site: each major portfolio section is a standalone React component under `src/sections/`, with app-level composition in `src/App.tsx`.

## Repository State

- Branch: `main`
- Current commit at clone: `2142460`
- Clone method: HTTPS through authenticated GitHub CLI because SSH public-key auth failed on this machine.
- Remote setup after clone:
  - `origin`: `https://github.com/erictweng/eric-portfolio.git`
  - `upstream`: `https://github.com/Wengs-aibert/eric-portfolio.git`

## Build / Verification

Commands checked:

```bash
npm ci
npm run build
npm run lint
```

Results:

- `npm ci`: succeeds; reports 13 vulnerabilities from current dependency tree.
- `npm run build`: succeeds after dependencies are installed.
- `npm run lint`: fails with 4 lint errors.

Current lint errors:

```text
src/context/ThemeContext.tsx
  react-refresh/only-export-components because ThemeContext.tsx exports useTheme along with ThemeProvider.

src/sections/TechStack.tsx
  3x @typescript-eslint/no-explicit-any in GitHub event parsing.
```

## Tech Stack

From `package.json` and project docs:

- React 19.2
- TypeScript 5.9
- Vite 7.3
- Tailwind CSS 4.2 via `@tailwindcss/vite`
- Framer Motion 12
- Lucide React icons
- React Hook Form is installed but the current `Contact.tsx` uses mail/GitHub links rather than an actual form.

## Runtime Architecture

```text
src/main.tsx
  -> StrictMode
  -> ThemeProvider
  -> App

src/App.tsx
  -> ThemeProvider again
  -> AppContent
      -> Navbar
      -> Hero
      -> About
      -> Services
      -> Projects
      -> TechStack
      -> Experience
      -> Contact
      -> Footer
```

Important note: `ThemeProvider` is currently mounted twice: once in `main.tsx` and again in `App.tsx`. That is probably unnecessary and may cause confusion. Since the inner provider controls the app content, the outer provider is redundant unless intentionally reserved for future global wrappers.

## Source Layout

```text
src/
  App.tsx
  main.tsx
  index.css
  assets/
    eric-hero.jpg
  components/
    Footer.tsx
    LoadingSplash.tsx
    Navbar.tsx
  context/
    ThemeContext.tsx
  hooks/
    useTheme.ts
  sections/
    About.tsx
    Contact.tsx
    Experience.tsx
    Hero.tsx
    Projects.tsx
    Services.tsx
    TechStack.tsx
```

## Component Responsibilities

### `App.tsx`

Composes the page. Imports all sections and wraps `AppContent` in `ThemeProvider`.

Current scroll order:

```text
Hero -> About -> Services -> Projects -> TechStack -> Experience -> Contact
```

This differs from `ai-context/DESIGN.md`, which specifies:

```text
Hero -> What I Do -> Projects -> Tech Stack -> Experience -> About -> Contact
```

The current order appears intentionally changed by sprint/design work, but the design doc is stale unless this change was intentional.

### `ThemeContext.tsx`

Provides:

- `theme`
- `toggleTheme()`
- `setTheme()`

Applies theme by adding `light` or `dark` class to `document.documentElement` and saving to `localStorage`.

Current behavior:

- initial state is always `dark`
- no system preference loading despite older docs saying default to system preference
- comment says “Force dark mode always”

`DESIGN.md` and `DECISIONS.md` now document the current dark-first behavior and the remaining decision about whether light mode should stay.

### `Navbar.tsx`

Minimal fixed nav with:

- Eric Weng wordmark
- GitHub icon link
- LinkedIn icon link
- email icon link

No section nav links, no theme toggle, no hamburger. This matches `DECISIONS.md`.

### `Hero.tsx`

High-impact visual hero:

- full-screen section
- background hero photo with grayscale/contrast mask
- giant outlined `ERIC WENG` text in Orbitron
- animated accent line through name
- subtitle: `Full Stack Software Engineer`
- scroll arrow to `#services`
- tilted skills marquee ribbon

Design is visually assertive and portfolio-brand-forward rather than content-heavy.

### `About.tsx`

Narrative section with:

- large “2+ years of experience” visual
- “THE ‘WHY’ BEHIND WHO I AM” headline
- personal story about curiosity and problem solving

### `Services.tsx`

Freelance/service-oriented cards:

- Websites
- Web Apps
- Booking Systems
- Online Ordering
- iOS Apps

This supports the portfolio strategy in `DECISIONS.md`: freelance-first, sell outcomes rather than tech skills.

### `Projects.tsx`

Three project cards:

- Equipment Management System
- Golf Leaderboard
- VROlympics Landing Page

Only VROlympics has a live link. Cards are currently data literals in the component.

### `TechStack.tsx`

Two-column section:

- categorized tech list with colored square markers
- live GitHub feed sourced from `https://api.github.com/users/erictweng/events?per_page=10`

Design claims a 5-minute cache in the UI, but the implementation does not implement caching; it fetches on mount.

Milestone 1 update: GitHub event API handling now uses explicit local TypeScript interfaces instead of `any`.

### `Experience.tsx`

Vertical timeline:

- The Bot Company
- UC Santa Cruz
- TTS-Wireless

Hardcoded component-local data.

### `Contact.tsx`

CTA section with:

- mailto link
- GitHub link

Despite `DESIGN.md` mentioning a contact form and Formspree, current implementation is link-based only.

### `Footer.tsx`

Footer includes:

- marquee strip
- copyright
- GitHub / LinkedIn / Mail icons

## Styling Architecture

Global styles live in `src/index.css`.

Key decisions:

- imports Orbitron from Google Fonts
- imports Tailwind v4 using `@import "tailwindcss"`
- theme colors are CSS variables:
  - `--color-accent`
  - `--color-bg`
  - `--color-text`
- dark mode controlled by `:root.dark`
- `html { scroll-behavior: smooth; }`
- marquee animation defined globally

Important constraint from `CURRENT-STATE.md`:

> Tailwind v4 custom color utility classes do not work reliably. Prefer inline styles with CSS variables for theme-aware colors.

Code follows this heavily: many components use inline styles for `var(--color-*)`.

## Design Architecture

Visual language:

- typography-driven
- Orbitron display face for hero/headings
- black/white/orange dark theme
- white/black/navy light theme defined but likely not actively exposed
- high-contrast, tech-forward, kinetic but not overloaded
- Framer Motion entrance reveals
- marquee elements in hero/footer

Design posture:

- currently more freelance/business-service oriented than job-seeker/resume oriented
- emphasizes services/outcomes and direct contact
- projects are supporting proof, not the entire site

## Data Architecture

Most content is hardcoded inside components:

- `services` in `Services.tsx`
- `projects` in `Projects.tsx`
- tech categories/colors in `TechStack.tsx`
- experience entries in `Experience.tsx`
- social links in `Navbar.tsx` and `Footer.tsx`

No external CMS, no JSON content model, no backend.

The GitHub live feed is the only external runtime data dependency.

## External Integrations

- GitHub public Events API in `TechStack.tsx`
- mailto link in `Contact.tsx`
- external links to GitHub, LinkedIn, VROlympics

No Formspree integration is implemented despite dependency/design docs mentioning it.

## Deployment Notes

Milestone 1 update: docs now identify GitHub Pages as the deployment target. The workflow exists at `.github/workflows/deploy.yml` and publishes `dist`. `vite.config.ts` has `base: '/'`, which is fine for custom domain/root deploys but may need adjustment for a GitHub Pages project subpath depending on the final deployment URL.

## Architecture Risks / Gaps

1. Decide whether light mode remains product behavior or should be removed/documented as dark-only.
2. Design docs mention contact form/Formspree in older sprint specs, but current site uses links.
3. GitHub feed says “5 min cache” but no cache exists.
4. Runtime content is hardcoded in components, which is fine for now but makes edits less centralized.
5. Dependency audit reports vulnerabilities after `npm ci`; these need triage before production confidence.

Resolved during Milestone 1:

- Double `ThemeProvider` wrapping removed.
- Current docs updated for GitHub Pages, dark-first behavior, and actual structure.
- Lint errors fixed.
- README replaced with project-specific documentation.
- `REPO-MAP.md` replaced with a real structure/dependency map.
- GitHub API event data no longer uses `any`.

## Recommended Cleanup Before Feature Work

1. Triage dependency audit output.
2. Decide whether theme toggle is in or out.
3. Resolve contact form vs mailto decision.
4. Optionally implement actual GitHub feed caching or remove the “5 min cache” UI copy.
5. Optionally centralize portfolio content into `src/data/portfolio.ts`.
