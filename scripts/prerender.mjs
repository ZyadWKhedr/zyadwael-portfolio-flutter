import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Provide safe browser globals for SSR execution
if (typeof global.window === 'undefined') {
  global.window = {
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
    matchMedia: () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
    requestAnimationFrame: (cb) => setTimeout(cb, 0),
    cancelAnimationFrame: (id) => clearTimeout(id),
    getComputedStyle: () => ({
      getPropertyValue: () => '',
    }),
    scrollX: 0,
    scrollY: 0,
    innerWidth: 1280,
    innerHeight: 800,
  };
}
if (typeof global.localStorage === 'undefined') {
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
}
if (typeof global.navigator === 'undefined') {
  global.navigator = { language: 'ar', languages: ['ar', 'en'] };
}
if (typeof global.document === 'undefined') {
  global.document = {
    documentElement: {
      setAttribute: () => {},
      classList: { toggle: () => {}, contains: () => false, add: () => {}, remove: () => {} },
      style: {},
      addEventListener: () => {},
      removeEventListener: () => {},
    },
    body: {
      style: {},
      classList: { add: () => {}, remove: () => {} },
      addEventListener: () => {},
      removeEventListener: () => {},
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
    getElementsByTagName: () => [],
    createElement: () => ({
      setAttribute: () => {},
      appendChild: () => {},
      style: {},
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
    createTextNode: () => ({}),
    head: { appendChild: () => {} },
    getElementById: () => null,
  };
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const ssrEntryPath = path.join(distDir, 'ssr', 'entry-server.js');

/**
 * Generates build-time SVG QR codes linking to the Apple App Store for Ufuq
 */
async function generateUfuqQRCodes() {
  const publicUfuqDir = path.join(rootDir, 'public', 'assets', 'images', 'projects', 'ufuq');
  const distUfuqDir = path.join(distDir, 'assets', 'images', 'projects', 'ufuq');
  const darkSvgPath = path.join(publicUfuqDir, 'ufuq-qr-dark.svg');
  const lightSvgPath = path.join(publicUfuqDir, 'ufuq-qr-light.svg');

  if (fs.existsSync(darkSvgPath) && fs.existsSync(lightSvgPath)) {
    if (fs.existsSync(distUfuqDir)) {
      fs.copyFileSync(darkSvgPath, path.join(distUfuqDir, 'ufuq-qr-dark.svg'));
      fs.copyFileSync(lightSvgPath, path.join(distUfuqDir, 'ufuq-qr-light.svg'));
    }
    console.log('[Info] Using existing QR codes for Ufuq App Store URL');
    return;
  }

  try {
    const QRCode = (await import('qrcode')).default;
    const appStoreUrl = 'https://apps.apple.com/id/app/ufuq/id6821979552';
    const darkSvg = await QRCode.toString(appStoreUrl, {
      type: 'svg',
      margin: 1,
      color: {
        dark: '#ffffff',
        light: '#00000000',
      },
    });

    const lightSvg = await QRCode.toString(appStoreUrl, {
      type: 'svg',
      margin: 1,
      color: {
        dark: '#071f18',
        light: '#00000000',
      },
    });

    if (!fs.existsSync(publicUfuqDir)) fs.mkdirSync(publicUfuqDir, { recursive: true });
    fs.writeFileSync(darkSvgPath, darkSvg);
    fs.writeFileSync(lightSvgPath, lightSvg);

    if (fs.existsSync(distUfuqDir)) {
      fs.writeFileSync(path.join(distUfuqDir, 'ufuq-qr-dark.svg'), darkSvg);
      fs.writeFileSync(path.join(distUfuqDir, 'ufuq-qr-light.svg'), lightSvg);
    }
    console.log('[Success] Generated build-time QR codes for Ufuq App Store URL');
  } catch (err) {
    console.warn('[Notice] qrcode package not found; skipped dynamic SVG generation.');
  }
}

async function prerender() {
  console.log('--- Starting Static HTML Pre-rendering ---');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error('dist/index.html not found. Run client build first.');
  }
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error('dist/ssr/entry-server.js not found. Run SSR build first.');
  }

  // 0. Generate build-time QR SVGs
  await generateUfuqQRCodes();

  const { render } = await import('file:///' + ssrEntryPath.replace(/\\/g, '/'));
  const rawBaseTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');

  // 1. Pre-render Root Index
  const { html: indexHtml } = render('/zyadwael-portfolio-flutter/');
  const rootRendered = rawBaseTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${indexHtml}</div>`
  );
  fs.writeFileSync(indexHtmlPath, rootRendered, 'utf-8');
  console.log(`[Success] Pre-rendered ${indexHtml.length} chars of HTML directly into dist/index.html`);

  // 2. Ensure 404.html exists for GitHub Pages SPA fallback
  const notFoundHtmlPath = path.join(distDir, '404.html');
  fs.writeFileSync(notFoundHtmlPath, rootRendered, 'utf-8');
  console.log('[Success] Created dist/404.html for GitHub Pages routing.');

  // 3. Pre-render dist/ufuq/index.html with UfuqLanding content & meta
  const ufuqDir = path.join(distDir, 'ufuq');
  if (!fs.existsSync(ufuqDir)) {
    fs.mkdirSync(ufuqDir, { recursive: true });
  }

  const { html: ufuqHtml } = render('/zyadwael-portfolio-flutter/ufuq');
  let ufuqRendered = rawBaseTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${ufuqHtml}</div>`
  );

  // Set HTML lang="ar" and dir="rtl" for Arabic-first landing page
  ufuqRendered = ufuqRendered.replace('<html lang="en">', '<html lang="ar" dir="rtl">');

  // Customize Title and Meta Description for Ufuq
  ufuqRendered = ufuqRendered.replace(
    /<title>.*?<\/title>/,
    '<title>أُفُق — كل ما تحتاجه ليومك في مكان واحد | Ufuq Islamic App</title>'
  );
  ufuqRendered = ufuqRendered.replace(
    /<meta name="description" content=".*?" \/>/,
    '<meta name="description" content="القرآن الكريم، مواقيت الصلاة، الأذكار، والمزيد من الأدوات اليومية في تطبيق واحد، بتجربة بسيطة وهادئة." />'
  );

  // Set Canonical link to /ufuq
  ufuqRendered = ufuqRendered.replace(
    /<link rel="canonical" href=".*?" \/>/,
    '<link rel="canonical" href="https://zyadwkhedr.github.io/zyadwael-portfolio-flutter/ufuq" />'
  );

  // Set Open Graph & Twitter share images for Ufuq
  ufuqRendered = ufuqRendered.replace(
    /<meta property="og:image" content=".*?" \/>/,
    '<meta property="og:image" content="https://zyadwkhedr.github.io/zyadwael-portfolio-flutter/assets/images/projects/ufuq/ufuq-preview.webp" />'
  );
  ufuqRendered = ufuqRendered.replace(
    /<meta name="twitter:image" content=".*?" \/>/,
    '<meta name="twitter:image" content="https://zyadwkhedr.github.io/zyadwael-portfolio-flutter/assets/images/projects/ufuq/ufuq-preview.webp" />'
  );
  ufuqRendered = ufuqRendered.replace(
    /<meta property="og:title" content=".*?" \/>/,
    '<meta property="og:title" content="أُفُق — كل ما تحتاجه ليومك في مكان واحد" />'
  );
  ufuqRendered = ufuqRendered.replace(
    /<meta property="og:description" content=".*?" \/>/,
    '<meta property="og:description" content="القرآن الكريم، مواقيت الصلاة، الأذكار، والمزيد من الأدوات اليومية في تطبيق واحد، بتجربة بسيطة وهادئة." />'
  );

  // Add Apple Smart App Banner meta tag
  if (!ufuqRendered.includes('apple-itunes-app')) {
    ufuqRendered = ufuqRendered.replace(
      '</head>',
      '  <meta name="apple-itunes-app" content="app-id=6821979552">\n  </head>'
    );
  }

  fs.writeFileSync(path.join(ufuqDir, 'index.html'), ufuqRendered, 'utf-8');
  console.log(`[Success] Pre-rendered ${ufuqHtml.length} chars of HTML directly into dist/ufuq/index.html`);

  // Clean up ssr directory so GitHub Pages artifact is clean
  fs.rmSync(path.join(distDir, 'ssr'), { recursive: true, force: true });
  console.log('Cleaned up temporary SSR build directory.');
}

prerender().catch((err) => {
  console.error('Error during prerender:', err);
  process.exit(1);
});
