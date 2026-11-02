#!/usr/bin/env python3
"""Low-value-content gate for the built site (stdlib only, no bs4/requests).

Reads dist/sitemap-0.xml, maps every URL to its built HTML file, and reports:
thin pages, near-duplicate pairs, leftover template strings, conflicting
self-claimed counts, noindex pages that leaked into the sitemap, and per-template
uniqueness. Heuristics for human review, not Google scores.

Usage:  python3 scripts/lvc_audit_dist.py [--dist dist] [--json out.json]
Exit code 1 when a hard gate fails.
"""
import argparse, html as H, itertools, json, os, re, sys
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict

STRIP = r'<(script|style|noscript|svg|nav|header|footer|aside|template|iframe|canvas)\b.*?</\1>'
BLOCK = r'<(br|p|div|li|h[1-6]|tr|td|th|section|article|dt|dd|summary|details|button|span|a|label)\b[^>]*>'
PLACEHOLDER = re.compile(
    r"lorem ipsum|\bTODO\b|\bFIXME\b|coming soon|under construction|\bundefined\b|\bNaN\b"
    r"|\{[a-zA-Z_.]+\}|\[object Object\]|\\'|All 1 components|Home\s*/\s*Home", re.I)
COUNT = re.compile(r"\b(\d[\d,]*)\s*\+?\s+(tools|calculators|guides|games|tests|widgets|"
                   r"diagnostic tools|mouse tools|browser games)\b", re.I)
# Copy the audit flagged as untrue or unverifiable; any hit in indexable HTML fails the gate.
RETIRED = ["Health Score:", "Guaranteed compatible", "Hardware Lab", "Research Team",
           "No ad network", "No gaming site has this", "dataset shows", "Key findings",
           "Recommended Deadzone 0%", "No data available"]


def url_to_file(dist, url):
    path = re.sub(r'^https?://[^/]+', '', url).rstrip('/') or '/'
    cands = [f'{dist}/index.html'] if path == '/' else [f'{dist}{path}.html', f'{dist}{path}/index.html']
    return next((c for c in cands if os.path.exists(c)), None)


def visible_text(fragment):
    t = re.sub(STRIP, ' ', fragment, flags=re.S | re.I)
    t = re.sub(BLOCK, '\n', t, flags=re.I)
    t = H.unescape(re.sub(r'<[^>]+>', ' ', t))
    t = re.sub(r'[ \t]+', ' ', t)
    return '\n'.join(l.strip() for l in t.split('\n') if l.strip())


def shingles(words, k=5):
    return {' '.join(words[i:i + k]) for i in range(max(0, len(words) - k + 1))}


def template_key(path):
    seg = path.strip('/').split('/')
    if not seg[0]:
        return '/'
    if seg[0] in ('test', 'fix') and len(seg) > 1:
        return '/' + '/'.join(seg[:2])
    return '/' + seg[0]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dist', default='dist')
    ap.add_argument('--json')
    args = ap.parse_args()

    root = ET.parse(f'{args.dist}/sitemap-0.xml').getroot()
    urls = [e.text for e in root.iter() if e.tag.endswith('loc')]
    pages, missing = [], []
    for u in urls:
        f = url_to_file(args.dist, u)
        if not f:
            missing.append(u)
            continue
        h = open(f, encoding='utf-8').read()
        main_m = re.search(r'<main\b.*?</main>', h, re.S | re.I)
        body = re.search(r'<body\b.*?</body>', h, re.S | re.I).group(0)
        text = visible_text(main_m.group(0) if main_m else body)
        full = H.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ',
               re.sub(r'<(script|style|svg)\b.*?</\1>', ' ', body, flags=re.S | re.I))))
        robots = re.search(r'<meta[^>]+name="robots"[^>]+content="([^"]*)"', h, re.I)
        pages.append({
            'url': re.sub(r'^https?://[^/]+', '', u),
            'words': len(text.split()),
            'sents': [s.strip() for s in re.split(r'(?<=[.!?])\s+|\n+', text) if len(s.split()) >= 5],
            'noindex': bool(robots and 'noindex' in robots.group(1).lower()),
            'has_main': bool(main_m),
            'h1': len(re.findall(r'<h1\b', h, re.I)),
            'placeholders': sorted({m.group(0) for m in PLACEHOLDER.finditer(full)})[:6],
            'retired': [r for r in RETIRED if r in full],
            'counts': [(int(n.replace(',', '')), w.lower()) for n, w in COUNT.findall(full)],
        })

    freq = Counter(s for p in pages for s in set(p['sents']))
    boiler = {s for s, c in freq.items() if c >= max(3, int(0.4 * len(pages)))}
    for p in pages:
        uniq = [s for s in p['sents'] if s not in boiler]
        p['unique_words'] = sum(len(s.split()) for s in uniq)
        p['boiler_share'] = round(1 - p['unique_words'] / p['words'], 2) if p['words'] else 1.0
        p['sh'] = shingles(' '.join(uniq).lower().split())
    all_sh = Counter(s for p in pages for s in p['sh'])
    for p in pages:
        p['solo'] = sum(1 for s in p['sh'] if all_sh[s] == 1)

    idx = [p for p in pages if not p['noindex']]
    dups = []
    for a, b in itertools.combinations(idx, 2):
        if len(a['sh']) < 20 or len(b['sh']) < 20:
            continue
        j = len(a['sh'] & b['sh']) / len(a['sh'] | b['sh'])
        if j >= 0.5:
            dups.append((round(j, 2), a['url'], b['url']))
    dups.sort(reverse=True)

    claims = defaultdict(set)
    for p in idx:
        for n, w in p['counts']:
            claims[w].add(n)
    conflicts = {w: sorted(v) for w, v in claims.items() if len(v) > 1}
    very_thin = [p for p in idx if p['unique_words'] < 50]
    thin = [p for p in idx if 50 <= p['unique_words'] < 200]
    median_boiler = sorted(p['boiler_share'] for p in idx)[len(idx) // 2] if idx else 0

    print(f'Sitemap URLs: {len(urls)}  (missing HTML: {len(missing)})')
    print(f'Indexable: {len(idx)}  noindex-in-sitemap: {len(pages) - len(idx)}')
    print(f'VERY_THIN (<50 unique words): {len(very_thin)}  THIN (<200): {len(thin)}')
    print(f'<300 site-unique words: {sum(1 for p in idx if p["solo"] < 300)}')
    print(f'Median boilerplate share: {median_boiler}')
    print(f'Near-duplicate pairs >=0.5: {len(dups)}  >=0.7: {sum(1 for d in dups if d[0] >= 0.7)}')
    print(f'No <main>: {sum(1 for p in idx if not p["has_main"])}  H1!=1: {sum(1 for p in idx if p["h1"] != 1)}')
    print(f'Claim conflicts: {conflicts or "none"}')

    def listing(title, rows):
        if rows:
            print(f'\n-- {title}')
            for r in rows:
                print('  ', r)

    listing('Missing HTML', missing[:20])
    listing('Placeholders', [(p['url'], p['placeholders']) for p in idx if p['placeholders']][:30])
    listing('Retired copy', [(p['url'], p['retired']) for p in idx if p['retired']][:30])
    listing('VERY_THIN', [(p['unique_words'], p['url']) for p in sorted(very_thin, key=lambda p: p['unique_words'])])
    listing('Top near-duplicates', dups[:20])

    tpl = defaultdict(list)
    for p in idx:
        tpl[template_key(p['url'])].append(p)
    print('\n-- Template: n, avg words, avg site-unique shingles, unique %')
    for k, v in sorted(tpl.items(), key=lambda kv: -len(kv[1])):
        n = len(v)
        pct = 100 * sum(p['solo'] / max(1, len(p['sh'])) for p in v) / n
        print(f'   {k:26}{n:4}{sum(p["words"] for p in v) / n:7.0f}{sum(p["solo"] for p in v) / n:7.0f}{pct:6.1f}%')

    gates = {
        'no missing HTML': not missing,
        'no noindex URLs in sitemap': len(pages) == len(idx),
        'no placeholders': not any(p['placeholders'] for p in idx),
        'no retired copy': not any(p['retired'] for p in idx),
        'no claim conflicts': not conflicts,
        'no indexable VERY_THIN': not very_thin,
        'no near-duplicates >=0.7': not any(d[0] >= 0.7 for d in dups),
        'median boilerplate < 0.4': median_boiler < 0.4,
    }
    print('\n-- Gates')
    for g, ok in gates.items():
        print(f'   [{"PASS" if ok else "FAIL"}] {g}')

    if args.json:
        json.dump([{k: p[k] for k in ('url', 'words', 'unique_words', 'boiler_share', 'solo', 'noindex')}
                   for p in pages], open(args.json, 'w'), indent=1)
    sys.exit(0 if all(gates.values()) else 1)


if __name__ == '__main__':
    main()
