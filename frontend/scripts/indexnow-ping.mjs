// scripts/indexnow-ping.mjs
// Pings IndexNow (Bing, Yandex, etc.) with all sitemap URLs after content updates
import fs from 'fs';

const INDEXNOW_KEY = '48c45fda9ba043c4ba2d637dbbbfba7f';
const HOST = 'pferdewert.de';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  // Read DE sitemap to extract URLs
  const sitemapPath = 'public/sitemap-de.xml';
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ sitemap-de.xml not found. Run `npm run sitemap` first.');
    process.exit(1);
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

  if (urls.length === 0) {
    console.error('❌ No URLs found in sitemap.');
    process.exit(1);
  }

  console.log(`\n📡 IndexNow: Submitting ${urls.length} URLs to Bing/Yandex...`);

  const body = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  });

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
    });

    if (res.ok || res.status === 202) {
      console.log(`✅ IndexNow: ${urls.length} URLs submitted successfully (Status: ${res.status})`);
    } else {
      const text = await res.text();
      console.error(`❌ IndexNow failed (Status: ${res.status}): ${text}`);
    }
  } catch (err) {
    console.error('❌ IndexNow request failed:', err.message);
  }
}

main();
