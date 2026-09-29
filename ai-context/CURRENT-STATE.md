# CURRENT-STATE.md

## Status: Milestone 1 Cleanup In Progress

### Current Focus
Repo correctness cleanup after the initial audit. Product code is stable; cleanup is focused on lint/build health, duplicate providers, documentation accuracy, and dependency risk.

### Recently Completed
- Lint errors fixed.
  - Moved non-component theme context/types into `src/context/theme.ts` so Fast Refresh rules pass.
  - Kept `useTheme` in `src/hooks/useTheme.ts`.
  - Replaced loose GitHub event `any` usage in `TechStack.tsx` with explicit event types and safe fallbacks.
- Duplicate `ThemeProvider` removed from `App.tsx`; the app is now wrapped once in `src/main.tsx`.
- README replaced with portfolio-specific setup, verification, structure, and deployment notes.

### Verification Snapshot
```text
npm run lint  -> passed
npm run build -> passed
preview smoke -> passed at http://127.0.0.1:4173/
```

Smoke test confirmed:
- Page title: `🐴 Eric Weng — Portfolio`
- Root page renders.
- Dark theme class is applied.
- Seven sections exist: `hero`, `about`, `services`, `projects`, `tech-stack`, `experience`, `contact`.

### Architecture
- **Repo:** https://github.com/erictweng/eric-portfolio
- **Deploy:** GitHub Pages via `.github/workflows/deploy.yml`
- **Runtime:** Static Vite build output in `dist/`
- **Font:** Orbitron from Google Fonts, imported in `src/index.css`
- **Theme vars:** `--color-accent`, `--color-bg`, `--color-text`
- **Default theme:** dark mode
- **Dark:** black bg, white text, orange accent (#F97316)
- **Light variables still exist:** white bg, black text, navy accent (#1E3A5F)

### File Structure
```text
src/
  App.tsx                — Composes single-page sections
  main.tsx               — React root + single ThemeProvider wrapper
  index.css              — Theme vars + Orbitron import + marquee keyframes
  assets/eric-hero.jpg   — Hero image asset
  components/
    Navbar.tsx
    Footer.tsx
    LoadingSplash.tsx
  context/
    ThemeContext.tsx     — ThemeProvider component only
    theme.ts             — Theme context + exported theme types
  hooks/
    useTheme.ts          — Theme hook
  sections/
    Hero.tsx
    About.tsx
    Services.tsx
    Projects.tsx
    TechStack.tsx
    Experience.tsx
    Contact.tsx
```

### Known Remaining Cleanup
- Triage `npm audit` vulnerabilities.
- Decide whether light-mode support should remain as real product behavior or be removed/documented as intentionally dark-only.
- Decide portfolio positioning: freelance, SWE job search, or hybrid.
