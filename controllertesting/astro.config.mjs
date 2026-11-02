import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import partytown from '@astrojs/partytown';
import fitData from './src/data/controllerFitData.json' with { type: 'json' };
import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Real sitemap lastmod: the date the page's route file last changed in git
// (today if it has uncommitted edits). Undefined when no source is found.
const lastmodCache = new Map();
function routeFile(pathname) {
  const segs = pathname.replace(/\.html$/, '').split('/').filter(Boolean);
  let dir = 'src/pages';
  for (let i = 0; i < segs.length; i++) {
    const last = i === segs.length - 1;
    const entries = existsSync(dir) ? readdirSync(dir) : [];
    if (last) {
      if (entries.includes(`${segs[i]}.astro`)) return join(dir, `${segs[i]}.astro`);
      if (entries.includes(segs[i]) && existsSync(join(dir, segs[i], 'index.astro'))) return join(dir, segs[i], 'index.astro');
      const dyn = entries.find((e) => /^\[.+\]\.astro$/.test(e));
      return dyn ? join(dir, dyn) : null;
    }
    const next = entries.includes(segs[i]) ? segs[i] : entries.find((e) => /^\[.+\]$/.test(e));
    if (!next) return null;
    dir = join(dir, next);
  }
  return 'src/pages/index.astro';
}
function gitLastmod(file) {
  if (!file) return undefined;
  if (lastmodCache.has(file)) return lastmodCache.get(file);
  let date;
  try {
    const dirty = execSync(`git status --porcelain -- "${file}"`, { encoding: 'utf8' }).trim();
    date = dirty
      ? new Date().toISOString().split('T')[0]
      : execSync(`git log -1 --format=%cs -- "${file}"`, { encoding: 'utf8' }).trim() || undefined;
  } catch { date = undefined; }
  lastmodCache.set(file, date);
  return date;
}

// Pages rendered with `noindex` (low-value-content audit 2026-11-01) must also
// stay out of the sitemap. Keep in sync with the `noindex` props on those routes.
const pendingFitSlugs = Object.entries(fitData.models)
  .filter(([, m]) => m.widthMm == null || m.weightG == null)
  .map(([slug]) => slug);
const noindexPatterns = [
  /^\/mods\/.+/,
  /^\/aim-trainer\/.+/,
  /^\/haptics\/.+/,
  /^\/controller\/.+/,
  /^\/test\/controller\/passport$/,
  new RegExp(`^/fit/(${pendingFitSlugs.join('|')})$`),
];

export default defineConfig({
  site: 'https://controllertesting.com',
  output: 'static',
  build: {
    format: 'file'
  },
  compressHTML: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'de', 'fr', 'ja', 'pt', 'ko', 'ru', 'zh-tw', 'it'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [react(), sitemap({
    filter: (page) => {
      const path = new URL(page).pathname;
      const cleanPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
      const prefixExcludes = ['/api/', '/admin/', '/embed/', '/es/', '/de/', '/fr/', '/ja/', '/pt/', '/ko/', '/ru/', '/zh-tw/', '/it/'];
      const exactExcludes = ['/404', '/500', '/report', '/verify', '/course-cards-demo', '/feature-cards-demo', '/shop'];
      if (prefixExcludes.some(p => cleanPath.startsWith(p))) return false;
      if (exactExcludes.includes(cleanPath)) return false;
      if (noindexPatterns.some(re => re.test(cleanPath))) return false;
      return true;
    },
    serialize: (item) => {
      // Ensure sitemap URLs match canonical tags without trailing slashes (except root)
      if (item.url === 'https://controllertesting.com') {
        item.url = 'https://controllertesting.com/';
      } else if (item.url.endsWith('/') && !item.url.endsWith('controllertesting.com/')) {
        item.url = item.url.slice(0, -1);
      }
      const path = new URL(item.url).pathname;
      if (path === '/' || path.startsWith('/test/')) {
        item.priority = 1.0;
        item.changefreq = 'weekly';
      } else if (/^\/(reliability|controller|compare|fix|settings|fit|best-controller-for|learn|connect)\//.test(path)) {
        item.priority = 0.9;
        item.changefreq = 'monthly';
      } else if (path.startsWith('/games/')) {
        item.priority = 0.7;
        item.changefreq = 'monthly';
      } else {
        item.priority = 0.8;
        item.changefreq = 'monthly';
      }
      item.lastmod = gitLastmod(routeFile(path));
      return item;
    }
  }), partytown({
    // gtag runs in the worker; forward main-thread consent updates to it.
    config: { forward: ['dataLayer.push'] },
  })],
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
    build: {
      assetsInlineLimit: 4096,
    },
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  },
});