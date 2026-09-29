# Repository Map

_Last reviewed: 2026-09-29_

## Directory Structure

```text
eric-portfolio/
├── README.md
├── CLAUDE.md
├── package.json
├── package-lock.json
├── vite.config.ts
├── eslint.config.js
├── tsconfig*.json
├── tailwind.config.js
├── index.html
├── business-card.html
├── public/
│   ├── business-card.html
│   └── eric-hero.jpg
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── assets/
│   │   └── eric-hero.jpg
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── LoadingSplash.tsx
│   │   └── Navbar.tsx
│   ├── context/
│   │   ├── ThemeContext.tsx
│   │   └── theme.ts
│   ├── hooks/
│   │   └── useTheme.ts
│   └── sections/
│       ├── About.tsx
│       ├── Contact.tsx
│       ├── Experience.tsx
│       ├── Hero.tsx
│       ├── Projects.tsx
│       ├── Services.tsx
│       └── TechStack.tsx
├── ai-context/
│   ├── CURRENT-STATE.md
│   ├── DESIGN.md
│   ├── RULES.md
│   ├── DECISIONS.md
│   ├── REPO-MAP.md
│   ├── ARCHITECTURE-AUDIT.md
│   ├── DESIGN-PROCESS-AUDIT.md
│   ├── PRODUCTION-READINESS.md
│   ├── IMPACT-ANALYSIS.md
│   ├── sprints/
│   ├── execution/
│   └── retro/
└── .github/
    └── workflows/
        └── deploy.yml
```

## App Composition

```text
main.tsx
  └─ ThemeProvider (context/ThemeContext.tsx)
      └─ App.tsx
          ├─ Navbar
          ├─ Hero
          ├─ About
          ├─ Services
          ├─ Projects
          ├─ TechStack
          ├─ Experience
          ├─ Contact
          └─ Footer
```

## Shared Modules

| Module | Imported By | Risk |
| --- | --- | --- |
| `src/context/theme.ts` | `ThemeContext.tsx`, `hooks/useTheme.ts` | Medium — shared theme context/types |
| `src/context/ThemeContext.tsx` | `main.tsx` | Medium — controls document theme class/localStorage |
| `src/hooks/useTheme.ts` | Any component needing theme state | Medium — throws if used outside provider |
| `src/index.css` | Whole app via `main.tsx` | High — global theme variables and base styles |
| `src/App.tsx` | `main.tsx` | Medium — controls section ordering |

## External Dependencies

| Dependency | Purpose |
| --- | --- |
| React / React DOM | UI runtime |
| Vite | Dev server and production build |
| TypeScript | Type checking |
| Tailwind CSS v4 + `@tailwindcss/vite` | Styling pipeline |
| Framer Motion | Section and hero animations |
| Lucide React | Icons |
| React Hook Form | Installed for contact form support |

## API Surface

No backend API. The app fetches public GitHub activity from:

```text
https://api.github.com/users/erictweng/events?per_page=10
```

Failure mode: `TechStack.tsx` catches fetch failures and renders `No recent activity`.

## Build and Deployment

- Local build: `npm run build`
- Preview: `npm run preview`
- Deploy target: GitHub Pages
- Workflow: `.github/workflows/deploy.yml`
- Artifact path: `dist`

## Evolution Log

| Date | Change | Reason |
| --- | --- | --- |
| 2026-09-29 | Documented real source tree and dependency graph | Replaced scaffold placeholders during Milestone 1 cleanup |
| 2026-09-29 | Split theme context primitives into `src/context/theme.ts` | Satisfy React Fast Refresh lint rule |
| 2026-09-29 | Removed duplicate `ThemeProvider` from `App.tsx` | Keep a single app-wide provider in `main.tsx` |
