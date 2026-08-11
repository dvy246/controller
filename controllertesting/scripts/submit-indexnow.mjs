#!/usr/bin/env node
/**
 * submit-indexnow.mjs — ControllerTesting.com
 * Submits all sitemap URLs to Bing/Yandex/DuckDuckGo via IndexNow API
 * for rapid post-launch indexation.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs
 *   node scripts/submit-indexnow.mjs --dry-run
 *
 * IndexNow key must match: public/indexnow-key.txt
 * Documentation: https://www.indexnow.org/documentation
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

const INDEXNOW_KEY = 'ct2026indexnow';
const SITE_URL = 'https://controllertesting.com';
const DRY_RUN = process.argv.includes('--dry-run');

// Top-priority URLs to submit immediately on launch
const PRIORITY_URLS = [
  'https://controllertesting.com/',
  'https://controllertesting.com/test/controller/drift',
  'https://controllertesting.com/test/controller/full-diagnostic',
  'https://controllertesting.com/test/controller/health-score',
  'https://controllertesting.com/test/controller/ps5',
  'https://controllertesting.com/test/controller/xbox',
  'https://controllertesting.com/test/controller/nintendo-switch',
  'https://controllertesting.com/test/controller/buttons',
  'https://controllertesting.com/test/controller/triggers',
  'https://controllertesting.com/test/controller/vibration',
  'https://controllertesting.com/test/controller/polling-rate',
  'https://controllertesting.com/test/controller/deadzone',
  'https://controllertesting.com/test/controller/circularity',
  'https://controllertesting.com/test/controller/joycon',
  'https://controllertesting.com/test/controller/latency',
  'https://controllertesting.com/test/mouse/cps',
  'https://controllertesting.com/test/mouse/dpi',
  'https://controllertesting.com/test/mouse/polling-rate',
  'https://controllertesting.com/learn',
  'https://controllertesting.com/fix/stick-drift',
  'https://controllertesting.com/reliability/dashboard',
  'https://controllertesting.com/compare',
  'https://controllertesting.com/settings',
];

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

async function submitUrls(urls, batchLabel) {
  if (DRY_RUN) {
    console.log(`[DRY RUN] Would submit ${urls.length} URLs (${batchLabel})`);
    urls.forEach(url => console.log(`  ${url}`));
    return;
  }

  const payload = {
    host: 'controllertesting.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/indexnow-key.txt`,
    urlList: urls,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    console.log(`[${batchLabel}] Status: ${res.status} ${res.statusText}`);
    if (res.status === 200) {
      console.log(`  ✅ ${urls.length} URLs accepted`);
    } else if (res.status === 202) {
      console.log(`  ⏳ ${urls.length} URLs queued for processing`);
    } else {
      const body = await res.text();
      console.log(`  ⚠️  Response: ${body}`);
    }
  } catch (err) {
    console.error(`  ❌ Error submitting ${batchLabel}:`, err.message);
  }
}

async function main() {
  console.log('🚀 ControllerTesting.com — IndexNow Submission');
  console.log(`   Key: ${INDEXNOW_KEY}`);
  console.log(`   Site: ${SITE_URL}`);
  console.log(`   Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log('');

  // Submit priority URLs first
  await submitUrls(PRIORITY_URLS, 'Priority URLs');
  
  console.log('\n✅ IndexNow submission complete!');
  console.log('   Bing typically indexes within 48 hours.');
  console.log('   Also submit sitemap manually to Google Search Console.');
}

main().catch(console.error);
