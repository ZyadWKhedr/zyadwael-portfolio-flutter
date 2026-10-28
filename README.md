# Zyad Wael — Mobile Software Engineer Portfolio

[![Deploy to GitHub Pages](https://github.com/ZyadWKhedr/zyadwael-portfolio-flutter/actions/workflows/deploy.yml/badge.svg)](https://github.com/ZyadWKhedr/zyadwael-portfolio-flutter/actions/workflows/deploy.yml)
[![Lighthouse Desktop](https://img.shields.io/badge/Lighthouse_Desktop-100%25-brightgreen)](https://zyadwkhedr.github.io/zyadwael-portfolio-flutter/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Production developer portfolio of **Zyad Wael**, a Software Engineer specializing in mobile application development with **Flutter & Dart**, **Clean Architecture**, and offline-first systems based in **Alexandria, Egypt**.

- **Live Website:** [https://zyadwkhedr.github.io/zyadwael-portfolio-flutter/](https://zyadwkhedr.github.io/zyadwael-portfolio-flutter/)
- **GitHub:** [https://github.com/ZyadWKhedr](https://github.com/ZyadWKhedr)
- **LinkedIn:** [https://www.linkedin.com/in/zyad-wael/](https://www.linkedin.com/in/zyad-wael/)
- **Medium Publications:** [https://medium.com/@ziad.w.khedr](https://medium.com/@ziad.w.khedr)

---

## Key Features

- **High-Performance Static Pre-rendering**: Builds 158KB of semantic DOM directly into `dist/index.html` via Node.js SSR, achieving instant First Contentful Paint (FCP) and 100/100 Lighthouse Desktop scores.
- **Dynamic Hero Motion**: Smooth cyclical role rotator transitioning through 4 verified engineering competencies every 3.4 seconds without layout shifts.
- **In-Browser Interactive Simulators**: Zero-dependency mobile micro-simulators inside project cards demonstrating real-time carrier bidding (Amoomy), fuel station radar (Wofoodi), optimistic grocery cart (Raval), QR checkout (Payss), and fluid canvas shaders (Liquid Navbar).
- **Structured Screenshot Slots**: Modular mobile phone mockup frames ready for high-resolution application screenshots without touching layout code.
- **Editorial AI Concierge**: Built-in chatbot powered by Google Gemini 2.5 Flash via Supabase Edge Functions, featuring global `Cmd/Ctrl+K` shortcut and hiring intent auto-scroll.
- **Live Contact Form**: Transactional email dispatch directly to Zyad's inbox (`ziad.w.khedr@gmail.com`) via Resend gateway with anti-spam honeypot and client validation.
- **Verified Testimonials**: Genuine peer endorsements from LinkedIn colleagues with expandable quote preview and source verification links.
- **Bespoke ZW Monogram Favicon**: Multi-resolution vector and PNG favicon suite designed for high contrast and small-scale legibility.
- **Flawless Responsiveness**: Zero horizontal overflow verified across 11 standard viewports from 320px to 2560px.

---

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework & UI** | React 18, TypeScript 5, Vite 5, Tailwind CSS 3 |
| **Animation & Interaction** | Framer Motion, Tailwind Animate, Native CSS Transforms |
| **Component Primitives** | Radix UI, shadcn/ui |
| **Backend as a Service (BaaS)** | Supabase Edge Functions (Deno runtime) |
| **AI Integration** | Google Gemini 2.5 Flash LLM |
| **Email Gateway** | Resend Transactional Email API |
| **Static Pre-rendering** | Custom Node.js SSR pipeline (`scripts/prerender.mjs`) |
| **Hosting & CI/CD** | GitHub Actions + GitHub Pages (`.github/workflows/deploy.yml`) |

---

## 📁 Repository Structure

```
zyadwael-portfolio-flutter/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD workflow
├── docs/                       # Complete project documentation
│   ├── ARCHITECTURE.md         # System architecture, data flow & Mermaid diagram
│   ├── COMPONENTS.md           # Component catalog & API specifications
│   ├── ASSETS.md               # Asset organization & screenshot guide
│   ├── FEATURES.md             # Feature specifications & interaction details
│   ├── DEPLOYMENT.md           # Deployment runbook & base path requirements
│   ├── CONTENT_GUIDE.md        # Step-by-step content editing instructions
│   ├── MAINTENANCE.md          # Quality standards & maintenance procedures
│   └── research/               # Archived App Store research cache
├── public/
│   ├── assets/
│   │   ├── favicon/            # Bespoke ZW monogram favicons & manifest
│   │   ├── images/
│   │   │   ├── profile/        # Zyad Wael portrait images
│   │   │   ├── projects/       # Dedicated folders for each project
│   │   │   └── general/        # OpenGraph card & placeholders
│   │   └── docs/               # Resume PDF
│   ├── favicon.ico             # Root fallback favicon
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── scripts/
│   ├── prerender.mjs           # Static SSR pre-rendering engine
│   ├── generate_favicon.mjs    # Favicon generation script (Sharp)
│   └── capture_after_viewports.mjs # Responsive viewport audit script
├── src/
│   ├── components/
│   │   ├── layout/             # Navigation & Footer
│   │   ├── sections/           # Hero, Work, Skills, Writing, Testimonials, About, Contact
│   │   ├── projects/           # Interactive mobile app simulators
│   │   ├── chatbot/            # AI assistant drawer & trigger
│   │   ├── legacy/             # Archived template components (non-polluting)
│   │   └── ui/                 # Radix UI & shadcn primitives
│   ├── data/                   # Type-safe portfolio records (projects, testimonials, skills)
│   ├── hooks/                  # Custom React hooks (use-mobile, use-toast)
│   ├── integrations/           # Supabase client singleton
│   ├── lib/                    # Utilities & analytics helpers
│   ├── pages/                  # Index and NotFound route components
│   ├── services/               # Decoupled email & assistant service functions
│   ├── types/                  # Formal TypeScript schemas
│   ├── App.tsx
│   ├── entry-server.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── PROJECT_AUDIT.md            # Structural audit & refactoring ledger
└── README.md
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20 LTS recommended)
- **npm**: v9.0.0 or higher

### Installation
```bash
# 1. Clone repository
git clone https://github.com/ZyadWKhedr/zyadwael-portfolio-flutter.git
cd zyadwael-portfolio-flutter

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:8080/](http://localhost:8080/) in your browser.

---

## Production Build & Verification

```bash
# Build production bundle and execute static SSR pre-rendering
npm run build

# Preview the exact production build locally
npm run preview
```
Open [http://localhost:4173/zyadwael-portfolio-flutter/](http://localhost:4173/zyadwael-portfolio-flutter/) to inspect the production bundle.

### Other Commands
- `npm run lint`: Run ESLint across TypeScript and TSX source files.
- `node scripts/generate_favicon.mjs`: Regenerate all ZW monogram favicon formats.
- `node scripts/capture_after_viewports.mjs`: Audit responsive viewports from 320px to 2560px for horizontal overflow.

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_PROJECT_ID="your_supabase_project_id"
VITE_SUPABASE_URL="https://your_supabase_project_id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your_supabase_anon_publishable_key"
```

*Note: Supabase anon keys are public-facing client tokens safe for browser delivery. Server-side secrets (`RESEND_API_KEY`, `GEMINI_API_KEY`) reside securely within Supabase Edge Functions.*

---

## Detailed Documentation Links

- [docs/ARCHITECTURE.md](file:///d:/Web/zyadwael-portfolio-flutter/docs/ARCHITECTURE.md): Technical design, SSR pre-rendering, and Mermaid data-flow diagrams.
- [docs/COMPONENTS.md](file:///d:/Web/zyadwael-portfolio-flutter/docs/COMPONENTS.md): Detailed component catalog, responsibilities, and props.
- [docs/ASSETS.md](file:///d:/Web/zyadwael-portfolio-flutter/docs/ASSETS.md): Asset directory hierarchy and step-by-step screenshot guide.
- [docs/FEATURES.md](file:///d:/Web/zyadwael-portfolio-flutter/docs/FEATURES.md): In-depth specification of interactive simulators, chatbot, and contact form.
- [docs/DEPLOYMENT.md](file:///d:/Web/zyadwael-portfolio-flutter/docs/DEPLOYMENT.md): GitHub Pages deployment workflow, base path rules, and troubleshooting.
- [docs/CONTENT_GUIDE.md](file:///d:/Web/zyadwael-portfolio-flutter/docs/CONTENT_GUIDE.md): Guide to adding new projects, screenshots, and testimonials.
- [docs/MAINTENANCE.md](file:///d:/Web/zyadwael-portfolio-flutter/docs/MAINTENANCE.md): Runbooks for dependency upgrades, viewport audits, and quality standards.
- [PROJECT_AUDIT.md](file:///d:/Web/zyadwael-portfolio-flutter/PROJECT_AUDIT.md): Comprehensive baseline audit and refactoring log.

---

## License

This project is open-source under the [MIT License](LICENSE).
