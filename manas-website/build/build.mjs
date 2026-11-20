// Static site generator: renders every page to site/<url>/index.html and writes
// sitemap.xml, robots.txt, redirects (.htaccess + _redirects), manifest and headers.
// Run:  node build/build.mjs
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout, SITE } from './lib.mjs';
import home from './pages/home.mjs';
import { accommodationHub, roomPages, villasHub, villaPages } from './pages/stay.mjs';
import { facilities, dining, ird } from './pages/experience.mjs';
import { weddings, banquets, corporate, schoolPicnic, services } from './pages/events.mjs';
import { about, gallery, offers, location, contact, faqPage, privacy, terms, htmlSitemap, notFound } from './pages/info.mjs';
import { blogIndex, blogPosts } from './pages/blog.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, '..');
const posts = JSON.parse(await readFile(path.join(root, 'build/data/posts.json'), 'utf8'))
  .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
const imageMeta = JSON.parse(await readFile(path.join(root, 'build/image-meta.json'), 'utf8'));
const manifest = JSON.parse(await readFile(path.join(root, 'build/manifest.json'), 'utf8'));

const pages = [
  home(), about(), accommodationHub(), ...roomPages(), villasHub(), ...villaPages(),
  facilities(), dining(), ird(), weddings(), banquets(), corporate(), schoolPicnic(), services(),
  gallery(), offers(), location(), contact(), faqPage(), privacy(), terms(),
  blogIndex(posts), ...blogPosts(posts), htmlSitemap(posts), notFound(),
];

// ---- Render pages
const seen = new Set();
for (const p of pages) {
  if (seen.has(p.path)) throw new Error(`Duplicate path ${p.path}`);
  seen.add(p.path);
  const html = layout({ meta: p.meta, body: p.body, solidHeader: p.solidHeader, swiper: p.swiper });
  const file = p.path.endsWith('.html') ? path.join(OUT, p.path) : path.join(OUT, p.path, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html.replace(/\n\s*\n/g, '\n'));
}
console.log(`Rendered ${pages.length} pages`);

// ---- sitemap.xml (indexable pages only)
const today = new Date().toISOString().slice(0, 10);
const postDates = Object.fromEntries(posts.map(p => [p.url, (p.dateModified || p.datePublished).slice(0, 10)]));
const indexable = pages.filter(p => !p.meta.noindex && !p.path.endsWith('.html'));
const priority = u => (u === '/' ? '1.0' : /^\/(all-accommodations|villas|weddings|banquets|corporate|dining|facilities)\/$/.test(u) ? '0.9' : /^\/(rooms|villas)\//.test(u) ? '0.8' : postDates[u] ? '0.6' : '0.7');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${indexable.map(p => `  <url><loc>${SITE.origin}${p.path}</loc><lastmod>${postDates[p.path] || today}</lastmod><priority>${priority(p.path)}</priority><image:image><image:loc>${SITE.origin}/images/${p.meta.image || 'pool-2'}-og.jpg</image:loc></image:image></url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(OUT, 'sitemap.xml'), sitemap);

// ---- robots.txt
await writeFile(path.join(OUT, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE.origin}/sitemap.xml
`);

// ---- Redirect map (old URL → new URL). Page URLs are preserved 1:1, so only WordPress
//      artefacts and indexed image URLs need redirects. One hop each, no chains.
const redirects = [
  ['/index.html', '/'],
  ['/home/', '/'],
  ['/sitemap_index.xml', '/sitemap.xml'],
  ['/page-sitemap.xml', '/sitemap.xml'],
  ['/post-sitemap.xml', '/sitemap.xml'],
  ['/main-sitemap.xsl', '/sitemap.xml'],
  ['/feed/', '/blog/'],
  ['/comments/feed/', '/blog/'],
  ['/accommodation/', '/all-accommodations/'],
  ['/rooms/', '/all-accommodations/'],
  ['/experiences/', '/facilities/'],
  ['/privacy/', '/privacy-policy/'],
  ['/terms/', '/terms-and-conditions/'],
];
const imageRedirects = Object.entries(manifest)
  .filter(([k]) => !k.startsWith('logo') && k !== 'favicon')
  .filter(([k]) => imageMeta[k])
  .map(([k, u]) => [new URL(u).pathname, `/images/${k}-${imageMeta[k].widths.at(-1)}.webp`])
  .filter(([, to]) => existsSync(path.join(OUT, to)));
const patternRedirects = [
  ['^blog/page/[0-9]+/?$', '/blog/'],
  ['^page/[0-9]+/?$', '/'],
  ['^category/.*$', '/blog/'],
  ['^tag/.*$', '/blog/'],
  ['^author/.*$', '/about/'],
  ['^(.+)/feed/?$', '/$1/'],
  ['^(.+)/amp/?$', '/$1/'],
];

// Exact-match patterns: Apache's plain `Redirect` matches by prefix, which would send
// /rooms/luxury-cottage/ to /all-accommodations/luxury-cottage/. RedirectMatch ^…$ does not.
const rx = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const htaccess = `# Manas Lifestyle Resort — Apache / LiteSpeed configuration
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html
AddDefaultCharset utf-8
AddType image/avif .avif
AddType image/webp .webp
AddType application/manifest+json .webmanifest

<IfModule mod_rewrite.c>
RewriteEngine On
# Force HTTPS and the canonical host (non-www) in a single hop
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\\. [NC]
RewriteRule ^(.*)$ https://manaslifestyleresort.in/$1 [R=301,L]

# Legacy WordPress patterns
${patternRedirects.map(([from, to]) => `RewriteRule ${from} ${to} [R=301,L]`).join('\n')}
# Old query-string permalinks (?p=123, ?page_id=123) → home
RewriteCond %{QUERY_STRING} (^|&)(p|page_id)=[0-9]+ [NC]
RewriteRule ^$ /? [R=301,L]
</IfModule>

# Specific URL redirects (one hop, 301)
${redirects.map(([f, t]) => `RedirectMatch 301 ^${rx(f)}$ ${t}`).join('\n')}

# Indexed photography: old WordPress upload URLs → optimised equivalents
${imageRedirects.map(([f, t]) => `RedirectMatch 301 ^${rx(f)}$ ${t}`).join('\n')}

<IfModule mod_headers.c>
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Permissions-Policy "geolocation=(), camera=(), microphone=()"
<FilesMatch "\\.(avif|webp|jpg|png|svg|woff2|pdf)$">
Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
<FilesMatch "\\.(css|js)$">
Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
<FilesMatch "\\.(html|xml|txt)$">
Header set Cache-Control "public, max-age=600, must-revalidate"
</FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css application/javascript text/xml application/xml image/svg+xml application/json text/plain
</IfModule>
`;
await writeFile(path.join(OUT, '.htaccess'), htaccess);

// Netlify / Cloudflare Pages equivalent
await writeFile(path.join(OUT, '_redirects'), [
  ...redirects.map(([f, t]) => `${f} ${t} 301`),
  ...imageRedirects.map(([f, t]) => `${f} ${t} 301`),
  '/blog/page/* /blog/ 301', '/category/* /blog/ 301', '/tag/* /blog/ 301', '/author/* /about/ 301',
].join('\n') + '\n');
await writeFile(path.join(OUT, '_headers'), `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n/images/*\n  Cache-Control: public, max-age=31536000, immutable\n/css/*\n  Cache-Control: public, max-age=31536000, immutable\n/js/*\n  Cache-Control: public, max-age=31536000, immutable\n`);

await writeFile(path.join(OUT, 'site.webmanifest'), JSON.stringify({
  name: SITE.name, short_name: 'Manas', start_url: '/', display: 'browser', background_color: '#f7f3ea', theme_color: '#16291f',
  icons: [{ src: '/images/favicon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/images/favicon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 1));

// Export the URL list + redirect map for the docs.
await writeFile(path.join(root, 'build/urls.json'), JSON.stringify({ pages: pages.map(p => ({ path: p.path, title: p.meta.title, description: p.meta.description, noindex: !!p.meta.noindex })), redirects, imageRedirects, patternRedirects }, null, 1));
console.log(`sitemap: ${indexable.length} URLs · redirects: ${redirects.length} + ${imageRedirects.length} images + ${patternRedirects.length} patterns`);
