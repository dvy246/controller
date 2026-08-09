import os
import re
import glob

# Find all .astro files that use BaseLayout but don't have localized
# We'll add localized={true} to all BaseLayout calls

astro_files = []
for root, dirs, files in os.walk('src/pages'):
    for f in files:
        if f.endswith('.astro'):
            astro_files.append(os.path.join(root, f))

updated = 0
skipped = 0

for fpath in sorted(astro_files):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if no BaseLayout
    if '<BaseLayout' not in content:
        continue
    
    # Skip embed pages (they should be noindex)
    if '/embed/' in fpath:
        continue
    
    # Skip if already has localized
    if 'localized' in content:
        skipped += 1
        continue
    
    # Add localized={true} before the closing > of <BaseLayout ...>
    # Match <BaseLayout ... > and add localized before closing
    new_content = re.sub(
        r'(<BaseLayout\s[^>]*?)(>)',
        r'\1\n  localized={true}\2',
        content,
        count=1
    )
    
    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        updated += 1
        print(f"UPDATED: {fpath}")
    else:
        print(f"NO MATCH: {fpath}")

print(f"\nTotal updated: {updated}, already had localized: {skipped}")
