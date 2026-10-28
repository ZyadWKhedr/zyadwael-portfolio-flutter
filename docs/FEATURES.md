# Portfolio Features & Interaction Specification

**Portfolio Owner:** Zyad Wael  
**Verified Domain:** Mobile Software Engineering & Data Science (Alexandria, Egypt)

---

## 1. Feature Catalog

| Feature | Primary Location | Key Technologies | Description |
| :--- | :--- | :--- | :--- |
| **Dynamic Role Rotator** | `HeroSection.tsx` | React State, CSS Keyframes | Cycles smoothly through 4 professional roles every 3.4 seconds without layout shifts. |
| **Tactile Micro-Physics** | `index.css` | Native CSS Transforms | 120ms press feedback (`active:translate-y-[2px]`) and magnetic hover elevation. |
| **Interactive Simulators** | `ProjectInteractiveDemo.tsx` | React, Pure CSS | 5 zero-dependency in-browser simulators demonstrating core app mechanics. |
| **Structured Screenshot Slots** | `SelectedWork.tsx` | React, Responsive Frames | High-resolution mobile phone frames ready for Zyad's real application screenshots. |
| **Editorial AI Concierge** | `AiAssistant.tsx` | Supabase Edge Function, Gemini 2.5 Flash | Grounded technical assistant with `Cmd/Ctrl+K` shortcut & hiring intent detection. |
| **Live Contact Form** | `ContactSection.tsx` | Supabase Edge Function, Resend | Direct email delivery to `ziad.w.khedr@gmail.com` with anti-spam honeypot. |
| **Verified Testimonials** | `TestimonialsSection.tsx` | React Dialog, Typescript Data | Authentic LinkedIn endorsements from colleagues with source links & quote modal. |
| **Active Scrollspy Navigation** | `Navigation.tsx` | IntersectionObserver / Scroll listener | Sticky header with active underline indicator following section scroll. |
| **Static HTML Pre-rendering** | `scripts/prerender.mjs` | Node.js SSR, React Server DOM | Injects 158KB of semantic DOM into `dist/index.html` for instant FCP and SEO. |
| **Theme System (Dark/Light)** | `Navigation.tsx`, `index.html` | Tailwind `dark:`, LocalStorage | Zero-FOUC theme initialization script honoring `prefers-color-scheme`. |
| **Reduced Motion Support** | `index.css` | Media Queries | Disables non-essential motion when `prefers-reduced-motion: reduce` is detected. |

---

## 2. In-Depth Feature Specifications

### 2.1 Dynamic Hero Role Rotator
- **File**: [src/components/sections/HeroSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/HeroSection.tsx)
- **Roles Cycled**:
  1. `Software Engineer — Mobile Development`
  2. `Flutter (Main Framework) & Mobile Specialist`
  3. `Native iOS (Swift) & Android (Kotlin)`
  4. `Clean Architecture & Offline-First Systems`
- **Choreography**: Each role enters via a slide-and-fade transition (`opacity: 0 -> 1, translateY: 8px -> 0px`). Text is contained within an inline flex container with fixed vertical alignment to prevent layout thrashing or cumulative layout shift (CLS: 0.000).

### 2.2 In-Browser Mobile App Simulators
- **File**: [src/components/projects/ProjectInteractiveDemo.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/projects/ProjectInteractiveDemo.tsx)
- **Amoomy (Freight Auction)**:
  - Users select freight categories (Heavy Machinery, Building Materials, Vehicles).
  - Simulates dynamic carrier bidding with BLoC state stream updates (Pending -> Dispatched -> In Transit).
- **Wofoodi (Fuel Station Radar)**:
  - Users toggle distance radii (2km, 5km, 10km) and fuel grades (91, 95, Diesel).
  - Station cards update pricing and availability in real time.
- **Raval (Reactive Grocery Cart)**:
  - Users adjust item quantities with optimistic UI updates, badge count recalculations, and total price updates.
- **Payss (QR Checkout)**:
  - Simulated camera viewport with pulse animation, barcode reticle, and payment authorization feedback.
- **Liquid Navbar (Canvas Shader)**:
  - Interactive navigation bar demonstrating fluid bezier curve tension when switching tabs.

### 2.3 Editorial AI Concierge (`AiAssistant.tsx`)
- **File**: [src/components/chatbot/AiAssistant.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/chatbot/AiAssistant.tsx)
- **Service**: [src/services/assistantService.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/services/assistantService.ts)
- **Edge Function**: `supabase/functions/portfolio-assistant/index.ts`
- **Behavior**:
  - Activated via floating badge or global shortcut (`Cmd+K` on Mac, `Ctrl+K` on Windows/Linux).
  - Grounded strictly in Zyad's verified projects, mobile development capabilities, Alexandria location, and tech stack. It will not fabricate unverified roles or credentials.
  - **Hiring Intent Detection**: If user prompt contains words like *"hire"*, *"rate"*, *"freelance"*, *"available"*, or *"contract"*, the assistant presents a direct *"Contact Zyad"* button that smoothly scrolls to `#contact` and closes the drawer.

### 2.4 Live Contact Form (`ContactSection.tsx`)
- **File**: [src/components/sections/ContactSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/ContactSection.tsx)
- **Service**: [src/services/contactService.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/services/contactService.ts)
- **Edge Function**: `supabase/functions/send-contact-email/index.ts`
- **Anti-Bot Honeypot**: Hidden input field (`_hp_company`) invisible to real users (`display: none`, `tabIndex: -1`). If a bot fills this field, submission is silently rejected without dispatching an email.
- **Validation**: Full client checks for valid name, RFC 5322 email syntax, and minimum message length.
- **Feedback**: Displays a live spinner during transmission, transitions to a success confirmation card with message reference ID upon HTTP 200, or exposes a direct `mailto:` fallback if network fails.

### 2.5 Verified Testimonials (`TestimonialsSection.tsx`)
- **File**: [src/components/sections/TestimonialsSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/TestimonialsSection.tsx)
- **Data**: [src/data/testimonials.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/data/testimonials.ts)
- **Authenticity**: Contains genuine peer reviews from LinkedIn colleagues (Ali Khaled, Ahmed Abd Alaziz, Karim Balbaa) focusing on Flutter development, code maintainability, and teamwork.
- **Interactive Modal**: Clicking *"Read full testimonial"* opens an accessible modal with complete recommendation text and direct link to the author's LinkedIn profile.
