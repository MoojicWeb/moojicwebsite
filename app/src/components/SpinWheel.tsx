import { useState, useRef, useCallback } from 'react';
import { Target } from 'lucide-react';

const SEGMENTS = [
  { label: '50% OFF', color: '#e91e63', textColor: '#fff' },
  { label: 'Try Again', color: '#1a1a2e', textColor: '#fff' },
  { label: 'Free Coffee', color: '#ff9800', textColor: '#fff' },
  { label: '20% OFF', color: '#7c4dff', textColor: '#fff' },
  { label: 'Free Gift', color: '#00bcd4', textColor: '#fff' },
  { label: '10% OFF', color: '#e91e63', textColor: '#fff' },
  { label: 'Jackpot!', color: '#ff9800', textColor: '#fff' },
  { label: 'Try Again', color: '#1a1a2e', textColor: '#fff' },
];

export default function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const spins = 5 + Math.random() * 5;
    const newRotation = rotation + spins * 360;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const normalizedRotation = ((newRotation % 360) + 360) % 360;
      const segmentAngle = 360 / SEGMENTS.length;
      const winningIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) % 360 / segmentAngle);
      setResult(SEGMENTS[winningIndex].label);
    }, 4000);
  }, [spinning, rotation]);

  const segmentAngle = 360 / SEGMENTS.length;

  return (
    <div className="game-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 transition-all duration-500 hover:border-[#7c4dff]/30 flex flex-col w-full h-full">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7c4dff] to-[#00bcd4] opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c4dff] to-[#00bcd4] flex items-center justify-center shadow-lg">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-poppins font-bold text-base text-white">Spin The Wheel</h3>
          <p className="text-[#7c4dff] text-[10px] font-medium">Click to Spin</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
      {/* Wheel Container */}
      <div className="relative mx-auto mb-4" style={{ width: '220px', height: '220px' }}>
        {/* Outer ring with lights */}
        <div className="absolute -inset-2 rounded-full border-2 border-[#e91e63]/30" />
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-pulse"
            style={{
              background: i % 2 === 0 ? '#ff9800' : '#e91e63',
              top: `${50 - 52 * Math.cos((i * 30 * Math.PI) / 180)}%`,
              left: `${50 + 52 * Math.sin((i * 30 * Math.PI) / 180)}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}

        {/* The Wheel */}
        <div
          ref={wheelRef}
          className="absolute inset-0 rounded-full overflow-hidden shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {SEGMENTS.map((seg, i) => {
              const startAngle = (segmentAngle * i * Math.PI) / 180;
              const endAngle = (segmentAngle * (i + 1) * Math.PI) / 180;
              const x1 = 100 + 90 * Math.cos(startAngle);
              const y1 = 100 + 90 * Math.sin(startAngle);
              const x2 = 100 + 90 * Math.cos(endAngle);
              const y2 = 100 + 90 * Math.sin(endAngle);
              const textAngle = segmentAngle * i + segmentAngle / 2;
              const textRad = (textAngle * Math.PI) / 180;
              const tx = 100 + 55 * Math.cos(textRad);
              const ty = 100 + 55 * Math.sin(textRad);

              return (
                <g key={i}>
                  <path
                    d={`M100,100 L${x1},${y1} A90,90 0 0,1 ${x2},${y2} Z`}
                    fill={seg.color}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                  <text
                    x={tx}
                    y={ty}
                    fill={seg.textColor}
                    fontSize="7"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle}, ${tx}, ${ty})`}
                  >
                    {seg.label}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle cx="100" cy="100" r="18" fill="#0a0a1a" stroke="#e91e63" strokeWidth="2" />
            <text x="100" y="100" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">SPIN</text>
          </svg>
        </div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0" style={{
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '16px solid #e91e63',
            filter: 'drop-shadow(0 2px 4px rgba(233,30,99,0.5))',
          }} />
        </div>

        {/* Center button overlay */}
        <button
          onClick={spin}
          disabled={spinning}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0a0a1a] border-2 border-[#e91e63] flex items-center justify-center z-10 shadow-lg hover:scale-110 transition-transform disabled:opacity-50 active:scale-95"
        >
          <span className="text-[8px] text-white font-bold">{spinning ? '...' : 'GO'}</span>
        </button>
      </div>

      {/* Spin button */}
      <button
        onClick={spin}
        disabled={spinning}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7c4dff] to-[#00bcd4] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_8px_25px_rgba(124,77,255,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 mb-3"
      >
        {spinning ? 'SPINNING...' : 'SPIN THE WHEEL'}
      </button>

      </div>
      {/* Result */}
      {result && (
        <div className={`text-center p-3 rounded-xl border ${!result.includes('Try') ? 'bg-[#7c4dff]/10 border-[#7c4dff]/30' : 'bg-white/[0.03] border-white/[0.08]'}`}>
          <p className="text-[10px] text-white/40">{result.includes('Try') ? 'Result' : '🎉 You Won!'}</p>
          <p className={`font-poppins font-bold text-base ${!result.includes('Try') ? 'text-[#7c4dff]' : 'text-white/60'}`}>{result}</p>
        </div>
      )}
    </div>
  );
}
