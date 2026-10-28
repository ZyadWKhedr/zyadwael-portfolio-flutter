# Content Management Guide

**Portfolio Owner:** Zyad Wael  
**Goal:** Make updating your projects, copy, testimonials, and assets effortless without editing complex JSX layout code.

---

## 1. Quick File Reference

| To Update... | Edit This File |
| :--- | :--- |
| **Featured Projects & Screenshots** | [src/data/projects.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/data/projects.ts) |
| **Skills & Capability Matrix** | [src/data/skills.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/data/skills.ts) |
| **Colleague & Client Testimonials** | [src/data/testimonials.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/data/testimonials.ts) |
| **Technical Articles & Publications** | [src/data/articles.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/data/articles.ts) |
| **Hero Headline & Rotator Roles** | [src/components/sections/HeroSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/HeroSection.tsx) |
| **About Bio & University Background** | [src/components/sections/AboutSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/AboutSection.tsx) |
| **Contact Email & Social Profile URLs** | [src/components/sections/ContactSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/ContactSection.tsx) & [src/components/layout/Footer.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/layout/Footer.tsx) |
| **SEO Meta Tags & Social Share Card** | [index.html](file:///d:/Web/zyadwael-portfolio-flutter/index.html) |
| **Favicon Monogram** | [scripts/generate_favicon.mjs](file:///d:/Web/zyadwael-portfolio-flutter/scripts/generate_favicon.mjs) |

---

## 2. Managing Featured Projects

All project content is centralized in [src/data/projects.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/data/projects.ts).

### Adding a New Featured Project
Add an object to the `FEATURED_PROJECTS` array following the `FeaturedProject` schema:

```ts
{
  id: 'my-new-app',
  title: 'My New App',
  arabicTitle: 'تطبيقي الجديد',
  category: 'Mobile / Cross-Platform',
  tagline: 'High-performance Flutter mobile application with real-time sync.',
  icon: myAppIcon, // Imported from @/assets/my-app-icon.png
  problem: 'Detailed explanation of the real user or business problem solved.',
  role: 'Lead Mobile Architect & Flutter Developer',
  architecture: 'Clean Architecture with BLoC, repository pattern, and offline-first cache.',
  decisions: [
    'Chose drift/sqlite over Hive for ACID compliance and relational query capabilities.',
    'Implemented optimistic UI mutations to achieve zero-latency perceived responsiveness.',
  ],
  stack: ['Flutter', 'Dart', 'BLoC', 'REST API', 'SQLite', 'Firebase'],
  outcome: 'Shipped to iOS and Android with 99.9% crash-free sessions across 10,000+ active users.',
  metrics: ['99.9% Crash-Free', '< 60ms Latency', '60 FPS Transitions'],
  links: {
    appStore: 'https://apps.apple.com/...',
    playStore: 'https://play.google.com/...',
    github: 'https://github.com/ZyadWKhedr/my-new-app',
    live: 'https://...',
  },
  screenshots: [
    {
      id: 'screen-1',
      url: '/zyadwael-portfolio-flutter/assets/images/projects/my-new-app/home.webp',
      caption: 'Main dashboard with real-time stream updates',
      placeholderLabel: 'Home Dashboard Screen',
    },
  ],
  interactiveDemo: {
    type: 'dispatch_queue', // or 'station_radar' | 'reactive_cart' | 'qr_scanner' | 'liquid_canvas'
    title: 'Interactive Feature Demo',
    subtitle: 'Tap to test state transitions',
    summary: 'Demonstration of reactive state handling under high event loads.',
  },
}
```

---

## 3. Adding Application Screenshots

1. Save your screenshot image file into:
   ```
   public/assets/images/projects/<project-id>/
   ```
2. In `src/data/projects.ts`, add the file path to the project's `screenshots` array:
   ```ts
   screenshots: [
     {
       id: 'amoomy-screen-1',
       url: '/zyadwael-portfolio-flutter/assets/images/projects/amoomy/bid-flow.webp',
       caption: 'Real-time carrier freight auction screen',
       placeholderLabel: 'Carrier Bid Stream',
     },
   ],
   ```
3. Run `npm run build` to verify the image renders inside the phone mockup frame.

---

## 4. Managing Testimonials

All recommendations live in [src/data/testimonials.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/data/testimonials.ts).

### Adding an Authentic Recommendation
```ts
{
  id: 'client-name',
  name: 'Client Name',
  role: 'Engineering Manager',
  company: 'Company Name',
  relationship: 'Managed Zyad on cross-platform Flutter development',
  quote: 'Zyad delivered clean, testable Flutter code that integrated seamlessly with our backends...',
  initials: 'CN',
  linkedIn: 'https://www.linkedin.com/in/client-name/',
  highlight: 'Clean, testable Flutter code delivered on schedule',
}
```

---

## 5. Updating Social Links & Contact Information

To update email, phone, or social handles:
1. Open [src/components/sections/ContactSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/ContactSection.tsx) and update the constants at the top:
   - `EMAIL = 'ziad.w.khedr@gmail.com'`
   - `LINKEDIN_URL = 'https://www.linkedin.com/in/zyad-wael/'`
   - `GITHUB_URL = 'https://github.com/ZyadWKhedr'`
   - `CV_URL = 'https://...'`
2. Update the corresponding links in [src/components/layout/Footer.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/layout/Footer.tsx) and [src/components/sections/HeroSection.tsx](file:///d:/Web/zyadwael-portfolio-flutter/src/components/sections/HeroSection.tsx).
3. Update the JSON-LD Person schema in [index.html](file:///d:/Web/zyadwael-portfolio-flutter/index.html).
