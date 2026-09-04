import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import partytown from '@astrojs/partytown';

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
      const exactExcludes = ['/404', '/500', '/report', '/verify', '/course-cards-demo', '/feature-cards-demo'];
      if (prefixExcludes.some(p => cleanPath.startsWith(p))) return false;
      if (exactExcludes.includes(cleanPath)) return false;
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
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      // Reliability data snapshot date
      const dataDate = '2026-08-02';

      if (path === '/' || path === '/index.html') {
        item.priority = 1.0;
        item.changefreq = 'weekly';
        item.lastmod = today;
      } else if (path.startsWith('/test/')) {
        item.priority = 1.0;
        item.changefreq = 'weekly';
        item.lastmod = '2026-08-10';
      } else if (/^\/(reliability)\//.test(path)) {
        item.priority = 0.9;
        item.changefreq = 'monthly';
        item.lastmod = dataDate;
      } else if (/^\/(controller|compare|fix|settings|fit|best-controller-for|learn|connect|calibrate|deadzone-calculator|overclock-validator|circularity-grader|mods)\//.test(path)) {
        item.priority = 0.9;
        item.changefreq = 'monthly';
        item.lastmod = '2026-08-10';
      } else if (/^\/(es|de|fr|ja|pt|ko|ru|zh-tw|it)\/?$/.test(path)) {
        item.priority = 0.8;
        item.changefreq = 'monthly';
        item.lastmod = '2026-08-10';
      } else if (path.startsWith('/games/')) {
        item.priority = 0.7;
        item.changefreq = 'monthly';
        item.lastmod = '2026-08-10';
      } else {
        item.priority = 0.8;
        item.changefreq = 'monthly';
        item.lastmod = '2026-08-10';
      }
      return item;
    }
  }), partytown()],
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