import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://controllertesting.com',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  integrations: [sitemap({
    filter: (page) => {
      const excludePaths = ['/404', '/500', '/api/', '/admin/', '/embed/', '/report/'];
      return !excludePaths.some(p => page.includes(p));
    },
    serialize: (item) => {
      const path = new URL(item.url).pathname;
      if (path === '/' || path === '/index.html') {
        item.priority = 1.0;
        item.changefreq = 'weekly';
      } else if (path.startsWith('/test/')) {
        item.priority = 1.0;
        item.changefreq = 'weekly';
      } else if (/^\/(controller|reliability|compare|fix|settings|fit|best-controller-for|learn|connect|calibrate|deadzone-calculator|overclock-validator|circularity-grader)\//.test(path)) {
        item.priority = 0.9;
        item.changefreq = 'monthly';
      } else if (/^\/(es|de|fr|ja|pt|ko|ru|zh-tw|it)\/?$/.test(path)) {
        item.priority = 0.8;
        item.changefreq = 'monthly';
      } else if (path.startsWith('/games/')) {
        item.priority = 0.7;
        item.changefreq = 'monthly';
      } else {
        item.priority = 0.8;
        item.changefreq = 'monthly';
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