import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

// Destination directories
const dirs = [
  'public/assets/images/profile',
  'public/assets/images/projects/amoomy',
  'public/assets/images/projects/wofoodi',
  'public/assets/images/projects/raval',
  'public/assets/images/projects/payss',
  'public/assets/images/projects/chess',
  'public/assets/images/projects/clipflow',
  'public/assets/images/testimonials',
  'public/assets/images/general',
  'public/assets/docs',
  'docs/research/app-store-data',
];

for (const d of dirs) {
  const full = path.join(rootDir, d);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
  }
}

function copyFileSafe(src, dest) {
  const srcPath = path.join(rootDir, src);
  const destPath = path.join(rootDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.warn(`Source not found: ${src}`);
  }
}

// 1. Profile assets
copyFileSafe('public/zyad-profile.webp', 'public/assets/images/profile/zyad-profile.webp');
copyFileSafe('src/assets/zyad-profile.webp', 'public/assets/images/profile/zyad-profile.webp');
copyFileSafe('src/assets/zyad-profile.png', 'public/assets/images/profile/zyad-profile.png');
copyFileSafe('src/assets/zyad-ascii.png', 'public/assets/images/profile/zyad-ascii.png');

// 2. Project icons & images
copyFileSafe('src/assets/amoomy-icon.png', 'public/assets/images/projects/amoomy/amoomy-icon.png');
copyFileSafe('src/assets/wofoodi-icon.png', 'public/assets/images/projects/wofoodi/wofoodi-icon.png');
copyFileSafe('src/assets/wofoodi-icon.jpg', 'public/assets/images/projects/wofoodi/wofoodi-icon.jpg');
copyFileSafe('src/assets/raval-icon.png', 'public/assets/images/projects/raval/raval-icon.png');
copyFileSafe('src/assets/payss-icon.png', 'public/assets/images/projects/payss/payss-icon.png');
copyFileSafe('src/assets/chess-icon.png', 'public/assets/images/projects/chess/chess-icon.png');
copyFileSafe('src/assets/clipflow-icon.png', 'public/assets/images/projects/clipflow/clipflow-icon.png');

// 3. General & documents
copyFileSafe('public/og-image.png', 'public/assets/images/general/og-image.png');
copyFileSafe('public/placeholder.svg', 'public/assets/images/general/placeholder.svg');
copyFileSafe('public/Zyad_Wael_CV.pdf', 'public/assets/docs/Zyad_Wael_CV.pdf');

// 4. Archive App Store research JSON files into docs/research/app-store-data/
const researchFiles = ['amoomy.json', 'clipflow.json', 'raval.json', 'wofoodi.json'];
for (const rf of researchFiles) {
  const p = path.join(rootDir, rf);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(rootDir, 'docs/research/app-store-data', rf));
    fs.unlinkSync(p);
    console.log(`Archived ${rf} -> docs/research/app-store-data/${rf}`);
  }
}

// 5. Clean up redundant root duplicate icons
const rootIcons = ['amoomy-icon.png', 'chess-icon.png', 'clipflow-icon.png', 'raval-icon.png'];
for (const ri of rootIcons) {
  const p = path.join(rootDir, ri);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`Cleaned up redundant root icon: ${ri}`);
  }
}

console.log('Asset organization complete!');
