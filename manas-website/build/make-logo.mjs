// Builds a reversed (light-on-dark) logo from the official dark logo for use over photography.
// Near-black pixels -> ivory; red sun and cream rays untouched; white background -> transparent.
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'assets-src/img/logo-dark.png');
const { data, info } = await sharp(src).resize({ width: 900 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (a > 0 && min > 235) { data[i + 3] = 0; continue; }                 // white bg -> transparent
  if (max < 110 && max - min < 30) {                                     // black/grey ink -> ivory
    const k = 1 - max / 110;                                              // keep anti-aliasing
    data[i] = 247; data[i + 1] = 243; data[i + 2] = 234; data[i + 3] = Math.round(a * Math.min(1, 0.35 + k));
  }
}
const img = sharp(data, { raw: info });
await img.clone().png({ compressionLevel: 9 }).toFile(path.join(root, '../images/logo-reverse.png'));
await img.clone().resize({ width: 640 }).webp({ quality: 92 }).toFile(path.join(root, '../images/logo-reverse.webp'));
const m = await sharp(path.join(root, '../images/logo-reverse.webp')).metadata();
console.log('logo-reverse', m.width, m.height);
const d = await sharp(path.join(root, '../images/logo-dark.webp')).metadata();
console.log('logo-dark', d.width, d.height, 'alpha', d.hasAlpha);
