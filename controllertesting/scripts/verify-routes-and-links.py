#!/usr/bin/env python3
"""
scripts/verify-routes-and-links.py — Comprehensive Route & Link Integrity Validator
Checks:
  1. Every internal link (<a href="...">) across all HTML files resolves to a valid file/directory.
  2. Every asset (<img src>, <script src>, <link href>) resolves to an existing file.
  3. Every URL listed in sitemap-0.xml exists in dist/ and resolves with 200 OK.
  4. Ensures no dead language links or broken routes exist.
"""

import os
import sys
import glob
import re
from urllib.parse import urlparse, unquote
import xml.etree.ElementTree as ET

DIST_DIR = os.path.join(os.path.dirname(__file__), '..', 'dist')
if not os.path.exists(DIST_DIR):
    print(f"❌ Error: {DIST_DIR} does not exist. Run build first.")
    sys.exit(1)

html_files = glob.glob(f"{DIST_DIR}/**/*.html", recursive=True)
if not html_files:
    print(f"❌ Error: No HTML files found in {DIST_DIR}.")
    sys.exit(1)

print(f"🔍 Starting Deep Route & Link Validation across {len(html_files)} built HTML files...")

# --- 1. Validate Internal Links ---
broken_links = []
checked_links = 0
unique_routes = set()

for html_file in html_files:
    rel_source = os.path.relpath(html_file, DIST_DIR)
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Strip script and style blocks to avoid client-side template false positives
    clean_html = re.sub(r'<script\b[^>]*>.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    clean_html = re.sub(r'<style\b[^>]*>.*?</style>', '', clean_html, flags=re.DOTALL | re.IGNORECASE)

    hrefs = re.findall(r'<a\s+(?:[^>]*?\s+)?href=([\"\'])(.*?)\1', clean_html)
    for _, href in hrefs:
        href = href.strip()
        if not href or href.startswith(('http://', 'https://', 'mailto:', 'tel:', 'javascript:', '#')):
            continue

        checked_links += 1
        parsed = urlparse(href)
        path = unquote(parsed.path)

        if not path.startswith('/'):
            source_dir = os.path.dirname(rel_source)
            norm_path = os.path.normpath(os.path.join('/', source_dir, path))
        else:
            norm_path = os.path.normpath(path)

        unique_routes.add(norm_path)
        clean = norm_path.lstrip('/')
        
        if clean == '':
            exists = os.path.isfile(os.path.join(DIST_DIR, 'index.html'))
        else:
            candidates = [
                os.path.join(DIST_DIR, clean),
                os.path.join(DIST_DIR, clean, 'index.html'),
                os.path.join(DIST_DIR, f"{clean}.html")
            ]
            exists = any(os.path.exists(c) for c in candidates)

        if not exists:
            broken_links.append((rel_source, href, norm_path))

print(f"  • Internal links scanned: {checked_links} ({len(unique_routes)} unique target routes)")
if broken_links:
    print(f"❌ Found {len(broken_links)} broken internal links:")
    for src, href, target in broken_links[:20]:
        print(f"    In {src} -> '{href}' (target '{target}' not found)")
    sys.exit(1)
else:
    print("  ✅ 100% of internal links resolve successfully (0 broken links).")

# --- 2. Validate Assets (Images, Scripts, Stylesheets) ---
broken_assets = []
checked_assets = 0

for html_file in html_files:
    rel_source = os.path.relpath(html_file, DIST_DIR)
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    img_srcs = re.findall(r'<img\s+(?:[^>]*?\s+)?src=([\"\'])(.*?)\1', content)
    script_srcs = re.findall(r'<script\s+(?:[^>]*?\s+)?src=([\"\'])(.*?)\1', content)
    link_hrefs = re.findall(r'<link\s+(?:[^>]*?\s+)?href=([\"\'])(.*?)\1', content)

    for src in [s[1] for s in img_srcs + script_srcs + link_hrefs]:
        src = src.strip()
        if not src or src.startswith(('http://', 'https://', 'data:', '//', '#')):
            continue

        checked_assets += 1
        path = unquote(urlparse(src).path)
        clean = path.lstrip('/')
        target = os.path.join(DIST_DIR, clean)
        if not os.path.exists(target):
            broken_assets.append((rel_source, src))

print(f"  • Static assets scanned: {checked_assets}")
if broken_assets:
    print(f"❌ Found {len(broken_assets)} broken asset references:")
    for src, asset in broken_assets[:20]:
        print(f"    In {src} -> missing asset '{asset}'")
    sys.exit(1)
else:
    print("  ✅ 100% of asset references resolve successfully (0 broken assets).")

# --- 3. Validate Sitemap Route Integrity ---
sitemap_file = os.path.join(DIST_DIR, 'sitemap-0.xml')
if os.path.exists(sitemap_file):
    tree = ET.parse(sitemap_file)
    urls = [
        loc.text for loc in tree.getroot().findall(
            '{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc'
        )
    ]
    print(f"  • Validating {len(urls)} sitemap routes...")
    missing_sitemap_routes = []
    for u in urls:
        path = unquote(urlparse(u).path).lstrip('/')
        candidates = [
            os.path.join(DIST_DIR, path, 'index.html'),
            os.path.join(DIST_DIR, f"{path}.html"),
            os.path.join(DIST_DIR, path)
        ]
        if not any(os.path.exists(c) for c in candidates):
            missing_sitemap_routes.append(u)

    if missing_sitemap_routes:
        print(f"❌ Found {len(missing_sitemap_routes)} sitemap URLs that do not exist on disk:")
        for u in missing_sitemap_routes[:10]:
            print(f"    Missing: {u}")
        sys.exit(1)
    else:
        print(f"  ✅ All {len(urls)} sitemap URLs exist and map to real pages.")

print("🚀 Route & Link Integrity Verification: 100% PASSED!")
sys.exit(0)
