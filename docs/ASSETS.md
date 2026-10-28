# Asset Management & Media Architecture

**Portfolio Owner:** Zyad Wael  
**Central Location:** `public/assets/` & `src/assets/`

---

## 1. Centralized Asset Directory Structure

Visual assets, media, favicons, and documents are organized centrally inside `public/assets/`:

```
public/assets/
├── favicon/                          # Personal developer brand (ZW monogram)
│   ├── favicon.svg                   # Crisp vector favicon
│   ├── favicon-16x16.png             # Standard browser tab (16px)
│   ├── favicon-32x32.png             # High-DPI browser tab (32px)
│   ├── favicon-48x48.png             # Windows desktop tile (48px)
│   ├── apple-touch-icon.png          # iOS Safari bookmark icon (180px)
│   ├── android-chrome-192x192.png    # Android PWA icon (192px)
│   ├── android-chrome-512x512.png    # Android splash screen icon (512px)
│   ├── favicon.ico                   # Multi-resolution ICO (16, 32, 48)
│   └── site.webmanifest              # PWA manifest
├── images/
│   ├── profile/                      # Zyad Wael profile photographs & art
│   │   ├── zyad-profile.webp         # Primary optimized WebP portrait (36KB)
│   │   ├── zyad-profile.png          # High-resolution PNG master
│   │   └── zyad-ascii.png            # Stylized ASCII portrait
│   ├── projects/                     # Project screenshots & store icons
│   │   ├── amoomy/                   # Freight & heavy logistics
│   │   │   └── amoomy-icon.png       # App Store icon
│   │   ├── wofoodi/                  # Fuel & station management
│   │   │   ├── wofoodi-icon.png      # App Store icon
│   │   │   └── wofoodi-icon.jpg      # Store banner
│   │   ├── raval/                    # E-commerce grocery
│   │   │   └── raval-icon.png        # App Store icon
│   │   ├── payss/                    # FinTech NFC & QR payment
│   │   │   └── payss-icon.png        # App icon
│   │   ├── chess/                    # Smart watch Bluetooth chess
│   │   │   └── chess-icon.png        # Companion icon
│   │   └── clipflow/                 # Cross-device clipboard sync
│   │       └── clipflow-icon.png     # App icon
│   ├── testimonials/                 # Colleague & client portraits
│   └── general/                      # Global site visuals
│       ├── og-image.png              # OpenGraph 1200x630 social share card
│       └── placeholder.svg           # Fallback image placeholder
└── docs/
    └── Zyad_Wael_CV.pdf              # Downloadable curriculum vitae
```

---

## 2. Asset Resolution on GitHub Pages

Because the portfolio is deployed under a subpath (`https://zyadwkhedr.github.io/zyadwael-portfolio-flutter/`), asset paths must be resolved with base awareness.

### Pattern A: Static Public Assets (e.g. in `index.html` or manifest)
In `index.html`, use `%BASE_URL%`:
```html
<!-- Vite automatically replaces %BASE_URL% with /zyadwael-portfolio-flutter/ in production -->
<link rel="icon" type="image/svg+xml" href="%BASE_URL%assets/favicon/favicon.svg" />
<link rel="preload" as="image" href="%BASE_URL%assets/images/profile/zyad-profile.webp" type="image/webp" />
```

### Pattern B: Programmatic Public Assets (e.g. in React components)
When referencing files in `public/assets/`, prefix with `import.meta.env.BASE_URL`:
```tsx
const screenshotUrl = `${import.meta.env.BASE_URL}assets/images/projects/amoomy/preview-1.webp`;
```

### Pattern C: Bundled Assets (Vite Rollup Hashing)
When images are imported inside TypeScript files via `@/assets/...`, Vite automatically hashes and resolves them correctly regardless of deployment root:
```ts
import amoomyIcon from '@/assets/amoomy-icon.png';
// Resolves to: /zyadwael-portfolio-flutter/assets/amoomy-icon-CO4yTjgO.png
```

---

## 3. How to Add Mobile Application Screenshots

The project showcase is architected so that Zyad can supply real app screenshots without modifying layout or JSX components:

1. **Save your screenshots** (preferably in WebP or optimized PNG format, e.g. 1080×2400) into the dedicated project folder:
   ```
   public/assets/images/projects/<project-name>/
   ```
   *Examples:*
   - `public/assets/images/projects/amoomy/bid-auction.webp`
   - `public/assets/images/projects/amoomy/tracking-map.webp`
   - `public/assets/images/projects/wofoodi/radar-view.webp`

2. **Open [src/data/projects.ts](file:///d:/Web/zyadwael-portfolio-flutter/src/data/projects.ts)** and add the screenshot entry to the project's `screenshots` array:
   ```ts
   {
     id: 'amoomy',
     title: 'Amoomy',
     // ...
     screenshots: [
       {
         id: 'amoomy-bid',
         url: '/zyadwael-portfolio-flutter/assets/images/projects/amoomy/bid-auction.webp',
         caption: 'Live freight load auction & driver bidding stream',
         placeholderLabel: 'Freight Bidding Screen',
       },
       {
         id: 'amoomy-tracking',
         url: '/zyadwael-portfolio-flutter/assets/images/projects/amoomy/tracking-map.webp',
         caption: 'Real-time telemetry and cross-city route tracking',
         placeholderLabel: 'Route Tracking Screen',
       },
     ],
   }
   ```

3. Rebuild and commit:
   ```bash
   npm run build
   git commit -am "chore: add Amoomy production screenshots"
   git push origin main
   ```

The application card will automatically render the screenshots inside realistic mobile phone mockup frames with caption overlays.

---

## 4. How to Regenerate or Update the Favicon

The favicon suite is generated programmatically from vector SVG via [scripts/generate_favicon.mjs](file:///d:/Web/zyadwael-portfolio-flutter/scripts/generate_favicon.mjs):

1. To modify the monogram glyph, colors, or geometry, edit the SVG template in `scripts/generate_favicon.mjs`.
2. Run the generator:
   ```bash
   node scripts/generate_favicon.mjs
   ```
3. The script automatically renders:
   - `public/assets/favicon/favicon.svg`
   - 16×16, 32×32, 48×48 PNGs
   - 180×180 Apple touch icon
   - 192×192 & 512×512 Android PWA icons
   - Multi-resolution `favicon.ico` (16, 32, 48 embedded)
   - Synchronizes `public/favicon.ico` root fallback and `site.webmanifest`.
