# Component Catalog & Design System

**Portfolio Owner:** Zyad Wael  
**Location:** `src/components/`

---

## 1. Component Organization

All components are organized into specialized subdirectories based on their functional boundary and responsibility:

```
src/components/
├── layout/       # Structural shell and global navigation landmarks
├── sections/     # Semantic page sections rendered in sequential reading order
├── projects/     # Project-specific demonstration & simulation components
├── chatbot/      # Interactive AI concierge assistant
├── legacy/       # Archived experimental & historical components (non-active)
└── ui/           # Headless, accessible primitives (Radix UI + shadcn)
```

---

## 2. Layout Components (`src/components/layout/`)

### `Navigation.tsx`
- **Location**: [src/components/layout/Navigation.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/layout/Navigation.tsx)
- **Role**: Primary sticky header landmark containing the personal monogram, desktop navigation links, active section indicator line, theme toggle (light/dark), CV download link, and responsive mobile drawer.
- **State & Behavior**:
  - Monitors window scroll position to highlight the active section (`#work`, `#skills`, `#writing`, `#testimonials`, `#about`, `#contact`).
  - Manages `theme` state (`dark` | `light`), syncing with `document.documentElement.classList` and `localStorage`.
  - Accessible mobile menu toggle with keyboard trap and aria-expanded attributes.
- **Props**: None (self-contained layout component).

### `Footer.tsx`
- **Location**: [src/components/layout/Footer.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/layout/Footer.tsx)
- **Role**: Semantic `<footer>` landmark providing verified social links, Alexandria Egypt location badge, copyright, and smooth back-to-top button.
- **Props**: None.

---

## 3. Section Components (`src/components/sections/`)

### `HeroSection.tsx`
- **Location**: [src/components/sections/HeroSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/HeroSection.tsx)
- **Role**: First-viewport introduction. Features the 30-second identity proof, dynamic role rotator, quick contact/work call-to-actions, social channel dock, and optimized profile portrait.
- **Key Features**:
  - Cyclical role rotator transitioning every 3.8 seconds between Software Engineer — Mobile Development, Flutter (Main Framework), Native iOS/Android, and Clean Architecture.
  - Tactile action buttons with `.btn-tactile` micro-physics.
- **Props**: None.

### `SelectedWork.tsx`
- **Location**: [src/components/sections/SelectedWork.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/SelectedWork.tsx)
- **Role**: Flagship project showcase displaying production mobile applications (`Amoomy`, `Wofoodi`, `Raval`, `Payss`, `Liquid Navbar`).
- **Tab Architecture**:
  Each project card contains an interactive tab switcher:
  - **Decisions**: Real engineering problems solved, decisions made, and architectural trade-offs.
  - **Architecture**: BLoC, SQLite offline cache, hardware sensor integration, and code design pillars.
  - **Live Demo**: In-browser interactive micro-simulators rendering the app's core feature.
  - **Screenshots**: Realistic mobile phone mockup frames ready for high-resolution app screenshots.
  - **Outcome**: Verifiable performance, scale, and reliability metrics.
- **Data Source**: [src/data/projects.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/data/projects.ts).

### `SkillsSection.tsx`
- **Location**: [src/components/sections/SkillsSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/SkillsSection.tsx)
- **Role**: Capability matrix detailing Flutter & Cross-Platform (Main Framework), Native Mobile (iOS & Android beyond Flutter), Mobile Architecture & Offline-First, and DevOps & Store Delivery.
- **Evidence-Based Design**: Every listed skill is backed by verifiable project evidence rather than abstract percentage bars.
- **Data Source**: [src/data/skills.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/data/skills.ts).

### `WritingSection.tsx`
- **Location**: [src/components/sections/WritingSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/WritingSection.tsx)
- **Role**: Curated technical publications on Medium and Stackademic (e.g. mobile client security with freeRASP, real-time Socket.IO with Riverpod, and modern state management).
- **Data Source**: [src/data/articles.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/data/articles.ts).

### `TestimonialsSection.tsx`
- **Location**: [src/components/sections/TestimonialsSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/TestimonialsSection.tsx)
- **Role**: Authentic, verified colleague and client reviews from LinkedIn (Ali Khaled, Ahmed Abd Alaziz, Karim Balbaa).
- **Features**: Editorial quote cards, highlight pills, direct LinkedIn verification links, and a quote modal for reading complete reviews.
- **Data Source**: [src/data/testimonials.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/data/testimonials.ts).

### `AboutSection.tsx`
- **Location**: [src/components/sections/AboutSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/AboutSection.tsx)
- **Role**: Detailed personal narrative, mobile software craftsmanship, leadership at HackerRank Campus Club, and three core engineering philosophies.
- **Props**: None.

### `ContactSection.tsx`
- **Location**: [src/components/sections/ContactSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/ContactSection.tsx)
- **Role**: Production contact form with live email dispatch, anti-bot honeypot protection, client validation, loading feedback, success confirmation card, and direct mailto / copy email actions.
- **Service Integration**: Invokes `sendContactMessage()` from [src/services/contactService.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/services/contactService.ts).

---

## 4. Project Simulation Components (`src/components/projects/`)

### `ProjectInteractiveDemo.tsx`
- **Location**: [src/components/projects/ProjectInteractiveDemo.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/projects/ProjectInteractiveDemo.tsx)
- **Role**: Embeds zero-overhead, responsive in-browser mobile simulators inside project cards.
- **Supported Simulators**:
  - `dispatch_queue` (Amoomy): Live freight load selector with simulated real-time carrier bidding.
  - `station_radar` (Wofoodi): Interactive fuel station radar with distance filters and live pricing.
  - `reactive_cart` (Raval): Optimistic grocery cart with live quantity recalculations.
  - `qr_scanner` (Payss): Camera reticle with barcode alignment and simulated checkout.
  - `liquid_canvas` (Liquid Navbar): Fluid navigation canvas demonstrating custom shader curves.
- **Props**:
  ```ts
  interface ProjectInteractiveDemoProps {
    type: 'dispatch_queue' | 'station_radar' | 'reactive_cart' | 'qr_scanner' | 'liquid_canvas';
    title: string;
    subtitle: string;
  }
  ```

---

## 5. Chatbot Component (`src/components/chatbot/`)

### `AiAssistant.tsx`
- **Location**: [src/components/chatbot/AiAssistant.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/chatbot/AiAssistant.tsx)
- **Role**: Floating AI portfolio concierge powered by Google Gemini 2.5 Flash via Supabase Edge Function `portfolio-assistant`.
- **Key Features**:
  - Global `Cmd/Ctrl+K` keyboard shortcut to open/close.
  - Starter prompt suggestions for recruiters and clients.
  - Automatic hiring-intent detection offering smooth scroll to `#contact`.
  - Accessible sliding drawer on desktop and mobile.
- **Service Integration**: Invokes `queryAssistant()` from [src/services/assistantService.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/services/assistantService.ts).

---

## 6. Legacy Components Archive (`src/components/legacy/`)

Components from previous template iterations are safely archived in `src/components/legacy/`. They are not imported in production and include a dedicated `README.md` explaining their historical purpose.
- `ArticlesSection.tsx` (Replaced by `WritingSection.tsx`)
- `ProjectsSection.tsx` (Replaced by `SelectedWork.tsx`)
- `FeaturedProjectSection.tsx` (Replaced by `SelectedWork.tsx`)
- `InteractivePhone.tsx` (Replaced by `ProjectInteractiveDemo.tsx`)
- `Phone3D.tsx` (Archived experimental ThreeJS/canvas phone)
- `TicTacToeGame.tsx` (Archived interactive mini-game)
- `PackagesSection.tsx` (Consolidated into `SelectedWork.tsx`)
- `SocialLinks.tsx` (Integrated directly into Hero, Contact, and Footer)
- `AnimatedSection.tsx` (Replaced by native CSS transforms)
