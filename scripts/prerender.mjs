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
  const { html } = render();

  let template = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Inject rendered HTML into root container
  template = template.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );

  fs.writeFileSync(indexHtmlPath, template, 'utf-8');
  console.log(`[Success] Pre-rendered ${html.length} chars of HTML directly into dist/index.html`);

  // Clean up ssr directory so GitHub Pages artifact is clean
  fs.rmSync(path.join(distDir, 'ssr'), { recursive: true, force: true });
  console.log('Cleaned up temporary SSR build directory.');
}

prerender().catch((err) => {
  console.error('Error during prerender:', err);
  process.exit(1);
});
