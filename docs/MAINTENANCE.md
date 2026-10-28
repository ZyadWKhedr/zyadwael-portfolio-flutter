# Codebase Maintenance & Quality Runbook

**Portfolio Owner:** Zyad Wael  
**Stack:** React 18, TypeScript 5, Vite 5, Tailwind CSS 3, Supabase BaaS

---

## 1. Development Commands

All npm scripts are defined in `package.json` and verified working:

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the local Vite development server with Hot Module Replacement (HMR) at `http://localhost:8080/`. |
| `npm run build` | Full production build pipeline: compiles client bundle, compiles SSR server bundle, and executes static HTML pre-rendering directly into `dist/index.html`. |
| `npm run build:client` | Runs client-only Vite build without the static SSR pre-rendering step (useful for rapid bundle analysis). |
| `npm run preview` | Spins up a local production preview server at `http://localhost:4173/zyadwael-portfolio-flutter/`. |
| `npm run lint` | Runs ESLint 9 across all TypeScript and React source files. |
| `node scripts/generate_favicon.mjs` | Regenerates all bespoke ZW monogram favicons (SVG, PNGs, ICO, and webmanifest). |

---

## 2. Maintenance Runbooks

### Runbook A: Dependency Upgrades
- Dependencies should be updated conservatively to prevent breaking Radix primitives or Vite rollup configurations.
- Check outdated packages:
  ```bash
  npm outdated
  ```
- Before committing any dependency bump:
  1. Run `npm run build` to confirm both client and SSR server bundles compile.
  2. Run `npm run preview` and test the interactive simulators and AI concierge in the browser.
  3. Ensure `package-lock.json` is committed alongside `package.json`.

### Runbook B: Verifying Zero Horizontal Overflow
To verify that no layout shifts or horizontal overflows occur on mobile:
1. Run `npm run preview`.
2. Execute the headless viewport capture script:
   ```bash
   node scripts/capture_after_viewports.mjs
   ```
3. The script evaluates viewports from 320px to 2560px via Chrome DevTools Protocol (CDP) and confirms that `document.documentElement.scrollWidth === window.innerWidth`.

### Runbook C: Edge Function Maintenance
The Supabase edge functions reside in `supabase/functions/`:
- `supabase/functions/portfolio-assistant/`: Backed by Google Gemini 2.5 Flash via Deno runtime.
- `supabase/functions/send-contact-email/`: Dispatches transactional emails via Resend.
To deploy updates to edge functions using the Supabase CLI:
```bash
supabase functions deploy portfolio-assistant --project-ref srpfwxkfjwycisiguyzu
supabase functions deploy send-contact-email --project-ref srpfwxkfjwycisiguyzu
```

---

## 3. Code Quality Standards

1. **Strict TypeScript**: Avoid `any` types. All project, testimonial, and article data must conform to interfaces in `src/types/`.
2. **Accessible Semantics**:
   - Every interactive button and link must have discernible text or an explicit `aria-label`.
   - Maintain landmark hierarchy (`<header>`, `<main id="main-content">`, `<section id="...">`, `<footer>`).
3. **Motion Hygiene**:
   - Never add full-page scroll hijacking or blocking entrance delays.
   - Always honor `prefers-reduced-motion` via CSS media queries.
4. **Clean Git Hygiene**:
   - Never commit API keys or private secrets.
   - Never commit node_modules or dist output.
   - Keep commit messages descriptive following conventional commits (e.g. `feat:`, `fix:`, `docs:`, `chore:`).
