"""Generates the SEO baseline, URL migration map and asset inventory from the crawl + build output.
Run: python -I build/make_docs.py  (after node build/build.mjs)"""
import csv, json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
crawl = json.load(open(os.path.join(ROOT, '..', 'crawl', 'crawl.json'), encoding='utf-8'))
urls = json.load(open(os.path.join(ROOT, 'build', 'urls.json'), encoding='utf-8'))
manifest = json.load(open(os.path.join(ROOT, 'build', 'manifest.json'), encoding='utf-8'))
meta = json.load(open(os.path.join(ROOT, 'build', 'image-meta.json'), encoding='utf-8'))
D = os.path.join(ROOT, '..', 'docs')
os.makedirs(D, exist_ok=True)
new = {p['path']: p for p in urls['pages']}

# 1. SEO baseline (old site, as crawled 17 Nov 2026)
with open(os.path.join(D, 'seo-baseline-old-site.csv'), 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['old_url', 'status', 'title', 'title_len', 'meta_description', 'desc_len', 'canonical', 'robots', 'h1', 'h2_count', 'images', 'images_missing_alt', 'internal_links', 'schema_types'])
    for x in crawl:
        h = x.get('headings', [])
        imgs = x.get('images', [])
        w.writerow([x['url'], x.get('status'), x.get('title'), len(x.get('title', '')), x.get('desc'), len(x.get('desc', '')), x.get('canonical'), x.get('robots'),
                    ' | '.join(t for l, t in h if l == 'h1'), sum(1 for l, _ in h if l == 'h2'), len(imgs), sum(1 for _, a in imgs if not a.strip()),
                    len(x.get('internal', [])), ' '.join(x.get('schema', []))])

# 2. Old -> new URL migration map
with open(os.path.join(D, 'url-migration-map.csv'), 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['old_url', 'new_url', 'action', 'old_title', 'new_title', 'note'])
    for x in crawl:
        path = x['url'].replace('https://manaslifestyleresort.in', '')
        n = new.get(path)
        w.writerow([x['url'], 'https://manaslifestyleresort.in' + path if n else '', 'KEEP (same URL, 200)' if n else 'MISSING',
                    x.get('title'), n['title'] if n else '', 'Blog title & description kept verbatim' if n and '"' not in path and x.get('title') == n['title'] else ''])
    for f_, t in urls['redirects']:
        w.writerow(['https://manaslifestyleresort.in' + f_, 'https://manaslifestyleresort.in' + t, '301', '', '', 'WordPress artefact / alias'])
    for f_, t in urls['patternRedirects']:
        w.writerow(['(pattern) ' + f_, t, '301', '', '', 'WordPress archive pattern'])
    for f_, t in urls['imageRedirects']:
        w.writerow(['https://manaslifestyleresort.in' + f_, 'https://manaslifestyleresort.in' + t, '301', '', '', 'Indexed image'])
    old = {x['url'].replace('https://manaslifestyleresort.in', '') for x in crawl}
    for p in urls['pages']:
        if p['path'] not in old and not p['noindex']:
            w.writerow(['', 'https://manaslifestyleresort.in' + p['path'], 'NEW PAGE', '', p['title'], ''])

# 3. Asset inventory
with open(os.path.join(D, 'asset-inventory.csv'), 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['key', 'source_url_on_old_site', 'original_width', 'original_height', 'quality_flag', 'used_as'])
    for k, u in manifest.items():
        m = meta.get(k, {})
        width = m.get('w', 0)
        flag = 'LOGO' if k.startswith('logo') or k == 'favicon' else ('REPLACE: low-res (<1000px) — request original' if width < 1000 else 'OK' if width >= 1600 else 'Acceptable — hi-res original preferred')
        w.writerow([k, u, width, m.get('h', ''), flag, ''])
print('docs written')
