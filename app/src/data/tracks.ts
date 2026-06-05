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

// Display-name overrides — highest priority. Use to clean up messy ID3 titles
// (catalog codes, library prefixes, etc.) without re-tagging the source file.
// Key: relative path from /assets/audio/, exactly as it appears in audio-meta.json.
const titleOverrides: Record<string, string> = {
  'cafe/Sophisticated/Anytime.mp3': 'Anytime',
};

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
    title: titleOverrides[key] || tags?.title || fallbackTitle,
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
  restaurant: {
    chill: build('restaurant/Chill', [
      'Back To Williamsburg.mp3',
      'Funkish Piano.mp3',
      'Galician Chill.mp3',
      'Hippety Hoppety.mp3',
      'Kicking Back.mp3',
    ]),
    energetic: build('restaurant/Energetic', [
      'Angels And Demons Here.mp3',
      'Slow (Original Mix).mp3',
      'The Camera.mp3',
      'Think Sax.mp3',
      'Time Goes By (Deep House (Instrumental)).mp3',
    ]),
    premium: build('restaurant/Premium', [
      'Charmed.mp3',
      'Classic Lounge.mp3',
      'Gallery.mp3',
      'Monochrome.mp3',
      'Slow Tone.mp3',
    ]),
    relaxed: build('restaurant/Relaxed', [
      'Afterhours Mood.mp3',
      'Love Me Tomorrow.mp3',
      'Morning Sunrise.mp3',
      'Paris Afterhours.mp3',
      'Relaxed Sunny Jazz.mp3',
    ]),
    sophisticated: build('restaurant/Sophisticated', [
      'Back To Williamsburg.mp3',
      'Boombox Shuffle.mp3',
      'Cappuccino Please.mp3',
      'Follow Away (Dub).mp3',
      'Shoreline.mp3',
    ]),
    upbeat: build('restaurant/Upbeat', [
      'Another One - Instrumental.mp3',
      'Cheated - Instrumental Version.mp3',
      'Funky Train - Instrumental.mp3',
      'Make Your Move - Instrumental.mp3',
      'See Me Fall - Instrumental Version.mp3',
    ]),
  },
  salon: {
    chill: build('salon/Chill', [
      'Jukebox Tongue.mp3',
      'Latte Saxophone.mp3',
      'Relaxed Coffee.mp3',
      'Trombone Postcards.mp3',
      'Velvet Postcard.mp3',
    ]),
    energetic: build('salon/Energetic', [
      'Dora Gray - Electricity.mp3',
      'Jacklyn Jones - Do You Have It.mp3',
      'Main - My Mind.mp3',
      'Noah Bearman - Flames Within.mp3',
      'Xygalo - Alive.mp3',
    ]),
    premium: build('salon/Premium', [
      'Cassette Romance.mp3',
      'Nuit Douce.mp3',
      'Paris After Party.mp3',
      'Quiet Chic.mp3',
      'Saint-Germain Drift.mp3',
    ]),
    relaxed: build('salon/Relaxed', [
      'Daniella Almqvist - In My Head.mp3',
      "Lauryn Raye - Burnin' Up.mp3",
      "Lucy Baird - Bring Me Back To.mp3",
      'Olivia Taylor - One More Time.mp3',
      'Walker Read - Spaceship.mp3',
    ]),
    sophisticated: build('salon/Sophisticated', [
      "Aren't Even Mine.mp3",
      'Far From Home.mp3',
      'Hear My Call.mp3',
      'Pay No Mind.mp3',
      'Save Me Tonight.mp3',
    ]),
    upbeat: build('salon/Upbeat', [
      'Ariel Young - Another One.mp3',
      'Lottie Kennedy - So Low.mp3',
      "Should've Never Let Go.mp3",
      'Taylor Heath - Fireflies.mp3',
      'Walker Read - Sun Comes Up.mp3',
    ]),
  },
};

export function getAudioTracks(store: StoreId, mood: MoodId): Track[] | null {
  const tracks = audioCatalog[store]?.[mood];
  return tracks && tracks.length > 0 ? tracks : null;
}
