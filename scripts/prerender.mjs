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
  global.navigator = { language: 'ar', languages: ['ar', 'en'] };
}
if (typeof global.document === 'undefined') {
  global.document = {
    documentElement: {
      setAttribute: () => {},
      classList: { toggle: () => {}, contains: () => false, add: () => {}, remove: () => {} },
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

  // 1. Pre-render Portfolio Homepage (/)
  const { html: homeHtml } = render('/');
  let template = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Inject rendered HTML into root container
  const homeOutput = template.replace(
    '<div id="root"></div>',
    `<div id="root">${homeHtml}</div>`
  );

  fs.writeFileSync(indexHtmlPath, homeOutput, 'utf-8');
  console.log(`[Success] Pre-rendered ${homeHtml.length} chars of HTML directly into dist/index.html`);

  // 2. Pre-render Ufuq Product Landing Page (/ufuq)
  const { html: ufuqHtml } = render('/ufuq');
  let ufuqTemplate = template.replace(
    '<div id="root"></div>',
    `<div id="root">${ufuqHtml}</div>`
  );

  // Customize title & meta description for Ufuq static HTML
  ufuqTemplate = ufuqTemplate
    .replace(
      /<title>.*?<\/title>/,
      '<title>أُفُق — كل ما تحتاجه ليومك في مكان واحد | Ufuq Islamic App</title>'
    )
    .replace(
      /<meta name="description" content=".*?" \/>/,
      '<meta name="description" content="القرآن الكريم، مواقيت الصلاة، الأذكار، والمزيد من الأدوات اليومية في تطبيق واحد، بتجربة بسيطة وهادئة." />'
    )
    .replace(
      /<meta property="og:title" content=".*?" \/>/,
      '<meta property="og:title" content="أُفُق — كل ما تحتاجه ليومك في مكان واحد" />'
    )
    .replace(
      /<meta property="og:description" content=".*?" \/>/,
      '<meta property="og:description" content="القرآن الكريم، مواقيت الصلاة، الأذكار، والمزيد من الأدوات اليومية في تطبيق واحد، بتجربة بسيطة وهادئة." />'
    );

  const ufuqDir = path.join(distDir, 'ufuq');
  if (!fs.existsSync(ufuqDir)) {
    fs.mkdirSync(ufuqDir, { recursive: true });
  }
  fs.writeFileSync(path.join(ufuqDir, 'index.html'), ufuqTemplate, 'utf-8');
  console.log(`[Success] Pre-rendered ${ufuqHtml.length} chars of HTML directly into dist/ufuq/index.html`);

  // 3. Create 404.html fallback for GitHub Pages SPA routing
  fs.copyFileSync(indexHtmlPath, path.join(distDir, '404.html'));
  console.log('[Success] Created dist/404.html fallback for GitHub Pages.');

  // Clean up ssr directory so GitHub Pages artifact is clean
  fs.rmSync(path.join(distDir, 'ssr'), { recursive: true, force: true });
  console.log('Cleaned up temporary SSR build directory.');
}

prerender().catch((err) => {
  console.error('Error during prerender:', err);
  process.exit(1);
});
