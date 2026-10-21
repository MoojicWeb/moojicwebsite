import { useEffect, useRef } from 'react';

interface HeroVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  onCanPlay?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
}

export default function HeroVideo({ src, className, style, onCanPlay }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'none';

    let loaded = false;
    const tryPlay = () => { video.play().catch(() => {}); };
    const start = () => {
      if (!loaded) {
        loaded = true;
        video.src = src;
        video.load();
      }
      tryPlay();
    };
    const onVisibility = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) start();
        else video.pause();
      });
    };

    video.addEventListener('loadedmetadata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    const observer = typeof IntersectionObserver === 'undefined'
      ? undefined
      : new IntersectionObserver(onVisibility, { threshold: 0.1 });
    if (observer) observer.observe(video);
    else start();

    return () => {
      observer?.disconnect();
      video.pause();
      video.removeEventListener('loadedmetadata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      video.removeAttribute('src');
      video.load();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      onCanPlay={onCanPlay}
      className={className}
      style={style}
    />
  );
}
