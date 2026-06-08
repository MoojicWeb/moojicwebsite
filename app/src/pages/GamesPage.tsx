import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroVideo from '@/components/HeroVideo';
import SEO from '@/components/SEO';
import {
  Sparkles, ArrowRight, Trophy, Gift, Target, QrCode,
  Smartphone, Settings, BarChart3,
} from 'lucide-react';
import SpinWheel from '@/components/SpinWheel';
import SlotMachine from '@/components/SlotMachine';
import ScratchCard from '@/components/ScratchCard';

gsap.registerPlugin(ScrollTrigger);

/* ========== HERO ========== */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#0a0a1a] mt-[72px]">
      <HeroVideo src="/assets/games-hero.mp4" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/50 to-[#0a0a1a]/30" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[60%] h-[60%] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.3), transparent 70%)', top: '20%', left: '-10%', animation: 'mesh-blob-1 18s ease-in-out infinite alternate' }} />
        <div className="absolute w-[50%] h-[50%] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.25), transparent 70%)', bottom: '10%', right: '-5%', animation: 'mesh-blob-2 22s ease-in-out infinite alternate' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-700" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.12), transparent 70%)', left: `calc(${mouse.x}% - 200px)`, top: `calc(${mouse.y}% - 200px)` }} />
      </div>
      <div className="relative z-10 text-center px-4 max-w-[800px] mx-auto py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c4dff]/10 border border-[#7c4dff]/20 mb-6">
          <Sparkles className="w-4 h-4 text-[#7c4dff]" />
          <span className="text-xs font-semibold text-[#7c4dff] uppercase tracking-wider">Interactive Games</span>
        </div>
        <h1 className="font-poppins font-extrabold text-white text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] mb-4">
          Scan. Play. <span className="gradient-text">Win.</span>
        </h1>
        <p className="text-white/45 text-sm sm:text-base max-w-[540px] mx-auto leading-relaxed mb-8">
          Games on their phone. No app needed. Customers scan, play, win coupons, and keep coming back for more.
        </p>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="font-poppins font-bold text-2xl gradient-text">3x</p>
            <p className="text-[9px] text-white/30 uppercase tracking-wider">More Visits</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="font-poppins font-bold text-2xl gradient-text">40%</p>
            <p className="text-[9px] text-white/30 uppercase tracking-wider">Coupon Redemption</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="font-poppins font-bold text-2xl gradient-text">0</p>
            <p className="text-[9px] text-white/30 uppercase tracking-wider">App Download</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}

/* ========== MORE GAMES ========== */
const moreGames = [
  { icon: '🏆', title: 'Trivia Quiz', desc: 'Brand-themed quizzes with rewards for correct answers.', color: '#7c4dff' },
  { icon: '🎲', title: 'Lucky Draw', desc: 'Timed draws where every participant wins something.', color: '#ff9800' },
  { icon: '🎁', title: 'Mystery Box', desc: 'Open a box to reveal surprise discounts and freebies.', color: '#00bcd4' },
  { icon: '🌟', title: 'Loyalty Streak', desc: 'Daily check-in rewards for repeat visits.', color: '#4caf50' },
  { icon: '🎮', title: 'Custom Games', desc: 'Bespoke branded games built for your business.', color: '#ff5722' },
];

/* ========== HOW IT WORKS ========== */
const steps = [
  { icon: QrCode, title: 'Scan QR Code', desc: 'Customer scans QR on their phone — table, counter, or receipt.', color1: '#e91e63', color2: '#ff9800' },
  { icon: Smartphone, title: 'Play on Phone', desc: 'Games open in browser. No app download needed.', color1: '#7c4dff', color2: '#e91e63' },
  { icon: Trophy, title: 'Win Coupon', desc: 'Instant rewards — discounts, freebies, loyalty points.', color1: '#00bcd4', color2: '#7c4dff' },
  { icon: Gift, title: 'Redeem In-Store', desc: 'Shows coupon on phone at counter. Staff validates.', color1: '#ff9800', color2: '#ffb74d' },
];

/* ========== CMS FEATURES ========== */
const cmsFeatures = [
  { icon: Settings, title: 'Full CMS Control', desc: 'Enable/disable games, set odds, create offers.' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Plays, wins, redemptions, engagement rates.' },
  { icon: Target, title: 'Custom Odds', desc: 'Control win probability for each prize.' },
  { icon: Gift, title: 'Unlimited Offers', desc: 'Create coupons, discounts, freebies, loyalty points.' },
];

/* ========== MAIN PAGE ========== */
export default function GamesPage() {
  const gamesRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gEl = gamesRef.current;
    const sEl = stepsRef.current;
    if (gEl) {
      const cards = gEl.querySelectorAll('.game-card');
      if (cards.length) gsap.from(cards, { y: 20, duration: 0.5, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: gEl, start: 'top 85%', once: true } });
    }
    if (sEl) {
      const cards = sEl.querySelectorAll('.step-card');
      if (cards.length) gsap.from(cards, { y: 20, duration: 0.4, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: sEl, start: 'top 85%', once: true } });
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => { if (t.trigger === gEl || t.trigger === sEl) t.kill(); });
    };
  }, []);

  return (
    <div className="bg-[#0a0a1a] min-h-screen">
      <SEO
        title="Interactive Games — Spin, Scratch & Slot for Retail | Moojic"
        description="Because shopping should be fun. Spin the Wheel, scratch a card, or try the Slot Machine. Every play ends with a reward that brings customers back."
        path="/games"
      />
      <Hero />

      {/* Try It Live */}
      <section ref={gamesRef} className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.04) 0%, rgba(124,77,255,0.03) 50%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Try It Live</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2rem)] mb-2">
              Experience The <span className="gradient-text">Games</span>
            </h2>
            <p className="text-white/35 text-xs max-w-[400px] mx-auto">
              Interactive demos. Customers see exactly this when they scan your QR code.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-[1100px] mx-auto mb-10 items-stretch">
            <div className="h-full flex"><SpinWheel /></div>
            <div className="h-full flex"><SlotMachine /></div>
            <div className="h-full flex"><ScratchCard /></div>
          </div>

          {/* More Games */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-white/10" />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <Sparkles className="w-4 h-4 text-[#4caf50]" />
                <span className="text-xs font-semibold text-[#4caf50] uppercase tracking-wider">+ 5 More Games</span>
              </div>
              <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-white/10" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {moreGames.map((game, i) => (
                <div
                  key={game.title}
                  className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-4 text-center transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 text-xl" style={{ background: `${game.color}15` }}>
                    {game.icon}
                  </div>
                  <h4 className="font-poppins font-semibold text-white text-xs mb-1">{game.title}</h4>
                  <p className="text-white/30 text-[9px] leading-relaxed">{game.desc}</p>
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ff9800]/10 border border-[#ff9800]/20">
                    <span className="w-1 h-1 rounded-full bg-[#ff9800] animate-pulse" />
                    <span className="text-[8px] text-[#ff9800] uppercase tracking-wider">Coming Soon</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={stepsRef} className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#7c4dff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">How It Works</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2rem)] mb-2">
              From <span className="gradient-text">Scan</span> to Redemption
            </h2>
            <p className="text-white/35 text-xs max-w-[400px] mx-auto">Seamless experience for both customers and staff.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => {
              const SIcon = s.icon;
              return (
                <div key={s.title} className="step-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-5 text-center transition-all duration-500 hover:border-white/[0.12]">
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, ${s.color1}, ${s.color2})` }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg" style={{ background: `linear-gradient(135deg, ${s.color1}, ${s.color2})` }}>
                    <SIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-poppins font-bold text-sm text-white mb-1">{s.title}</div>
                  <p className="text-white/35 text-xs leading-relaxed">{s.desc}</p>
                  <div className="mt-2 font-poppins font-bold text-2xl text-white/[0.03]">0{i + 1}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CMS Control */}
      <section className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2">
              <p className="text-[#ff9800] text-xs font-semibold uppercase tracking-[0.2em] mb-3">CMS Dashboard</p>
              <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2rem)] leading-tight mb-4">
                You Control <span className="gradient-text">Everything</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-5">
                Enable games, set win odds, create offers, and track performance — all from one dashboard.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {cmsFeatures.map((f) => {
                  const FIcon = f.icon;
                  return (
                    <div key={f.title} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                        <FIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-poppins font-semibold text-white text-xs mb-0.5">{f.title}</h4>
                        <p className="text-white/35 text-[10px] leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="lg:w-1/2">
              {/* Mock CMS */}
              <div className="bg-[#12121e] border border-white/[0.08] rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">Games Overview</p>
                    <p className="text-sm font-semibold text-white">Store #42 — Downtown Cafe</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded-full bg-[#4caf50]/15 text-[#4caf50] text-[9px] font-medium">Active</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-[9px] text-white/30">Total Plays Today</p>
                    <p className="font-poppins font-bold text-xl text-white">234</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-[9px] text-white/30">Coupons Redeemed</p>
                    <p className="font-poppins font-bold text-xl text-[#4caf50]">89</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-[9px] text-white/30">Engagement Rate</p>
                    <p className="font-poppins font-bold text-xl text-[#e91e63]">68%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-[9px] text-white/30">Revenue Impact</p>
                    <p className="font-poppins font-bold text-xl text-[#ff9800]">+12%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Spin the Wheel', enabled: true },
                    { name: 'Slot Machine', enabled: true },
                    { name: 'Scratch & Win', enabled: false },
                  ].map((game) => (
                    <div key={game.name} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-xs text-white/60">{game.name}</span>
                      <div className={`w-8 h-4 rounded-full transition-colors ${game.enabled ? 'bg-[#4caf50]' : 'bg-white/10'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${game.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.06), transparent)', filter: 'blur(60px)' }} />
        <div className="max-w-[1280px] mx-auto px-4 text-center relative z-10">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 sm:p-12">
            <h2 className="font-poppins font-bold text-white text-[clamp(1.3rem,3vw,2rem)] mb-3">
              Ready To <span className="gradient-text">Gamify</span> Your Store?
            </h2>
            <p className="text-white/35 text-sm max-w-[400px] mx-auto mb-6">
              Set up in minutes. No hardware. No app. Just a QR code and instant engagement.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white px-8 py-4 rounded-xl gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
