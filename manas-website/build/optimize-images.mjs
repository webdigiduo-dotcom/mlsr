// Turns every photo in assets-src/img into responsive AVIF + WebP sizes in site/images/.
// Writes build/image-meta.json (intrinsic size + dominant colour) so pages can reserve
// space (no layout shift) and paint a colour placeholder before the image arrives.
import sharp from 'sharp';
import { readdir, mkdir, writeFile, copyFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'assets-src/img');
const OUT = path.join(root, '../images');
export const WIDTHS = [480, 960, 1600, 2400];

await mkdir(OUT, { recursive: true });
const meta = {};
const files = (await readdir(SRC)).filter(f => /\.(jpe?g|png|webp)$/i.test(f));

for (const f of files) {
  const key = f.replace(/\.[^.]+$/, '');
  const input = path.join(SRC, f);
  const img = sharp(input, { failOn: 'none' }).rotate();
  const m = await img.metadata();
  const { dominant } = await sharp(input).stats();
  const isLogo = key.startsWith('logo') || key === 'favicon';
  const w = m.autoOrient?.width ?? m.width;
  const h = m.autoOrient?.height ?? m.height;
  meta[key] = { w, h, color: `rgb(${dominant.r},${dominant.g},${dominant.b})`, widths: [] };

  if (isLogo) {
    // Logos keep transparency: one PNG trimmed + a WebP at 640px.
    await sharp(input).resize({ width: 640, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(path.join(OUT, `${key}.png`));
    await sharp(input).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 90 }).toFile(path.join(OUT, `${key}.webp`));
    if (key === 'favicon') {
      for (const s of [32, 180, 192, 512]) await sharp(input).resize(s, s).png().toFile(path.join(OUT, `favicon-${s}.png`));
    }
    continue;
  }

  const { existsSync } = await import('node:fs');
  if (existsSync(path.join(OUT, `${key}-og.jpg`))) { for (const width of WIDTHS) if (existsSync(path.join(OUT, `${key}-${width}.webp`))) meta[key].widths.push(width); continue; }
  for (const width of WIDTHS) {
    if (width > w && width !== WIDTHS[0]) continue; // never upscale (except smallest)
    const target = Math.min(width, w);
    const base = path.join(OUT, `${key}-${width}`);
    const p = sharp(input, { failOn: 'none' }).rotate().resize({ width: target, withoutEnlargement: true });
    await p.clone().webp({ quality: 74, effort: 5 }).toFile(`${base}.webp`);
    await p.clone().avif({ quality: 52, effort: 4 }).toFile(`${base}.avif`);
    meta[key].widths.push(width);
  }
  // Social-share size (1200x630 JPEG) for Open Graph.
  await sharp(input).rotate().resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OUT, `${key}-og.jpg`));
  process.stdout.write('.');
}

await writeFile(path.join(root, 'build/image-meta.json'), JSON.stringify(meta, null, 1));
console.log(`\n${Object.keys(meta).length} images processed`);
