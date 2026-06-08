import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroVideo from '@/components/HeroVideo';
import SEO, { JsonLd } from '@/components/SEO';
import {
  Music, Monitor, BarChart3, Cpu, Users, Headphones,
  Shuffle, Lock, RefreshCw, Bell, Check, ArrowRight,
  Play, Radio, Sparkles, Wifi, QrCode, Smartphone, Waves, Zap,
  Gamepad2, Shield,
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
      <HeroVideo src="/assets/instore-radio-hero.mp4" className="absolute inset-0 w-full h-full object-cover" />
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
          The Best Brands Don't Just Look Good. They <span className="gradient-text">Sound Good.</span>
        </h1>
        <p className="text-white/45 text-sm sm:text-base max-w-[640px] mx-auto leading-relaxed mb-8">
          Moojic makes sure your brand sounds as good as it looks. With AI-powered playlists crafted around your identity, your audience, and your store mood.
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

/* ========== INTRO SECTION ========== */
function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from('.intro-text-col', { x: -40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
      gsap.from('.intro-visual-col', { x: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-[#0a0a1a] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.04) 0%, rgba(124,77,255,0.03) 50%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT: Text Content */}
          <div className="lg:w-1/2 intro-text-col">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e91e63]/10 border border-[#e91e63]/20 mb-5">
              <Waves className="w-4 h-4 text-[#e91e63]" />
              <span className="text-xs font-semibold text-[#e91e63] uppercase tracking-[0.15em]">Sonic Identity</span>
            </div>
            <h2 className="font-poppins font-bold text-white text-[clamp(2rem,4vw,3rem)] leading-tight mb-6">
              More Than Music. A <span className="gradient-text">Brand Experience.</span>
            </h2>
            <div className="space-y-4 text-white/50 text-sm sm:text-base leading-relaxed max-w-[520px]">
              <p>
                Your store&apos;s sound is more powerful than you think. It shapes how long customers stay, how much they spend, and how they remember your brand long after they leave.
              </p>
              <p>
                With over a decade of experience, Moojic&apos;s in-store radio goes beyond playlists. We build your sonic identity from scratch, understanding your brand, your audience, and your store mood, then our AI-powered engine delivers the right sound, every hour of every day. Licensed, managed, and always on brand.
              </p>
              <p>
                Trusted across 20,000+ locations in 12 countries, from retail and hospitality to fitness and automotive. We&apos;ve made it our mission to make sure every brand sounds exactly the way it was meant to.
              </p>
            </div>
          </div>

          {/* RIGHT: Brand Experience Image */}
          <div className="lg:w-1/2 intro-visual-col flex justify-center">
            <div className="relative w-full max-w-[520px]">
              {/* Main image frame with glassmorphism border */}
              <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-2 overflow-hidden">
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#e91e63] via-[#7c4dff] to-[#00bcd4] z-10" />

                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src="/assets/store-cafe.jpg"
                    alt="Moojic in-store experience"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  {/* Subtle dark overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/60 via-transparent to-[#0a0a1a]/20" />

                  {/* Floating badge — bottom left */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-[#0a0a1a]/70 backdrop-blur-md border border-white/10">
                    <span className="text-[10px] font-semibold text-white/80 uppercase tracking-wider">Cafe · Mumbai</span>
                  </div>
                </div>
              </div>

              {/* Floating stat card — bottom left, overlapping */}
              <div className="absolute -bottom-5 -left-4 bg-[#151525] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-3.5 shadow-xl z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e91e63] to-[#ff9800] flex items-center justify-center shadow-lg">
                    <Radio className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">20,000+ Locations</p>
                    <p className="text-white/30 text-[9px]">12 Countries · Always On</p>
                  </div>
                </div>
              </div>

              {/* Floating stat card — top right, overlapping */}
              <div className="absolute -top-4 -right-4 bg-[#151525] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-3 shadow-xl z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c4dff] to-[#00bcd4] flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">350+ Brands</p>
                    <p className="text-white/30 text-[9px]">Across Industries</p>
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

/* ========== PLATFORM CAPABILITIES ========== */
interface Capability {
  icon: React.ElementType;
  title: string;
  desc: string;
  color1: string;
  color2: string;
}

const capabilities: Capability[] = [
  {
    icon: Sparkles, title: 'Sonic Identity',
    desc: 'Your brand has a sound. We define it, design it, and make it instantly recognisable the moment a customer walks in.',
    color1: '#e91e63', color2: '#ff9800',
  },
  {
    icon: Monitor, title: 'Central Dashboard',
    desc: 'Every store. Every track. Monitored and controlled from one place, in real time.',
    color1: '#7c4dff', color2: '#e91e63',
  },
  {
    icon: BarChart3, title: 'Mood Sensing',
    desc: 'Different times call for different sounds. Our engine shifts the music tempo automatically to match the right energy, at the right moment, all day long.',
    color1: '#00bcd4', color2: '#7c4dff',
  },
  {
    icon: Cpu, title: 'Sound Intelligence',
    desc: 'Playlists that think. Our engine learns your brand, your audience, and your peak hours, then curates the perfect sound without you lifting a finger.',
    color1: '#ff9800', color2: '#ffb74d',
  },
  {
    icon: Zap, title: 'Live Override',
    desc: 'Need to change the vibe instantly? Override any playlist across any location in seconds. No calls, no delays, no technical knowledge needed.',
    color1: '#e91e63', color2: '#7c4dff',
  },
  {
    icon: Smartphone, title: 'Digital Jukebox',
    desc: 'Let customers scan, pick a song, and hear it play live in your store. No app. No friction. Just their track, your brand, their moment.',
    color1: '#2d1b69', color2: '#e91e63',
  },
];

const leftCaps = capabilities.slice(0, 3);
const rightCaps = capabilities.slice(3, 6);

const orbitDots = [
  { angle: -90, color: '#e91e63' },   // top
  { angle: -30, color: '#ff9800' },   // top-right
  { angle: 30,  color: '#00bcd4' },   // bottom-right
  { angle: 90,  color: '#7c4dff' },   // bottom
  { angle: 150, color: '#e91e63' },   // bottom-left
  { angle: 210, color: '#ff9800' },   // top-left
];

function PlatformHub() {
  const radius = 100;
  return (
    <div className="relative w-[260px] h-[260px] flex-shrink-0">
      {/* Outer dashed ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-white/[0.08] animate-[spin_25s_linear_infinite]" />
      {/* Middle ring rotating reverse */}
      <div className="absolute inset-3 rounded-full border border-white/[0.05] animate-[spin_18s_linear_infinite_reverse]" />
      {/* Inner glow ring */}
      <div className="absolute inset-6 rounded-full border border-[#e91e63]/10" style={{ boxShadow: '0 0 30px rgba(233,30,99,0.08), inset 0 0 30px rgba(124,77,255,0.05)' }} />

      {/* Orbit dots */}
      {orbitDots.map((dot, i) => {
        const rad = (dot.angle * Math.PI) / 180;
        const left = `calc(50% + ${Math.cos(rad) * radius}px - 6px)`;
        const top = `calc(50% + ${Math.sin(rad) * radius}px - 6px)`;
        return (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full animate-pulse"
            style={{
              left, top,
              background: dot.color,
              boxShadow: `0 0 12px ${dot.color}60`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '2s',
            }}
          />
        );
      })}

      {/* Center orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[90px] h-[90px] rounded-full bg-gradient-to-br from-[#e91e63] to-[#7c4dff] flex items-center justify-center shadow-[0_0_50px_rgba(233,30,99,0.35)] z-10">
          <Cpu className="w-9 h-9 text-white" />
          <div className="absolute inset-0 rounded-full bg-[#e91e63]/20 animate-ping" style={{ animationDuration: '2.5s' }} />
        </div>
      </div>
    </div>
  );
}

function CapabilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from('.cap-heading', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      gsap.from('.cap-left-item', { x: -30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
      gsap.from('.cap-right-item', { x: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
      gsap.from('.cap-hub', { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.4)', scrollTrigger: { trigger: el, start: 'top 75%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const renderCap = (cap: Capability, _index: number, side: 'left' | 'right') => {
    const isLeft = side === 'left';
    const itemClass = isLeft ? 'cap-left-item' : 'cap-right-item';
    return (
      <div
        key={cap.title}
        className={`${itemClass} group flex ${isLeft ? 'flex-row-reverse lg:flex-row-reverse' : 'flex-row'} items-start gap-4`}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${cap.color1}, ${cap.color2})` }}
        >
          <cap.icon className="w-6 h-6 text-white" />
        </div>
        {/* Text */}
        <div className={`${isLeft ? 'lg:text-right' : 'lg:text-left'} text-left`}>
          <h3 className="font-poppins font-semibold text-white text-lg mb-2 group-hover:text-[#e91e63] transition-colors duration-300">
            {cap.title}
          </h3>
          <p className="text-white/40 text-sm leading-relaxed">
            {cap.desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-20 bg-[#0a0a1a] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.04) 0%, rgba(124,77,255,0.03) 50%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 cap-heading">
          <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Platform Capabilities</p>
          <h2 className="font-poppins font-bold text-white text-[clamp(1.75rem,3.5vw,2.5rem)] mb-3">
            Platform <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-white/35 text-sm max-w-[480px] mx-auto">
            Everything you need to create, manage, and optimize your in-store experience.
          </p>
        </div>

        {/* 3-column layout */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-6">
          {/* Left column */}
          <div className="lg:w-1/3 w-full space-y-10">
            {leftCaps.map((cap, i) => renderCap(cap, i, 'left'))}
          </div>

          {/* Center hub */}
          <div className="lg:w-1/3 w-full flex justify-center py-4 lg:py-0 cap-hub">
            <PlatformHub />
          </div>

          {/* Right column */}
          <div className="lg:w-1/3 w-full space-y-10">
            {rightCaps.map((cap, i) => renderCap(cap, i, 'right'))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========== WHY WE'RE DIFFERENT ========== */
interface WhyItem { num: string; title: string; desc: string; color1: string; color2: string }

const whyItems: WhyItem[] = [
  { num: '01', title: 'Pioneers in the Industry', desc: '13 years of setting the standard, long before the industry knew one existed.', color1: '#e91e63', color2: '#ff9800' },
  { num: '02', title: 'Always On. Always Available.', desc: 'Day or night, weekday or weekend, our team is there whenever your stores need us.', color1: '#7c4dff', color2: '#e91e63' },
  { num: '03', title: 'Execution at the Speed of Trust', desc: 'From request to live, we move fast so your brand never has to wait.', color1: '#00bcd4', color2: '#7c4dff' },
  { num: '04', title: 'Brands That Stay', desc: 'We have one of the lowest client exit rates in the industry. Brands stay with Moojic because they never need to leave.', color1: '#ff9800', color2: '#ffb74d' },
  { num: '05', title: 'Support That Feels Instant', desc: 'Our response times are so fast, long-term clients think it\'s normal. It isn\'t. It\'s just Moojic.', color1: '#e91e63', color2: '#7c4dff' },
  { num: '06', title: 'Technology Built to Last', desc: 'Battle-tested over a decade and constantly evolving. Reliable, scalable technology designed to grow with your brand.', color1: '#2d1b69', color2: '#e91e63' },
  { num: '07', title: 'Mood Perfectionists', desc: 'Every transition, tempo, and genre is carefully designed to make your brand heard.', color1: '#4caf50', color2: '#00bcd4' },
  { num: '08', title: 'Ahead of the Curve', desc: 'From Digital Jukeboxes to interactive games, we build what the industry adopts next.', color1: '#ff5722', color2: '#ff9800' },
];

function WhyDifferentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from('.why-heading', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      gsap.from('.why-item', { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-[#0a0a1a] relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.04) 0%, rgba(233,30,99,0.02) 50%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14 why-heading">
          <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Why We&apos;re Different</p>
          <h2 className="font-poppins font-bold text-white text-[clamp(1.75rem,3.5vw,2.5rem)] mb-3">
            8 Reasons Brands <span className="gradient-text">Never Leave Us</span>
          </h2>
          <p className="text-white/35 text-sm max-w-[480px] mx-auto">
            The reason our average brand relationship spans years, not months.
          </p>
        </div>

        {/* Minimal editorial grid */}
        <div className="grid sm:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10">
          {whyItems.map((item) => (
            <div key={item.title} className="why-item flex items-start gap-5">
              {/* Large gradient number */}
              <span
                className="font-poppins font-extrabold text-4xl sm:text-5xl leading-none shrink-0"
                style={{ background: `linear-gradient(135deg, ${item.color1}, ${item.color2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                {item.num}
              </span>
              {/* Content */}
              <div className="pt-1">
                <h4 className="font-poppins font-semibold text-white text-base sm:text-lg mb-1.5">{item.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== FEATURES THAT SET US APART ========== */
interface SetApartFeature { icon: React.ElementType; title: string; desc: string; color1: string; color2: string }

const setApartFeatures: SetApartFeature[] = [
  { icon: Users, title: 'Brand Profiling', desc: 'Built around your brand\'s identity, audience, and store atmosphere.', color1: '#e91e63', color2: '#ff9800' },
  { icon: Wifi, title: 'Internet Free', desc: 'Offline playback designed for uninterrupted in-store performance.', color1: '#7c4dff', color2: '#e91e63' },
  { icon: Headphones, title: 'Proof of Play', desc: 'Real-time playback monitoring across every store location.', color1: '#00bcd4', color2: '#7c4dff' },
  { icon: Shuffle, title: 'Daily Shuffle', desc: 'Fresh playlist sequencing to keep the experience feeling new.', color1: '#ff9800', color2: '#ffb74d' },
  { icon: Lock, title: 'Central Lock', desc: 'Complete control over what plays inside your stores.', color1: '#e91e63', color2: '#7c4dff' },
  { icon: RefreshCw, title: 'Auto-Pilot', desc: 'Smart automation that keeps your music running seamlessly.', color1: '#2d1b69', color2: '#e91e63' },
  { icon: Bell, title: 'Offline Alerts', desc: 'Instant notifications whenever a store goes offline.', color1: '#00bcd4', color2: '#4caf50' },
  { icon: Cpu, title: 'AI Engine', desc: 'AI-powered playlist intelligence trained around your brand\'s sonic identity and store mood.', color1: '#ff5722', color2: '#ff9800' },
];

function SetApartCard({ f, index }: { f: SetApartFeature; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="diff-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1"
      style={{ borderColor: hovered ? `${f.color1}25` : 'rgba(255,255,255,0.06)', transitionDelay: `${index * 50}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${f.color1}, ${f.color2})`, opacity: hovered ? 1 : 0, transition: 'opacity 0.5s' }} />

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${f.color1}, ${f.color2})` }}
        >
          <f.icon className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="pt-0.5">
          <h4 className="font-poppins font-semibold text-white text-base sm:text-lg mb-1.5">{f.title}</h4>
          <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ========== REALISTIC QR COMPONENT ========== */
function RealisticQR({ size = 21 }: { size?: number }) {
  const cells: boolean[] = [];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      let isBlack = false;

      // Position detection patterns (7x7) — top-left, top-right, bottom-left
      const isTopLeft = r < 7 && c < 7;
      const isTopRight = r < 7 && c >= size - 7;
      const isBottomLeft = r >= size - 7 && c < 7;

      if (isTopLeft || isTopRight || isBottomLeft) {
        const lr = isTopRight ? r : isBottomLeft ? r - (size - 7) : r;
        const lc = isTopRight ? c - (size - 7) : isBottomLeft ? c : c;
        // Outer square
        if (lr === 0 || lr === 6 || lc === 0 || lc === 6) isBlack = true;
        // Inner square
        else if (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4) isBlack = true;
      }
      // Timing patterns (alternating) — row 6 and col 6
      else if (r === 6 || c === 6) {
        isBlack = (r + c) % 2 === 0;
      }
      // Dark module (always black) near bottom-right of top-left marker
      else if (r === 8 && c === 8) {
        isBlack = true;
      }
      // Fake data modules — pseudo-random based on position
      else {
        const noise = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
        isBlack = (noise - Math.floor(noise)) > 0.5;
      }

      cells.push(isBlack);
    }
  }

  return (
    <div
      className="grid gap-0 w-full h-full"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, gridTemplateRows: `repeat(${size}, 1fr)` }}
    >
      {cells.map((isBlack, i) => (
        <div key={i} className={isBlack ? 'bg-[#0a0a1a]' : 'bg-white'} />
      ))}
    </div>
  );
}

/* ========== DIGITAL JUKEBOX SECTION ========== */
function JukeboxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('.juke-left', { x: -30, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });

      const qr = qrRef.current;
      const phone = phoneRef.current;
      if (!qr || !phone) return;

      const phoneItems = phone.querySelectorAll('.phone-item');

      // Set initial states
      gsap.set(phone, { opacity: 0, scale: 0.85 });
      gsap.set(phoneItems, { opacity: 0, y: 15 });

      // QR → Phone animation timeline
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      });

      // Step 1: QR code pulses and scans
      tl.to(qr.querySelector('.qr-pulse'), { scale: 1.15, duration: 0.4, ease: 'power2.out' })
        .to(qr.querySelector('.qr-pulse'), { scale: 1, duration: 0.3, ease: 'power2.in' })
        .to(qr.querySelector('.qr-scan-line'), { opacity: 0, duration: 0.2 }, '-=0.1');

      // Step 2: QR shrinks and fades out
      tl.to(qr, { scale: 0.3, opacity: 0, y: -60, duration: 0.6, ease: 'power3.in' }, '-=0.1');

      // Step 3: Phone frame fades in and scales up
      tl.to(phone, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.3');

      // Step 4: Phone UI items stagger in
      tl.to(phoneItems, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.4');

      // Step 5: EQ bars fade in with phone items
      // (bars animate via CSS hover, no GSAP scale needed)
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const points = [
    'Your brand controls the library. Customers choose within it.',
    'One scan. No app. No sign-up. Instant access.',
    'Requests play live in a real-time queue.',
    'Track what your customers love with built-in engagement data.',
    'Broadcast promotions straight to your customers\' phones.',
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-[#0a0a1a] relative overflow-hidden">
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
              The Feature Nobody Expected. The One <span className="gradient-text">Everyone Loves.</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-[480px]">
              Customers scan a QR code, pick a song from your branded playlists, and hear it play live in your store. No app. No sign-up. Just the music they wanted to hear.
            </p>
            <div className="space-y-3 mb-8">
              {points.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#e91e63]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#e91e63]" />
                  </div>
                  <span className="text-white/50 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Interactive Games Highlight */}
            <Link
              to="/games"
              className="group/games inline-flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/[0.03] border border-[#00bcd4]/30 hover:bg-white/[0.06] hover:border-[#00bcd4]/50 transition-all duration-300 mb-6"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00bcd4] to-[#7c4dff] flex items-center justify-center shadow-lg shadow-[#00bcd4]/20 group-hover/games:scale-110 transition-transform">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-poppins font-bold text-white text-lg group-hover/games:text-[#00bcd4] transition-colors">
                  Interactive Games
                </p>
                <p className="text-white/40 text-sm">
                  Because shopping should always be fun.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#00bcd4] ml-2 group-hover/games:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: Visual — QR → Phone Animation */}
          <div className="lg:w-1/2 juke-right flex justify-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="relative w-[280px] h-[420px]">
              {/* PHASE 1: Realistic QR Code */}
              <div ref={qrRef} className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="qr-pulse relative w-36 h-36 rounded-2xl bg-white p-3 shadow-2xl">
                  <RealisticQR size={21} />
                  {/* Scanning line */}
                  <div className="qr-scan-line absolute left-1 right-1 h-[2px] bg-[#00bcd4] shadow-[0_0_10px_#00bcd4] animate-[qr-scan_2s_ease-in-out_infinite] rounded-full" />
                </div>
                <p className="text-white/40 text-xs mt-5 font-medium">Scan to play</p>
                {/* Scan glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[#00bcd4]/5 blur-xl pointer-events-none" />
              </div>

              {/* PHASE 2: Phone UI */}
              <div ref={phoneRef} className="absolute inset-0">
                <div className="bg-[#12121e] border border-white/[0.08] rounded-3xl p-4 shadow-2xl h-full flex flex-col">
                  {/* Phone header */}
                  <div className="phone-item flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                        <Music className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-white">Moojic Jukebox</p>
                        <p className="text-[8px] text-white/30">Scan to play</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-md bg-white p-0.5">
                      <QrCode className="w-full h-full text-[#0a0a1a]" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Now playing */}
                  <div className="phone-item flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold text-white truncate">Summer Vibes</p>
                      <p className="text-[8px] text-white/30">Requested by Table 4</p>
                    </div>
                  </div>

                  {/* Request queue */}
                  <p className="phone-item text-[8px] text-white/30 uppercase tracking-wider mb-2">Up Next</p>
                  {['Midnight Jazz', 'Pop Hits 2025', 'Acoustic Chill'].map((track, i) => (
                    <div key={track} className="phone-item flex items-center gap-2 p-2 rounded-lg mb-1" style={{ background: i === 0 ? 'rgba(233,30,99,0.05)' : 'rgba(255,255,255,0.02)', border: `1px solid ${i === 0 ? 'rgba(233,30,99,0.1)' : 'rgba(255,255,255,0.04)'}` }}>
                      <span className="text-[9px] text-white/20 w-4">{i + 1}</span>
                      <span className="text-[10px] text-white/60 flex-1">{track}</span>
                      <Smartphone className="w-3 h-3 text-white/20" />
                    </div>
                  ))}

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* EQ at bottom */}
                  <div className="phone-item flex items-end gap-[3px] h-10 mt-4 px-1">
                    {[35, 55, 40, 75, 50, 65, 30, 80, 45, 60].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-[2px] transition-all duration-500 ease-out"
                        style={{
                          height: `${hovered ? h : h * 0.25}%`,
                          background: hovered ? 'linear-gradient(180deg, #e91e63, #ff9800)' : 'rgba(233,30,99,0.12)',
                          transitionDelay: `${i * 40}ms`,
                          minHeight: '3px',
                        }}
                      />
                    ))}
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

/* ========== MUSIC LICENSING ========== */
function MusicLicensingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from('.lic-heading', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const card1Bullets = [
    '1M+ tracks across every genre and mood',
    'No additional licenses needed.',
    'Pre-cleared for commercial use across all your stores',
    'Moojic License certificates issued across all your stores',
    'Save up to 70% on your music licensing costs',
    'Licensed directly from artists across the globe',
    'International standard music, commercially cleared',
  ];

  const card2Bullets = [
    'Official PPL channel partner in India',
    'Industry-best licensing rates, guaranteed',
    'End-to-end license procurement managed by our team',
    'Licensing support for stores, events, and brand activations',
    'Fast turnaround with complete paperwork handling',
    'Coverage for commercial music played across your spaces',
    'Dedicated licensing manager for your brand',
    'Renewal tracking and license management included',
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-[#0a0a1a] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.04) 0%, rgba(0,188,212,0.03) 50%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14 lic-heading">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4caf50]/10 border border-[#4caf50]/20 mb-5">
            <Shield className="w-4 h-4 text-[#4caf50]" />
            <span className="text-xs font-semibold text-[#4caf50] uppercase tracking-[0.15em]">Music Licensing</span>
          </div>
          <h2 className="font-poppins font-bold text-white text-[clamp(1.75rem,3.5vw,2.5rem)] mb-3">
            India&apos;s Most Trusted <span className="gradient-text">Music Licensing Partner</span>
          </h2>
          <p className="text-white/35 text-sm max-w-[520px] mx-auto">
            Two ways to stay legally covered. Whichever works best for your brand.
          </p>
        </div>

        {/* Two Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Card 1 — Copyright-Free */}
          <div className="lic-card relative rounded-3xl border border-white/[0.10] bg-[#12121e] p-8 sm:p-10 overflow-hidden transition-all duration-500 hover:border-[#4caf50]/30 hover:-translate-y-1 shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4caf50] to-[#00bcd4]" />

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4caf50]/10 border border-[#4caf50]/20 mb-4">
              <span className="text-[10px] font-semibold text-[#4caf50] uppercase tracking-wider">Zero Licensing Costs</span>
            </div>

            <h3 className="font-poppins font-bold text-white text-xl sm:text-2xl mb-2">
              The Copyright-Free Collection
            </h3>
            <p className="text-[#4caf50] text-sm font-medium mb-4">
              Zero Licensing Costs. Zero Worries. Fully Covered. No Extra Licenses Needed.
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Every track in our library is licensed directly from artists across the globe and cleared for commercial use. No PPL. No IPRS. International standard music, already playing at some of the biggest brands in the world. You&apos;ve heard it. You just didn&apos;t know it was us.
            </p>

            <ul className="space-y-3">
              {card1Bullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#4caf50]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#4caf50]" />
                  </div>
                  <span className="text-white/50 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 — PPL Partner */}
          <div className="lic-card relative rounded-3xl border border-white/[0.10] bg-[#12121e] p-8 sm:p-10 overflow-hidden transition-all duration-500 hover:border-[#e91e63]/30 hover:-translate-y-1 shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#e91e63] to-[#ff9800]" />

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e91e63]/10 border border-[#e91e63]/20 mb-4">
              <span className="text-[10px] font-semibold text-[#e91e63] uppercase tracking-wider">Official PPL Partner</span>
            </div>

            <h3 className="font-poppins font-bold text-white text-xl sm:text-2xl mb-2">
              The PPL Licensing Partner Trusted by Leading Brands
            </h3>
            <p className="text-[#e91e63] text-sm font-medium mb-4">
              PPL licenses at the Best Rates. Guaranteed.
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Want to play commercially popular music in your stores? As an official PPL channel partner, we are the fastest, most trusted route to getting your brand legally covered with a PPL license at rates no one else can match.
            </p>

            <ul className="space-y-3">
              {card2Bullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#e91e63]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#e91e63]" />
                  </div>
                  <span className="text-white/50 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 lic-heading">
          <Link to="/contact" className="inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white px-8 py-4 rounded-xl gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all">
            License Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ========== MAIN PAGE ========== */
export default function InStoreRadioPage() {
  const diffsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dEl = diffsRef.current;
    if (dEl) {
      const cards = dEl.querySelectorAll('.diff-card');
      if (cards.length) gsap.from(cards, { y: 20, duration: 0.4, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: dEl, start: 'top 85%', once: true } });
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => { if (t.trigger === diffsRef.current) t.kill(); });
    };
  }, []);

  return (
    <div className="bg-[#0a0a1a] min-h-screen">
      <SEO
        title="In-Store Radio — AI-Curated Music for Retail | Moojic"
        description="The music your brand would choose, if it could. AI-powered playlists shaped by your brand identity, audience, and store mood. Trusted across 20,000+ locations."
        path="/service/in-store-radio"
        image="/assets/service_radio.jpg"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'In-Store Radio',
          name: 'Moojic In-Store Radio',
          provider: { '@type': 'Organization', name: 'Moojic', url: 'https://moojicwebsite.vercel.app' },
          areaServed: { '@type': 'Country', name: 'India' },
          description: 'AI-curated in-store radio service. Brand-aligned playlists, mood sensing, sonic identity, voice overs, jukebox, and licensing for retail locations.',
          url: 'https://moojicwebsite.vercel.app/service/in-store-radio',
          image: 'https://moojicwebsite.vercel.app/assets/service_radio.jpg',
          offers: { '@type': 'Offer', availability: 'https://schema.org/InStock' },
        }}
      />
      <Hero />
      <IntroSection />

      <CapabilitiesSection />
      <WhyDifferentSection />

      {/* Features That Set Us Apart */}
      <section ref={diffsRef} className="py-20 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.04) 0%, rgba(233,30,99,0.02) 50%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-3">The Moojic Edge</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.75rem,3.5vw,2.5rem)] mb-3">
              Features That <span className="gradient-text">Set Us Apart</span>
            </h2>
            <p className="text-white/35 text-sm max-w-[480px] mx-auto">
              Everything you need to create, manage, and optimize your in-store audio.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {setApartFeatures.map((f, i) => (
              <SetApartCard key={f.title} f={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Jukebox */}
      <JukeboxSection />
      <MusicLicensingSection />

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
