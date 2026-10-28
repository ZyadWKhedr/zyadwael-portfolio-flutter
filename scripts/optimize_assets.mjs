import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const rootDir = 'd:\\Web\\zyadwael-portfolio-flutter';
const assetsDir = path.join(rootDir, 'src', 'assets');
const publicDir = path.join(rootDir, 'public');

async function main() {
  console.log('Optimizing profile image...');
  const profileSrc = path.join(assetsDir, 'zyad-profile.png');
  const profileWebp = path.join(publicDir, 'zyad-profile.webp');
  const profileWebpSrc = path.join(assetsDir, 'zyad-profile.webp');

  // Generate 800x800 high-dpi profile WebP
  await sharp(profileSrc)
    .resize(800, 800, { fit: 'cover', position: 'top' })
    .webp({ quality: 85 })
    .toFile(profileWebp);

  fs.copyFileSync(profileWebp, profileWebpSrc);
  console.log(`Optimized profile saved: ${fs.statSync(profileWebp).size} bytes (was ${fs.statSync(profileSrc).size} bytes)`);

  // Generate 1200x630 Open Graph Image
  console.log('Generating 1200x630 Open Graph image...');
  const ogPath = path.join(publicDir, 'og-image.png');

  // Create an SVG banner for the Open Graph image
  const avatarSmallBuffer = await sharp(profileSrc)
    .resize(360, 360, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  const avatarBase64 = avatarSmallBuffer.toString('base64');

  const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="avatarClip">
          <rect x="760" y="135" width="360" height="360" rx="28" />
        </clipPath>
      </defs>
      <!-- Background -->
      <rect width="1200" height="630" fill="#0F1214" />
      <rect x="0" y="0" width="1200" height="6" fill="#D75A36" />
      
      <!-- Architectural Grid Subtlety -->
      <line x1="80" y1="80" x2="1120" y2="80" stroke="#262D33" stroke-width="1" />
      <line x1="80" y1="550" x2="1120" y2="550" stroke="#262D33" stroke-width="1" />

      <!-- Monospace Stamp -->
      <text x="80" y="140" font-family="monospace" font-size="14" fill="#D75A36" font-weight="700" letter-spacing="2">ENGINEERING FIELD NOTES · SHIPPED MOBILE PRODUCTS</text>
      
      <!-- Name -->
      <text x="80" y="225" font-family="serif, Georgia" font-size="64" fill="#F0F3F2" font-weight="700">Zyad Wael</text>

      <!-- Headline -->
      <text x="80" y="285" font-family="sans-serif" font-size="28" fill="#E06D4B" font-weight="600">Flutter Developer &amp; Data Science Student</text>

      <!-- Core Specs -->
      <text x="80" y="350" font-family="sans-serif" font-size="20" fill="#9BA4A0">Clean Architecture · Offline-First · AI Integration</text>
      <text x="80" y="385" font-family="sans-serif" font-size="16" fill="#69736E">4+ Shipped Apps on App Store &amp; Google Play · Open Source Creator</text>

      <!-- Badges -->
      <rect x="80" y="440" width="110" height="34" rx="6" fill="#1E2328" stroke="#3E4852" />
      <text x="135" y="462" font-family="monospace" font-size="13" fill="#F0F3F2" text-anchor="middle">Amoomy</text>

      <rect x="200" y="440" width="110" height="34" rx="6" fill="#1E2328" stroke="#3E4852" />
      <text x="255" y="462" font-family="monospace" font-size="13" fill="#F0F3F2" text-anchor="middle">Wofoodi</text>

      <rect x="320" y="440" width="95" height="34" rx="6" fill="#1E2328" stroke="#3E4852" />
      <text x="367" y="462" font-family="monospace" font-size="13" fill="#F0F3F2" text-anchor="middle">Raval</text>

      <rect x="425" y="440" width="95" height="34" rx="6" fill="#1E2328" stroke="#3E4852" />
      <text x="472" y="462" font-family="monospace" font-size="13" fill="#F0F3F2" text-anchor="middle">Payss</text>

      <!-- Avatar Frame -->
      <rect x="758" y="133" width="364" height="364" rx="30" fill="none" stroke="#D75A36" stroke-width="2" opacity="0.6" />
      <image href="data:image/png;base64,${avatarBase64}" x="760" y="135" width="360" height="360" clip-path="url(#avatarClip)" />
    </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(ogPath);

  console.log(`Generated OG image: ${ogPath} (${fs.statSync(ogPath).size} bytes)`);
}

main().catch(console.error);
