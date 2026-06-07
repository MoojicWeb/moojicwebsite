import { useState, useEffect, useRef, useCallback } from 'react';
import { playlists } from '@/data/playlists';
import { getAudioTracks } from '@/data/tracks';
import type { Track } from '@/data/playlists';

export type StoreType =
  | 'cafe' | 'retail' | 'restaurant' | 'salon' | 'gym' | 'hotel'
  | 'cinema' | 'mall' | 'supermarket' | 'bookstore' | 'workspace' | 'automotive';

export type BrandMood = 'relaxed' | 'energetic' | 'sophisticated' | 'upbeat' | 'chill' | 'premium';

const FAKE_DURATION_SECONDS = 240;

export function useSamplePlayer() {
  const [storeType, setStoreType] = useState<StoreType>('cafe');
  const [brandMood, setBrandMood] = useState<BrandMood>('relaxed');
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [trackChangeKey, setTrackChangeKey] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fakeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // Prefer real audio catalog for the (store, mood) combo; fall back to placeholder list.
  const moodOrderedTracks: Track[] = (() => {
    const audioTracks = getAudioTracks(storeType, brandMood);
    if (audioTracks) return audioTracks;

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
  const hasAudio = !!currentTrack?.file;

  // Create the audio element once and wire shared listeners.
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = 0.7;
    audioRef.current = audio;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setAudioDuration(audio.duration || 0);
    const onError = (e: Event) => {
      const err = (e.target as HTMLAudioElement).error;
      console.error('Audio error:', err?.code, err?.message, 'src:', audio.src);
    };
    const onCanPlay = () => console.log('Audio canplay:', audio.src);
    const onStalled = () => console.warn('Audio stalled:', audio.src);

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('durationchange', onMeta);
    audio.addEventListener('error', onError);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('stalled', onStalled);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('durationchange', onMeta);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('stalled', onStalled);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // Swap the audio source whenever the current track changes.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack?.file) {
      console.log('Loading audio:', currentTrack.file);
      audio.src = currentTrack.file;
      audio.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        audio.play().catch((err) => {
          console.error('Play error:', err);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      setCurrentTime(0);
      // No metadata yet; show fake duration so the seek bar is sensible.
      setAudioDuration(FAKE_DURATION_SECONDS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.file]);

  // Reflect play/pause state to the audio element (only when we have a real file).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, hasAudio]);

  // Reflect volume to the audio element.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = Math.max(0, Math.min(1, volume / 100));
  }, [volume]);

  // Handle real audio end: respect repeat/shuffle, or stop at the end of the list.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
      }
      if (isShuffle) {
        const nextIdx = Math.floor(Math.random() * moodOrderedTracks.length);
        setActiveTrackIndex(nextIdx);
        setTrackChangeKey((k) => k + 1);
        return;
      }
      if (activeTrackIndex < moodOrderedTracks.length - 1) {
        setActiveTrackIndex((idx) => idx + 1);
        setTrackChangeKey((k) => k + 1);
        return;
      }
      setIsPlaying(false);
    };

    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, [isRepeat, isShuffle, activeTrackIndex, moodOrderedTracks.length]);

  // Fake-timer playback for store/mood combos that don't have audio files yet.
  useEffect(() => {
    if (!isPlaying || hasAudio) {
      if (fakeIntervalRef.current) {
        clearInterval(fakeIntervalRef.current);
        fakeIntervalRef.current = null;
      }
      return;
    }

    setAudioDuration(FAKE_DURATION_SECONDS);
    fakeIntervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= FAKE_DURATION_SECONDS) {
          if (isRepeat) return 0;
          if (activeTrackIndex < moodOrderedTracks.length - 1) {
            setActiveTrackIndex((idx) => idx + 1);
            setTrackChangeKey((k) => k + 1);
            return 0;
          }
          setIsPlaying(false);
          return FAKE_DURATION_SECONDS;
        }
        return prev + 0.4;
      });
    }, 100);

    return () => {
      if (fakeIntervalRef.current) {
        clearInterval(fakeIntervalRef.current);
        fakeIntervalRef.current = null;
      }
    };
  }, [isPlaying, hasAudio, isRepeat, activeTrackIndex, moodOrderedTracks.length]);

  const progress = audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0;

  const selectStoreType = useCallback((type: StoreType) => {
    setStoreType(type);
    setActiveTrackIndex(0);
    setCurrentTime(0);
    setIsPlaying(true);
    setTrackChangeKey((k) => k + 1);
  }, []);

  const selectTrack = useCallback((index: number) => {
    setActiveTrackIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
    setTrackChangeKey((k) => k + 1);
  }, []);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

  const nextTrack = useCallback(() => {
    setActiveTrackIndex((idx) => {
      if (isShuffle) return Math.floor(Math.random() * moodOrderedTracks.length);
      return idx < moodOrderedTracks.length - 1 ? idx + 1 : 0;
    });
    setCurrentTime(0);
    setIsPlaying(true);
    setTrackChangeKey((k) => k + 1);
  }, [isShuffle, moodOrderedTracks.length]);

  const prevTrack = useCallback(() => {
    if (currentTime > 5) {
      if (audioRef.current && hasAudio) audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      setActiveTrackIndex((idx) => (idx > 0 ? idx - 1 : moodOrderedTracks.length - 1));
      setCurrentTime(0);
    }
    setIsPlaying(true);
    setTrackChangeKey((k) => k + 1);
  }, [currentTime, hasAudio, moodOrderedTracks.length]);

  const seek = useCallback((percentage: number) => {
    const target = (percentage / 100) * (audioDuration || FAKE_DURATION_SECONDS);
    if (audioRef.current && hasAudio) audioRef.current.currentTime = target;
    setCurrentTime(target);
  }, [audioDuration, hasAudio]);

  return {
    storeType,
    brandMood,
    moodTag,
    sonicProfile,
    activeTrackIndex,
    isPlaying,
    progress,
    currentTime,
    duration: audioDuration,
    volume,
    isShuffle,
    isRepeat,
    currentPlaylist,
    currentTrack,
    moodOrderedTracks,
    trackChangeKey,
    hasAudio,
    selectStoreType,
    selectTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    setBrandMood: (m: BrandMood) => {
      setBrandMood(m);
      setActiveTrackIndex(0);
      setCurrentTime(0);
    },
    toggleShuffle: () => setIsShuffle((s) => !s),
    toggleRepeat: () => setIsRepeat((r) => !r),
  };
}
