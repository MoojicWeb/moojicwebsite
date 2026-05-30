import { useEffect, useRef } from 'react';

interface HeroVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  onCanPlay?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
}

// Hero video that aggressively retries play() to defeat browser autoplay
// blocking on hard refresh, mid-session navigation, and Safari quirks.
// Mirrors the working pattern used on the Home hero.
export default function HeroVideo({ src, className, style, onCanPlay }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'auto';
    video.load();

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener('loadedmetadata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('loadeddata', tryPlay);

    const interval = setInterval(tryPlay, 500);
    const stopTimeout = setTimeout(() => clearInterval(interval), 10000);

    const onInteract = () => { tryPlay(); };
    document.addEventListener('click', onInteract, { once: true });
    document.addEventListener('touchstart', onInteract, { once: true });
    document.addEventListener('scroll', onInteract, { once: true });

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimeout);
      video.removeEventListener('loadedmetadata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      onCanPlay={onCanPlay}
      className={className}
      style={style}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
