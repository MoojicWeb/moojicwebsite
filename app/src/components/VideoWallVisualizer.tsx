import { useRef, useEffect } from 'react';

interface Screen {
  x: number; y: number; w: number; h: number;
  vx: number; vy: number;
  contentOffset: number;
  contentSpeed: number;
}

export default function VideoWallVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const screensRef = useRef<Screen[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (screensRef.current.length === 0) {
        screensRef.current = [
          { x: w * 0.05, y: h * 0.08, w: w * 0.32, h: h * 0.6, vx: 0.2, vy: -0.12, contentOffset: 0, contentSpeed: 0.8 },
          { x: w * 0.42, y: h * 0.02, w: w * 0.28, h: h * 0.55, vx: -0.15, vy: 0.18, contentOffset: 40, contentSpeed: 0.6 },
          { x: w * 0.72, y: h * 0.12, w: w * 0.25, h: h * 0.5, vx: 0.12, vy: -0.08, contentOffset: 80, contentSpeed: 1 },
          { x: w * 0.12, y: h * 0.58, w: w * 0.24, h: h * 0.38, vx: -0.18, vy: 0.1, contentOffset: 120, contentSpeed: 0.5 },
          { x: w * 0.43, y: h * 0.55, w: w * 0.28, h: h * 0.42, vx: 0.1, vy: -0.15, contentOffset: 20, contentSpeed: 0.7 },
          { x: w * 0.73, y: h * 0.6, w: w * 0.22, h: h * 0.36, vx: -0.08, vy: 0.12, contentOffset: 60, contentSpeed: 0.9 },
        ];
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Dark purple-blue base
      ctx.fillStyle = '#0d0d1f';
      ctx.fillRect(0, 0, w, h);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(124,77,255,0.04)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      // Draw each floating screen
      for (let si = 0; si < screensRef.current.length; si++) {
        const screen = screensRef.current[si];
        screen.x += screen.vx;
        screen.y += screen.vy;
        if (screen.x < -30 || screen.x > w - screen.w + 30) screen.vx *= -1;
        if (screen.y < -30 || screen.y > h - screen.h + 30) screen.vy *= -1;
        screen.contentOffset += screen.contentSpeed;

        const cx = screen.x, cy = screen.y, cw = screen.w, ch = screen.h;
        const cr = 8; // corner radius

        // Glowing border
        ctx.shadowColor = 'rgba(124,77,255,0.4)';
        ctx.shadowBlur = 15 + Math.sin(t * 1.5 + si) * 5;
        ctx.strokeStyle = `rgba(124,77,255,${0.3 + Math.sin(t * 0.8 + si * 2) * 0.15})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(cx, cy, cw, ch, cr);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Inner dark fill
        ctx.fillStyle = 'rgba(10,10,26,0.7)';
        ctx.beginPath();
        ctx.roundRect(cx + 2, cy + 2, cw - 4, ch - 4, cr - 2);
        ctx.fill();

        // Video content frames sliding inside
        const frameH = (ch - 24) / 3;
        const colors = [
          'rgba(124,77,255,0.35)', 'rgba(233,30,99,0.3)', 'rgba(0,188,212,0.3)',
          'rgba(255,152,0,0.25)', 'rgba(76,175,80,0.25)',
        ];

        for (let row = 0; row < 3; row++) {
          const fy = cy + 10 + row * (frameH + 4);
          const rowOffset = (screen.contentOffset + row * 60) % (cw + 40);

          for (let f = 0; f < 5; f++) {
            const fw = 20 + Math.sin(t + f + row) * 10 + 15;
            const fx = cx + 8 + ((rowOffset + f * ((cw - 16) / 3.5)) % (cw - 16));
            if (fx > cx + cw - 12) continue;

            ctx.fillStyle = colors[(si + f + row) % colors.length];
            ctx.beginPath();
            ctx.roundRect(fx, fy + 2, Math.min(fw, cx + cw - 12 - fx), frameH - 6, 3);
            ctx.fill();
          }
        }

        // Play button
        const px = cx + cw / 2;
        const py = cy + ch / 2;
        const ps = Math.min(16, cw * 0.1);

        ctx.shadowColor = 'rgba(124,77,255,0.6)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = 'rgba(124,77,255,0.5)';
        ctx.beginPath();
        ctx.arc(px, py, ps, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.moveTo(px - ps * 0.25, py - ps * 0.3);
        ctx.lineTo(px + ps * 0.35, py);
        ctx.lineTo(px - ps * 0.25, py + ps * 0.3);
        ctx.closePath();
        ctx.fill();

        // Timeline bar at bottom
        const ty = cy + ch - 10;
        ctx.fillStyle = 'rgba(124,77,255,0.15)';
        ctx.beginPath();
        ctx.roundRect(cx + 8, ty, cw - 16, 3, 1.5);
        ctx.fill();

        const prog = (Math.sin(t * 0.4 + si) + 1) / 2;
        ctx.fillStyle = 'rgba(124,77,255,0.5)';
        ctx.beginPath();
        ctx.roundRect(cx + 8, ty, (cw - 16) * prog, 3, 1.5);
        ctx.fill();
      }

      // Floating particles
      for (let i = 0; i < 20; i++) {
        const px = ((Math.sin(t * 0.3 + i * 4.1) + 1) / 2) * w;
        const py = ((Math.cos(t * 0.25 + i * 3.3) + 1) / 2) * h;
        const sz = 1 + Math.sin(t + i * 1.3) * 0.5;
        const alpha = 0.2 + Math.sin(t * 0.5 + i) * 0.15;
        ctx.fillStyle = `rgba(124,77,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, sz, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulse rings from screen centers
      if (Math.random() < 0.03) {
        const s = screensRef.current[Math.floor(Math.random() * screensRef.current.length)];
        const p = { x: s.x + s.w / 2, y: s.y + s.h / 2, r: 5, a: 0.5 };
        const drawPulse = () => {
          p.r += 2;
          p.a -= 0.012;
          if (p.a <= 0) return;
          ctx.strokeStyle = `rgba(124,77,255,${p.a})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.stroke();
          requestAnimationFrame(drawPulse);
        };
        drawPulse();
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
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
}
