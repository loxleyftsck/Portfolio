import sharp from 'sharp';
import path from 'node:path';

const sourceDir = process.argv[2];
if (!sourceDir) throw new Error('Usage: node scripts/optimize-assets.mjs <source-directory>');
for (const name of ['chrome', 'dialogue', 'attractor']) {
  await sharp(path.join(sourceDir, name + '.png'))
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 82 }).toFile('public/art/' + name + '.webp');
}
await sharp(path.join(sourceDir, 'PhotoProfile.jpg')).rotate()
  .resize({ width: 720, withoutEnlargement: true })
  .webp({ quality: 84 }).toFile('public/portrait.webp');
