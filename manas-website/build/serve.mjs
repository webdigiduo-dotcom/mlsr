// Local preview server: serves site/ like Apache would (directory index, trailing-slash
// redirects, 404 page) and simulates /api/enquiry.php so forms can be tested without PHP.
// Usage: node build/serve.mjs [port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const port = Number(process.argv[2] || process.env.PORT || 4321);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/api/enquiry.php') {
    if (req.method !== 'POST') { res.writeHead(405).end(); return; }
    let body = '';
    for await (const c of req) body += c;
    const fail = body.includes('simulate-failure');
    res.writeHead(fail ? 500 : 200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(fail ? { ok: false, error: 'Simulated failure' } : { ok: true, ref: 'LOCAL-' + Date.now().toString(36).toUpperCase() }));
    return;
  }
  let p = path.join(root, decodeURIComponent(url.pathname));
  if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    let s = await stat(p);
    if (s.isDirectory()) {
      if (!url.pathname.endsWith('/')) { res.writeHead(301, { Location: url.pathname + '/' + url.search }).end(); return; }
      p = path.join(p, 'index.html');
      s = await stat(p);
    }
    const type = types[path.extname(p)] || 'application/octet-stream';
    let data = await readFile(p);
    const headers = { 'Content-Type': type, 'Cache-Control': 'no-cache' };
    // Mirror production .htaccess (mod_deflate) so local measurements are realistic.
    if (/text|javascript|json|xml|svg/.test(type) && /gzip/.test(req.headers['accept-encoding'] || '')) { data = gzipSync(data); headers['Content-Encoding'] = 'gzip'; }
    res.writeHead(200, headers);
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(path.join(root, '404.html')));
  }
}).listen(port, () => console.log(`Manas site preview → http://localhost:${port}`));
