import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Music, Monitor, BarChart3, Mic, Cpu, Users, Headphones,
  Shuffle, Lock, RefreshCw, Bell, FileText, Check, ArrowRight,
  Play, Radio, Sparkles, Wifi, QrCode, Smartphone,
} from 'lucide-react';

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
    <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#0a0a1a] mt-[72px]">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/assets/instore-radio-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/50 to-[#0a0a1a]/30" />
      {/* Mesh blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[60%] h-[60%] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.3), transparent 70%)', top: '20%', left: '-10%', animation: 'mesh-blob-1 18s ease-in-out infinite alternate' }} />
        <div className="absolute w-[50%] h-[50%] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.25), transparent 70%)', bottom: '10%', right: '-5%', animation: 'mesh-blob-2 22s ease-in-out infinite alternate' }} />
        {/* Mouse glow */}
        <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-700" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.12), transparent 70%)', left: `calc(${mouse.x}% - 200px)`, top: `calc(${mouse.y}% - 200px)` }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-[800px] mx-auto py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e91e63]/10 border border-[#e91e63]/20 mb-6">
          <Radio className="w-4 h-4 text-[#e91e63]" />
          <span className="text-xs font-semibold text-[#e91e63] uppercase tracking-wider">In-store Radio</span>
        </div>
        <h1 className="font-poppins font-extrabold text-white text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] mb-4">
          The Right <span className="gradient-text">Sound</span> For Every Store
        </h1>
        <p className="text-white/45 text-sm sm:text-base max-w-[540px] mx-auto leading-relaxed mb-8">
          AI-powered in-store radio with sonic identity design, mood-sensing curation, and 1M+ royalty-free tracks.
        </p>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="font-poppins font-bold text-2xl gradient-text">1M+</p>
            <p className="text-[9px] text-white/30 uppercase tracking-wider">Tracks</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="font-poppins font-bold text-2xl gradient-text">20K+</p>
            <p className="text-[9px] text-white/30 uppercase tracking-wider">Locations</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="font-poppins font-bold text-2xl gradient-text">12</p>
            <p className="text-[9px] text-white/30 uppercase tracking-wider">Countries</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}

/* ========== FEATURE CARD ========== */
interface Feature { icon: React.ElementType; title: string; crux: string; color1: string; color2: string; eqBars: number[] }

const features: Feature[] = [
  { icon: Sparkles, title: 'Sonic Identity', crux: 'Your brand\'s unique audio signature.', color1: '#e91e63', color2: '#ff9800', eqBars: [20, 50, 35, 70, 45, 80, 30, 60, 40, 75, 25, 55] },
  { icon: Monitor, title: 'Central Dashboard', crux: 'Real-time control across all stores.', color1: '#7c4dff', color2: '#e91e63', eqBars: [30, 40, 60, 35, 75, 25, 55, 45, 65, 30, 50, 40] },
  { icon: BarChart3, title: 'Mood Sensing', crux: 'AI reads the room, shifts the vibe.', color1: '#00bcd4', color2: '#7c4dff', eqBars: [45, 25, 70, 40, 55, 35, 80, 30, 60, 50, 65, 20] },
  { icon: Mic, title: 'Voiceovers', crux: 'Announce promotions between tracks.', color1: '#ff9800', color2: '#ffb74d', eqBars: [35, 55, 20, 65, 30, 50, 40, 75, 25, 60, 45, 55] },
  { icon: Music, title: 'Royalty-Free Library', crux: 'Save 70% on music licensing.', color1: '#e91e63', color2: '#7c4dff', eqBars: [25, 45, 55, 30, 70, 40, 50, 35, 65, 45, 55, 30] },
  { icon: Cpu, title: 'Robust Software', crux: 'Lightweight. Offline. Auto-updates.', color1: '#2d1b69', color2: '#e91e63', eqBars: [50, 30, 60, 40, 55, 70, 25, 50, 35, 65, 40, 55] },
];

function FeatureCard({ f, index }: { f: Feature; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${(e.clientX - rect.left) / rect.width}`);
    el.style.setProperty('--my', `${(e.clientY - rect.top) / rect.height}`);
  };

  return (
    <div
      ref={cardRef}
      className="feature-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-500"
      style={{ borderColor: hovered ? `${f.color1}30` : 'rgba(255,255,255,0.06)', transitionDelay: `${index * 40}ms` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(400px circle at calc(var(--mx,0.5)*100%) calc(var(--my,0.5)*100%), ${f.color1}10, transparent 40%)` }}
      />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${f.color1}, ${f.color2})`, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.5s' }} />

      <div className="relative p-5">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: `linear-gradient(135deg, ${f.color1}, ${f.color2})` }}>
            <f.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-sm text-white">{f.title}</h3>
            <p className="text-[10px] text-white/30">{f.crux}</p>
          </div>
        </div>

        {/* EQ Bars */}
        <div className="flex items-end gap-[2px] h-6 px-1 mb-3">
          {f.eqBars.map((h, i) => (
            <div key={i} className="flex-1 rounded-full transition-all duration-500" style={{ height: `${hovered ? h * 1.3 : h * 0.35}%`, background: hovered ? `linear-gradient(180deg, ${f.color1}, ${f.color2})` : `${f.color1}20`, transitionDelay: `${i * 20}ms`, opacity: hovered ? 1 : 0.2, minHeight: '2px' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== DIFFERENTIATOR CARD ========== */
interface Diff { icon: React.ElementType; title: string; crux: string; color1: string; color2: string }

const diffs: Diff[] = [
  { icon: Users, title: 'Brand Profiling', crux: 'In-depth brand study at your stores.', color1: '#e91e63', color2: '#ff9800' },
  { icon: Wifi, title: 'Internet Free', crux: 'Works offline. No streaming needed.', color1: '#7c4dff', color2: '#e91e63' },
  { icon: Headphones, title: 'Proof of Play', crux: 'Listen to any store in real-time.', color1: '#00bcd4', color2: '#7c4dff' },
  { icon: Shuffle, title: 'Daily Shuffle', crux: 'New playlist order every single day.', color1: '#ff9800', color2: '#ffb74d' },
  { icon: Lock, title: 'Central Lock', crux: 'No unauthorized music sources.', color1: '#e91e63', color2: '#7c4dff' },
  { icon: RefreshCw, title: 'Auto-Pilot', crux: 'Zero staff intervention needed.', color1: '#2d1b69', color2: '#e91e63' },
  { icon: Bell, title: 'Offline Alerts', crux: 'Instant alerts when stores go down.', color1: '#00bcd4', color2: '#4caf50' },
  { icon: FileText, title: 'Full Reports', crux: 'Data for every decision.', color1: '#ff9800', color2: '#e91e63' },
];

function DiffCard({ d, index }: { d: Diff; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="diff-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-5 transition-all duration-500"
      style={{ borderColor: hovered ? `${d.color1}25` : 'rgba(255,255,255,0.06)', transitionDelay: `${index * 30}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${d.color1}, ${d.color2})`, opacity: hovered ? 1 : 0, transition: 'opacity 0.5s' }} />
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 shadow-md" style={{ background: `linear-gradient(135deg, ${d.color1}, ${d.color2})` }}>
        <d.icon className="w-4 h-4 text-white" />
      </div>
      <h4 className="font-poppins font-semibold text-sm text-white mb-1">{d.title}</h4>
      <p className="text-white/35 text-[11px] leading-relaxed">{d.crux}</p>
      <div className="mt-3 flex items-center gap-1 text-[10px] font-medium" style={{ color: d.color1, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }}>
        <span>Learn more</span>
        <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  );
}

/* ========== JUKEBOX SECTION ========== */
function JukeboxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    gsap.from('.juke-left', { x: -30, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    gsap.from('.juke-right', { x: 30, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    return () => { ScrollTrigger.getAll().forEach((t) => { if (t.trigger === el) t.kill(); }); };
  }, []);

  const jukeFeatures = [
    'Pre-approved song library',
    'QR code — no app needed',
    'Real-time request queue',
    'Customer engagement data',
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-[#0a0a1a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.06) 0%, rgba(124,77,255,0.03) 50%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Content */}
          <div className="lg:w-1/2 juke-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e91e63]/10 border border-[#e91e63]/20 mb-5">
              <QrCode className="w-3.5 h-3.5 text-[#e91e63]" />
              <span className="text-[10px] font-semibold text-[#e91e63] uppercase tracking-wider">Digital Jukebox</span>
            </div>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2.2rem)] leading-tight mb-3">
              Let Customers <span className="gradient-text">Choose</span> The Music
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-[440px]">
              A modern jukebox experience. Customers scan a QR code and request songs from a pre-approved library — no app download required.
            </p>
            <div className="space-y-3 mb-6">
              {jukeFeatures.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#e91e63]/15 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#e91e63]" />
                  </div>
                  <span className="text-white/50 text-xs">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 font-poppins text-xs font-semibold uppercase tracking-[0.04em] text-white px-6 py-3 rounded-xl gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right: Visual */}
          <div className="lg:w-1/2 juke-right flex justify-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="relative w-[280px]">
              {/* Phone mockup */}
              <div className="bg-[#12121e] border border-white/[0.08] rounded-3xl p-4 shadow-2xl">
                {/* Phone header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                      <Music className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-white">Moojic Jukebox</p>
                      <p className="text-[8px] text-white/30">Scan to play</p>
                    </div>
                  </div>
                  <QrCode className="w-5 h-5 text-white/30" />
                </div>
                {/* Now playing */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-white truncate">Summer Vibes</p>
                    <p className="text-[8px] text-white/30">Requested by Table 4</p>
                  </div>
                </div>
                {/* Request queue */}
                <p className="text-[8px] text-white/30 uppercase tracking-wider mb-2">Up Next</p>
                {['Midnight Jazz', 'Pop Hits 2025', 'Acoustic Chill'].map((track, i) => (
                  <div key={track} className="flex items-center gap-2 p-2 rounded-lg mb-1" style={{ background: i === 0 ? 'rgba(233,30,99,0.05)' : 'rgba(255,255,255,0.02)', border: `1px solid ${i === 0 ? 'rgba(233,30,99,0.1)' : 'rgba(255,255,255,0.04)'}` }}>
                    <span className="text-[9px] text-white/20 w-4">{i + 1}</span>
                    <span className="text-[10px] text-white/60 flex-1">{track}</span>
                    <Smartphone className="w-3 h-3 text-white/20" />
                  </div>
                ))}
                {/* EQ at bottom */}
                <div className="flex items-end gap-[2px] h-4 mt-3 px-1">
                  {[30, 50, 25, 60, 40, 70, 35, 55, 45, 65].map((h, i) => (
                    <div key={i} className="flex-1 rounded-full transition-all duration-300" style={{ height: `${hovered ? h : h * 0.3}%`, background: hovered ? 'linear-gradient(180deg, #e91e63, #ff9800)' : 'rgba(233,30,99,0.15)', transitionDelay: `${i * 20}ms`, minHeight: '1px' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========== MAIN PAGE ========== */
export default function InStoreRadioPage() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const diffsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fEl = featuresRef.current;
    if (fEl) {
      const cards = fEl.querySelectorAll('.feature-card');
      if (cards.length) gsap.from(cards, { y: 20, duration: 0.5, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: fEl, start: 'top 85%', once: true } });
    }
    const dEl = diffsRef.current;
    if (dEl) {
      const cards = dEl.querySelectorAll('.diff-card');
      if (cards.length) gsap.from(cards, { y: 20, duration: 0.4, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: dEl, start: 'top 85%', once: true } });
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => { if (t.trigger === featuresRef.current || t.trigger === diffsRef.current) t.kill(); });
    };
  }, []);

  return (
    <div className="bg-[#0a0a1a] min-h-screen">
      <Hero />

      {/* Features Grid */}
      <section ref={featuresRef} className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Platform Capabilities</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2rem)] mb-2">
              Features That <span className="gradient-text">Set Us Apart</span>
            </h2>
            <p className="text-white/35 text-xs max-w-[400px] mx-auto">Everything you need to create, manage, and optimize your in-store audio.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FeatureCard key={f.title} f={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section ref={diffsRef} className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Why We&apos;re Different</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2rem)] mb-2">
              8 Reasons To <span className="gradient-text">Choose Moojic</span>
            </h2>
            <p className="text-white/35 text-xs max-w-[400px] mx-auto">Leading brands trust us for a reason.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {diffs.map((d, i) => (
              <DiffCard key={d.title} d={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Jukebox */}
      <JukeboxSection />

      {/* CTA */}
      <section className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.05), transparent)', filter: 'blur(60px)' }} />
        <div className="max-w-[1280px] mx-auto px-4 text-center relative z-10">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 sm:p-12">
            <h2 className="font-poppins font-bold text-white text-[clamp(1.3rem,3vw,2rem)] mb-3">
              Ready To Transform <span className="gradient-text">Your Sound?</span>
            </h2>
            <p className="text-white/35 text-sm max-w-[400px] mx-auto mb-6">
              Join 20,000+ locations already using Moojic&apos;s in-store radio.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white px-8 py-4 rounded-xl gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all">
              Start Your Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
