import type { Track } from '@/data/playlists';
import audioMeta from '@/data/audio-meta.json';

type AudioMetaEntry = {
  title: string | null;
  artist: string | null;
  album: string | null;
  duration: string | null;
  durationSeconds: number | null;
};

const meta = audioMeta as Record<string, AudioMetaEntry>;

export type StoreId =
  | 'cafe' | 'retail' | 'restaurant' | 'salon' | 'gym' | 'hotel'
  | 'cinema' | 'mall' | 'supermarket' | 'bookstore' | 'workspace' | 'automotive';

export type MoodId = 'relaxed' | 'energetic' | 'sophisticated' | 'upbeat' | 'chill' | 'premium';

// Build a Track from a folder + filename. Uses ID3 tags from audio-meta.json when available,
// falls back to "Artist - Title" filename parsing, then the bare filename.
function parseTrack(folderPath: string, filename: string, id: number): Track {
  const key = `${folderPath}/${filename}`;
  const tags = meta[key];

  const cleaned = filename
    .replace(/\.mp3(\.mp3)?$/i, '')
    .replace(/\s*-?\s*\(\d+\)\s*$/g, '')
    .trim();

  const dash = cleaned.indexOf(' - ');
  let fallbackTitle: string;
  let fallbackArtist: string;
  if (dash > 0) {
    fallbackArtist = cleaned.slice(0, dash).trim();
    fallbackTitle = cleaned.slice(dash + 3).trim();
  } else {
    fallbackTitle = cleaned;
    fallbackArtist = 'Moojic Library';
  }

  return {
    id,
    title: tags?.title || fallbackTitle,
    artist: tags?.artist || fallbackArtist,
    duration: tags?.duration || '—',
    file: `/assets/audio/${folderPath}/${encodeURIComponent(filename)}`,
  };
}

function build(folderPath: string, filenames: string[]): Track[] {
  return filenames.map((f, i) => parseTrack(folderPath, f, i + 1));
}

export const audioCatalog: Partial<Record<StoreId, Partial<Record<MoodId, Track[]>>>> = {
  cafe: {
    chill: build('cafe/Chill', [
      'Hear My Call - Instrumental.mp3',
      'Kobe.mp3',
      'Picture Me Better - Sole Collective.mp3',
      'Westside(1).mp3',
      'Would You Let Me-(2).mp3',
    ]),
    energetic: build('cafe/Energetic', [
      'Dash ... (Vocal mix).mp3.mp3',
      'Feeling Rythm (Vocal mix).mp3',
      'I Can ... (Vocal mix).mp3',
      'Kitsy ... Twice (Vocal Mix).mp3',
      'My Heart Beats 2.mp3',
    ]),
    premium: build('cafe/Premium', [
      'Auspicious Path.mp3',
      'Bliss.mp3',
      "Don'T Trust It.mp3",
      'Monochrome.mp3',
      'Sunset Dreamer.mp3',
    ]),
    relaxed: build('cafe/Relaxed', [
      'Ariana Dybala - Smoke & Ash.mp3',
      'Ella Stone - Forever.mp3',
      'Gracie Dodds - Older.mp3',
      'Juliana Gaughan - Stars At Night.mp3',
      'Zena Washington - Protect Me From You.mp3',
    ]),
    sophisticated: build('cafe/Sophisticated', [
      'Anytime.mp3',
      'Hear My Call.mp3',
      'My Heart Beats 2.mp3',
      'River Simmons - Far Apart.mp3',
      'The Worn Out Souls - Burn For You.mp3',
    ]),
    upbeat: build('cafe/Upbeat', [
      'Hold on.mp3',
      'I Got Time.mp3',
      'Josper Curacao - Man (Vocal mix).mp3',
      'Love You Like....mp3',
      'Wild Dreamer.mp3',
    ]),
  },
  retail: {
    chill: build('retail/Chill', [
      'Ariana Dybala - Smoke & Ash.mp3',
      'Dora Gray - Summer Love.mp3',
      'Ella Stone - Forever.mp3',
      'Olivia Taylor - One More Time.mp3',
      'River Simmons - Far Apart.mp3',
    ]),
    energetic: build('retail/Energetic', [
      'B-Main - My Mind.mp3',
      "Don't Stop (Vocal mix).mp3",
      'Sunny Deep House 3.mp3',
      'Take My Hand (Vetlove Remix).mp3',
      'The Days (Vocal mix).mp3',
    ]),
    premium: build('retail/Premium', [
      'Deep Dark House 2.mp3',
      "Don't leave.mp3",
      'Magestic.mp3',
      'The Cool Problem.mp3',
      'Think Sax.mp3',
    ]),
    relaxed: build('retail/Relaxed', [
      'Leon Cooke - Sunshine.mp3',
      'River Simmons - Far Apart.mp3',
      'River Simmons - Hear My Call.mp3',
      'River Simmons - Tears On My Pillow.mp3',
      'Walker Read - Spaceship.mp3',
    ]),
    sophisticated: build('retail/Sophisticated', [
      'Abel Cain - Love We Had (Get Back).mp3',
      'Coco Parks - Pay No Mind.mp3',
      'Walker Read - Shining Star.mp3',
      'Walker Read - Sky Starts To Fall.mp3',
      'Walker Read - Sun Comes Up.mp3',
    ]),
    upbeat: build('retail/Upbeat', [
      'Barbara ... (Vocal mix).mp3',
      'Deepest Love.mp3',
      'Love You Like....mp3',
      'Unbreakable.mp3',
      'Wasted Time.mp3',
    ]),
  },
};

export function getAudioTracks(store: StoreId, mood: MoodId): Track[] | null {
  const tracks = audioCatalog[store]?.[mood];
  return tracks && tracks.length > 0 ? tracks : null;
}
