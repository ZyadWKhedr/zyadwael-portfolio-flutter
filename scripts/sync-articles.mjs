import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const articlesPath = path.join(rootDir, 'src', 'data', 'articles.json');

async function syncArticles() {
  console.log('--- Syncing Medium Articles ---');

  const currentArticles = fs.existsSync(articlesPath)
    ? JSON.parse(fs.readFileSync(articlesPath, 'utf8'))
    : [];

  const existingUrls = new Set(currentArticles.map((a) => a.url?.split('?')[0]));

  try {
    const res = await fetch('https://medium.com/feed/@ziad.w.khedr', {
      headers: { 'User-Agent': 'Portfolio-Article-Sync' },
    });

    if (!res.ok) {
      console.warn(`Could not fetch RSS: HTTP ${res.status}`);
      return;
    }

    const xml = await res.text();
    const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

    let addedCount = 0;
    for (const match of itemMatches) {
      const itemXml = match[1];
      const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || itemXml.match(/<title>(.*?)<\/title>/);
      const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
      const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);

      const title = titleMatch ? titleMatch[1].trim() : null;
      const rawLink = linkMatch ? linkMatch[1].trim() : null;
      const cleanLink = rawLink ? rawLink.split('?')[0] : null;

      if (!title || !cleanLink) continue;

      if (existingUrls.has(cleanLink)) {
        continue;
      }

      const dateObj = pubDateMatch ? new Date(pubDateMatch[1]) : new Date();
      const isoDate = dateObj.toISOString().split('T')[0];
      const enDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

      // Topic detection heuristic
      const lower = title.toLowerCase();
      let topic = 'Flutter';
      let topicAr = 'فلاتر';
      if (lower.includes('ml') || lower.includes('ai') || lower.includes('gemini') || lower.includes('vision')) {
        topic = 'AI & ML';
        topicAr = 'ذكاء اصطناعي';
      } else if (lower.includes('algorithm') || lower.includes('pca') || lower.includes('regression') || lower.includes('data structure') || lower.includes('math')) {
        topic = 'Algorithms & math';
        topicAr = 'خوارزميات ورياضيات';
      }

      const newArticle = {
        id: title.toLowerCase().replace(/[^a-z0-9_-]/g, '-').slice(0, 30),
        title,
        date: isoDate,
        displayDate: {
          en: enDate,
          ar: enDate,
        },
        publication: 'Medium',
        url: cleanLink,
        topic,
        topicLabel: {
          en: topic,
          ar: topicAr,
        },
      };

      currentArticles.unshift(newArticle);
      existingUrls.add(cleanLink);
      addedCount++;
    }

    if (addedCount > 0) {
      fs.writeFileSync(articlesPath, JSON.stringify(currentArticles, null, 2), 'utf8');
      console.log(`[Success] Added ${addedCount} new articles to ${articlesPath}`);
    } else {
      console.log('[Notice] No new articles found in Medium RSS feed.');
    }
  } catch (err) {
    console.error('Error during article sync:', err.message);
  }
}

syncArticles();

