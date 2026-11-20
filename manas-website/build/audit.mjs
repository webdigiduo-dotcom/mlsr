// Pre-launch SEO + integrity audit of the generated site (run after build):
//   node build/audit.mjs
// Checks every HTML page for: title/description length & uniqueness, canonical, single H1,
// heading order, image alt + local file existence, broken internal links/anchors,
// JSON-LD validity, and that every legacy URL from the old site still resolves.
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(root, '..');
const ORIGIN = 'https://manaslifestyleresort.in';

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!['crawl', 'manas-website', 'docs', 'tools', 'node_modules', '.claude'].includes(e.name)) out.push(...await walk(p)); }
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const urlOf = f => '/' + path.relative(SITE, f).replace(/\\/g, '/').replace(/index\.html$/, '');
const resolveLocal = u => {
  const clean = decodeURIComponent(u.split('#')[0].split('?')[0]);
  const p = path.join(SITE, clean);
  if (clean.endsWith('/')) return existsSync(path.join(p, 'index.html'));
  return existsSync(p);
};

const files = await walk(SITE);
const issues = [];
const info = [];
const warn = (url, msg) => issues.push(`${url}  ${msg}`);
const titles = new Map(), descs = new Map();
const ids = new Map();
let pages = 0, links = 0, imgs = 0;

const docs = await Promise.all(files.map(async f => [urlOf(f), await readFile(f, 'utf8')]));
for (const [url, html] of docs) ids.set(url, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1])));

for (const [url, html] of docs) {
  pages++;
  const is404 = url.endsWith('404.html');
  const un = x => x.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  const title = un(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '');
  const desc = un(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const legacyMeta = html.includes('"@type":"BlogPosting"'); // blog titles/descriptions kept verbatim from the old site
  const w2 = m => (legacyMeta ? info.push(`${url}  ${m} (kept from old site)`) : warn(url, m));
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!title) warn(url, 'missing <title>');
  if (title.length > 70) w2(`title ${title.length} chars (>70): ${title}`);
  if (!desc) warn(url, 'missing meta description');
  if (desc.length > 165) w2(`description ${desc.length} chars (>165)`);
  if (desc.length && desc.length < 70) warn(url, `description short (${desc.length})`);
  if (!is404) {
    if (canon !== ORIGIN + url) warn(url, `canonical mismatch: ${canon}`);
    titles.set(title, [...(titles.get(title) || []), url]);
    descs.set(desc, [...(descs.get(desc) || []), url]);
  }
  const body = html.slice(html.indexOf('<main'));
  const h1s = [...body.matchAll(/<h1\b/g)].length;
  if (h1s !== 1) warn(url, `${h1s} <h1> elements`);
  // heading level skips inside main (h2 → h4 etc.)
  let last = 1;
  for (const m of body.slice(0, body.indexOf('</main>')).matchAll(/<h([1-6])\b/g)) {
    const lvl = +m[1];
    if (lvl > last + 1) { warn(url, `heading skips h${last} → h${lvl}`); break; }
    last = lvl;
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    imgs++;
    const tag = m[0];
    if (!/\salt="/.test(tag)) warn(url, `img without alt: ${tag.slice(0, 80)}`);
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    if (src && src.startsWith('/') && !resolveLocal(src)) warn(url, `missing image ${src}`);
  }
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(' ')[0];
      if (u.startsWith('/') && !resolveLocal(u)) warn(url, `missing srcset file ${u}`);
    }
  }
  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1];
    if (href.startsWith('#')) {
      if (href.length > 1 && !ids.get(url).has(href.slice(1))) warn(url, `broken anchor ${href}`);
      continue;
    }
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    links++;
    const [p, hash] = href.split('#');
    if (!resolveLocal(p)) { warn(url, `broken link ${href}`); continue; }
    if (hash && p.endsWith('/')) {
      const target = ids.get(p);
      if (target && !target.has(hash)) warn(url, `broken anchor ${href}`);
    }
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      const j = JSON.parse(m[1]);
      const types = JSON.stringify(j).match(/"@type":"[^"]+"/g) || [];
      if (!types.length) warn(url, 'JSON-LD without @type');
    } catch (e) { warn(url, `invalid JSON-LD: ${e.message}`); }
  }
  if (!is404 && !/property="og:image"/.test(html)) warn(url, 'missing og:image');
}
for (const [t, urls] of titles) if (urls.length > 1) warn(urls.join(', '), `duplicate title: ${t}`);
for (const [d, urls] of descs) if (urls.length > 1) warn(urls.join(', '), `duplicate description`);

// Every URL of the old website must still resolve (URL preservation).
const legacy = (await readFile(path.join(root, '../crawl/page-urls.txt'), 'utf8') + await readFile(path.join(root, '../crawl/post-urls.txt'), 'utf8'))
  .split(/\r?\n/).filter(Boolean).map(u => new URL(u).pathname);
let preserved = 0;
for (const u of legacy) { if (resolveLocal(u)) preserved++; else warn(u, 'LEGACY URL NOT PRESERVED'); }

// sitemap.xml entries resolve
const sm = await readFile(path.join(SITE, 'sitemap.xml'), 'utf8');
const smUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(ORIGIN, ''));
for (const u of smUrls) if (!resolveLocal(u)) warn(u, 'sitemap URL does not resolve');

console.log(`Pages ${pages} · internal links ${links} · images ${imgs} · legacy URLs preserved ${preserved}/${legacy.length} · sitemap URLs ${smUrls.length}`);
if (info.length) console.log(`\n${info.length} note(s):\n` + info.join('\n'));
console.log(issues.length ? `\n${issues.length} issue(s):\n` + issues.join('\n') : 'No issues found.');
process.exitCode = issues.length ? 1 : 0;
