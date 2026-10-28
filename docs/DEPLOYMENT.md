# Deployment Guide & CI/CD Pipeline

**Target Host:** GitHub Pages  
**Live Site:** [https://zyadwkhedr.github.io/zyadwael-portfolio-flutter/](https://zyadwkhedr.github.io/zyadwael-portfolio-flutter/)  
**CI/CD Workflow:** `.github/workflows/deploy.yml`

---

## 1. Automated GitHub Actions Deployment

The repository is configured for zero-touch continuous deployment via GitHub Actions. Every push to the `main` branch automatically triggers the deployment workflow.

### Workflow Definition (`.github/workflows/deploy.yml`)
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## 2. Build Pipeline Lifecycle

When `npm run build` executes, the following three-stage pipeline runs:

1. **Client Build (`vite build`)**:
   - Compiles TypeScript and TSX into optimized JavaScript chunks.
   - Extracts and purges Tailwind CSS into `dist/assets/index-[hash].css`.
   - Generates content-hashed images, icons, and fonts.
   - Substitutes `%BASE_URL%` in `index.html` with `/zyadwael-portfolio-flutter/`.
   - Copies static assets from `public/` into `dist/`.

2. **SSR Server Build (`vite build --ssr src/entry-server.tsx --outDir dist/ssr`)**:
   - Compiles `src/entry-server.tsx` and the full component tree into a single Node.js-compatible bundle `dist/ssr/entry-server.js`.

3. **Pre-rendering Engine (`node scripts/prerender.mjs`)**:
   - Imports `entry-server.js`.
   - Executes `renderToString(<Index />)`.
   - Injects the rendered HTML string directly into `dist/index.html` between `<div id="root">` and `</div>`.
   - Cleans up `dist/ssr/` so the deployment artifact is minimal.

---

## 3. Environment Variables & BaaS Configuration

The portfolio connects to Supabase Edge Functions for contact email dispatch and AI concierge queries.

### Required Environment Variables
These variables must be present during build time (via `.env` or GitHub repository secrets):

| Variable | Description | Exposure Level |
| :--- | :--- | :--- |
| `VITE_SUPABASE_PROJECT_ID` | Supabase reference identifier (`srpfwxkfjwycisiguyzu`) | Public |
| `VITE_SUPABASE_URL` | Supabase API endpoint (`https://<project-id>.supabase.co`) | Public |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase Anon Public Key | Public (Browser Safe) |

> [!NOTE]
> Supabase Anon keys are designed to be public-facing and safe to expose in client code. Row Level Security (RLS) and edge function JWT verification enforce server-side security. Private secrets (such as the `RESEND_API_KEY` and `GEMINI_API_KEY`) reside exclusively within the Supabase Edge Function environment and are never bundled into client JavaScript.

---

## 4. Manual Local Build & Preview

To verify a production build locally before pushing to GitHub:

```bash
# 1. Clean build
npm run build

# 2. Preview the exact production build on port 4173
npm run preview
```

Open `http://localhost:4173/zyadwael-portfolio-flutter/` in your browser.

---

## 5. Troubleshooting Deployment Issues

### Issue 1: Broken Images or 404s on Assets
- **Cause**: Using root-relative paths like `/assets/...` instead of base-relative paths.
- **Fix**: In JSX, always use `import.meta.env.BASE_URL + 'assets/...'` or import the asset via `import icon from '@/assets/...'`. In HTML, always use `%BASE_URL%assets/...`.

### Issue 2: Favicon Not Showing in Browser Tab
- **Cause**: Browser cache holding old favicon or missing base path in `<link rel="icon">`.
- **Fix**: Hard-refresh (`Ctrl+F5` or `Cmd+Shift+R`). Confirm that `dist/index.html` contains `<link rel="icon" type="image/svg+xml" href="/zyadwael-portfolio-flutter/assets/favicon/favicon.svg" />`.

### Issue 3: GitHub Actions Build Fails on SSR Step
- **Cause**: A component or dependency accessed browser-only globals (`window`, `localStorage`, `document`) during module initialization or SSR render.
- **Fix**: Wrap browser APIs in `if (typeof window !== 'undefined')` checks or execute them inside `useEffect()` hooks, which only run client-side.
