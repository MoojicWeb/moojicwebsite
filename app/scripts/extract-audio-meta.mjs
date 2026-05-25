// Scans public/assets/audio/ for .mp3 files, reads ID3 tags (artist/title/duration),
// and writes app/src/data/audio-meta.json. Run with: npm run scan-audio
import { readdir, stat, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { parseFile } from 'music-metadata';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = join(__dirname, '..');
const AUDIO_ROOT = join(APP_ROOT, 'public', 'assets', 'audio');
const OUTPUT_PATH = join(APP_ROOT, 'src', 'data', 'audio-meta.json');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile() && /\.mp3$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

async function main() {
  let exists = true;
  try {
    await stat(AUDIO_ROOT);
  } catch {
    exists = false;
  }
  if (!exists) {
    console.error(`[scan-audio] Audio root not found: ${AUDIO_ROOT}`);
    process.exit(1);
  }

  const files = await walk(AUDIO_ROOT);
  console.log(`[scan-audio] Found ${files.length} mp3 file(s)`);

  const result = {};
  for (const file of files) {
    const relPath = relative(AUDIO_ROOT, file).split(sep).join('/');
    try {
      const meta = await parseFile(file, { duration: true });
      const common = meta.common ?? {};
      const format = meta.format ?? {};
      result[relPath] = {
        title: common.title?.trim() || null,
        artist: common.artist?.trim() || common.albumartist?.trim() || null,
        album: common.album?.trim() || null,
        durationSeconds: format.duration ?? null,
        duration: formatDuration(format.duration),
      };
    } catch (err) {
      console.warn(`[scan-audio] Failed to parse ${relPath}: ${err.message}`);
      result[relPath] = { title: null, artist: null, album: null, duration: null, durationSeconds: null };
    }
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(result, null, 2) + '\n', 'utf8');
  console.log(`[scan-audio] Wrote ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('[scan-audio] Fatal:', err);
  process.exit(1);
});
