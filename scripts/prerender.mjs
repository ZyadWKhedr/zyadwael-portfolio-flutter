import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Provide safe browser globals for SSR execution
if (typeof global.window === 'undefined') {
  global.window = {};
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
  global.navigator = { language: 'en', languages: ['en'] };
}
if (typeof global.document === 'undefined') {
  global.document = {
    documentElement: {
      setAttribute: () => {},
      classList: { toggle: () => {} },
    },
    getElementsByTagName: () => [],
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, style: {} }),
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

async function prerender() {
  console.log('--- Starting Static HTML Pre-rendering ---');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error('dist/index.html not found. Run client build first.');
  }
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error('dist/ssr/entry-server.js not found. Run SSR build first.');
  }

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

  // 3. Pre-render dist/ufuq/index.html with UfuqShowcasePage content & meta
  const ufuqDir = path.join(distDir, 'ufuq');
  if (!fs.existsSync(ufuqDir)) {
    fs.mkdirSync(ufuqDir, { recursive: true });
  }

  const { html: ufuqHtml } = render('/zyadwael-portfolio-flutter/ufuq');
  let ufuqRendered = rawBaseTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${ufuqHtml}</div>`
  );

  // Customize Title and Meta Description for Ufuq
  ufuqRendered = ufuqRendered.replace(
    /<title>.*?<\/title>/,
    '<title>Ufuq (أفق) — Islamic Companion iOS App | Offline Quran, Prayer Times &amp; Radio</title>'
  );
  ufuqRendered = ufuqRendered.replace(
    /<meta name="description" content=".*?" \/>/,
    '<meta name="description" content="Ufuq (أفق) is a free, ad-free Islamic spiritual companion iOS app featuring 100% offline Medina Quran, 24/7 background Quran radio from Cairo, astronomical GPS prayer times, and tactile Subha counter." />'
  );

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
