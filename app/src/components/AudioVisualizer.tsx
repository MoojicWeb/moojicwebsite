import { useRef, useEffect } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number; radius: number;
  alpha: number; color: string; life: number; maxLife: number;
}

interface Ripple {
  x: number; y: number; radius: number; maxRadius: number;
  alpha: number; color: string; lineWidth: number;
}

interface AudioVisualizerProps {
  isPlaying: boolean;
  brandMood: string;
  moodColor: string;
  trackChangeKey: number;
}

export default function AudioVisualizer({ isPlaying, brandMood, moodColor, trackChangeKey }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const barsRef = useRef<number[]>([]);
  const timeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const prevTrackKeyRef = useRef(trackChangeKey);
  const isPlayingRef = useRef(isPlaying);
  const moodColorRef = useRef(moodColor);
  const brandMoodRef = useRef(brandMood);
  const opacityRef = useRef(0.35);

  // Keep refs in sync with props without restarting animation
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { moodColorRef.current = moodColor; }, [moodColor]);
  useEffect(() => { brandMoodRef.current = brandMood; }, [brandMood]);
  useEffect(() => {
    // Smooth opacity transition
    const target = isPlaying ? 1 : 0.35;
    const interval = setInterval(() => {
      opacityRef.current += (target - opacityRef.current) * 0.05;
      if (Math.abs(target - opacityRef.current) < 0.01) {
        opacityRef.current = target;
        clearInterval(interval);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const getMoodConfig = (mood: string) => {
    switch (mood) {
      case 'energetic': return { barCount: 80, speed: 3.5, amplitude: 1.3, chaos: 1 };
      case 'upbeat': return { barCount: 60, speed: 2.8, amplitude: 1.1, chaos: 0.7 };
      case 'chill': return { barCount: 40, speed: 0.7, amplitude: 0.45, chaos: 0.15 };
      case 'relaxed': return { barCount: 36, speed: 0.9, amplitude: 0.55, chaos: 0.25 };
      case 'premium': return { barCount: 48, speed: 1.1, amplitude: 0.65, chaos: 0.35 };
      case 'sophisticated': return { barCount: 42, speed: 0.8, amplitude: 0.5, chaos: 0.2 };
      default: return { barCount: 50, speed: 1.5, amplitude: 0.85, chaos: 0.5 };
    }
  };

  // Spawn burst particles + ripples on track change
  useEffect(() => {
    if (trackChangeKey !== prevTrackKeyRef.current) {
      prevTrackKeyRef.current = trackChangeKey;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const rgb = hexToRgb(moodColorRef.current);

      for (let i = 0; i < 3; i++) {
        ripplesRef.current.push({
          x: w * 0.3 + Math.random() * w * 0.4,
          y: h * 0.4 + Math.random() * h * 0.3,
          radius: 10 + i * 30,
          maxRadius: 200 + i * 80,
          alpha: 0.6 - i * 0.15,
          color: `rgba(${rgb.r},${rgb.g},${rgb.b}`,
          lineWidth: 3 - i * 0.5,
        });
      }

      for (let i = 0; i < 40; i++) {
        const angle = (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.5;
        const speed = 2 + Math.random() * 4;
        particlesRef.current.push({
          x: w * 0.3 + Math.random() * w * 0.4,
          y: h * 0.5 + Math.random() * h * 0.2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          radius: 1.5 + Math.random() * 3,
          alpha: 0.8 + Math.random() * 0.2,
          color: `rgba(${rgb.r + (Math.random() * 40) | 0},${rgb.g + (Math.random() * 40) | 0},${rgb.b + (Math.random() * 40) | 0}`,
          life: 0,
          maxLife: 40 + Math.random() * 60,
        });
      }
    }
  }, [trackChangeKey]);

  // Main animation loop — runs once and never restarts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Init bars
    if (barsRef.current.length === 0) {
      barsRef.current = Array.from({ length: 128 }, () => Math.random());
    }

    const animate = () => {
      const playing = isPlayingRef.current;
      const color = moodColorRef.current;
      const mood = brandMoodRef.current;
      const config = getMoodConfig(mood);

      timeRef.current += 0.016 * config.speed;
      ctx.clearRect(0, 0, w, h);
      const rgb = hexToRgb(color);
      const canvasOpacity = opacityRef.current;

      // ── RIPPLES ──
      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.radius += 4;
        r.alpha -= 0.008;
        if (r.alpha <= 0) return false;
        ctx.strokeStyle = `${r.color},${r.alpha * canvasOpacity})`;
        ctx.lineWidth = r.lineWidth;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
        return true;
      });

      // ── FREQUENCY BARS ──
      const barCount = config.barCount;
      const barWidth = w / barCount;
      const gap = barWidth * 0.25;
      const fillWidth = Math.max(barWidth - gap, 1);

      for (let i = 0; i < barCount; i++) {
        let barH: number;

        if (playing) {
          const baseFreq = Math.sin(timeRef.current * 2 + i * 0.25) * 0.5 + 0.5;
          const harmonic2 = Math.sin(timeRef.current * 3.7 + i * 0.55 + 1.2) * 0.3 + 0.3;
          const harmonic3 = Math.sin(timeRef.current * 5.1 + i * 0.9 + 2.5) * 0.2 + 0.2;
          const harmonic4 = Math.sin(timeRef.current * 7.3 + i * 1.4 + 4.1) * 0.15 + 0.15;
          const noise = (Math.random() - 0.5) * config.chaos;

          const value = Math.max(0.08, Math.min(1,
            (baseFreq * 0.45 + harmonic2 * 0.25 + harmonic3 * 0.18 + harmonic4 * 0.12) * config.amplitude + noise
          ));

          barsRef.current[i] += (value - barsRef.current[i]) * 0.12;
          barH = barsRef.current[i] * h * 0.9;
        } else {
          const idleVal = 0.05 + Math.sin(timeRef.current * 0.5 + i * 0.12) * 0.04;
          barsRef.current[i] += (idleVal - barsRef.current[i]) * 0.08;
          barH = barsRef.current[i] * h * 0.9;
        }

        const x = i * barWidth + gap / 2;
        const y = h - barH;

        // Bar gradient
        const gradient = ctx.createLinearGradient(0, h, 0, y);
        gradient.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${playing ? 0.7 * canvasOpacity : 0.12 * canvasOpacity})`);
        gradient.addColorStop(0.6, `rgba(${rgb.r},${rgb.g},${rgb.b},${playing ? 0.35 * canvasOpacity : 0.06 * canvasOpacity})`);
        gradient.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},${playing ? 0.08 * canvasOpacity : 0.02 * canvasOpacity})`);
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.roundRect(x, y, fillWidth, barH, 4);
        ctx.fill();

        // Glow tip when playing
        if (playing && barH > h * 0.15) {
          const tipGlow = ctx.createRadialGradient(
            x + fillWidth / 2, y, 0,
            x + fillWidth / 2, y, fillWidth * 2.5
          );
          tipGlow.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.5 * canvasOpacity})`);
          tipGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = tipGlow;
          ctx.beginPath();
          ctx.ellipse(x + fillWidth / 2, y, fillWidth * 1.5, fillWidth * 3, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── FLOATING PARTICLES ──
      if (playing && Math.random() < 0.15) {
        particlesRef.current.push({
          x: Math.random() * w,
          y: h + 5,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -0.5 - Math.random() * 1.5,
          radius: 1 + Math.random() * 2,
          alpha: 0.3 + Math.random() * 0.4,
          color: `rgba(${rgb.r + ((Math.random() - 0.5) * 60) | 0},${rgb.g + ((Math.random() - 0.5) * 60) | 0},${rgb.b + ((Math.random() - 0.5) * 60) | 0})`,
          life: 0,
          maxLife: 100 + Math.random() * 100,
        });
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const lifeRatio = p.life / p.maxLife;
        const alpha = p.alpha * (1 - lifeRatio) * canvasOpacity;

        if (alpha <= 0) return false;

        const pRgb = p.color.match(/rgba?\((\d+),(\d+),(\d+)/);
        if (pRgb) {
          ctx.fillStyle = `rgba(${pRgb[1]},${pRgb[2]},${pRgb[3]},${alpha})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 - lifeRatio * 0.3), 0, Math.PI * 2);
        ctx.fill();

        // Small glow around particle
        if (pRgb) {
          const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
          pg.addColorStop(0, `rgba(${pRgb[1]},${pRgb[2]},${pRgb[3]},${alpha * 0.3})`);
          pg.addColorStop(1, 'transparent');
          ctx.fillStyle = pg;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // ── WAVE OVERLAYS ──
      if (playing) {
        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${0.1 * canvasOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x < w; x += 2) {
          const waveY = h * 0.25 +
            Math.sin(x * 0.008 + timeRef.current * 1.5) * 20 +
            Math.sin(x * 0.015 + timeRef.current * 2.3) * 10 +
            Math.sin(x * 0.005 + timeRef.current * 0.8) * 15;
          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.stroke();

        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${0.06 * canvasOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < w; x += 2) {
          const waveY = h * 0.5 +
            Math.cos(x * 0.012 + timeRef.current * 1.2) * 12 +
            Math.sin(x * 0.02 + timeRef.current * 1.8) * 8;
          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []); // Empty deps — runs once, never restarts

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
