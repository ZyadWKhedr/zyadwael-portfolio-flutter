import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const allowlistPath = path.join(rootDir, 'src', 'data', 'repos-allowlist.json');
const opensourcePath = path.join(rootDir, 'src', 'data', 'opensource.json');

async function syncGithub() {
  console.log('--- Syncing GitHub Repositories ---');

  if (!fs.existsSync(allowlistPath)) {
    console.error('Allowlist not found:', allowlistPath);
    return;
  }

  const allowlist = JSON.parse(fs.readFileSync(allowlistPath, 'utf8'));
  const currentData = fs.existsSync(opensourcePath)
    ? JSON.parse(fs.readFileSync(opensourcePath, 'utf8'))
    : [];

  const existingMap = new Map(currentData.map((item) => [item.name.toLowerCase(), item]));

  for (const repoName of allowlist) {
    try {
      console.log(`Fetching github.com/ZyadWKhedr/${repoName}...`);
      const res = await fetch(`https://api.github.com/repos/ZyadWKhedr/${repoName}`, {
        headers: {
          'User-Agent': 'Portfolio-Sync-Script',
        },
      });

      if (!res.ok) {
        console.warn(`Could not fetch repo ${repoName}: HTTP ${res.status}`);
        continue;
      }

      const repo = await res.json();
      const existing = existingMap.get(repoName.toLowerCase()) || {};

      const updated = {
        id: existing.id || repoName.toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
        name: repo.name,
        language: repo.language || existing.language || 'Code',
        stars: repo.stargazers_count ?? existing.stars ?? 0,
        packageVersion: existing.packageVersion,
        description: existing.description || {
          en: repo.description || 'Open source repository.',
          ar: 'مستودع مفتوح المصدر.',
        },
        installCommand: existing.installCommand || `git clone ${repo.html_url}.git`,
        links: {
          github: repo.html_url,
          ...(existing.links?.pubDev ? { pubDev: existing.links.pubDev } : {}),
        },
      };

      existingMap.set(repoName.toLowerCase(), updated);
    } catch (err) {
      console.error(`Error syncing ${repoName}:`, err.message);
    }
  }

  const result = allowlist
    .map((name) => existingMap.get(name.toLowerCase()))
    .filter(Boolean);

  fs.writeFileSync(opensourcePath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`[Success] Updated ${result.length} repositories in ${opensourcePath}`);
}

syncGithub();

