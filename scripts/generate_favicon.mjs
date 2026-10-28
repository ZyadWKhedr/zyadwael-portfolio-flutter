import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDir = process.cwd();
const faviconDir = path.join(rootDir, 'public', 'assets', 'favicon');

if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true });
}

// Bespoke ZW Architectural Monogram SVG
// Design: Dark obsidian background (#141517), warm paper chalk (#F6F4EE), terracotta accent (#D96B43)
// High contrast, bold geometric silhouette that remains razor-sharp at 16x16px.
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A1C20" />
      <stop offset="100%" stop-color="#0E0F11" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E87C52" />
      <stop offset="100%" stop-color="#C85A32" />
    </linearGradient>
  </defs>

  <!-- Background Squircle -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  <rect x="12" y="12" width="488" height="488" rx="100" fill="none" stroke="#D96B43" stroke-width="6" stroke-opacity="0.35" />

  <!-- Monogram ZW Geometric Construction -->
  <g id="monogram">
    <!-- Letter Z (Chalk White, Bold Architectural Stroke) -->
    <path 
      d="M 104 148 L 264 148 L 264 196 L 168 316 L 264 316 L 264 364 L 104 364 L 104 316 L 200 196 L 104 196 Z" 
      fill="#F6F4EE" 
    />

    <!-- Letter W (Terracotta Accent, Interlocking Dynamic Chevron) -->
    <path 
      d="M 284 148 L 328 148 L 358 290 L 388 196 L 416 196 L 446 290 L 476 148 L 520 148 L 472 364 L 420 364 L 402 278 L 384 364 L 332 364 Z" 
      transform="translate(-32, 0)"
      fill="url(#accentGrad)" 
    />

    <!-- Subtle Technical Engineering Dot Accent -->
    <circle cx="438" cy="148" r="14" fill="#D96B43" />
  </g>
</svg>`;

async function buildFavicons() {
  console.log('Generating bespoke ZW developer favicons...');
  
  // 1. Write favicon.svg
  const svgPath = path.join(faviconDir, 'favicon.svg');
  fs.writeFileSync(svgPath, svgContent);
  console.log('  [OK] public/assets/favicon/favicon.svg');

  const svgBuffer = Buffer.from(svgContent);

  // 2. Generate PNG sizes
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
  ];

  const pngBuffers = {};

  for (const { size, name } of sizes) {
    const dest = path.join(faviconDir, name);
    const buf = await sharp(svgBuffer).resize(size, size).png().toBuffer();
    fs.writeFileSync(dest, buf);
    pngBuffers[size] = buf;
    console.log(`  [OK] public/assets/favicon/${name} (${size}x${size})`);
  }

  // 3. Generate multi-resolution ICO file (16, 32, 48)
  // Standard ICO format header and directory entries
  const icoSizes = [16, 32, 48];
  const count = icoSizes.length;
  
  // Header: 6 bytes (2 reserved, 2 type = 1, 2 count)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  let offset = 6 + count * 16;
  const imageBuffers = [];

  for (const s of icoSizes) {
    const imgBuf = pngBuffers[s];
    imageBuffers.push(imgBuf);

    const dirEntry = Buffer.alloc(16);
    dirEntry.writeUInt8(s === 256 ? 0 : s, 0); // width
    dirEntry.writeUInt8(s === 256 ? 0 : s, 1); // height
    dirEntry.writeUInt8(0, 2); // color palette
    dirEntry.writeUInt8(0, 3); // reserved
    dirEntry.writeUInt16LE(1, 4); // color planes
    dirEntry.writeUInt16LE(32, 6); // bits per pixel
    dirEntry.writeUInt32LE(imgBuf.length, 8); // image size
    dirEntry.writeUInt32LE(offset, 12); // image offset

    dirEntries.push(dirEntry);
    offset += imgBuf.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...imageBuffers]);
  
  // Write to public/assets/favicon/favicon.ico
  fs.writeFileSync(path.join(faviconDir, 'favicon.ico'), icoBuffer);
  console.log('  [OK] public/assets/favicon/favicon.ico');

  // Also write to public/favicon.ico as root fallback
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), icoBuffer);
  console.log('  [OK] public/favicon.ico (root fallback)');

  // 4. Write site.webmanifest
  const manifest = {
    name: "Zyad Wael — Mobile Software Engineer",
    short_name: "Zyad Wael",
    icons: [
      {
        src: "/zyadwael-portfolio-flutter/assets/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/zyadwael-portfolio-flutter/assets/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#141517",
    background_color: "#141517",
    display: "standalone"
  };

  fs.writeFileSync(
    path.join(faviconDir, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  // Also place in public root for crawlers that expect /site.webmanifest
  fs.writeFileSync(
    path.join(rootDir, 'public', 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('  [OK] public/assets/favicon/site.webmanifest');
  console.log('  [OK] public/site.webmanifest');
  console.log('Favicon generation completed successfully!');
}

buildFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
