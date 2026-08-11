// sync-locales.js — DISABLED for en-only launch (2026-08-10)
//
// Previously byte-copied every root page into 9 locale dirs (es, de, fr, ja,
// pt, ko, ru, zh-tw, it). Those copies rendered English content under locale
// URLs: 2,750 near-duplicate sitemap URLs that Google clusters as duplicates
// (duplicate detection runs before hreflang evaluation) and a site-wide
// helpful-content risk. Per Google's localized-content guidance, locale pages
// must contain genuinely translated content — do not re-enable this until
// real translations for each locale exist.
//
// Re-enable when: content templates use useTranslations() and every page
// passed to a locale dir is fully translated (title, description, headings,
// body, FAQ schema).

const locales = [];

for (const locale of locales) {
  console.log(`[sync-locales] skipped ${locale} (locale generation disabled)`);
}

console.log('[sync-locales] no-op: en-only launch; locale trees disabled.');
