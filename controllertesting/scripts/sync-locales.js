import fs from 'fs';
import path from 'path';

const locales = ['es', 'de', 'fr', 'ja', 'pt', 'ko', 'ru', 'zh-tw', 'it'];
const srcPagesDir = path.join(process.cwd(), 'src', 'pages');

function copyDirectory(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);

  for (const file of files) {
    if (locales.includes(file)) {
      continue; // Skip the locale directories themselves
    }
    
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

console.log('Syncing localized pages...');

for (const locale of locales) {
  const targetDir = path.join(srcPagesDir, locale);
  copyDirectory(srcPagesDir, targetDir);
  console.log(`Synced -> ${locale}`);
}

console.log('Localization sync complete.');
