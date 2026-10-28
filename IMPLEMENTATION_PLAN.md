# Implementation Plan: Art-Directed Editorial Engineering Portfolio

**Project:** Zyad Wael Portfolio Redesign  
**Target:** Production-grade, accessible, art-directed engineering portfolio deployed on GitHub Pages.  
**Baseline Git Commit:** `da5e80f` (Preserved baseline prior to redesign refactoring).

---

## 1. Architectural Strategy & Decision Records

### 1.1 Framework & Build Pipeline
- **Decision:** Keep React 18 + TypeScript + Vite.
- **Rationale:** The repository was initialized with Vite + React. Rather than incurring a risky multi-day migration to Astro or Next.js, we engineered a native static pre-rendering pipeline via `src/entry-server.tsx` and `scripts/prerender.mjs`.
- **Result:** Static HTML pre-renders 96KB of semantic markup directly into `dist/index.html`. Zero layout shift, 100% crawlable content for recruiters without JavaScript execution, and 0.7s LCP.

### 1.2 Base Path & Deployment Safety
- **Target URL:** `https://zyadwkhedr.github.io/zyadwael-portfolio-flutter/`
- **Base Path:** `/zyadwael-portfolio-flutter/` configured in `vite.config.ts`.
- **Asset Invariant:** All asset imports use Vite's asset pipeline (`@/assets/...`) or explicit relative/absolute paths respecting the deployment subpath.

### 1.3 Data-Driven Modular Architecture
- **Problem:** In previous versions, project details were hardcoded inside large JSX files, making updates error-prone and requiring layout restructuring whenever a project was added.
- **Solution:** Create dedicated data files:
  - `src/data/projects.ts`: Structured schema for featured case studies (`FeaturedProject`) and secondary projects (`SecondaryProject`).
  - `src/data/skills.ts`: 4 capability pillars (`Mobile`, `Architecture & State`, `APIs & Cloud`, `Applied AI & Data Science`) with direct citations to verified projects.
  - `src/data/articles.ts`: Technical articles published on Stackademic / Medium with verified URLs and read times.

---

## 2. Design System & Token Architecture

### 2.1 Typography Hierarchy
- **Display Typeface:** *Fraunces* (variable optical size serif, self-hosted via Google Fonts with `font-display: swap`). Used for editorial section titles, spec headers, and narrative callouts.
- **Body Typeface:** *Plus Jakarta Sans* (humanist sans-serif). High legibility at small sizes, optimal for technical descriptions and dense specs.
- **Monospace Typeface:** *JetBrains Mono*. Used for technical pills, metadata labels, status tags, and commit hashes.
- **Fluid Type Scaling:** Implemented via CSS `clamp()` (`fluid-xs` through `fluid-4xl`), ensuring proportional scaling from 320px mobile screens to 2560px ultrawide displays.

### 2.2 Color Tokens & Contrast Ratios
- **Light Theme (Editorial Warm Paper):**
  - `--canvas`: `#FAF8F5` (Warm off-white)
  - `--surface`: `#FFFFFF`
  - `--ink`: `#141413` (Contrast > 15:1 against canvas)
  - `--ink-muted`: `#52524E` (Contrast > 6.2:1 against canvas)
  - `--ink-faint`: `#6E6D68` (Contrast > 5.2:1, WCAG AAA compliant)
  - `--accent`: `#C2410C` (Terracotta rust, WCAG AA compliant)
- **Dark Theme (Obsidian Carbon):**
  - `--canvas`: `#0E1013`
  - `--surface`: `#16191E`
  - `--ink`: `#F0F2F5`
  - `--ink-muted`: `#9AA0A6`
  - `--accent`: `#E25822`

---

## 3. Implementation Phasing & Milestones

### Milestone 1: Audit & Discovery (Completed)
- Baseline Lighthouse captured: Mobile score **54/100**, LCP **13.7s**, TBT **440ms**, payload **3.02MB**.
- Before screenshots saved in `audit-screenshots/` across 360, 390, 768, 1024, 1440, 1920px.
- `AUDIT.md` written and committed (`da5e80f`).
- `PROJECT_INVENTORY.md` written detailing 12 verified projects across App Store, Google Play, pub.dev, Mostaql, and GitHub.

### Milestone 2: Art Direction & System Tokens (Completed)
- Documented editorial principles in `DESIGN.md`.
- Purged generic templates, `lovable-tagger`, and decorative blobs.
- Implemented CSS variables and Tailwind tokens in `src/index.css` and `tailwind.config.ts`.
- Optimized assets: converted 1.85MB uncompressed portrait into 36KB responsive WebP (`zyad-profile.webp`), created 1200×630 Open Graph preview image (`og-image.png`).

### Milestone 3: Structured Data Refactoring (In Progress)
- Create `src/data/projects.ts` defining all featured and secondary projects.
- Create `src/data/skills.ts` and `src/data/articles.ts`.
- Update `SelectedWork.tsx` to consume `src/data/projects.ts` and render an expandable secondary work catalog with filter tabs.
- Ensure adding future projects requires editing only `src/data/projects.ts`.

### Milestone 4: Semantic Layouts & Interaction Quality (Completed)
- `Navigation.tsx`: Accessible skip link (`#main-content`), mobile drawer with keyboard trap and ESC key dismiss, dark/light theme toggle.
- `HeroSection.tsx`: Single `<h1>`, concrete 30-second positioning statement, quick specs ledger, primary CTAs.
- `SelectedWork.tsx`: Alternating editorial case study cards with interactive technical inspector tabs (`Decisions`, `Architecture`, `Outcome`).
- `SkillsSection.tsx`: 4 capability pillars with direct project evidence links (no meaningless percentage bars).
- `WritingSection.tsx`: 4 verified technical publications on Medium / Stackademic.
- `AboutSection.tsx`: Engineering principles, education at Faculty of Computers & Artificial Intelligence, leadership roles.
- `ContactSection.tsx`: Direct email copy button, LinkedIn, GitHub, CV download, and fallback mailto form.
- `Footer.tsx`: Semantic landmarks and copyright.

### Milestone 5: Responsive & Adaptive Verification across 320px–2560px
- Verify layouts at 320, 360, 390, 430, 480, 768, 1024, 1280, 1440, 1920, and 2560px.
- Confirm zero horizontal scroll, fluid text wrapping, minimum 44px touch targets.

### Milestone 6: Accessibility, SEO & Production Deployment
- Inject JSON-LD structured data (`Person` schema).
- Add Open Graph & Twitter meta tags, canonical URL, sitemap, robots.txt.
- Re-run Lighthouse mobile and desktop audit to verify performance target (≥95).
- Commit clean changes and push to GitHub `main` branch.
