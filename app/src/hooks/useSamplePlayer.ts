import { useState, useEffect, useRef, useCallback } from 'react';
import { playlists } from '@/data/playlists';

export type StoreType = 'cafe' | 'retail' | 'restaurant' | 'salon' | 'gym' | 'hotel' | 'cinema' | 'mall' | 'supermarket' | 'bookstore' | 'workspace' | 'automotive';
export type BrandMood = 'relaxed' | 'energetic' | 'sophisticated' | 'upbeat' | 'chill' | 'premium';

export function useSamplePlayer() {
  const [storeType, setStoreType] = useState<StoreType>('cafe');
  const [brandMood, setBrandMood] = useState<BrandMood>('relaxed');
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [trackChangeKey, setTrackChangeKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mood tag based on brand mood + store type
  const moodTag = (() => {
    const moodMap: Record<BrandMood, string> = {
      relaxed: 'Chill & Easygoing',
      energetic: 'Upbeat & Dynamic',
      sophisticated: 'Elegant & Refined',
      upbeat: 'Bright & Lively',
      chill: 'Mellow & Smooth',
      premium: 'Luxury & Exclusive',
    };
    return moodMap[brandMood] || 'Balanced & Smooth';
  })();

  // Sonic profile based on brand mood
  const sonicProfile = (() => {
    const profileMap: Record<BrandMood, { genre: string; bpm: string; vibe: string }> = {
      relaxed: { genre: 'Acoustic / Indie', bpm: '60-90', vibe: 'Warm & Intimate' },
      energetic: { genre: 'Pop / Electronic', bpm: '120-140', vibe: 'Bold & Driving' },
      sophisticated: { genre: 'Jazz / Lounge', bpm: '70-100', vibe: 'Smooth & Elegant' },
      upbeat: { genre: 'Indie Pop / Funk', bpm: '100-128', vibe: 'Cheerful & Bright' },
      chill: { genre: 'Lo-Fi / Ambient', bpm: '50-80', vibe: 'Calm & Dreamy' },
      premium: { genre: 'Classical / Deep House', bpm: '80-120', vibe: 'Polished & Refined' },
    };
    return profileMap[brandMood];
  })();

  const currentPlaylist = playlists.find((p) => p.id === storeType) || playlists[0];

  // Reorder tracks based on brand mood
  const moodOrderedTracks = (() => {
    const tracks = [...currentPlaylist.tracks];
    if (brandMood === 'energetic' || brandMood === 'upbeat') {
      return tracks.sort((a, b) => ((b.id % 3) - (a.id % 3)));
    }
    if (brandMood === 'relaxed' || brandMood === 'chill') {
      return tracks.sort((a, b) => ((a.id % 3) - (b.id % 3)));
    }
    return tracks;
  })();

  const currentTrack = moodOrderedTracks[activeTrackIndex];

  const clearProgressInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (isRepeat) return 0;
            if (activeTrackIndex < moodOrderedTracks.length - 1) {
              setActiveTrackIndex((idx) => idx + 1);
              setTrackChangeKey((k) => k + 1);
              return 0;
            }
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.4;
        });
      }, 100);
    } else {
      clearProgressInterval();
    }
    return clearProgressInterval;
  }, [isPlaying, activeTrackIndex, moodOrderedTracks.length, isRepeat, clearProgressInterval]);

  const selectStoreType = (type: StoreType) => {
    setStoreType(type);
    setActiveTrackIndex(0);
    setProgress(0);
    setIsPlaying(true);
    setTrackChangeKey((k) => k + 1);
  };

  const selectTrack = (index: number) => {
    setActiveTrackIndex(index);
    setProgress(0);
    setIsPlaying(true);
    setTrackChangeKey((k) => k + 1);
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  const nextTrack = () => {
    if (isShuffle) {
      setActiveTrackIndex(Math.floor(Math.random() * moodOrderedTracks.length));
    } else {
      setActiveTrackIndex((idx) => (idx < moodOrderedTracks.length - 1 ? idx + 1 : 0));
    }
    setProgress(0);
    setIsPlaying(true);
    setTrackChangeKey((k) => k + 1);
  };

  const prevTrack = () => {
    if (progress > 5) {
      setProgress(0);
    } else {
      setActiveTrackIndex((idx) => (idx > 0 ? idx - 1 : moodOrderedTracks.length - 1));
      setProgress(0);
    }
    setIsPlaying(true);
    setTrackChangeKey((k) => k + 1);
  };

  const seek = (value: number) => setProgress(value);

  return {
    storeType,
    brandMood,
    moodTag,
    sonicProfile,
    activeTrackIndex,
    isPlaying,
    progress,
    volume,
    isShuffle,
    isRepeat,
    currentPlaylist,
    currentTrack,
    moodOrderedTracks,
    trackChangeKey,
    selectStoreType,
    selectTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    setBrandMood: (m: BrandMood) => { setBrandMood(m); setActiveTrackIndex(0); setProgress(0); },
    toggleShuffle: () => setIsShuffle((s) => !s),
    toggleRepeat: () => setIsRepeat((r) => !r),
  };
}
