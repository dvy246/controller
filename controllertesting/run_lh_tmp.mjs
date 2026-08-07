import fs from 'node:fs';
const { navigation } = await import('lighthouse');

const pages = { home: '', drift: 'test/controller/drift' };

for (let pass = 1; pass <= 2; pass++) {
  for (const [key, path] of Object.entries(pages)) {
    const t = await fetch(`http://localhost:9222/json/new?http://localhost:4321/${path}`, { method: 'PUT' }).then((r) => r.json());
    await new Promise((r) => setTimeout(r, 800));
    const cfg = {
      extends: 'lighthouse:default',
      settings: {
        onlyCategories: ['performance'],
        disableStorageReset: false,
        formFactor: 'desktop',
        screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false },
      },
    };
    const r = await navigation(undefined, `http://localhost:4321/${path}`, { flags: { port: 9222, output: 'json' }, config: cfg });
    fs.writeFileSync(`/tmp/lh2_${key}_p${pass}.json`, r.report);
    const j = JSON.parse(r.report);
    const a = j.audits;
    console.log(`pass${pass}`, key, 'perf:' + Math.round(j.categories.performance.score * 100) + '%',
      'LCP:' + a['largest-contentful-paint'].displayValue,
      'TBT:' + a['total-blocking-time'].displayValue,
      'FCP:' + a['first-contentful-paint'].displayValue);
  }
}
console.log('DONE');