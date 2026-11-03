import fs from 'fs';
import path from 'path';

async function fetchJson(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    if (!res.ok) return { error: `HTTP ${res.status}: ${res.statusText}`, url };
    return await res.json();
  } catch (err) {
    return { error: err.message, url };
  }
}

async function fetchText(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    if (!res.ok) return { error: `HTTP ${res.status}: ${res.statusText}`, url };
    return await res.text();
  } catch (err) {
    return { error: err.message, url };
  }
}

async function main() {
  console.log('=== GATHERING REAL DATA SOURCES ===');
  const results = {};

  // 1. GitHub Profile & Repos
  console.log('\n[1/5] Fetching GitHub Profile & Repos...');
  results.githubProfile = await fetchJson('https://api.github.com/users/ZyadWKhedr');
  results.githubRepos = await fetchJson('https://api.github.com/users/ZyadWKhedr/repos?per_page=100');
  results.githubProfileReadme = await fetchText('https://raw.githubusercontent.com/ZyadWKhedr/ZyadWKhedr/main/README.md');
  results.githubProfileHtml = await fetchText('https://github.com/ZyadWKhedr');

  // 2. Medium RSS Feed
  console.log('\n[2/5] Fetching Medium RSS Feed...');
  results.mediumRss = await fetchText('https://medium.com/feed/@ziad.w.khedr');

  // 3. Apple App Store iTunes API
  console.log('\n[3/5] Fetching Apple App Store iTunes API...');
  results.appleUfuq = await fetchJson('https://itunes.apple.com/lookup?id=6821979552&country=us');
  results.appleChess = await fetchJson('https://itunes.apple.com/lookup?id=6774163012&country=us');

  // 4. Check for local source files
  console.log('\n[4/5] Checking local source files...');
  results.localSource = {
    linkedinPdf: fs.existsSync('source/linkedin.pdf'),
    mediumExport: fs.existsSync('source/medium-export'),
  };

  // Save raw data to a scratch json file for detailed inspection
  const outDir = path.resolve('.source_cache');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'gathered_sources.json'), JSON.stringify(results, null, 2));

  console.log('\n=== SUMMARY OF FETCH RESULTS ===');
  console.log('GitHub Profile:', results.githubProfile.name ? `OK (${results.githubProfile.name})` : results.githubProfile.error);
  console.log('GitHub Repos:', Array.isArray(results.githubRepos) ? `OK (${results.githubRepos.length} public repos)` : results.githubRepos.error);
  console.log('GitHub Profile README:', typeof results.githubProfileReadme === 'string' && !results.githubProfileReadme.error ? `OK (${results.githubProfileReadme.length} chars)` : results.githubProfileReadme.error);
  console.log('Medium RSS:', typeof results.mediumRss === 'string' && !results.mediumRss.error ? `OK (${results.mediumRss.length} chars)` : results.mediumRss.error);
  console.log('Apple Ufuq (6821979552):', results.appleUfuq.resultCount ? `OK (${results.appleUfuq.results[0].trackName})` : results.appleUfuq.error || '0 results');
  console.log('Apple Chess (6774163012):', results.appleChess.resultCount ? `OK (${results.appleChess.results[0].trackName})` : results.appleChess.error || '0 results');
  console.log('Local source/linkedin.pdf:', results.localSource.linkedinPdf ? 'FOUND' : 'MISSING');
  console.log('Local source/medium-export:', results.localSource.mediumExport ? 'FOUND' : 'MISSING');
}

main().catch(console.error);

