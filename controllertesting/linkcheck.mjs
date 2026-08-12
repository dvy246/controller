// Quick broken-link scan over dist/*.html — internal links only
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const dist = new URL('./dist/', import.meta.url).pathname;
const pages = [];
const files = new Set();
function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else {
      files.add(p.slice(dist.length));
      if (e.endsWith('.html')) pages.push(p);
    }
  }
}
walk(dist);

const broken = new Map();
let checked = 0;
for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  const re = /href="(\/[^"#]*(?:\.html)?)"/g;
  let m;
  while ((m = re.exec(html))) {
    const href = m[1];
    if (href.startsWith('/api/') || href.startsWith('mailto') || href.includes('#')) continue;
    checked++;
    let target = href.replace(/\.html$/, '') + '.html';
    if (href === '/') target = 'index.html';
    if (!target.startsWith('/')) continue;
    const direct = files.has(href.slice(1));
    const ok = direct || files.has(target.slice(1)) || target.slice(1) === '404.html';
    if (!ok) {
      if (!broken.has(href)) broken.set(href, []);
      broken.get(href).push(p.slice(dist.length));
    }
  }
}
console.log(`pages=${pages.length} links_checked=${checked} broken=${[...broken.keys()].length}`);
for (const [href, from] of broken) {
  console.log(`BROKEN ${href}  <-  ${[...new Set(from)].slice(0, 4).join(', ')}`);
}