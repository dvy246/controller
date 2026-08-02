#!/usr/bin/env bash
set -e

echo "🔍 Running Pre-Deploy SEO Quality Gate for ControllerTesting.com..."

# 1. Verify build directory exists
if [ ! -d "dist" ]; then
  echo "⚠️ Notice: dist directory not found. Running npx astro build..."
  npx astro build
fi

# 2. Check for unexpected noindex tags in production output
NOINDEX_FILES=$(grep -rn "noindex" dist/ 2>/dev/null | grep -vE "404.html|500.html" || true)
if [ -n "$NOINDEX_FILES" ]; then
  echo "⚠️ Warning: Found noindex tags in live build output:"
  echo "$NOINDEX_FILES"
else
  echo "✅ No unexpected noindex tags found."
fi

# 3. Verify canonical tags on all indexable HTML pages
MISSING_CANONICAL=0
for file in $(find dist -name "*.html" 2>/dev/null); do
  # Skip 404 page
  if [[ "$file" == *"404.html"* ]]; then continue; fi
  if ! grep -q 'rel="canonical"' "$file"; then
    echo "❌ Missing canonical tag: $file"
    MISSING_CANONICAL=$((MISSING_CANONICAL + 1))
  fi
done

if [ "$MISSING_CANONICAL" -eq 0 ]; then
  echo "✅ All indexable HTML pages contain self-referencing canonical tags."
else
  echo "❌ Error: $MISSING_CANONICAL HTML pages missing canonical tags!"
  exit 1
fi

# 4. Verify Sitemap exists
if [ -f "dist/sitemap-index.xml" ] || [ -f "dist/sitemap-0.xml" ]; then
  echo "✅ Sitemap index generated successfully."
else
  echo "❌ Error: Sitemap missing from dist output!"
  exit 1
fi

# 5. Verify robots.txt exists
if [ -f "dist/robots.txt" ]; then
  echo "✅ robots.txt present in build output."
else
  echo "❌ Error: robots.txt missing from dist output!"
  exit 1
fi

echo "🚀 SEO Quality Gate PASSED successfully!"
