import { useState, useRef, useCallback, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const PRIZES = [
  { label: '50% OFF', sub: 'On your next purchase', color: '#e91e63' },
  { label: 'Free Coffee', sub: 'Any size, any flavor', color: '#ff9800' },
  { label: '20% OFF', sub: 'Store-wide discount', color: '#7c4dff' },
  { label: 'Free Gift', sub: 'Surprise item at checkout', color: '#00bcd4' },
  { label: '10% OFF', sub: 'Valid today only', color: '#4caf50' },
  { label: 'Try Again', sub: 'Better luck next time!', color: '#607d8b' },
];

export default function ScratchCard() {
  const [prize, setPrize] = useState(PRIZES[0]);
  const [isScratched, setIsScratched] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const hasInit = useRef(false);

  const W = 260;
  const H = 140;

  const drawScratchLayer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

    // Solid opaque background - completely hides prize
    ctx.fillStyle = '#2a2a4a';
    ctx.fillRect(0, 0, W, H);

    // Scratch texture lines
    ctx.fillStyle = '#32325a';
    for (let row = 0; row < H; row += 4) {
      ctx.fillRect(0, row, W, 2);
    }

    // Silver shimmer effect
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      ctx.fillStyle = `rgba(180, 180, 220, ${Math.random() * 0.4})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // "SCRATCH HERE" text
    ctx.fillStyle = '#8888aa';
    ctx.font = 'bold 22px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH HERE', W / 2, H / 2 - 6);

    ctx.fillStyle = 'rgba(136, 136, 170, 0.5)';
    ctx.font = '11px Poppins, sans-serif';
    ctx.fillText('Use mouse or finger', W / 2, H / 2 + 18);

    hasInit.current = true;
  }, []);

  useEffect(() => {
    drawScratchLayer();
  }, [drawScratchLayer]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = 'destination-out';

    // Main scratch circle
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Add extra scratch texture
    for (let i = 0; i < 6; i++) {
      const ox = x + (Math.random() - 0.5) * 20;
      const oy = y + (Math.random() - 0.5) * 20;
      ctx.beginPath();
      ctx.arc(ox, oy, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    setIsScratched(true);
  };

  const startScratch = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    scratch(e);
  };
  const endScratch = () => { isDrawing.current = false; };

  const revealAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillRect(0, 0, W, H);
    setIsScratched(true);
  };

  const reset = () => {
    const newPrize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
    setPrize(newPrize);
    setIsScratched(false);
    hasInit.current = false;
    requestAnimationFrame(() => {
      drawScratchLayer();
    });
  };

  return (
    <div className="game-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 transition-all duration-500 hover:border-[#00bcd4]/30 flex flex-col w-full h-full">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00bcd4] to-[#4caf50] opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00bcd4] to-[#4caf50] flex items-center justify-center shadow-lg">
          <span className="text-lg">🎯</span>
        </div>
        <div>
          <h3 className="font-poppins font-bold text-base text-white">Scratch &amp; Win</h3>
          <p className="text-[#00bcd4] text-[10px] font-medium">Scratch to Reveal</p>
        </div>
      </div>

      {/* Scratch Card */}
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <div ref={containerRef} className="relative mx-auto" style={{ width: W, height: H }}>
          {/* Prize background - hidden until scratched */}
          <div
            className="absolute inset-0 rounded-xl flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${prize.color}30, ${prize.color}10)`,
              opacity: isScratched ? 1 : 0,
            }}
          >
            {/* Decorative glow */}
            <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at 50% 50%, ${prize.color}50, transparent 70%)` }} />
            <span className="font-poppins font-extrabold text-white text-2xl drop-shadow-lg relative z-10">{prize.label}</span>
            <span className="text-white/60 text-[10px] mt-1 relative z-10">{prize.sub}</span>
          </div>

          {/* Scratch canvas - opaque layer hides prize */}
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="absolute inset-0 rounded-xl cursor-crosshair touch-none"
            onMouseDown={startScratch}
            onMouseMove={scratch}
            onMouseUp={endScratch}
            onMouseLeave={endScratch}
            onTouchStart={(e) => { e.preventDefault(); startScratch(e); }}
            onTouchMove={(e) => { e.preventDefault(); scratch(e); }}
            onTouchEnd={endScratch}
            style={{ touchAction: 'none', userSelect: 'none', backgroundColor: '#2a2a4a' }}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4 w-full" style={{ maxWidth: W }}>
          {isScratched && (
            <button
              onClick={revealAll}
              className="flex-1 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 text-[10px] font-medium uppercase tracking-wider hover:bg-white/[0.08] hover:text-white/70 transition-all"
            >
              Reveal All
            </button>
          )}
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={reset}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00bcd4] to-[#4caf50] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_8px_25px_rgba(0,188,212,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
      >
        <RefreshCw className="w-3.5 h-3.5" /> New Card
      </button>
    </div>
  );
}
