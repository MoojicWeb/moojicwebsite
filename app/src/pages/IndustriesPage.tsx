import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroVideo from '@/components/HeroVideo';
import SEO from '@/components/SEO';
import {
  Utensils, Scissors, ShoppingBag, Coffee, Film,
  Building2, Dumbbell, Hotel, ShoppingCart, BookOpen,
  Briefcase, Car, ArrowRight, Music, Sparkles,
  Globe, Check,
} from 'lucide-react';
import { industries } from '@/data/industries';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  restaurants: Utensils, salon: Scissors, retail: ShoppingBag, cafe: Coffee,
  cinema: Film, mall: Building2, gym: Dumbbell, hotel: Hotel,
  supermarket: ShoppingCart, bookstore: BookOpen, workspace: Briefcase, automotive: Car,
};

const colorMap: Record<string, [string, string]> = {
  restaurants: ['#e91e63', '#ff9800'], salon: ['#7c4dff', '#e91e63'],
  retail: ['#00bcd4', '#7c4dff'], cafe: ['#ff9800', '#ffb74d'],
  cinema: ['#2d1b69', '#7c4dff'], mall: ['#e91e63', '#7c4dff'],
  gym: ['#ff9800', '#e91e63'], hotel: ['#7c4dff', '#00bcd4'],
  supermarket: ['#00bcd4', '#4caf50'], bookstore: ['#8d6e63', '#ff9800'],
  workspace: ['#607d8b', '#00bcd4'], automotive: ['#37474f', '#ff9800'],
};

/* ========== HERO ========== */
function Hero() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLDivElement>(null);

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
      {/* Video Background */}
      <HeroVideo src="/assets/industries-hero.mp4" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/50 to-[#0a0a1a]/30" />
      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[70%] h-[70%] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.25), transparent 70%)', top: '10%', left: '-10%', animation: 'mesh-blob-1 18s ease-in-out infinite alternate' }} />
        <div className="absolute w-[60%] h-[60%] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(255,152,0,0.2), transparent 70%)', bottom: '-10%', right: '-5%', animation: 'mesh-blob-2 22s ease-in-out infinite alternate' }} />
        <div className="absolute w-[50%] h-[50%] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.25), transparent 70%)', top: '30%', right: '20%', animation: 'mesh-blob-3 15s ease-in-out infinite alternate' }} />
        {/* Mouse-following glow */}
        <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-700 ease-out" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.12), transparent 70%)', left: `calc(${mouse.x}% - 200px)`, top: `calc(${mouse.y}% - 200px)` }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-[800px] mx-auto py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
          <Globe className="w-4 h-4 text-[#e91e63]" />
          <span className="text-xs font-semibold text-[#e91e63] uppercase tracking-wider">12 Industries Served</span>
        </div>
        <h1 className="font-poppins font-extrabold text-white text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] mb-5">
          Tailored For <span className="gradient-text">Every</span> Space
        </h1>
        <p className="text-white/40 text-base sm:text-lg max-w-[560px] mx-auto leading-relaxed mb-8">
          From cozy cafes to bustling malls — we craft sonic identities that resonate with your brand and your audience.
        </p>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="font-poppins font-bold text-2xl text-white">12</p>
            <p className="text-[10px] text-white/30 uppercase tracking-wider">Industries</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="font-poppins font-bold text-2xl text-white">20K+</p>
            <p className="text-[10px] text-white/30 uppercase tracking-wider">Locations</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="font-poppins font-bold text-2xl text-white">350+</p>
            <p className="text-[10px] text-white/30 uppercase tracking-wider">Brands</p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}

/* ========== INDUSTRY CARD ========== */
function IndustryCard({ industry, index }: { industry: typeof industries[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[industry.id] || Music;
  const [color1, color2] = colorMap[industry.id] || ['#e91e63', '#ff9800'];

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
      className="industry-card group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500"
      style={{
        borderColor: isHovered ? `${color1}30` : 'rgba(255,255,255,0.06)',
        transitionDelay: `${index * 30}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(400px circle at calc(var(--mx,0.5)*100%) calc(var(--my,0.5)*100%), ${color1}12, transparent 40%)` }}
      />

      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${color1}, ${color2})`, opacity: isHovered ? 1 : 0.3, transition: 'opacity 0.5s' }} />

      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={industry.image}
          alt={industry.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          style={{ filter: isHovered ? 'brightness(0.5)' : 'brightness(0.65)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/40 to-transparent" />

        {/* Icon overlay */}
        <div className="absolute top-4 left-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Name on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-poppins font-bold text-xl text-white mb-1">{industry.name}</h3>
          <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider" style={{ color: color1 }}>
            <Sparkles className="w-3 h-3" /> AI-Curated
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-white/40 text-xs leading-relaxed mb-4">{industry.description}</p>

        {/* Benefits */}
        <div className="space-y-2">
          {industry.benefits.map((b, i) => (
            <div key={b} className="flex items-start gap-2 transition-all duration-300" style={{ transitionDelay: `${i * 40}ms`, opacity: isHovered ? 1 : 0.6 }}>
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${color1}15` }}>
                <Check className="w-2.5 h-2.5" style={{ color: color1 }} />
              </div>
              <span className="text-[11px] text-white/50 group-hover:text-white/70 transition-colors">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== CTA BAR ========== */
function CTABar() {
  return (
    <section className="py-16 bg-[#0a0a1a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(233,30,99,0.06), transparent 70%)', filter: 'blur(60px)' }} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 sm:p-12 text-center">
          <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,4vw,2.5rem)] mb-3">
            Not Sure What Fits <span className="gradient-text">Your Brand?</span>
          </h2>
          <p className="text-white/40 text-sm max-w-[480px] mx-auto mb-6">
            Our experts will analyze your space, brand identity, and audience to recommend the perfect sonic profile.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white px-8 py-4 rounded-xl gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all"
          >
            Get Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ========== MAIN PAGE ========== */
export default function IndustriesPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.industry-card');
    if (cards.length) {
      gsap.from(cards, {
        y: 30,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => { if (t.trigger === el) t.kill(); });
    };
  }, []);

  return (
    <div className="bg-[#0a0a1a] min-h-screen">
      <SEO
        title="Industries We Serve — Retail, Cafe, Salon, Hotel & More | Moojic"
        description="Every space has a sound. Moojic delivers tailored in-store audio, signage, and AV hardware for retail, restaurants, cafes, salons, gyms, hotels, malls, and more."
        path="/industries"
        image="/assets/industry_retail.jpg"
      />
      <Hero />

      {/* Grid */}
      <section className="py-16 bg-[#0a0a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Industries We Serve</p>
            <h2 className="font-poppins font-bold text-white text-[clamp(1.8rem,3vw,2.5rem)] mb-3">
              Sonic Identities For <span className="gradient-text">Every Space</span>
            </h2>
            <p className="text-white/40 text-sm max-w-[500px] mx-auto">
              Each industry has a unique sound. We find yours.
            </p>
          </div>

          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {industries.map((ind, i) => (
              <IndustryCard key={ind.id} industry={ind} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Floating visualizer decoration */}
      <div className="flex items-center justify-center gap-[3px] h-6 mb-4">
        {[35, 55, 25, 70, 40, 60, 30, 50, 65, 35, 45, 55].map((h, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-[#e91e63] to-[#ff9800] opacity-40"
            style={{ height: `${h * 0.15}px`, animation: `visualizer-bar 1.2s ease-in-out ${i * 0.08}s infinite alternate` }}
          />
        ))}
      </div>

      <CTABar />
    </div>
  );
}
