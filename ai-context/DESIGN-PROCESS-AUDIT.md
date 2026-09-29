# DESIGN-PROCESS-AUDIT.md — Eric Portfolio

Audited: 2026-09-29

## Summary

The portfolio's design process is documented through `ai-context/DESIGN.md`, `ai-context/DECISIONS.md`, and `ai-context/CURRENT-STATE.md`. The implemented site reflects a deliberate shift away from a generic Vite/template portfolio toward a stronger visual identity: giant typographic hero, Orbitron display type, black/white/orange palette, kinetic marquee elements, and a freelance-first positioning strategy.

## Design Intent

The original design goal in `DESIGN.md`:

- personal portfolio for Eric Weng
- single-page scroll site
- mobile-first
- clean typography
- inspired by mannan.io/v1
- dark/light theme toggle
- sections for hero, skills/services, projects, tech stack, experience, about, contact

The later design decisions in `DECISIONS.md` refined this into:

- subtle/professional animation
- no custom cursor
- flat scroll
- clean loading splash idea
- hero as pure visual statement
- minimal navbar
- freelance-first positioning
- sell outcomes, not tech skills

## Current Visual Direction

The implemented site is strongly identity-led.

Key traits:

- **Hero-first brand impact:** giant outlined “ERIC WENG” dominates the first screen.
- **Industrial/technical typography:** Orbitron gives the portfolio a futuristic engineering feel.
- **Motion as polish:** Framer Motion reveals, animated accent line, bouncing arrow, marquee bars.
- **Hard contrast:** black/white/orange in dark mode, with light-mode variables defined.
- **Freelance/service framing:** Services section speaks to client outcomes: websites, web apps, booking, ordering, iOS.
- **Live proof element:** GitHub activity feed adds a dynamic “I’m building” signal.

## Design Process So Far

### Stage 1 — Baseline app scaffold

Likely started as Vite + React + TypeScript template.

Evidence from the initial audit:

- `README.md` started as the default Vite README; Milestone 1 replaced it with portfolio-specific docs.
- `package.json` is standard Vite-style.
- `DESIGN.md` started from a conventional portfolio section list and was updated in Milestone 1 to match the current implementation.

### Stage 2 — Foundation sprint

Documented in `CURRENT-STATE.md` as Sprint 1:

- Vite + React 19 + TypeScript
- Tailwind v4
- Framer Motion
- theme system
- section shells
- smooth scroll

### Stage 3 — Hero redesign and real content

Documented in `CURRENT-STATE.md` as Sprint 2:

- giant outlined Eric Weng hero
- orange accent line
- subtitle
- tilted scrolling skills ribbon
- scroll arrow
- services and about content
- minimal nav

### Stage 4 — Portfolio proof sections

Current code also contains:

- Projects section with 3 cards
- TechStack section with GitHub feed
- Experience timeline
- Contact CTA
- Footer marquee

This went beyond the older `CURRENT-STATE.md` “Sprint 3 next” note. Milestone 1 updated `CURRENT-STATE.md` to match the implemented sections.

## Content Strategy

The site is currently positioned between two use cases:

### Freelance/business portfolio

Evidence:

- Services cards: Websites, Web Apps, Booking Systems, Online Ordering, iOS Apps
- Contact CTA: “Let’s Turn Ideas Into Reality”
- `DECISIONS.md`: “Freelance-first targeting small businesses”

### Job-seeker / SWE portfolio

Evidence:

- Hero subtitle: Full Stack Software Engineer
- Experience timeline
- Tech stack
- Projects
- GitHub live feed

Current design can support both, but messaging should decide which path is primary.

## Section-Level Design Notes

### Hero

Works well as a memorable landing moment. It is bold and distinctive.

Potential concern: the hero has no explanatory one-liner or CTA. That is intentional per `DECISIONS.md`, but if the goal shifts toward job applications or clients, adding a small context line below/near the hero may improve clarity.

### About

The “why” narrative is personal and readable. It gives human context.

Potential concern: “2+ years” visual may undersell if Eric wants new-grad SWE positioning plus The Bot Company experience. Could be reframed as “systems shipped” or “real-world ops” depending target audience.

### Services

Strong freelance positioning. The cards are client-outcome oriented.

Potential concern: If this portfolio targets SWE recruiters, this section may feel like an agency landing page rather than a candidate portfolio.

### Projects

Good starting set. Equipment Management is especially aligned with Eric’s core story: real-world ops → structured software systems.

Potential concern: project cards lack links/details for two projects and could use case-study pages or expandable details.

### Tech Stack

The GitHub live feed is a nice differentiator.

Potential concerns:

- GitHub API rate limits/failures are handled but no cache exists despite the UI saying “5 min cache.”
- Tech stack categories are hardcoded and maybe too broad.

### Experience

Clean and simple.

Potential concern: dates/content should be reviewed for resume consistency and accuracy.

### Contact

Simple and functional. No form.

Potential concern: `DESIGN.md` says contact form/Formspree; implementation intentionally or accidentally diverges.

## Design System Notes

### Typography

- Orbitron for display text/headings.
- System UI for body.

This gives strong visual identity but should be used carefully so body copy stays readable.

### Color

Dark mode:

- bg: black
- text: white
- accent: orange `#F97316`

Light mode:

- bg: white
- text: black
- accent: navy `#1E3A5F`

Implementation leans dark-first.

### Motion

Motion is mostly entrance/hover/marquee:

- good brand energy
- not too much parallax or cursor gimmickry
- should be checked for reduced-motion accessibility later

## Design Documentation Gaps

1. Older sprint specs still mention theme-toggle/contact-form behavior that no longer matches the product direction.
2. GitHub feed UI says “5 min cache,” but no cache is implemented.
3. No explicit design tokens doc beyond scattered CSS variables.
4. No screenshot/visual QA checklist.

Resolved during Milestone 1:

- README is now portfolio-specific.
- `CURRENT-STATE.md` now reflects Projects/TechStack/Experience/Contact.
- `DESIGN.md` section order now matches implementation.
- `DESIGN.md` documents link-based contact and dark-first theme behavior.
- `REPO-MAP.md` now maps the real source tree.

## Recommended Design Process Going Forward

### Step 1 — Decide primary audience

Pick one primary version for this repo:

- **Freelance/client portfolio**: services first, outcomes, contact CTA, case studies.
- **SWE job portfolio**: projects first, experience, resume, recruiter clarity.
- **Hybrid**: hero + projects + services, but messaging must explain both.

### Step 2 — Update design source of truth

Update:

- `ai-context/DESIGN.md`
- `ai-context/CURRENT-STATE.md`
- `ai-context/DECISIONS.md`
- `ai-context/REPO-MAP.md`

### Step 3 — Create content inventory

Centralize current hardcoded content into a review doc or data module:

- projects
- experience entries
- services
- links
- tech stack

### Step 4 — Fix correctness and accessibility

Before visual changes, Milestone 1 resolved lint errors, duplicate `ThemeProvider`, README, and deployment-target documentation. Remaining quality checks:

- dependency audit triage
- reduced-motion consideration
- link labels / aria-labels for icon-only links

### Step 5 — Iterate visually

Use project thread for design discussion and `#build` for implementation updates.

## High-Leverage Next Design Edits

1. Decide freelance vs job-search positioning.
2. Make the Projects cards stronger with case-study style content.
3. Fix docs so future agents do not follow stale instructions.
4. Add a small “what I build” sentence somewhere after/under hero if clarity is needed.
5. Replace or remove outdated theme-toggle/contact-form expectations.

## Bottom Line

The portfolio already has a distinct visual identity. The biggest current need is not a redesign from scratch — it is alignment:

```text
implemented site ↔ docs ↔ target audience ↔ next edits
```

Once positioning is decided, the next edits should be small, targeted, and verifiable.
