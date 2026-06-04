import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Monitor, Clock, FileText, BarChart3, Layout, Link2,
  Eye, Smile, TrendingUp, ArrowRight, Check, Play,
  Sparkles, Image, Video, Globe, Rss, Sun, Cloud,
} from 'lucide-react';
import VideoWallVisualizer from '@/components/VideoWallVisualizer';

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
      {/* Video Wall Visualizer — floating digital screens */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <VideoWallVisualizer />
      </div>

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/60 to-[#0a0a1a]/40" style={{ zIndex: 2 }} />

      {/* Mouse-following spotlight glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-700" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.12), transparent 70%)', left: `calc(${mouse.x}% - 200px)`, top: `calc(${mouse.y}% - 200px)` }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-[800px] mx-auto py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c4dff]/10 border border-[#7c4dff]/20 mb-6">
          <Monitor className="w-4 h-4 text-[#7c4dff]" />
          <span className="text-xs font-semibold text-[#7c4dff] uppercase tracking-wider">Digital Signage</span>
        </div>
        <h1 className="font-poppins font-extrabold text-white text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] mb-4">
          Turn Every Screen Into Your <span className="gradient-text">Best Salesperson.</span>
        </h1>
        <p className="text-white/45 text-sm sm:text-base max-w-[540px] mx-auto leading-relaxed mb-8">
          No more outdated posters. No more manual updates. Just the right content, on the right screen, at the right moment.
        </p>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="font-poppins font-bold text-2xl gradient-text">400%</p>
            <p className="text-[9px] text-white/30 uppercase tracking-wider">More Attention</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="font-poppins font-bold text-2xl gradient-text">46%</p>
            <p className="text-[9px] text-white/30 uppercase tracking-wider">Higher Satisfaction</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="font-poppins font-bold text-2xl gradient-text">33%</p>
            <p className="text-[9px] text-white/30 uppercase tracking-wider">Sales Lift</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}

/* ========== FEATURE CARD ========== */
interface FeatureData {
  icon: React.ElementType; title: string; crux: string; desc: string;
  color1: string; color2: string; eqBars: number[];
  tags: { label: string; icon: React.ElementType }[];
}

const features: FeatureData[] = [
  {
    icon: Monitor, title: 'Central Control', crux: 'One platform. Every screen.',
    desc: 'Manage thousands of displays from a single dashboard. Design, publish, and update content in real-time.',
    color1: '#7c4dff', color2: '#e91e63', eqBars: [20, 50, 35, 70, 45, 80, 30, 60, 40, 75, 25, 55],
    tags: [
      { label: 'Real-Time', icon: Globe },
      { label: 'Multi-Screen', icon: Monitor },
      { label: 'Cloud CMS', icon: Cloud },
    ],
  },
  {
    icon: Clock, title: 'Smart Scheduling', crux: 'Set it. Forget it.',
    desc: 'Drag-and-drop scheduling for store-specific campaigns. Content starts and stops automatically.',
    color1: '#e91e63', color2: '#ff9800', eqBars: [35, 20, 60, 40, 75, 30, 55, 45, 65, 28, 50, 38],
    tags: [
      { label: 'Auto-Start', icon: Play },
      { label: 'Timer', icon: Clock },
      { label: 'Campaigns', icon: Sparkles },
    ],
  },
  {
    icon: FileText, title: 'Real-Time CMS', crux: 'Upload once. Deploy everywhere.',
    desc: 'Unlimited videos, images, and media files. Auto-optimized for every screen size.',
    color1: '#00bcd4', color2: '#7c4dff', eqBars: [30, 45, 25, 65, 35, 55, 40, 70, 20, 60, 45, 50],
    tags: [
      { label: 'Images', icon: Image },
      { label: 'Videos', icon: Video },
      { label: 'Auto-Resize', icon: Monitor },
    ],
  },
  {
    icon: BarChart3, title: 'Easy Monitoring', crux: 'Know every screen\'s status.',
    desc: 'Track display health, online/offline status, sync progress, and last-seen timestamps.',
    color1: '#ff9800', color2: '#ffb74d', eqBars: [40, 30, 55, 45, 70, 35, 50, 60, 25, 65, 40, 55],
    tags: [
      { label: 'Live Status', icon: Globe },
      { label: 'Sync Tracker', icon: BarChart3 },
      { label: 'Alerts', icon: Sparkles },
    ],
  },
  {
    icon: Layout, title: 'Interactive Layouts', crux: 'Split. Layer. Engage.',
    desc: 'Multiple layout templates — split screens, picture-in-picture, overlays, and custom zones.',
    color1: '#7c4dff', color2: '#00bcd4', eqBars: [25, 55, 20, 70, 30, 50, 65, 35, 60, 40, 55, 30],
    tags: [
      { label: 'Split Screen', icon: Layout },
      { label: 'PiP', icon: Monitor },
      { label: 'Zones', icon: Grid3x3 },
    ],
  },
  {
    icon: Link2, title: 'Integrations', crux: 'Connect everything.',
    desc: 'Twitter, Instagram, YouTube, RSS, Live News, Sports, Weather, Canva, and more.',
    color1: '#e91e63', color2: '#7c4dff', eqBars: [45, 25, 60, 35, 75, 40, 55, 30, 70, 45, 50, 35],
    tags: [
      { label: 'Social', icon: Globe },
      { label: 'Live News', icon: Rss },
      { label: 'Weather', icon: Sun },
    ],
  },
];

import { Grid3x3 } from 'lucide-react';

function FeatureCard({ f, index }: { f: FeatureData; index: number }) {
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
      className="ds-feature group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-500"
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
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${f.color1}, ${f.color2})` }}>
            <f.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-sm text-white">{f.title}</h3>
            <p className="text-[10px] text-white/30">{f.crux}</p>
          </div>
        </div>

        <p className="text-white/40 text-xs leading-relaxed mb-4">{f.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {f.tags.map((t, i) => {
            const TIcon = t.icon;
            return (
              <div key={i} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all duration-300" style={{ background: hovered ? `${f.color1}10` : 'rgba(255,255,255,0.02)', borderColor: hovered ? `${f.color1}20` : 'rgba(255,255,255,0.05)', transitionDelay: `${i * 50}ms` }}>
                <TIcon className="w-3 h-3" style={{ color: hovered ? f.color1 : `${f.color1}80`, transition: 'color 0.3s' }} />
                <span className="text-[10px] text-white/50 group-hover:text-white/70 transition-colors">{t.label}</span>
              </div>
            );
          })}
        </div>

        {/* Animated Screen Preview — simulates video content playing */}
        <div className="relative h-10 px-1 overflow-hidden ds-screen-preview" data-color1={f.color1} data-color2={f.color2} ref={(el) => { if (el) el.dataset.screenPreview = String(index); }}>
          <div className="flex gap-[3px] h-full items-stretch">
            {/* Screen 1 - portrait with scrolling content */}
            <div className="ds-mini-screen flex-1 rounded-md border border-white/[0.06] bg-white/[0.02] overflow-hidden" style={{ ['--c1' as any]: f.color1, ['--c2' as any]: f.color2 }}>
              <div className="ds-slide-strip h-full flex flex-col gap-[1px] p-[1px]">
                <div className="ds-content-a flex-1 rounded-[2px]" />
                <div className="ds-content-b flex-1 rounded-[2px]" />
                <div className="ds-content-c flex-1 rounded-[2px]" />
              </div>
            </div>
            {/* Screen 2 - landscape with split-screen zones */}
            <div className="ds-mini-screen flex-[1.5] rounded-md border border-white/[0.06] bg-white/[0.02] overflow-hidden" style={{ ['--c1' as any]: f.color1, ['--c2' as any]: f.color2 }}>
              <div className="h-full flex gap-[1px] p-[1px]">
                <div className="ds-zone-left flex-1 rounded-[2px] flex flex-col gap-[1px]">
                  <div className="ds-zone-item flex-1 rounded-[2px]" />
                  <div className="ds-zone-item flex-1 rounded-[2px]" />
                </div>
                <div className="ds-zone-right flex-1 rounded-[2px]" />
              </div>
            </div>
            {/* Screen 3 - small ticker display */}
            <div className="ds-mini-screen w-8 rounded-md border border-white/[0.06] bg-white/[0.02] overflow-hidden" style={{ ['--c1' as any]: f.color1, ['--c2' as any]: f.color2 }}>
              <div className="ds-ticker h-full flex flex-col justify-center p-[1px] gap-[1px]">
                <div className="ds-tick rounded-[2px] h-[3px] w-full" />
                <div className="ds-tick rounded-[2px] h-[3px] w-2/3" />
                <div className="ds-tick rounded-[2px] h-[3px] w-4/5" />
                <div className="ds-tick rounded-[2px] h-[3px] w-1/2" />
              </div>
            </div>
          </div>
          {/* Play pulse */}
          <div className="ds-play-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: f.color1 }} />
        </div>
      </div>
    </div>
  );
}

/* ========== BENEFIT CARD ========== */
const benefits = [
  { stat: '400', suffix: '%', title: 'More Attention', desc: 'Digital displays capture 400% more attention than static channels.', icon: Eye, color1: '#e91e63', color2: '#ff9800' },
  { stat: '46', suffix: '%', title: 'Higher Satisfaction', desc: 'Customers report 46% higher satisfaction with digital displays.', icon: Smile, color1: '#7c4dff', color2: '#e91e63' },
  { stat: '33', suffix: '%', title: 'Sales Increase', desc: 'Brands see a 33% average sales lift after implementing digital displays.', icon: TrendingUp, color1: '#00bcd4', color2: '#7c4dff' },
];

function BenefitCard({ b, index }: { b: typeof benefits[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const BIcon = b.icon;

  return (
    <div
      className="benefit-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 text-center transition-all duration-500"
      style={{ borderColor: hovered ? `${b.color1}30` : 'rgba(255,255,255,0.06)', transitionDelay: `${index * 40}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${b.color1}, ${b.color2})`, opacity: hovered ? 1 : 0, transition: 'opacity 0.5s' }} />
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: `linear-gradient(135deg, ${b.color1}, ${b.color2})` }}>
        <BIcon className="w-6 h-6 text-white" />
      </div>
      <span className="font-poppins font-extrabold text-[clamp(2rem,4vw,3rem)] gradient-text leading-none">{b.stat}{b.suffix}</span>
      <h4 className="font-poppins font-semibold text-base text-white mt-3 mb-2">{b.title}</h4>
      <p className="text-white/40 text-xs leading-relaxed">{b.desc}</p>
    </div>
  );
}

/* ========== MAIN PAGE ========== */
export default function DigitalSignagePage() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fEl = featuresRef.current;
    const bEl = benefitsRef.current;
    const oEl = overviewRef.current;

    if (oEl) {
      const items = oEl.querySelectorAll('.overview-item');
      if (items.length) gsap.from(items, { y: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: oEl, start: 'top 85%', once: true } });
    }
    if (fEl) {
      const cards = fEl.querySelectorAll('.ds-feature');
      if (cards.length) {
        gsap.from(cards, {
          y: 20, duration: 0.5, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: fEl, start: 'top 85%', once: true },
        });
        // Scroll-triggered glow burst on mini screens
        const previews = fEl.querySelectorAll('.ds-screen-preview');
        previews.forEach((p, i) => {
          ScrollTrigger.create({
            trigger: p,
            start: 'top 90%',
            once: true,
            onEnter: () => {
              setTimeout(() => p.classList.add('is-visible'), i * 80);
            },
          });
        });
      }
    }
    if (bEl) {
      const cards = bEl.querySelectorAll('.benefit-card');
      if (cards.length) gsap.from(cards, { y: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: bEl, start: 'top 85%', once: true } });
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => { if (t.trigger === fEl || t.trigger === bEl || t.trigger === oEl) t.kill(); });
    };
  }, []);

  return (
    <div className="bg-[#0a0a1a] min-h-screen">
      <Hero />

      {/* Overview */}
      <section ref={overviewRef} className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.05), transparent)', filter: 'blur(60px)' }} />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2">
              <p className="text-[#7c4dff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">About Moojic TV</p>
              <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2.2rem)] leading-tight mb-4">
                The Power Of <span className="gradient-text">Digital Signage</span>
              </h2>
              <div className="space-y-4 text-white/40 text-sm leading-relaxed">
                <p>
                  Walk into any great store and you&apos;ll notice it. The screens aren&apos;t just displaying content. They&apos;re telling a story, promoting an offer, and making you feel something. That&apos;s the power of digital signage done right.
                </p>
                <p>
                  Moojic&apos;s interactive digital signage platform gives your brand complete control over every screen, in every store, from one place. Create content, schedule campaigns, and push real-time updates across hundreds of locations without making a single call or visiting a single store.
                </p>
                <p>
                  Whether you&apos;re running a lunch promotion at a restaurant, a seasonal sale at a retail chain, or a brand campaign across a mall, your screens update instantly, look flawless, and always stay on brand.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img src="/assets/service_signage.jpg" alt="Digital Signage" className="w-full rounded-2xl border border-white/[0.06] shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#7c4dff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Platform Capabilities</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2rem)] mb-2">
              Features That <span className="gradient-text">Set Us Apart</span>
            </h2>
            <p className="text-white/35 text-xs max-w-[400px] mx-auto">Everything you need to create, schedule, and manage stunning in-store displays.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FeatureCard key={f.title} f={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.04) 0%, rgba(124,77,255,0.03) 50%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-3">The Impact</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,2rem)] mb-2">
              Benefits of <span className="gradient-text">Moojic TV</span>
            </h2>
            <p className="text-white/35 text-xs max-w-[400px] mx-auto">Your screens are a window to your brand story.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <BenefitCard key={b.title} b={b} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.06), transparent)', filter: 'blur(60px)' }} />
        <div className="max-w-[1280px] mx-auto px-4 text-center relative z-10">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 sm:p-12">
            <h2 className="font-poppins font-bold text-white text-[clamp(1.3rem,3vw,2rem)] mb-3">
              Ready To Light Up <span className="gradient-text">Your Stores?</span>
            </h2>
            <p className="text-white/35 text-sm max-w-[400px] mx-auto mb-6">
              Join thousands of brands using Moojic TV to transform their in-store experience.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white px-8 py-4 rounded-xl gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all">
              Get a Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
