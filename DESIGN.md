# Design Direction: Engineering Field Notes × Mobile Product Showcase
**Owner**: Zyad Wael — Flutter Developer & Data Science Student  
**Audience**: Recruiters, Engineering Leads, High-Value Freelance Clients (30-second proof of competence)  
**Concept Name**: *The Artifact & The Specimen* (Engineering Field Notes × App Store Editorial)

---

## 1. Concept & Philosophy

Rather than another dark-navy neon portfolio with purple gradients and floating emojis, this design is rooted in **human editorial craftsmanship and engineering rigor**. 

It presents Zyad not as a generic "passionate developer", but as a **systems-minded mobile engineer and data science practitioner**:
1. **The Notebook (Engineering Field Notes)**: Technical specs, architecture diagrams (Clean Architecture layers, BLoC/Riverpod state pipelines), data flow notations, and honest technical reflections.
2. **The Showcase (App Store Editorial)**: Shipped mobile applications treated like high-fidelity product spreads — authentic device silhouettes, clean typography, measurable outcomes, direct store badges, and verified source code.

---

## 2. Typography System

No default "Inter-only" look. We use a three-tier typographic hierarchy:

| Role | Typeface | Characteristics | Fallback Stack |
| :--- | :--- | :--- | :--- |
| **Display / Headings** | **Fraunces** (Variable, soft serif) | Warm, human, authoritative, bespoke editorial character | `Georgia, serif` |
| **Body / Interface** | **Plus Jakarta Sans** | Modern geometric grotesque with open apertures for maximum legibility | `system-ui, -apple-system, sans-serif` |
| **Code / Metadata** | **JetBrains Mono** | Technical credibility, architecture annotations, version stamps | `ui-monospace, monospace` |

### Fluid Type Scale (CSS `clamp()` without breakpoint jumps)
```css
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem);    /* 12px -> 13px */
--text-sm: clamp(0.875rem, 0.82rem + 0.28vw, 0.9375rem);  /* 14px -> 15px */
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.0625rem);    /* 16px -> 17px */
--text-lg: clamp(1.125rem, 1.05rem + 0.38vw, 1.25rem);    /* 18px -> 20px */
--text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);       /* 20px -> 24px */
--text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem);    /* 24px -> 30px */
--text-3xl: clamp(1.875rem, 1.65rem + 1.13vw, 2.5rem);    /* 30px -> 40px */
--text-4xl: clamp(2.25rem, 1.95rem + 1.5vw, 3.25rem);     /* 36px -> 52px */
--text-display: clamp(2.75rem, 2.3rem + 2.25vw, 4.5rem);  /* 44px -> 72px */
```

---

## 3. Color Tokens & Theme Architecture

Strict 1-neutral ramp + 1-accent rule. Every combination satisfies WCAG AA (≥ 4.5:1 for body text, ≥ 3.0:1 for large display). No arbitrary purple or cyan glows.

### Light Theme: *Warm Paper & Precision Ink*
- `--bg-canvas`: `#F7F5F0` (warm off-white paper)
- `--bg-surface`: `#FFFFFF` (crisp white card surface)
- `--bg-elevated`: `#EFECE4` (subtle inset/spec block)
- `--border-subtle`: `#E2DDD3` (fine 1px architectural divider)
- `--border-strong`: `#C5BEAF`
- `--text-ink`: `#1A1D1C` (deep ink black, contrast 13.5:1)
- `--text-muted`: `#5C625F` (calibrated mid-tone, contrast 5.4:1)
- `--text-faint`: `#88908C` (metadata labels)
- `--accent`: `#D75A36` (warm terracotta / rust copper)
- `--accent-hover`: `#BF4A28`
- `--accent-subtle`: `rgba(215, 90, 54, 0.08)`
- `--accent-fg`: `#FFFFFF`

### Dark Theme: *Deep Slate Obsidian & Ember Accent*
- `--bg-canvas`: `#0F1214` (deep carbon obsidian)
- `--bg-surface`: `#161A1D` (solid surface, zero glassmorphism glare)
- `--bg-elevated`: `#1E2328`
- `--border-subtle`: `#262D33`
- `--border-strong`: `#3E4852`
- `--text-ink`: `#F0F3F2` (soft off-white, contrast 14.1:1)
- `--text-muted`: `#9BA4A0` (crisp readable gray, contrast 6.2:1)
- `--text-faint`: `#69736E`
- `--accent`: `#E06D4B` (vibrant ember terracotta, AA compliant on dark)
- `--accent-hover`: `#EA8365`
- `--accent-subtle`: `rgba(224, 109, 75, 0.12)`
- `--accent-fg`: `#0F1214`

---

## 4. Spacing, Layout & Grid Rhythm

- **Scale**: Strict 4px/8px rhythm (`--space-1`: 4px, `--space-2`: 8px, `--space-3`: 12px, `--space-4`: 16px, `--space-6`: 24px, `--space-8`: 32px, `--space-12`: 48px, `--space-16`: 64px, `--space-24`: 96px).
- **Asymmetric Layouts**:
  - **Hero**: Clean 60/40 asymmetric split on desktop (Left: concrete positioning, verified achievements, quick actions; Right: high-resolution human portrait with real status metadata, not floating emojis).
  - **Selected Projects**: Editorial case study spreads. Large preview on alternating sides with architectural decision logs, stack tags, problem/solution/outcome, and direct App Store / Play Store links.
  - **Skills**: Grouped functionally by capability (Mobile Engineering, State & Architecture, Machine Learning & Vision, Tooling & DevOps) — each citing the exact project where it was executed.
  - **Articles**: Technical publishing ledger with direct reading times, topics, and publication links.
  - **No Stacking of Identical Cards**: Alternating single-column deep dives, split spec tables, and dense data rows.

---

## 5. Motion & Micro-Interactions

- **Timing**: Snappy 180ms – 240ms ease-out transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Signature Interaction**: Interactive Architecture Inspection tab on case studies (toggle between Architecture / Key Decision / Outcome).
- **Strict Motion Accessibility**:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 6. Imagery & Real Assets

- **Real App Store Apps**:
  - **Amoomy**: Live heavy-transport logistics app on Apple App Store & Google Play.
  - **Wofoodi**: Live fuel discovery app in Saudi Arabia & GCC on Apple App Store & Google Play.
  - **Raval**: Live retail clothing e-commerce app on App Store & Google Play.
  - **Payss**: Social loyalty platform on App Store & Google Play.
- **Real Portrait**: High-quality studio portrait of Zyad Wael.
- **Published Package**: `liquid_navbar` on pub.dev.
- **Published Writing**: Verified Medium / Stackademic technical security & architecture articles.
- **Icons**: Clean, single-weight Lucide SVG icons (no emojis, no mismatched icon packs).
