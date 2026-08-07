import fs from 'fs/promises';
import path from 'path';

async function findFiles(dir, ext) {
  const files = [];
  async function scan(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (fullPath.endsWith(ext)) {
        files.push(fullPath);
      }
    }
  }
  await scan(dir);
  return files;
}

async function audit() {
  const pages = await findFiles('src/pages', '.astro');
  const results = [];

  for (const page of pages) {
    if (page.includes('/embed/') || page.includes('/api/')) continue;
    
    const content = await fs.readFile(page, 'utf8');
    
    const hasFaqs = content.includes('faqs={') || content.includes('faqs = [');
    const hasSchema = content.includes('schema=') || content.includes('application/ld+json');
    const hasTitle = content.includes('title=') || content.includes('<title>');
    
    const h2Match = content.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
    const h3Match = content.match(/<h3[^>]*>(.*?)<\/h3>/gi) || [];
    
    const nonQuestionHeaders = [...h2Match, ...h3Match].filter(h => {
      const text = h.replace(/<[^>]+>/g, '').trim();
      return !text.endsWith('?');
    });

    results.push({
      page,
      hasFaqs,
      hasSchema,
      hasTitle,
      totalHeaders: h2Match.length + h3Match.length,
      nonQuestionHeaders: nonQuestionHeaders.map(h => h.replace(/<[^>]+>/g, '').trim())
    });
  }

  const missingFaqs = results.filter(r => !r.hasFaqs).map(r => r.page);
  const badHeaders = results.filter(r => r.nonQuestionHeaders.length > 0).map(r => ({page: r.page, headers: r.nonQuestionHeaders}));
  const missingSchema = results.filter(r => !r.hasSchema && !r.hasFaqs).map(r => r.page); // If faqs exist, FAQPage schema is generated via layout usually, unless schema specifically missing.

  console.log(JSON.stringify({ missingFaqs, badHeaders, missingSchema, total: results.length }, null, 2));
}

audit().catch(console.error);
