// One-off image optimizer for Lighthouse perf wins. Resizes and converts
// oversized JPG/PNG assets to WebP. Run with: npm run optimize-images
import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, '..', 'public', 'assets');
const PUBLIC = join(__dirname, '..', 'public');

const jobs = [
  {
    label: 'about_office',
    input: join(ASSETS, 'about_office.jpg'),
    outputs: [
      { path: join(ASSETS, 'about_office.webp'), width: 1024, format: 'webp', quality: 82 },
      // Smaller variant for mobile if we want srcset later
      { path: join(ASSETS, 'about_office-sm.webp'), width: 640, format: 'webp', quality: 80 },
    ],
  },
  {
    label: 'logo',
    input: join(PUBLIC, 'logo.png'),
    outputs: [
      // Display size is 163x56; we go 2x for retina (326x112) and keep PNG fallback.
      { path: join(PUBLIC, 'logo.webp'), width: 326, format: 'webp', quality: 90 },
    ],
  },
];

for (const job of jobs) {
  console.log(`[optimize] ${job.label}`);
  const original = await sharp(job.input).metadata();
  console.log(`  source: ${original.width}x${original.height}, ${(original.size / 1024).toFixed(1)} KB`);

  for (const out of job.outputs) {
    const result = await sharp(job.input)
      .resize({ width: out.width, withoutEnlargement: true })
      .toFormat(out.format, { quality: out.quality })
      .toFile(out.path);
    console.log(`  -> ${out.path.split(/[/\\]/).pop()}: ${result.width}x${result.height}, ${(result.size / 1024).toFixed(1)} KB`);
  }
}

console.log('[optimize] done');
