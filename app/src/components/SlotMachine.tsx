import { useState, useEffect, useRef, useCallback } from 'react';
import { Play } from 'lucide-react';

const SYMBOLS = ['7️⃣', '💎', '🎁', '🔔', '⭐', '🍀'];
const PRIZES: Record<string, string> = {
  '7️⃣7️⃣7️⃣': 'JACKPOT! 50% OFF',
  '💎💎💎': 'Free Premium Item',
  '🎁🎁🎁': 'Free Gift',
  '🔔🔔🔔': '20% OFF',
  '⭐⭐⭐': '10% OFF',
  '🍀🍀🍀': 'Lucky Bonus!',
};

export default function SlotMachine() {
  const [reels, setReels] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [coins, setCoins] = useState(10);
  const intervalRefs = useRef<number[]>([]);

  const getRandomSymbol = () => Math.floor(Math.random() * SYMBOLS.length);

  const spin = useCallback(() => {
    if (spinning || coins <= 0) return;
    setSpinning(true);
    setResult(null);
    setCoins((c) => c - 1);

    // Stop reels one by one
    const stopDelays = [800, 1400, 2000];
    const finalReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];

    // Start all spinning
    intervalRefs.current.forEach((id) => clearInterval(id));
    intervalRefs.current = [];

    const intervals = [
      setInterval(() => setReels((r) => [getRandomSymbol(), r[1], r[2]]), 80),
      setInterval(() => setReels((r) => [r[0], getRandomSymbol(), r[2]]), 80),
      setInterval(() => setReels((r) => [r[0], r[1], getRandomSymbol()]), 80),
    ];
    intervalRefs.current = intervals as unknown as number[];

    // Stop each reel
    stopDelays.forEach((delay, i) => {
      setTimeout(() => {
        clearInterval(intervals[i]);
        setReels((r) => {
          const newR = [...r];
          newR[i] = finalReels[i];
          return newR;
        });
      }, delay);
    });

    // Final result
    setTimeout(() => {
      setSpinning(false);
      const key = finalReels.map((r) => SYMBOLS[r]).join('');
      const allSame = finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2];
      setResult(PRIZES[key] || (allSame ? 'You Win!' : 'Try Again!'));
      if (allSame) setCoins((c) => c + 5);
    }, 2200);
  }, [spinning, coins]);

  useEffect(() => {
    return () => intervalRefs.current.forEach((id) => clearInterval(id));
  }, []);

  return (
    <div className="game-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 transition-all duration-500 hover:border-[#e91e63]/30 flex flex-col w-full h-full">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#e91e63] to-[#ff9800] opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e91e63] to-[#ff9800] flex items-center justify-center shadow-lg">
          <Play className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-poppins font-bold text-base text-white">Slot Machine</h3>
          <p className="text-[#e91e63] text-[10px] font-medium">Match 3 to Win</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff9800]/10 border border-[#ff9800]/20">
          <span className="text-xs">🪙</span>
          <span className="text-[10px] text-[#ff9800] font-bold">{coins}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full">
      {/* Slot Machine Body */}
      <div className="relative mx-auto mb-4 max-w-[220px]">
        {/* Top arch with lights */}
        <div className="relative bg-gradient-to-b from-[#1a0a2e] to-[#0a0a1a] border-2 border-[#e91e63]/40 rounded-t-3xl pt-4 pb-2 px-4">
          {/* BIG WIN text */}
          <div className="text-center mb-3">
            <span className="font-poppins font-extrabold text-sm tracking-wider" style={{
              background: 'linear-gradient(180deg, #ff9800 0%, #e91e63 50%, #ff9800 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(233,30,99,0.5)',
            }}>BIG WIN</span>
          </div>
          {/* Light bulbs */}
          <div className="flex justify-between px-2 mb-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#ff9800] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>

        {/* Reels Window */}
        <div className="bg-gradient-to-b from-[#1a0a2e] to-[#0a0a1a] border-x-2 border-[#e91e63]/40 px-3 py-4">
          <div className="bg-[#0a0a1a] rounded-lg border border-[#e91e63]/20 p-2">
            <div className="flex justify-center gap-2">
              {reels.map((r, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-lg bg-gradient-to-b from-[#1a1a3e] to-[#0a0a1a] border-2 border-[#7c4dff]/30 flex items-center justify-center text-2xl overflow-hidden relative"
                  style={{
                    boxShadow: spinning ? '0 0 15px rgba(124,77,255,0.3)' : '0 0 5px rgba(124,77,255,0.1)',
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  <span className={spinning ? 'animate-pulse' : ''}>{SYMBOLS[r]}</span>
                  {/* Center line */}
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#e91e63]/40" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom panel */}
        <div className="bg-gradient-to-b from-[#0a0a1a] to-[#1a0a2e] border-2 border-t-0 border-[#e91e63]/40 rounded-b-2xl p-3">
          {/* Lever handle */}
          <div className="absolute -right-4 top-8 flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-[#ff9800] shadow-[0_0_8px_rgba(255,152,0,0.5)]" />
            <div className="w-[2px] h-10 bg-gradient-to-b from-[#ff9800] to-[#e91e63]" />
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#ff9800] to-[#e91e63] shadow-lg" />
          </div>

          {/* SPIN button */}
          <button
            onClick={spin}
            disabled={spinning || coins <= 0}
            className="w-full py-2.5 rounded-xl gradient-bg text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_8px_25px_rgba(233,30,99,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          >
            {spinning ? 'SPINNING...' : coins <= 0 ? 'ADD COINS' : 'SPIN'}
          </button>
        </div>
      </div>

      </div>
      {/* Result */}
      {result && (
        <div className={`text-center p-3 rounded-xl border ${result.includes('JACKPOT') || result.includes('Win') ? 'bg-[#e91e63]/10 border-[#e91e63]/30' : 'bg-white/[0.03] border-white/[0.08]'}`}>
          <p className="text-[10px] text-white/40">{result.includes('Try') ? 'Result' : '🎉 You Won!'}</p>
          <p className={`font-poppins font-bold text-base ${result.includes('JACKPOT') || result.includes('Win') ? 'text-[#e91e63]' : 'text-white/60'}`}>{result}</p>
        </div>
      )}
    </div>
  );
}
