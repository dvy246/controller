import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://controllertesting.com',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  integrations: [react(), sitemap({
    filter: (page) => {
      const excludePaths = ['/404', '/500', '/api/', '/admin/', '/embed/', '/report/', '/verify', '/course-cards-demo', '/feature-cards-demo'];
      return !excludePaths.some(p => page.includes(p));
    },
    serialize: (item) => {
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
      } else if (/^\/(controller|compare|fix|settings|fit|best-controller-for|learn|connect|calibrate|deadzone-calculator|overclock-validator|circularity-grader)\//.test(path)) {
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
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 4096,
    },
  },
  build: {
    format: 'file',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  },
});