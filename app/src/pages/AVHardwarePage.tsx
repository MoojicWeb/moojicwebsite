import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroVideo from '@/components/HeroVideo';
import {
  Speaker, Zap, Mic, Monitor, Grid3X3, MousePointer, FileText,
  Phone, Mail, ArrowRight, Check, Headphones, Volume2,
  Shield, Truck, Settings,
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
    <section ref={heroRef} className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#0a0a1a] mt-[72px]">
      {/* Video Background */}
      <HeroVideo
        src="/assets/av-hero.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/50 to-[#0a0a1a]/30" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        <div className="absolute w-[60%] h-[60%] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.3), transparent 70%)', top: '20%', left: '-10%', animation: 'mesh-blob-1 18s ease-in-out infinite alternate' }} />
        <div className="absolute w-[50%] h-[50%] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.25), transparent 70%)', bottom: '10%', right: '-5%', animation: 'mesh-blob-2 22s ease-in-out infinite alternate' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-700" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.12), transparent 70%)', left: `calc(${mouse.x}% - 200px)`, top: `calc(${mouse.y}% - 200px)` }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-[800px] mx-auto py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c4dff]/10 border border-[#7c4dff]/20 mb-6">
          <Headphones className="w-4 h-4 text-[#7c4dff]" />
          <span className="text-xs font-semibold text-[#7c4dff] uppercase tracking-wider">AV Hardware Integration</span>
        </div>
        <h1 className="font-poppins font-extrabold text-white text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] mb-4">
          Sound & Vision <span className="gradient-text">Engineered</span> For Your Space
        </h1>
        <p className="text-white/45 text-sm sm:text-base max-w-[540px] mx-auto leading-relaxed mb-8">
          Expert audio-visual hardware recommendations, installation, and maintenance — tailored to your brand and budget.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white px-8 py-4 rounded-xl gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all">
          Get a Free Consultation <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a1a] to-transparent" style={{ zIndex: 4 }} />
    </section>
  );
}

/* ========== OVERVIEW ========== */
function Overview() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll('.overview-item');
    if (items.length) gsap.from(items, { y: 20, duration: 0.5, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    return () => { ScrollTrigger.getAll().forEach((t) => { if (t.trigger === el) t.kill(); }); };
  }, []);

  const points = [
    'Sonic & visual identity designed for your brand',
    'Industry-leading commercial-grade hardware',
    'Expert installation & acoustic calibration',
    'Ongoing maintenance & 24/7 support',
  ];

  return (
    <section ref={ref} className="py-16 bg-[#0a0a1a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.05), transparent)', filter: 'blur(60px)' }} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="lg:w-1/2">
            <p className="text-[#7c4dff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">What We Do</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2.2rem)] leading-tight mb-4">
              Superior Audio & Visual <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Experiential retail starts the moment customers step inside. We recommend the right AV hardware tailored to your needs and budget — from initial assessment to final installation.
            </p>
            <div className="space-y-3 mb-6">
              {points.map((p) => (
                <div key={p} className="overview-item flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#7c4dff]/15 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#7c4dff]" />
                  </div>
                  <span className="text-white/50 text-sm">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <img src="/assets/av-hardware.jpg" alt="AV Hardware" className="w-full rounded-2xl border border-white/[0.06] shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========== AUDIO CARD ========== */
interface AudioItem { icon: React.ElementType; title: string; desc: string; color1: string; color2: string; eqBars: number[] }

const audioItems: AudioItem[] = [
  { icon: Speaker, title: 'Ceiling Speakers', desc: 'Discrete, high-quality overhead speakers for even sound distribution.', color1: '#7c4dff', color2: '#e91e63', eqBars: [20, 50, 35, 70, 45, 80, 30, 60, 40, 75] },
  { icon: Volume2, title: 'Wall-Mounted Speakers', desc: 'Directional systems for targeted audio zones — entrances, queues, promos.', color1: '#e91e63', color2: '#ff9800', eqBars: [35, 20, 60, 40, 75, 30, 55, 45, 65, 28] },
  { icon: Zap, title: 'Professional Amplifiers', desc: 'Commercial-grade amps delivering consistent audio across multiple zones.', color1: '#00bcd4', color2: '#7c4dff', eqBars: [30, 45, 25, 65, 35, 55, 40, 70, 20, 60] },
  { icon: Mic, title: 'PA Systems', desc: 'Integrated public address for announcements, emergencies & voiceovers.', color1: '#ff9800', color2: '#ffb74d', eqBars: [40, 30, 55, 45, 70, 35, 50, 60, 25, 65] },
];

function AudioCard({ item, index }: { item: AudioItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

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
      className="av-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-500"
      style={{ borderColor: hovered ? `${item.color1}30` : 'rgba(255,255,255,0.06)', transitionDelay: `${index * 40}ms` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(400px circle at calc(var(--mx,0.5)*100%) calc(var(--my,0.5)*100%), ${item.color1}10, transparent 40%)` }}
      />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${item.color1}, ${item.color2})`, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.5s' }} />

      <div className="relative p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: `linear-gradient(135deg, ${item.color1}, ${item.color2})` }}>
            <item.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-sm text-white">{item.title}</h3>
            <p className="text-white/40 text-xs leading-relaxed mt-1">{item.desc}</p>
          </div>
        </div>
        {/* EQ */}
        <div className="flex items-end gap-[2px] h-6 px-1">
          {item.eqBars.map((h, i) => (
            <div key={i} className="flex-1 rounded-full transition-all duration-500" style={{ height: `${hovered ? h * 1.3 : h * 0.35}%`, background: hovered ? `linear-gradient(180deg, ${item.color1}, ${item.color2})` : `${item.color1}20`, transitionDelay: `${i * 20}ms`, opacity: hovered ? 1 : 0.2, minHeight: '2px' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== DISPLAY CARD ========== */
interface DisplayItem { icon: React.ElementType; title: string; desc: string; color1: string; color2: string; eqBars: number[] }

const displayItems: DisplayItem[] = [
  { icon: Monitor, title: 'Smart Displays', desc: 'High-brightness commercial displays built for 16/7 or 24/7 operation.', color1: '#e91e63', color2: '#ff9800', eqBars: [25, 55, 20, 70, 30, 50, 65, 35, 60, 40] },
  { icon: Grid3X3, title: 'Video Walls', desc: 'Seamless multi-panel walls for stunning visual impact in flagship stores.', color1: '#7c4dff', color2: '#00bcd4', eqBars: [45, 25, 60, 35, 75, 40, 55, 30, 70, 45] },
  { icon: MousePointer, title: 'Interactive Kiosks', desc: 'Touch-enabled displays for wayfinding, browsing, and self-checkout.', color1: '#00bcd4', color2: '#7c4dff', eqBars: [35, 45, 30, 55, 40, 70, 25, 60, 50, 35] },
  { icon: FileText, title: 'Digital Menu Boards', desc: 'Purpose-built for restaurants & QSRs with dayparting and easy updates.', color1: '#ff9800', color2: '#e91e63', eqBars: [50, 30, 65, 40, 55, 35, 70, 45, 50, 60] },
];

function DisplayCard({ item, index }: { item: DisplayItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

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
      className="av-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-500"
      style={{ borderColor: hovered ? `${item.color1}30` : 'rgba(255,255,255,0.06)', transitionDelay: `${index * 40}ms` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(400px circle at calc(var(--mx,0.5)*100%) calc(var(--my,0.5)*100%), ${item.color1}10, transparent 40%)` }}
      />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${item.color1}, ${item.color2})`, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.5s' }} />

      <div className="relative p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: `linear-gradient(135deg, ${item.color1}, ${item.color2})` }}>
            <item.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-sm text-white">{item.title}</h3>
            <p className="text-white/40 text-xs leading-relaxed mt-1">{item.desc}</p>
          </div>
        </div>
        <div className="flex items-end gap-[2px] h-6 px-1">
          {item.eqBars.map((h, i) => (
            <div key={i} className="flex-1 rounded-full transition-all duration-500" style={{ height: `${hovered ? h * 1.3 : h * 0.35}%`, background: hovered ? `linear-gradient(180deg, ${item.color1}, ${item.color2})` : `${item.color1}20`, transitionDelay: `${i * 20}ms`, opacity: hovered ? 1 : 0.2, minHeight: '2px' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== PROCESS CARD ========== */
const processSteps = [
  { icon: Phone, title: 'Consult', desc: 'We assess your space, brand & budget.', color1: '#7c4dff', color2: '#e91e63' },
  { icon: Settings, title: 'Design', desc: 'Custom AV blueprint for your store.', color1: '#e91e63', color2: '#ff9800' },
  { icon: Truck, title: 'Install', desc: 'Professional setup by certified team.', color1: '#00bcd4', color2: '#7c4dff' },
  { icon: Shield, title: 'Support', desc: 'Ongoing maintenance & 24/7 help.', color1: '#ff9800', color2: '#ffb74d' },
];

function ProcessCard({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const SIcon = step.icon;

  return (
    <div
      className="process-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-5 text-center transition-all duration-500"
      style={{ borderColor: hovered ? `${step.color1}30` : 'rgba(255,255,255,0.06)', transitionDelay: `${index * 40}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${step.color1}, ${step.color2})`, opacity: hovered ? 1 : 0, transition: 'opacity 0.5s' }} />
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg" style={{ background: `linear-gradient(135deg, ${step.color1}, ${step.color2})` }}>
        <SIcon className="w-6 h-6 text-white" />
      </div>
      <h4 className="font-poppins font-semibold text-sm text-white mb-1">{step.title}</h4>
      <p className="text-white/35 text-xs leading-relaxed">{step.desc}</p>
    </div>
  );
}

/* ========== MAIN PAGE ========== */
export default function AVHardwarePage() {
  const audioRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [audioRef, displayRef, processRef].forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      const cards = el.querySelectorAll('.av-card, .process-card');
      if (cards.length) gsap.from(cards, { y: 20, duration: 0.5, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <div className="bg-[#0a0a1a] min-h-screen">
      <Hero />
      <Overview />

      {/* Audio Solutions */}
      <section ref={audioRef} className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.05), transparent)', filter: 'blur(60px)' }} />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <p className="text-[#7c4dff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Sound Excellence</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2rem)] mb-2">
              Audio <span className="gradient-text">Hardware</span> Solutions
            </h2>
            <p className="text-white/35 text-xs max-w-[400px] mx-auto">
              Right speakers, right positions, right sound pressure levels — measured and calibrated.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audioItems.map((item, i) => (
              <AudioCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Display Solutions */}
      <section ref={displayRef} className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.04) 0%, rgba(124,77,255,0.03) 50%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Visual Impact</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2rem)] mb-2">
              Commercial Grade <span className="gradient-text">Displays</span>
            </h2>
            <p className="text-white/35 text-xs max-w-[400px] mx-auto">
              High-quality displays that create brand awareness and drive sales.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayItems.map((item, i) => (
              <DisplayCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#ff9800] text-xs font-semibold uppercase tracking-[0.2em] mb-3">How It Works</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2rem)] mb-2">
              From <span className="gradient-text">Assessment</span> To Installation
            </h2>
            <p className="text-white/35 text-xs max-w-[400px] mx-auto">We guide you every step of the way.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step, i) => (
              <ProcessCard key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Contact */}
      <section className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.06), transparent)', filter: 'blur(60px)' }} />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
            {/* Left: Contact Info */}
            <div className="lg:w-1/2">
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 h-full">
                <h2 className="font-poppins font-bold text-white text-[clamp(1.3rem,3vw,1.8rem)] mb-2">
                  Get a <span className="gradient-text">Quote</span>
                </h2>
                <p className="text-white/35 text-xs mb-6">Tell us about your space and we&apos;ll recommend the perfect AV setup.</p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#7c4dff]/15 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[#7c4dff]" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">+91 8452999066</p>
                      <p className="text-white/60 text-xs">+91 9167633544</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#e91e63]/15 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[#e91e63]" />
                    </div>
                    <p className="text-white/60 text-xs">info@moojic.com</p>
                  </div>
                </div>
                <Link to="/contact" className="inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white px-6 py-3 rounded-xl gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Stats */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4 h-full">
                {[
                  { stat: '20K+', label: 'Locations', color: '#7c4dff' },
                  { stat: '99.9%', label: 'Uptime', color: '#e91e63' },
                  { stat: '< 5min', label: 'Response', color: '#00bcd4' },
                  { stat: '12', label: 'Countries', color: '#ff9800' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-5 text-center flex flex-col justify-center">
                    <p className="font-poppins font-extrabold text-2xl mb-1" style={{ color: s.color }}>{s.stat}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
