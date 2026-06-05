import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Radio, Monitor, Speaker, Users, Shield, Zap, Music, BarChart3, Cpu,
  Award, Globe, MapPin, TrendingUp,
  Coffee, ShoppingBag, UtensilsCrossed, Scissors, Dumbbell, Hotel, Popcorn,
  Building2, BookOpen, Briefcase, Car,
  Phone, Mail, MapPinned, ArrowRight, Play, Sparkles,
  QrCode, Smartphone, Trophy, Gift,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import StatCounter from '@/components/StatCounter';
import IndustryModal from '@/components/IndustryModal';
import { industries } from '@/data/industries';
import type { Industry } from '@/data/industries';

gsap.registerPlugin(ScrollTrigger);

const industryIcons: Record<string, React.ElementType> = {
  restaurants: UtensilsCrossed, salon: Scissors, retail: ShoppingBag, cafe: Coffee,
  cinema: Popcorn, mall: Building2, gym: Dumbbell, hotel: Hotel,
  supermarket: ShoppingBag, bookstore: BookOpen, workspace: Briefcase, automotive: Car,
};

/* ============ HERO ============ */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.from('.h-tag', { opacity: 0, y: 10, duration: 0.5 })
        .from('.h-title', { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out' }, '-=0.2')
        .from('.h-sub', { opacity: 0, y: 10, duration: 0.5 }, '-=0.5')
        .from('.h-desc', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2')
        .from('.h-cta', { opacity: 0, y: 10, duration: 0.4 }, '-=0.1')
        .from('.h-pills', { opacity: 0, y: 10, duration: 0.4 }, '-=0.1')
        .from('.h-stats', { opacity: 0, duration: 0.4 }, '-=0.1')
        .from('.h-player', { opacity: 0, x: 20, duration: 0.6, ease: 'power3.out' }, '-=0.2');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Aggressive video autoplay with continuous retry
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'auto';
    video.load();

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    // Immediate attempt
    tryPlay();

    // Retry on various events
    video.addEventListener('loadedmetadata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('loadeddata', tryPlay);

    // Aggressive interval retry for 10 seconds
    const interval = setInterval(tryPlay, 500);
    setTimeout(() => clearInterval(interval), 10000);

    // User interaction fallback
    const onInteract = () => { tryPlay(); };
    document.addEventListener('click', onInteract, { once: true });
    document.addEventListener('touchstart', onInteract, { once: true });
    document.addEventListener('scroll', onInteract, { once: true });

    return () => {
      clearInterval(interval);
      video.removeEventListener('loadedmetadata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[calc(100svh-72px)] w-full overflow-hidden bg-[#0a0a1a] mt-[72px]">
      {/* Animated CSS fallback — shows immediately, always visible */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1, background: '#0a0a1a' }}>
        <div className="hero-fallback-blob hero-blob-1" />
        <div className="hero-fallback-blob hero-blob-2" />
        <div className="hero-fallback-blob hero-blob-3" />
      </div>

      {/* Video Background — fades in over the fallback when loaded */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 2, objectFit: 'cover', opacity: 0, transition: 'opacity 1s ease' }}
        onLoadedData={(e) => { (e.target as HTMLVideoElement).style.opacity = '1'; }}
        onCanPlay={(e) => { (e.target as HTMLVideoElement).style.opacity = '1'; }}
      >
        <source src="/assets/home-hero.mp4?v=2" type="video/mp4" />
      </video>

      {/* Readability overlays */}
      <div className="absolute inset-0" style={{ zIndex: 3, background: 'linear-gradient(to right, rgba(10,10,26,0.55) 0%, rgba(10,10,26,0.2) 50%, rgba(10,10,26,0.05) 100%)' }} />
      <div className="absolute inset-0" style={{ zIndex: 3, background: 'linear-gradient(to top, #0a0a1a 0%, transparent 40%, rgba(10,10,26,0.2) 100%)' }} />

      {/* Content — scales up to 1600px for ultra-wide screens */}
      <div className="relative z-10 h-full min-h-[calc(100svh-72px)] flex items-center max-w-[1280px] 2xl:max-w-[1550px] mx-auto px-6 sm:px-8 lg:px-12 2xl:px-16 py-10">
        <div className="flex flex-col lg:flex-row items-start w-full gap-8">

          {/* LEFT: Text Content */}
          <div className="flex-1 flex flex-col items-start">
            {/* Tagline */}
            <div className="h-tag inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e91e63] animate-pulse" />
              <span className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.15em]">20,000+ Locations Worldwide</span>
            </div>

            {/* Title — scales up to 6rem on ultra-wide */}
            <h1 className="h-title font-poppins font-extrabold text-white leading-[1.05] tracking-tight 2xl:leading-[1.08]"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 6rem)' }}>
              Stores Are <span className="text-white/90">Seen.</span><br />
              Brands Are <span className="gradient-text">Heard.</span>
            </h1>

            {/* Sub-headline */}
            <p className="h-sub mt-3 2xl:mt-4 font-poppins font-semibold text-white/85 text-lg sm:text-xl 2xl:text-2xl leading-snug">
              Let <span className="gradient-text">Moojic</span> set the mood.
            </p>

            {/* Description */}
            <p className="h-desc mt-4 2xl:mt-5 text-sm 2xl:text-base text-white/45 max-w-[400px] 2xl:max-w-[480px] leading-relaxed">
              Crafted by industry experts, powered by AI. Playlists tuned to your brand's identity and the store mood that keeps customers coming back.
            </p>

            {/* CTAs */}
            <div className="h-cta mt-6 2xl:mt-7 flex flex-wrap gap-3">
              <Link to="/sample-player" className="inline-flex items-center gap-2 font-poppins text-xs 2xl:text-sm font-bold uppercase tracking-[0.06em] text-white px-6 2xl:px-7 py-3 2xl:py-3.5 rounded-full gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all">
                <Play className="w-4 h-4" /> Try AI Playlists
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 font-poppins text-xs 2xl:text-sm font-bold uppercase tracking-[0.06em] text-white/60 px-6 2xl:px-7 py-3 2xl:py-3.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all">
                Get In Touch <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Industry Pills */}
            <div className="h-pills mt-6 2xl:mt-7 flex flex-wrap gap-2 2xl:gap-2.5 max-w-[480px] 2xl:max-w-[560px]">
              {industries.slice(0, 7).map((ind) => {
                const Icon = industryIcons[ind.id] || Coffee;
                return (
                  <span key={ind.id} className="flex items-center gap-1.5 px-3 2xl:px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/35 text-[10px] sm:text-xs 2xl:text-sm font-medium">
                    <Icon className="w-3 h-3 2xl:w-3.5 2xl:h-3.5" /> {ind.name}
                  </span>
                );
              })}
            </div>

            {/* Stats */}
            <div className="h-stats mt-6 2xl:mt-7 flex gap-8 sm:gap-10">
              {[
                { n: '20K+', l: 'Locations' },
                { n: '350+', l: 'Brands' },
                { n: '12', l: 'Countries' },
              ].map((s) => (
                <div key={s.l}>
                  <span className="font-poppins font-bold text-lg 2xl:text-xl text-white">{s.n}</span>
                  <p className="text-[9px] 2xl:text-[11px] text-white/30 uppercase tracking-wider mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Mini Player Card */}
          <div className="h-player hidden lg:flex flex-col gap-3 2xl:gap-4 self-center">
            {/* Mini Music Player */}
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-4 2xl:p-5 w-[260px] 2xl:w-[300px]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 2xl:w-14 2xl:h-14 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-lg">
                  <Coffee className="w-6 h-6 2xl:w-7 2xl:h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs 2xl:text-sm font-semibold text-white truncate">Morning Brew</p>
                  <p className="text-[10px] 2xl:text-xs text-white/40 truncate">Acoustic Minds</p>
                </div>
                <Link to="/sample-player" className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full gradient-bg flex items-center justify-center text-white hover:scale-110 transition-transform shrink-0">
                  <Play className="w-4 h-4 2xl:w-5 2xl:h-5 ml-0.5" />
                </Link>
              </div>
              <div className="mt-3 2xl:mt-4 flex items-center gap-2">
                <span className="text-[8px] 2xl:text-[10px] text-white/25 w-5 text-right">1:24</span>
                <div className="flex-1 h-[3px] 2xl:h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full gradient-bg" style={{ width: '35%' }} />
                </div>
                <span className="text-[8px] 2xl:text-[10px] text-white/25 w-5">3:42</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[9px] 2xl:text-xs text-[#e91e63] font-medium">Cafe</span>
                <span className="text-[9px] 2xl:text-xs text-white/20">|</span>
                <span className="text-[9px] 2xl:text-xs text-white/30">Cool</span>
                <span className="text-[9px] 2xl:text-xs text-white/20">|</span>
                <span className="text-[9px] 2xl:text-xs text-white/30">Comfortable</span>
              </div>
            </div>

            {/* AI Controls Mini */}
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-4 2xl:p-5 w-[260px] 2xl:w-[300px]">
              <p className="text-[9px] 2xl:text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">AI Controls</p>
              {[
                { icon: Music, label: 'Brand Mood', options: ['Energetic', 'Relaxed', 'Lively'], active: 'Relaxed', color: '#e91e63' },
                { icon: Zap, label: 'Sonic Profile', options: ['Bright', 'Warm Acoustic', 'Deep'], active: 'Warm Acoustic', color: '#00bcd4' },
                { icon: Coffee, label: 'Store Type', options: ['Retail', 'Cafe', 'Restaurant'], active: 'Cafe', color: '#7c4dff' },
              ].map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.label} className="flex items-center gap-3 mb-2 last:mb-0">
                    <Icon className="w-3 h-3 2xl:w-4 2xl:h-4 shrink-0" style={{ color: row.color }} />
                    <div className="flex gap-1">
                      {row.options.map((opt) => (
                        <span
                          key={opt}
                          className="px-2 py-0.5 rounded-md text-[9px] 2xl:text-xs font-medium"
                          style={
                            opt === row.active
                              ? { background: `${row.color}33`, color: row.color }
                              : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }
                          }
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ SERVICES ============ */
interface ServiceData {
  icon: React.ElementType;
  title: string;
  crux: string;
  stat: string;
  statLabel: string;
  link: string;
  color1: string;
  color2: string;
  bgGlow: string;
  tags: { label: string; icon: React.ElementType }[];
  eqBars: number[];
  visual?: 'eq' | 'screens' | 'waves';
}

function ServiceCard({ service }: { service: ServiceData }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [previewInView, setPreviewInView] = useState(false);

  useEffect(() => {
    if (service.visual !== 'screens' && service.visual !== 'waves') return;
    const el = previewRef.current;
    if (!el) return;

    const tryReveal = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const inView = rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
      if (inView) {
        setPreviewInView(true);
        window.removeEventListener('scroll', tryReveal);
      }
    };

    window.addEventListener('scroll', tryReveal, { passive: true });
    return () => window.removeEventListener('scroll', tryReveal);
  }, [service.visual]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${(e.clientX - rect.left) / rect.width}`);
    el.style.setProperty('--my', `${(e.clientY - rect.top) / rect.height}`);
  };

  return (
    <Link
      ref={cardRef}
      to={service.link}
      className="service-card group relative block h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mouse-following spotlight glow */}
      <div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at calc(var(--mx,0.5)*100%) calc(var(--my,0.5)*100%), ${service.bgGlow}, transparent 40%)`,
        }}
      />

      <div className="relative h-full rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.03]">
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${service.color1}, ${service.color2})` }} />

        <div className="relative p-6 flex flex-col h-full">
          {/* Row: Icon + Title + Stat */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${service.color1}, ${service.color2})` }}>
                <service.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-sm text-white">{service.title}</h3>
                <p className="text-[10px] text-white/30">{service.crux}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-poppins font-bold text-lg block" style={{ color: service.color1 }}>{service.stat}</span>
              <p className="text-[8px] text-white/25 uppercase tracking-wider">{service.statLabel}</p>
            </div>
          </div>

          {/* Brand Tags — fixed 3-col grid so 6 tags fit in exactly 2 rows */}
          <div className="grid grid-cols-3 gap-1.5 mb-4">
            {service.tags.map((t, i) => {
              const TIcon = t.icon;
              return (
                <div
                  key={i}
                  className="flex items-center justify-center gap-1 px-2 py-1 rounded-full border transition-all duration-300 min-w-0"
                  style={{
                    background: isHovered ? `${service.color1}10` : 'rgba(255,255,255,0.02)',
                    borderColor: isHovered ? `${service.color1}25` : 'rgba(255,255,255,0.05)',
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  <TIcon className="w-3 h-3 shrink-0" style={{ color: isHovered ? service.color1 : `${service.color1}80`, transition: 'color 0.3s' }} />
                  <span className="text-[9px] text-white/50 group-hover:text-white/70 transition-colors truncate">{t.label}</span>
                </div>
              );
            })}
          </div>

          {/* Visual — equalizer bars or animated mini screens */}
          {service.visual === 'screens' ? (
            <div
              ref={previewRef}
              className={`relative h-10 mb-4 px-1 overflow-hidden ds-screen-preview ds-anim-scroll${(isHovered || previewInView) ? ' is-visible' : ''}`}
            >
              {previewInView && (
                <>
                  <div className="flex gap-[3px] h-full items-stretch">
                    {/* Screen 1 — portrait with scrolling content */}
                    <div className="ds-mini-screen flex-1 rounded-md border border-white/[0.06] bg-white/[0.02] overflow-hidden" style={{ ['--c1' as never]: service.color1, ['--c2' as never]: service.color2 } as React.CSSProperties}>
                      <div className="ds-slide-strip h-full flex flex-col gap-[1px] p-[1px]">
                        <div className="ds-content-a flex-1 rounded-[2px]" />
                        <div className="ds-content-b flex-1 rounded-[2px]" />
                        <div className="ds-content-c flex-1 rounded-[2px]" />
                      </div>
                    </div>
                    {/* Screen 2 — landscape with split-screen zones */}
                    <div className="ds-mini-screen flex-[1.5] rounded-md border border-white/[0.06] bg-white/[0.02] overflow-hidden" style={{ ['--c1' as never]: service.color1, ['--c2' as never]: service.color2 } as React.CSSProperties}>
                      <div className="h-full flex gap-[1px] p-[1px]">
                        <div className="ds-zone-left flex-1 rounded-[2px] flex flex-col gap-[1px]">
                          <div className="ds-zone-item flex-1 rounded-[2px]" />
                          <div className="ds-zone-item flex-1 rounded-[2px]" />
                        </div>
                        <div className="ds-zone-right flex-1 rounded-[2px]" />
                      </div>
                    </div>
                    {/* Screen 3 — small ticker display */}
                    <div className="ds-mini-screen w-8 rounded-md border border-white/[0.06] bg-white/[0.02] overflow-hidden" style={{ ['--c1' as never]: service.color1, ['--c2' as never]: service.color2 } as React.CSSProperties}>
                      <div className="h-full flex flex-col justify-center p-[1px] gap-[1px]">
                        <div className="ds-tick rounded-[2px] h-[3px] w-full" />
                        <div className="ds-tick rounded-[2px] h-[3px] w-2/3" />
                        <div className="ds-tick rounded-[2px] h-[3px] w-4/5" />
                        <div className="ds-tick rounded-[2px] h-[3px] w-1/2" />
                      </div>
                    </div>
                  </div>
                  {/* Play pulse */}
                  <div className="ds-play-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: service.color1 }} />
                </>
              )}
            </div>
          ) : service.visual === 'waves' ? (
            (() => {
              const isActive = isHovered || previewInView;
              return (
                <div
                  ref={previewRef}
                  className="relative h-10 mb-4 px-1 overflow-hidden flex items-center gap-2"
                >
                  {previewInView && <>
                  {/* Speaker emitter on the left */}
                  <div
                    className="shrink-0 relative flex items-center justify-center rounded-lg transition-all duration-300"
                    style={{
                      width: 28,
                      height: 28,
                      background: isActive ? `linear-gradient(135deg, ${service.color1}, ${service.color2})` : `${service.color1}22`,
                      boxShadow: isActive ? `0 0 16px ${service.color1}55, inset 0 0 8px rgba(255,255,255,0.12)` : 'none',
                      animation: isActive ? 'av-speaker-pulse 1.4s ease-in-out infinite' : 'none',
                    }}
                  >
                    {/* Speaker grille rings */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: 16, height: 16,
                        background: isActive ? 'rgba(0,0,0,0.35)' : 'transparent',
                        border: `1px solid ${isActive ? 'rgba(255,255,255,0.25)' : `${service.color1}55`}`,
                        transition: 'background 0.3s, border-color 0.3s',
                      }}
                    />
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: 6, height: 6,
                        background: isActive ? service.color2 : service.color1,
                        boxShadow: isActive ? `0 0 6px ${service.color2}` : 'none',
                        transition: 'background 0.3s, box-shadow 0.3s',
                      }}
                    />
                  </div>

                  {/* Sound wave field (between speaker and display) */}
                  <div
                    className="relative flex-1 h-full min-w-0"
                    style={{ containerType: 'inline-size' }}
                  >
                    {/* Static idle arcs (when not active) */}
                    {!isActive && [0, 1, 2].map((i) => (
                      <span
                        key={`idle-${i}`}
                        className="absolute pointer-events-none"
                        style={{
                          top: '50%',
                          left: `${i * 22}px`,
                          width: 10,
                          height: 22,
                          borderRight: `1.5px solid ${service.color1}`,
                          borderTop: '1.5px solid transparent',
                          borderBottom: '1.5px solid transparent',
                          borderLeft: 'none',
                          borderRadius: '0 50% 50% 0 / 0 50% 50% 0',
                          transform: 'translateY(-50%)',
                          opacity: 0.28 - i * 0.07,
                        }}
                      />
                    ))}

                    {/* Animated traveling waves (when active) */}
                    {isActive && [0, 1, 2, 3].map((i) => (
                      <span
                        key={`wave-${i}`}
                        className="absolute pointer-events-none"
                        style={{
                          top: '50%',
                          left: 0,
                          width: 14,
                          height: 28,
                          borderRight: `2px solid ${service.color1}`,
                          borderTop: '2px solid transparent',
                          borderBottom: '2px solid transparent',
                          borderLeft: 'none',
                          borderRadius: '0 50% 50% 0 / 0 50% 50% 0',
                          transform: 'translate(0, -50%) scale(0.55)',
                          opacity: 0,
                          animation: `av-wave-travel 1.4s ease-out ${i * 0.35}s infinite`,
                          filter: `drop-shadow(0 0 4px ${service.color1}55)`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Display / signage monitor on the right */}
                  <div
                    className="shrink-0 relative rounded-md transition-all duration-300 flex flex-col p-[2px]"
                    style={{
                      width: 50,
                      height: 30,
                      background: isActive ? `linear-gradient(135deg, ${service.color1}, ${service.color2})` : `${service.color1}18`,
                      border: `1px solid ${isActive ? service.color2 : `${service.color1}55`}`,
                      boxShadow: isActive ? `0 0 14px ${service.color1}55` : 'none',
                    }}
                  >
                    {/* Screen interior */}
                    <div
                      className="flex-1 rounded-sm relative overflow-hidden flex flex-col justify-center gap-[2px] px-[3px]"
                      style={{ background: isActive ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.55)', transition: 'background 0.3s' }}
                    >
                      <div
                        className="h-[2px] rounded-sm"
                        style={{
                          width: '85%',
                          background: isActive ? '#fff' : `${service.color1}80`,
                          opacity: isActive ? 0.95 : 0.45,
                          transformOrigin: 'left',
                          animation: isActive ? 'av-screen-line 1.6s ease-in-out infinite' : 'none',
                        }}
                      />
                      <div
                        className="h-[2px] rounded-sm"
                        style={{
                          width: '60%',
                          background: isActive ? '#fff' : `${service.color1}80`,
                          opacity: isActive ? 0.75 : 0.3,
                          transformOrigin: 'left',
                          animation: isActive ? 'av-screen-line 1.6s ease-in-out 0.3s infinite' : 'none',
                        }}
                      />
                      <div
                        className="h-[2px] rounded-sm"
                        style={{
                          width: '72%',
                          background: isActive ? '#fff' : `${service.color1}80`,
                          opacity: isActive ? 0.85 : 0.38,
                          transformOrigin: 'left',
                          animation: isActive ? 'av-screen-line 1.6s ease-in-out 0.6s infinite' : 'none',
                        }}
                      />
                    </div>
                    {/* Tiny screen stand */}
                    <div
                      className="absolute left-1/2 -bottom-[2px] -translate-x-1/2 rounded-b-sm"
                      style={{
                        width: 14, height: 2,
                        background: isActive ? service.color2 : `${service.color1}55`,
                        transition: 'background 0.3s',
                      }}
                    />
                  </div>
                  </>}
                </div>
              );
            })()
          ) : (
            <div className="flex items-end gap-[3px] h-8 mb-4 px-1">
              {service.eqBars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-all duration-500 ease-out"
                  style={{
                    height: `${isHovered ? h * 1.4 : h * 0.45}%`,
                    background: isHovered ? `linear-gradient(180deg, ${service.color1}, ${service.color2})` : `${service.color1}20`,
                    transitionDelay: `${i * 30}ms`,
                    opacity: isHovered ? 1 : 0.2,
                    minHeight: '2px',
                  }}
                />
              ))}
            </div>
          )}

          {/* Bottom: explore link */}
          <div className="mt-auto flex items-center gap-2 text-xs font-medium" style={{ color: service.color1 }}>
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">Explore</span>
            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const cards = cardsRef.current;
    if (!el || !cards) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      const cardEls = cards.querySelectorAll('.service-card-wrap');
      gsap.from(cardEls, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });

      // Connector line animation
      const dots = el.querySelectorAll('.connector-dot');
      gsap.from(dots, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.15,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: el, start: 'top 60%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services: ServiceData[] = [
    {
      icon: Radio, title: 'In-store Radio', crux: 'The music your brand would choose, if it could.',
      stat: '20K+', statLabel: 'Locations', link: '/service/in-store-radio',
      color1: '#e91e63', color2: '#ff9800', bgGlow: 'rgba(233,30,99,0.12)',
      tags: [
        { label: 'AI-Powered Playlists', icon: Cpu },
        { label: 'Sonic Identity', icon: Sparkles },
        { label: 'Mood Sensing', icon: BarChart3 },
        { label: 'Voice Overs', icon: Speaker },
        { label: 'Jukebox', icon: Music },
        { label: 'Licensing', icon: Shield },
      ],
      eqBars: [18, 50, 30, 70, 40, 85, 25, 60, 45, 75, 35, 55],
    },
    {
      icon: Monitor, title: 'Digital Signage', crux: 'Turn every screen into a selling moment.',
      stat: '400%', statLabel: 'Attention', link: '/service/digital-signage',
      color1: '#ff9800', color2: '#ffb74d', bgGlow: 'rgba(255,152,0,0.12)',
      tags: [
        { label: 'Visual Identity', icon: Sparkles },
        { label: 'Brand Content', icon: Monitor },
        { label: 'Smart Scheduling', icon: Cpu },
        { label: 'Real-Time Updates', icon: Zap },
        { label: 'Centralized Control', icon: Shield },
        { label: 'Proof of Play', icon: BarChart3 },
      ],
      eqBars: [40, 25, 65, 45, 80, 35, 60, 50, 72, 28, 55, 40],
    },
    {
      icon: Speaker, title: 'AV Hardware', crux: 'The right hardware, installed and ready to perform.',
      stat: '33%', statLabel: 'Sales Lift', link: '/service/av-hardware',
      color1: '#7c4dff', color2: '#b388ff', bgGlow: 'rgba(124,77,255,0.12)',
      tags: [
        { label: 'Acoustic Design', icon: Speaker },
        { label: 'Speaker Systems', icon: Music },
        { label: 'Professional Installation', icon: Shield },
        { label: 'Signage Displays', icon: Monitor },
        { label: 'Space Planning', icon: Building2 },
      ],
      eqBars: [28, 58, 18, 72, 38, 52, 62, 32, 68, 22, 48, 58],
    },
  ];

  return (
    <section ref={sectionRef} id="services" className="py-16 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.05) 0%, rgba(124,77,255,0.03) 50%, transparent 70%)', filter: 'blur(80px)' }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/[0.08]"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float-particle ${4 + i * 0.8}s ease-in-out ${i * 0.5}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e91e63]/10 border border-[#e91e63]/20 mb-5">
            <Sparkles className="w-4 h-4 text-[#e91e63]" />
            <span className="text-xs font-semibold text-[#e91e63] uppercase tracking-[0.15em]">The Moojic Stack</span>
          </div>
          <h2 className="font-poppins font-bold text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-4">
            Everything Your Store Needs to <span className="gradient-text">Sound</span> and <span className="gradient-text">Look</span> Like a Brand
          </h2>
          <p className="text-white/40 text-base max-w-[640px] mx-auto">
            Three powerful services. One unified platform. Built to shape how customers feel the moment they walk in.
          </p>
        </div>

        <div ref={cardsRef} className="grid lg:grid-cols-3 gap-6 mt-16" style={{ perspective: '1200px' }}>
          {services.map((s) => (
            <div key={s.title} className="service-card-wrap h-full">
              <ServiceCard service={s} />
            </div>
          ))}
        </div>

        {/* Animated Connector */}
        <div className="hidden lg:flex items-center justify-center mt-10 gap-0 relative">
          {/* Line segments with traveling dots */}
          <div className="relative h-[2px] w-24 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#e91e63]/30" />
            <div className="absolute top-0 left-0 w-3 h-full rounded-full bg-[#e91e63]/60" style={{ animation: 'travel-right 2.5s linear infinite' }} />
          </div>

          <div className="connector-dot w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#e91e63] to-[#ff9800] mx-1 shadow-[0_0_8px_rgba(233,30,99,0.5)]" />

          <div className="relative h-[2px] w-40 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e91e63]/30 via-[#ff9800]/30 to-[#7c4dff]/30" />
            <div className="absolute top-0 left-0 w-4 h-full rounded-full bg-gradient-to-r from-[#ff9800] to-[#7c4dff]" style={{ animation: 'travel-right 2.5s linear 0.8s infinite' }} />
          </div>

          <div className="connector-dot w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#ff9800] to-[#7c4dff] mx-1 shadow-[0_0_8px_rgba(124,77,255,0.5)]" />

          <div className="relative h-[2px] w-24 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#7c4dff]/30" />
            <div className="absolute top-0 right-0 w-3 h-full rounded-full bg-[#7c4dff]/60" style={{ animation: 'travel-left 2.5s linear 1.6s infinite' }} />
          </div>
        </div>

      </div>
    </section>
  );
}

/* ============ MOOJIC ECOSYSTEM ============ */
const ecosystemSteps = [
  {
    stage: 'ATTRACT',
    service: 'In-Store Radio',
    desc: 'Set the mood with curated background music that draws customers in and keeps them around.',
    icon: Radio,
    color1: '#e91e63',
    color2: '#ff9800',
  },
  {
    stage: 'INFORM',
    service: 'Digital Signage',
    desc: 'Turn every screen into a dynamic storyteller — promotions, menus, and brand visuals that captivate.',
    icon: Monitor,
    color1: '#7c4dff',
    color2: '#00bcd4',
  },
  {
    stage: 'ENGAGE',
    service: 'Interactive Games',
    desc: 'Gamify the visit with quizzes, spin-to-wins, and contests that turn passive visitors into active players.',
    icon: Trophy,
    color1: '#ff9800',
    color2: '#e91e63',
  },
  {
    stage: 'PARTICIPATE',
    service: 'Digital Jukebox',
    desc: 'Let customers pick the soundtrack from their phones. Engagement they control, memories they keep.',
    icon: Smartphone,
    color1: '#00bcd4',
    color2: '#7c4dff',
  },
  {
    stage: 'POWER',
    service: 'AV Hardware',
    desc: 'Crystal-clear speakers, displays, and amplifiers that deliver every beat and pixel with precision.',
    icon: Speaker,
    color1: '#e91e63',
    color2: '#7c4dff',
  },
];

function EcosystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.eco-card');
      gsap.from(cards, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });
      const arrows = el.querySelectorAll('.eco-arrow');
      gsap.from(arrows, {
        scaleX: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        transformOrigin: 'left center',
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Auto-cycle active highlight
  useEffect(() => {
    const interval = setInterval(() => setActiveIdx((i) => (i + 1) % ecosystemSteps.length), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden bg-[#0a0a1a]">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(124,77,255,0.06) 0%, rgba(233,30,99,0.03) 50%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c4dff]/10 border border-[#7c4dff]/20 mb-5">
            <Cpu className="w-4 h-4 text-[#7c4dff]" />
            <span className="text-xs font-semibold text-[#7c4dff] uppercase tracking-[0.15em]">The Moojic Ecosystem</span>
          </div>
          <h2 className="font-poppins font-bold text-white text-[clamp(2rem,4vw,3.2rem)] leading-tight mb-4">
            More Powerful When <span className="gradient-text">Connected</span>
          </h2>
          <p className="text-white/40 text-base max-w-[640px] mx-auto">
            Power music, screens, engagement, and hardware from a single platform to create a unified in-store experience.
          </p>
        </div>

        {/* Horizontal Pipeline - Desktop */}
        <div className="hidden lg:flex flex-wrap justify-center gap-y-6">
          {ecosystemSteps.map((step, i) => {
            const StepIcon = step.icon;
            const isActive = activeIdx === i;
            return (
              <div key={step.stage} className="flex items-center">
                {/* Card */}
                <div
                  className="eco-card group relative w-[180px] rounded-xl border border-white/[0.08] bg-[#12121e] p-4 text-center transition-all duration-500 cursor-pointer shadow-xl"
                  style={{
                    borderColor: isActive ? `${step.color1}50` : 'rgba(255,255,255,0.08)',
                    boxShadow: isActive ? `0 0 40px ${step.color1}15` : 'none',
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                >
                  {/* Glow ring */}
                  <div
                    className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, ${step.color1}30, ${step.color2}20)`, filter: 'blur(8px)' }}
                  />
                  {/* Icon */}
                  <div
                    className="relative w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2.5 shadow-lg transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${step.color1}, ${step.color2})` }}
                  >
                    <StepIcon className="w-6 h-6 text-white" />
                  </div>
                  {/* Stage */}
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: step.color1 }}>{step.stage}</span>
                  {/* Service */}
                  <h3 className="font-poppins font-semibold text-white text-sm mb-2">{step.service}</h3>
                  {/* Description - expands on hover */}
                  <p className="text-white/35 text-xs leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow connector */}
                {i < ecosystemSteps.length - 1 && (
                  <div className="eco-arrow relative w-8 h-[2px] mx-2 flex-shrink-0 self-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/10" />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 right-0 w-0 h-0"
                      style={{ borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: `5px solid ${step.color1}60` }}
                    />
                    {/* Traveling dot */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                      style={{ background: step.color1, animation: 'travel-right 2s linear infinite', animationDelay: `${i * 0.3}s` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Grid */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4">
          {ecosystemSteps.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.stage}
                className="eco-card group relative rounded-2xl border border-white/[0.08] bg-[#12121e] p-5 text-center transition-all duration-500 shadow-xl"
                style={{
                  borderColor: activeIdx === i ? `${step.color1}50` : 'rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${step.color1}, ${step.color2})` }}
                >
                  <StepIcon className="w-6 h-6 text-white" />
                </div>
                <span className="block text-[9px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: step.color1 }}>{step.stage}</span>
                <h3 className="font-poppins font-semibold text-white text-sm">{step.service}</h3>
                <p className="text-white/35 text-xs leading-relaxed mt-2 line-clamp-3">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-10">
          {ecosystemSteps.map((step, i) => (
            <button
              key={step.stage}
              onClick={() => setActiveIdx(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: activeIdx === i ? step.color1 : 'rgba(255,255,255,0.15)',
                transform: activeIdx === i ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ INTERACTIVE EXPERIENCES ============ */
function InteractiveExperiencesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  // Auto-cycle the demo steps
  useEffect(() => {
    const interval = setInterval(() => setStep((s) => (s + 1) % 4), 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.exp-card');
      if (cards.length) {
        gsap.from(cards, { y: 40, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { label: 'Scan', icon: QrCode, color: '#e91e63', desc: 'Customer scans QR' },
    { label: 'Play', icon: Smartphone, color: '#7c4dff', desc: 'Game opens in browser' },
    { label: 'Win', icon: Trophy, color: '#ff9800', desc: 'Instant coupon reward' },
    { label: 'Return', icon: Gift, color: '#00bcd4', desc: 'Redeems in-store' },
  ];

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,188,212,0.05) 0%, rgba(124,77,255,0.03) 40%, transparent 60%)', filter: 'blur(120px)' }} />
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full bg-white/[0.06]" style={{
          left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 25}%`,
          animation: `float-particle ${3 + i * 0.4}s ease-in-out ${i * 0.3}s infinite alternate`,
        }} />
      ))}

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00bcd4]/10 border border-[#00bcd4]/20 mb-5">
            <QrCode className="w-4 h-4 text-[#00bcd4]" />
            <span className="text-xs font-semibold text-[#00bcd4] uppercase tracking-[0.15em]">Customer Engagement</span>
          </div>
          <h2 className="font-poppins font-bold text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-4">
            Turn Customers into <span className="gradient-text">participants</span>
          </h2>
          <p className="text-white/40 text-base max-w-[560px] mx-auto mb-10">
            Scan. Play. Win. Come back for more. No app. No friction. Just fun.
          </p>

          {/* Animated Flow Steps */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 max-w-[600px] mx-auto">
            {steps.map((s, i) => {
              const SIcon = s.icon;
              const isHovered = i === step;
              return (
                <div key={s.label} className="flex items-center gap-2 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 mb-2"
                      style={{
                        background: isHovered ? `linear-gradient(135deg, ${s.color}, ${s.color}80)` : 'rgba(255,255,255,0.03)',
                        border: `1.5px solid ${isHovered ? s.color + '60' : 'rgba(255,255,255,0.06)'}`,
                        boxShadow: isHovered ? `0 0 25px ${s.color}30` : 'none',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      <SIcon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: isHovered ? '#fff' : 'rgba(255,255,255,0.2)' }} />
                    </div>
                    <span className="text-xs font-semibold transition-colors duration-300" style={{ color: isHovered ? s.color : 'rgba(255,255,255,0.2)' }}>{s.label}</span>
                    <span className="text-[9px] text-white/20 hidden sm:block">{s.desc}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-6 sm:w-10 h-[1px] relative mt-[-20px]">
                      <div className="absolute inset-0 bg-white/[0.06]" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#e91e63] to-[#7c4dff] transition-all duration-500" style={{ opacity: step > i ? 1 : 0, width: step > i ? '100%' : '0%' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Two Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-[1000px] mx-auto items-stretch">

          {/* Jukebox Card */}
          <Link to="/service/in-store-radio" className="exp-card group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-[#e91e63]/40 hover:shadow-[0_20px_60px_-15px_rgba(233,30,99,0.3)] hover:-translate-y-1 flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#e91e63] via-[#ff9800] to-[#e91e63] opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.15), transparent)' }} />

            <div className="relative p-7 flex flex-col flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#e91e63] to-[#ff9800] flex items-center justify-center shadow-xl shadow-[#e91e63]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-white mb-0.5">Digital Jukebox</h3>
                  <p className="text-[#e91e63] text-xs font-medium">Scan. Request. Hear It Play.</p>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                Let customers request songs straight from your branded playlists. Their request plays live at the store, making every visit personal.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['QR Scan', 'AI Powered', 'Live Queue', 'No App', 'Brand Playlists'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40 text-[10px] font-medium group-hover:border-[#e91e63]/20 group-hover:text-white/60 transition-all">{tag}</span>
                ))}
              </div>

              {/* Animated Mini Player */}
              <div className="mt-auto rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 group-hover:border-[#e91e63]/15 group-hover:bg-white/[0.04] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg group-hover:animate-pulse">
                    <Play className="w-5 h-5 text-white" fill="white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">Summer Vibes — Acoustic</p>
                    <p className="text-[10px] text-[#e91e63]">Requested by Table 3</p>
                  </div>
                  <div className="flex gap-[2px] items-end h-5">
                    {[40, 65, 30, 75, 50, 60, 35].map((h, i) => (
                      <div key={i} className="w-[2px] rounded-full bg-gradient-to-t from-[#e91e63] to-[#ff9800]" style={{ height: `${h * 0.6}px`, animation: `visualizer-bar 0.8s ease-in-out ${i * 0.12}s infinite alternate` }} />
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[8px] text-white/20">1:24</span>
                  <div className="flex-1 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full rounded-full gradient-bg" style={{ width: '35%' }} />
                  </div>
                  <span className="text-[8px] text-white/20">3:42</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#e91e63]">
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Games Card */}
          <Link to="/games" className="exp-card group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-[#7c4dff]/40 hover:shadow-[0_20px_60px_-15px_rgba(124,77,255,0.3)] hover:-translate-y-1 flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7c4dff] via-[#00bcd4] to-[#7c4dff] opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.15), transparent)' }} />

            <div className="relative p-7 flex flex-col flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7c4dff] to-[#00bcd4] flex items-center justify-center shadow-xl shadow-[#7c4dff]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-white mb-0.5">Interactive Games</h3>
                  <p className="text-[#7c4dff] text-xs font-medium">Because Shopping Should Be Fun</p>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                Spin the Wheel, scratch a card, or try the Slot Machine. Every play ends with a reward that brings customers back.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['Spin the Wheel', 'Slot Machine', 'Scratch & Win', 'CMS Control'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40 text-[10px] font-medium group-hover:border-[#7c4dff]/20 group-hover:text-white/60 transition-all">{tag}</span>
                ))}
              </div>

              {/* Animated Coupons */}
              <div className="mt-auto rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 group-hover:border-[#7c4dff]/15 group-hover:bg-white/[0.04] transition-all">
                <p className="text-[9px] text-white/30 uppercase tracking-wider mb-2">Live Winners</p>
                <div className="flex gap-2">
                  {[
                    { pct: '50%', label: 'Off', color1: '#e91e63', color2: '#ff9800', delay: '0s' },
                    { pct: 'FREE', label: 'Coffee', color1: '#ff9800', color2: '#ffb74d', delay: '0.2s' },
                    { pct: '20%', label: 'Off', color1: '#00bcd4', color2: '#7c4dff', delay: '0.4s' },
                  ].map((c, i) => (
                    <div key={i} className="flex-1 flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover:border-white/[0.08] transition-all" style={{ animationDelay: c.delay }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${c.color1}, ${c.color2})` }}>
                        <span className="text-[7px] text-white font-bold">{c.pct}</span>
                      </div>
                      <span className="text-[9px] text-white/50">{c.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-3 px-1">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4caf50] animate-pulse" />
                    <span className="text-[8px] text-white/25">234 plays</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff9800] animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <span className="text-[8px] text-white/25">89 redeemed</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#7c4dff]">
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">Explore Games</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-center gap-10 mt-12">
          {[
            { value: '3x', label: 'More Visits' },
            { value: '40%', label: 'Redemption' },
            { value: '0', label: 'App Download' },
          ].map((stat) => (
            <div key={stat.label} className="text-center group/stat">
              <span className="font-poppins font-bold text-xl gradient-text block group-hover/stat:scale-110 transition-transform">{stat.value}</span>
              <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ AI MUSIC CURATION ============ */
function AIMusicCurationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    { brandMood: 'Relaxed', sonicProfile: 'Warm Acoustic', store: 'Cafe', mood: 'Chill Acoustic', color: '#4fc3f7', tracks: ['Morning Brew', 'Soft Sunlight', 'Coffee Shop Vibes'] },
    { brandMood: 'Energetic', sonicProfile: 'Upbeat Pop', store: 'Retail', mood: 'Upbeat Pop', color: '#ff9800', tracks: ['Energy Boost', 'Shopping Flow', 'Top 40 Mix'] },
    { brandMood: 'Sophisticated', sonicProfile: 'Smooth Jazz', store: 'Restaurant', mood: 'Jazz Lounge', color: '#e91e63', tracks: ['Evening Jazz', 'Dinner Ambience', 'Smooth Sax'] },
  ];

  useEffect(() => {
    const interval = setInterval(() => setActiveDemo((p) => (p + 1) % demos.length), 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from('.ai-left', { x: -40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 75%', once: true } });
      gsap.from('.ai-right', { x: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 75%', once: true } });
      gsap.from('.ai-feature', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 70%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const current = demos[activeDemo];

  const features = [
    { icon: Cpu, title: 'Smart Genre Matching', desc: 'AI analyzes your brand identity and matches music genres that resonate with your audience.' },
    { icon: BarChart3, title: 'Dynamic Mood Adaptation', desc: 'Music tempo and energy automatically shift based on time of day and foot traffic.' },
    { icon: Music, title: 'Brand-Sonic Profiling', desc: 'In-depth brand studies to design a unique sonic identity across every location.' },
    { icon: TrendingUp, title: 'Listener Analytics', desc: 'Real-time insights into music performance and customer engagement correlation.' },
  ];

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${current.color}15, transparent)`, filter: 'blur(100px)', transition: 'all 2s ease' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.08), transparent)', filter: 'blur(80px)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* LEFT: Text Content */}
          <div className="lg:w-1/2 ai-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e91e63]/10 border border-[#e91e63]/20 mb-5">
              <Cpu className="w-4 h-4 text-[#e91e63]" />
              <span className="text-xs font-semibold text-[#e91e63] uppercase tracking-wider">Powered by AI · Crafted by Experts</span>
            </div>
            <h2 className="font-poppins font-bold text-white text-[clamp(2rem,4vw,3rem)] leading-tight mb-4">
              Your Brand Has a <span className="gradient-text">Sound</span>. We Help You Find It.
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-4 max-w-[520px]">
              Music intelligence, built around your brand. We feed your identity, your audience, your vibe. Our engine handles the rest, automatically.
            </p>
            <Link to="/sample-player" className="inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white px-6 py-3 rounded-xl gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all mb-4">
              <Play className="w-4 h-4" /> Try Sample Playlists
            </Link>
            <div className="grid sm:grid-cols-2 gap-2">
              {features.map((f) => (
                <div key={f.title} className="ai-feature group flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all">
                  <div className="w-6 h-6 rounded-md gradient-bg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <f.icon className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-white text-[11px] mb-0.5">{f.title}</h4>
                    <p className="text-white/40 text-[10px] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Interactive AI Demo Panel */}
          <div className="lg:w-1/2 ai-right flex justify-center">
            <div className="relative w-full max-w-[460px]">
              {/* Main AI Console Card */}
              <div className="bg-[#12121e] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#e91e63] animate-pulse" />
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">AI Engine Live</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#e91e63]" />
                </div>

                {/* Brand Identity Sensors */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {/* Brand Mood */}
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3 text-center">
                    <Music className="w-4 h-4 mx-auto mb-1.5" style={{ color: current.color }} />
                    <p className="font-poppins font-bold text-white text-xs mt-1" style={{ color: current.color }}>{current.brandMood}</p>
                    <p className="text-[9px] text-white/30 uppercase tracking-wider">Brand Mood</p>
                  </div>
                  {/* Sonic Profile */}
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3 text-center">
                    <Zap className="w-4 h-4 mx-auto mb-1.5 text-[#00bcd4]" />
                    <p className="font-poppins font-bold text-xs" style={{ color: '#00bcd4' }}>{current.sonicProfile}</p>
                    <p className="text-[9px] text-white/30 uppercase tracking-wider">Sonic Profile</p>
                  </div>
                  {/* Store Type */}
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3 text-center">
                    <Coffee className="w-4 h-4 mx-auto mb-1.5 text-[#7c4dff]" />
                    <p className="font-poppins font-bold text-white text-sm mt-1">{current.store}</p>
                    <p className="text-[9px] text-white/30 uppercase tracking-wider">Store Type</p>
                  </div>
                </div>

                {/* AI Decision Pipeline */}
                <div className="mb-6">
                  <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-3">AI Decision Pipeline</p>
                  <div className="flex items-center gap-2">
                    {['Analyze', 'Match', 'Curate', 'Play'].map((step, i) => (
                      <div key={step} className="flex-1 flex flex-col items-center gap-1.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500"
                          style={{
                            background: i <= activeDemo ? `${current.color}20` : 'rgba(255,255,255,0.03)',
                            border: `1.5px solid ${i <= activeDemo ? current.color : 'rgba(255,255,255,0.08)'}`,
                            color: i <= activeDemo ? current.color : 'rgba(255,255,255,0.2)',
                          }}
                        >
                          {i + 1}
                        </div>
                        <span className="text-[8px] text-white/30">{step}</span>
                      </div>
                    ))}
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${((activeDemo + 1) / demos.length) * 100}%`, background: `linear-gradient(90deg, ${current.color}, #e91e63)` }}
                    />
                  </div>
                </div>

                {/* Generated Playlist Preview */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">Generated Playlist</p>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${current.color}20`, color: current.color }}>{current.mood}</span>
                  </div>
                  <div className="space-y-2">
                    {current.tracks.map((track, i) => (
                      <div
                        key={track}
                        className="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-500"
                        style={{
                          background: i === 0 ? `${current.color}10` : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${i === 0 ? `${current.color}30` : 'rgba(255,255,255,0.04)'}`,
                        }}
                      >
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: i === 0 ? `${current.color}30` : 'rgba(255,255,255,0.05)' }}>
                          {i === 0 ? <Play className="w-3 h-3 text-white" /> : <span className="text-[9px] text-white/30">{i + 1}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate">{track}</p>
                          <p className="text-[9px] text-white/30">Moojic AI</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, j) => (
                            <div
                              key={j}
                              className="w-[2px] rounded-full"
                              style={{
                                height: `${h * 12}px`,
                                background: i === 0 ? current.color : 'rgba(255,255,255,0.1)',
                                animation: i === 0 ? `visualizer-bar 0.8s ease-in-out ${j * 0.1}s infinite alternate` : 'none',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cycle Indicator */}
                <div className="flex justify-center gap-1.5 mt-5">
                  {demos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveDemo(i)}
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{ background: i === activeDemo ? current.color : 'rgba(255,255,255,0.1)', transform: i === activeDemo ? 'scale(1.3)' : 'scale(1)' }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#1a1a2e] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-3.5 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Real-Time Adaptation</p>
                    <p className="text-white/30 text-[9px]">Changes in &lt; 30 seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ ABOUT ============ */
function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from('.about-img', { x: -50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
      gsap.from('.about-text', { x: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
      gsap.from('.about-stat', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 70%', once: true } });
      gsap.from('.about-milestone', { x: -20, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 65%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const milestones = [
    { year: '2013', text: 'Founded in Mumbai' },
    { year: '2016', text: '1,000 stores milestone' },
    { year: '2018', text: 'Digital Signage launched' },
    { year: '2020', text: '20,000+ global locations' },
    { year: '2023', text: 'AI-powered engine' },
    { year: '2026', text: 'Largest in-store radio in India' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-16 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.06), transparent)', filter: 'blur(80px)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* LEFT: Image + Timeline */}
          <div className="lg:w-1/2 about-img">
            <div className="relative">
              <img src="/assets/about_office.jpg" alt="Moojic" className="w-full rounded-3xl shadow-2xl border border-white/5" />

              {/* Timeline overlay */}
              <div className="absolute -bottom-6 -right-2 sm:right-4 bg-[#151525] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 shadow-xl max-w-[240px]">
                <p className="text-[9px] font-semibold text-white/30 uppercase tracking-wider mb-3">Our Journey</p>
                <div className="space-y-2.5">
                  {milestones.map((m) => (
                    <div key={m.year} className="about-milestone flex items-center gap-3">
                      <span className="font-poppins font-bold text-[11px] gradient-text w-8 shrink-0">{m.year}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#e91e63]/60 shrink-0" />
                      <span className="text-[11px] text-white/50">{m.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="lg:w-1/2 about-text">
            <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.15em] mb-4">About Us</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(2rem,4vw,3rem)] leading-tight mb-6">
              A Decade. One Mission. Make Brands <span className="gradient-text">Heard</span>.
            </h2>
            <p className="text-white/50 leading-[1.8] mb-8">
              We started with a simple belief — the right sound can transform how people feel inside a space. From a single store in Mumbai to 20,000+ locations across 12 countries, every year we've gone deeper into what makes a brand truly unforgettable. With over a decade of experience behind us, today Moojic is more than an in-store radio platform. We're an AI-powered media partner that helps brands sound, look, and feel exactly the way they were meant to.
            </p>

            {/* Key differentiators */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['In-House Tech', '12+ Years', 'AI-Powered', 'Real-Time', '350+ Brands'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40 text-[11px] font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[{ n: '12+', l: 'Years' }, { n: '20K+', l: 'Locations' }, { n: '12', l: 'Countries' }].map((s) => (
                <div key={s.l} className="about-stat text-center p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all">
                  <span className="font-poppins font-bold text-2xl gradient-text">{s.n}</span>
                  <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ WHY MOOJIC ============ */
function WhyMoojicSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const reasons = [
    {
      icon: Users, title: 'One Source Media Partner', short: 'No More Juggling Vendors.',
      desc: 'When your radio, signage, and hardware all speak the same language, your brand shows up consistently. Everywhere, every time.',
      stat: '3-in-1', statLabel: 'Unified Platform',
      tags: ['Single Dashboard', 'Unified Billing', 'Integrated Analytics'],
      color1: '#e91e63', color2: '#ff9800',
    },
    {
      icon: Shield, title: 'Robust & Proven Technology', short: 'It Just Works.',
      desc: 'Built entirely in-house and battle-tested across 20,000+ locations. Our platform runs so reliably, you\'ll forget it\'s even there.',
      stat: '99.9%', statLabel: 'Uptime',
      tags: ['Offline Playback', 'Auto-Recovery', 'Enterprise Scale'],
      color1: '#7c4dff', color2: '#e91e63',
    },
    {
      icon: Zap, title: 'Fastest Support', short: 'We\'re There Before You Notice.',
      desc: 'Your store can\'t afford silence. Our team resolves issues in under 5 minutes, before your customers even notice.',
      stat: '< 5 min', statLabel: 'Response Time',
      tags: ['24/7 Support', 'Dedicated AM', 'Live Chat'],
      color1: '#00bcd4', color2: '#7c4dff',
    },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const heading = el.querySelector('.why-heading');
      const cards = el.querySelectorAll('.why-card');
      if (heading) gsap.from(heading, { y: 20, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      if (cards.length) gsap.from(cards, { y: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.04) 0%, rgba(124,77,255,0.03) 50%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* LEFT: Sticky heading + stat highlight */}
          <div className="lg:w-[38%] lg:sticky lg:top-28 lg:self-start why-heading">
            <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-4">The Moojic Edge</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] mb-6">
              Why <span className="gradient-text">Moojic?</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-[360px]">
              Three reasons 350+ brands chose Moojic and never looked back.
            </p>

            {/* Large active stat */}
            <div className="hidden lg:block p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
              <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">{reasons[activeIdx].statLabel}</p>
              <p className="font-poppins font-extrabold text-[clamp(2.5rem,5vw,4rem)] leading-none transition-colors duration-500" style={{ color: reasons[activeIdx].color1 }}>
                {reasons[activeIdx].stat}
              </p>
              {/* Mini dots */}
              <div className="flex gap-2 mt-4">
                {reasons.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: i === activeIdx ? '24px' : '8px',
                      background: i === activeIdx ? r.color1 : 'rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Stacked reason cards with vertical connector */}
          <div className="lg:w-[62%] relative">
            {/* Vertical connector line */}
            <div className="hidden lg:block absolute left-[27px] top-8 bottom-8 w-[1px] bg-gradient-to-b from-[#e91e63]/20 via-[#7c4dff]/20 to-transparent" />

            <div className="space-y-5">
              {reasons.map((r, idx) => (
                <div
                  key={r.title}
                  className="why-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 overflow-hidden"
                  style={{
                    borderColor: activeIdx === idx ? `${r.color1}30` : 'rgba(255,255,255,0.06)',
                    background: activeIdx === idx ? `${r.color1}05` : 'rgba(255,255,255,0.02)',
                  }}
                  onMouseEnter={() => setActiveIdx(idx)}
                >
                  {/* Left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-opacity duration-500" style={{ background: `linear-gradient(180deg, ${r.color1}, ${r.color2})`, opacity: activeIdx === idx ? 1 : 0 }} />

                  <div className="flex gap-4 p-5">
                    {/* Icon + step dot */}
                    <div className="relative shrink-0">
                      <div className="w-[54px] h-[54px] rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${r.color1}, ${r.color2})` }}>
                        <r.icon className="w-6 h-6 text-white" />
                      </div>
                      {/* Step dot on line */}
                      <div className="hidden lg:block absolute left-[27px] top-[54px] w-2 h-2 rounded-full -translate-x-1/2 mt-3" style={{ background: activeIdx === idx ? r.color1 : 'rgba(255,255,255,0.1)', boxShadow: activeIdx === idx ? `0 0 8px ${r.color1}60` : 'none', transition: 'all 0.5s' }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-poppins font-semibold text-base text-white">{r.title}</h3>
                        <span className="font-poppins font-bold text-lg shrink-0 ml-4" style={{ color: r.color1, opacity: 0.6 }}>{r.stat}</span>
                      </div>
                      <p className="text-[11px] font-medium mb-1.5" style={{ color: r.color1, opacity: 0.7 }}>{r.short}</p>
                      <p className="text-white/40 text-xs leading-relaxed mb-3">{r.desc}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {r.tags.map((t, i) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all duration-300"
                            style={{
                              background: activeIdx === idx ? `${r.color1}10` : 'rgba(255,255,255,0.02)',
                              borderColor: activeIdx === idx ? `${r.color1}20` : 'rgba(255,255,255,0.05)',
                              color: activeIdx === idx ? r.color1 : 'rgba(255,255,255,0.3)',
                              transitionDelay: `${i * 50}ms`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ INDUSTRIES ============ */
function IndustriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.industry-card');
      if (cards.length > 0) {
        gsap.from(cards, { y: 20, duration: 0.5, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,152,0,0.08), transparent)', filter: 'blur(80px)' }} />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.05), transparent)', filter: 'blur(80px)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading label="Who We Work With" heading={<>Spaces We <span className="gradient-text">Transform</span></>} description="Every space has a sound. We help you find yours." light />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
          {industries.map((ind) => {
            const Icon = industryIcons[ind.id] || Music;
            const isHovered = hoveredId === ind.id;

            return (
              <button
                key={ind.id}
                className="industry-card group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-white/[0.06] hover:border-white/[0.2] transition-all duration-500"
                onClick={() => setSelectedIndustry(ind)}
                onMouseEnter={() => setHoveredId(ind.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img
                  src={ind.image}
                  alt={ind.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  style={{ filter: isHovered ? 'brightness(0.5)' : 'brightness(0.7)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Hover overlay content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-2 border border-white/20">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                  <span className="text-[10px] text-white/60 uppercase tracking-wider">View Details</span>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                    <Icon className="w-3.5 h-3.5 text-white/80" />
                  </div>
                  <span className="font-poppins font-semibold text-white text-sm">{ind.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <IndustryModal industry={selectedIndustry} onClose={() => setSelectedIndustry(null)} />
    </section>
  );
}

/* ============ STATS ============ */
function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.stat-item');
      if (items.length > 0) {
        gsap.from(items, { y: 15, duration: 0.5, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 350, suffix: '+', label: 'Brand Partners', icon: Award, color: '#e91e63' },
    { value: 20000, suffix: '+', label: 'Active Locations', icon: Globe, color: '#ff9800' },
    { value: 12, suffix: '', label: 'Countries', icon: MapPin, color: '#7c4dff' },
    { value: 500000, suffix: '+', label: 'Daily Interactions', icon: Users, color: '#00bcd4' },
  ];

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-[900px] mx-auto">
          <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.15em] mb-3">Our Reach</p>
          <h2 className="font-poppins font-bold leading-tight text-white text-[clamp(1.75rem,3.5vw,3rem)] whitespace-nowrap">
            From Mumbai to the <span className="gradient-text">World</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/40">
            A decade of growth, measured in numbers.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {stats.map((s) => (
            <div key={s.label} className="stat-item group text-center p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: `${s.color}15` }}>
                <s.icon className="w-7 h-7" style={{ color: s.color }} />
              </div>
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FEATURED ON ============ */
function FeaturedOnSection() {
  const logos = ['The Economic Times', 'TechCircle', 'Indian Express', 'Hindustan Times', 'DNA', 'India Today', 'Business Standard', 'Moneycontrol'];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(233,30,99,0.03), transparent)', filter: 'blur(60px)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 relative z-10">
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/10" />
          <h3 className="font-poppins font-semibold text-white/40 text-sm text-center uppercase tracking-[0.25em]">Featured On</h3>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a1a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a1a] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {[...logos, ...logos].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="mx-8 flex items-center gap-3 select-none"
            >
              {/* Placeholder logo box */}
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-white/20">{name.charAt(0)}</span>
              </div>
              <span className="text-white/25 hover:text-white/60 transition-colors text-base font-medium tracking-wide cursor-default whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ BLOG PREVIEW ============ */
function BlogPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const posts = [
    { title: 'From Boring to Astounding', date: 'Dec 1, 2022', excerpt: 'How the right in-store music transforms customer experience.', image: '/assets/blog_thumb_1.jpg' },
    { title: 'How In-Store Radio Adds Value', date: 'Dec 2, 2022', excerpt: 'The measurable impact of curated audio on dwell time and sales.', image: '/assets/blog_thumb_2.jpg' },
    { title: 'The Magic of Digital Signage', date: 'Dec 3, 2022', excerpt: 'What digital signage can do for retail stores.', image: '/assets/blog_thumb_3.jpg' },
    { title: 'Music and Retail Science', date: 'Dec 5, 2022', excerpt: 'The psychology of sound and its influence on shopping.', image: '/assets/blog_thumb_4.jpg' },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.blog-card');
      if (cards.length > 0) {
        gsap.from(cards, { y: 15, duration: 0.4, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading label="Insights" heading="Latest from Our Blog" light />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {posts.map((post) => (
            <article
              key={post.title}
              className="blog-card group bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">{post.date}</p>
                <h4 className="font-poppins font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-[#e91e63] transition-colors">{post.title}</h4>
                <p className="text-xs text-white/35 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ RESELLER CTA ============ */
function ResellerCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from('.reseller-item', { y: 20, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Dark animated gradient background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 25%, #0f0f23 50%, #1a0d2e 75%, #0d0d1a 100%)', backgroundSize: '400% 400%', animation: 'gradient-shift 12s ease infinite' }} />
      {/* Subtle purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(124,77,255,0.15), transparent 70%)', filter: 'blur(60px)' }} />
      {/* Pink accent glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.08), transparent)', filter: 'blur(80px)' }} />

      <div className="relative z-10 max-w-[700px] mx-auto px-4 text-center">
        {/* Badge */}
        <div className="reseller-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
          <Zap className="w-4 h-4 text-[#e91e63]" />
          <span className="text-xs font-semibold text-[#e91e63] uppercase tracking-[0.15em]">Partnership Opportunity</span>
        </div>

        <h2 className="reseller-item font-poppins font-bold text-white text-[clamp(2rem,4vw,3rem)] leading-tight mb-4">
          Become Our <span className="gradient-text">Reseller!</span>
        </h2>
        <p className="reseller-item text-white/45 text-base mb-8 max-w-[560px] mx-auto">
          You bring the network. We bring the platform, the support, and the technology. All you do is earn.
        </p>

        {/* Stats */}
        <div className="reseller-item flex items-center justify-center gap-8 mb-8">
          {[
            { value: '24/7', label: 'Support' },
            { value: '0', label: 'Investment' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-poppins font-bold text-lg gradient-text">{stat.value}</span>
              <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <Link to="/contact" className="reseller-item inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white px-8 py-4 rounded-xl gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all">
          Contact Us <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

/* ============ CONTACT ============ */
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const fields = el.querySelectorAll('.form-field');
      if (fields.length) {
        gsap.from(fields, { y: 15, duration: 0.4, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(233,30,99,0.03), transparent)', filter: 'blur(80px)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Contact Us</p>
          <h2 className="font-poppins font-bold text-white text-[clamp(2rem,4vw,3rem)]">Get In Touch</h2>
          <p className="text-white/40 text-base mt-3">Ready to transform your in-store experience?</p>
        </div>
        <div className="max-w-[800px] mx-auto">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl">
            <form className="grid sm:grid-cols-2 gap-5" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Company Name" className="form-field w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#e91e63] outline-none transition-all" />
              <input type="text" placeholder="Full Name" className="form-field w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#e91e63] outline-none transition-all" />
              <input type="email" placeholder="Email Address" className="form-field w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#e91e63] outline-none transition-all" />
              <input type="tel" placeholder="Phone Number" className="form-field w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#e91e63] outline-none transition-all" />
              <textarea rows={4} placeholder="Tell us about your requirements..." className="form-field sm:col-span-2 w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#e91e63] outline-none transition-all resize-none" />
              <button type="submit" className="form-field sm:col-span-2 w-full font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white py-4 rounded-xl gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all">
                Send Message
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 grid sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#e91e63] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Phone</p>
                  <p className="text-white/40 text-xs mt-1">+91-8452999066</p>
                  <p className="text-white/40 text-xs">+91-9167633544</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#e91e63] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Email</p>
                  <p className="text-white/40 text-xs mt-1">info@moojic.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinned className="w-5 h-5 text-[#e91e63] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Adonta Mobility Solutions Pvt Ltd</p>
                  <p className="text-white/40 text-xs mt-1 leading-relaxed">4th Floor – 32, Aditya Villa, Waman Wadi Rd,<br />Sindhi Society, Chembur, Mumbai, Maharashtra 400071</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ HOMEPAGE ============ */
export default function HomePage() {
  return (
    <>
      {/* TEMP: page-wide reseller-style background for visual test — remove to revert */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 25%, #0f0f23 50%, #1a0d2e 75%, #0d0d1a 100%)', backgroundSize: '400% 400%', animation: 'gradient-shift 12s ease infinite' }}
      />
      <HeroSection />
      <ServicesSection />
      <InteractiveExperiencesSection />
      <AIMusicCurationSection />
      <AboutSection />
      <EcosystemSection />
      <WhyMoojicSection />
      <IndustriesSection />
      <StatsSection />
      <FeaturedOnSection />
      <BlogPreviewSection />
      <ResellerCTASection />
      <ContactSection />
    </>
  );
}
