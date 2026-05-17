import { useRef, useEffect } from 'react';

interface Blob {
  x: number; y: number; vx: number; vy: number;
  radius: number; r: number; g: number; b: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

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

    const maxDim = Math.max(w, h);

    // 4 large colorful blobs that drift and bounce
    const blobs: Blob[] = [
      { x: w * 0.2, y: h * 0.3, vx: 0.6, vy: -0.35, radius: maxDim * 0.55, r: 233, g: 30, b: 99 },
      { x: w * 0.8, y: h * 0.6, vx: -0.45, vy: 0.4, radius: maxDim * 0.5, r: 124, g: 77, b: 255 },
      { x: w * 0.5, y: h * 0.8, vx: 0.3, vy: -0.25, radius: maxDim * 0.45, r: 255, g: 152, b: 0 },
      { x: w * 0.7, y: h * 0.2, vx: -0.5, vy: 0.35, radius: maxDim * 0.4, r: 240, g: 98, b: 146 },
    ];

    let time = 0;

    const animate = () => {
      time += 0.012;

      // Dark base
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, w, h);

      // Draw large gradient blobs — much brighter
      for (const blob of blobs) {
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce off edges
        if (blob.x < -blob.radius * 0.3) blob.vx = Math.abs(blob.vx);
        if (blob.x > w + blob.radius * 0.3) blob.vx = -Math.abs(blob.vx);
        if (blob.y < -blob.radius * 0.3) blob.vy = Math.abs(blob.vy);
        if (blob.y > h + blob.radius * 0.3) blob.vy = -Math.abs(blob.vy);

        const g = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
        // Much stronger colors — 0.4 alpha at center
        g.addColorStop(0, `rgba(${blob.r},${blob.g},${blob.b},0.4)`);
        g.addColorStop(0.3, `rgba(${blob.r},${blob.g},${blob.b},0.18)`);
        g.addColorStop(0.6, `rgba(${blob.r},${blob.g},${blob.b},0.06)`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bright floating particles — more of them, larger, more visible
      for (let i = 0; i < 40; i++) {
        const px = ((Math.sin(time * 0.5 + i * 4.1) + 1) / 2) * w;
        const py = ((Math.cos(time * 0.35 + i * 3.3) + 1) / 2) * h;
        const sz = 1.2 + Math.sin(time * 0.8 + i * 2.1) * 0.8;
        const alpha = 0.25 + Math.sin(time * 0.6 + i * 1.7) * 0.2;

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, sz, 0, Math.PI * 2);
        ctx.fill();
      }

      // Animated light streaks across the hero
      for (let i = 0; i < 3; i++) {
        const streakY = h * (0.15 + i * 0.35) + Math.sin(time * 0.4 + i * 2.5) * 40;
        const streakAlpha = 0.04 + Math.sin(time * 0.5 + i * 1.8) * 0.03;
        const gradient = ctx.createLinearGradient(0, 0, w, 0);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.25, `rgba(233,30,99,${streakAlpha})`);
        gradient.addColorStop(0.5, `rgba(124,77,255,${streakAlpha * 1.2})`);
        gradient.addColorStop(0.75, `rgba(255,152,0,${streakAlpha})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, streakY - 1, w, 2);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
    />
  );
}
