import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { blogPosts } from '@/data/blog';
import { Calendar, ArrowRight, User } from 'lucide-react';
import SEO, { JsonLd } from '@/components/SEO';

gsap.registerPlugin(ScrollTrigger);

const posts = blogPosts;

export default function BlogPage() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = featuredRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelector('.feat-image'), { x: -40, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      gsap.from(el.querySelector('.feat-content'), { x: 40, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.blog-card');
      if (cards.length) {
        gsap.from(cards, { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  const featured = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="bg-[#0a0a1a] min-h-screen">
      <SEO
        title="Blog — Insights on In-Store Audio, Signage & Retail | Moojic"
        description="Articles on in-store audio, digital signage, AV hardware, and creating unforgettable retail experiences. From the team at Moojic."
        path="/blog"
        image={posts[0]?.image}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Moojic Blog',
          url: 'https://moojicwebsite.vercel.app/blog',
          publisher: { '@type': 'Organization', name: 'Moojic', url: 'https://moojicwebsite.vercel.app' },
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            datePublished: p.date,
            url: `https://moojicwebsite.vercel.app/blog/${p.slug}`,
            image: `https://moojicwebsite.vercel.app${p.image}`,
            description: p.excerpt,
            author: { '@type': 'Organization', name: 'Moojic' },
          })),
        }}
      />
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0" style={{ animation: 'mesh-blob-1 22s ease-in-out infinite alternate', background: 'radial-gradient(ellipse 50% 40% at 40% 50%, rgba(233,30,99,0.25), transparent)' }} />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="relative z-10 text-center py-28 px-4">
          <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Our Blog</p>
          <h1 className="font-poppins font-bold text-white text-[clamp(2rem,4vw,3rem)] mb-4">Insights & Stories</h1>
          <p className="text-white/50 text-base max-w-[560px] mx-auto mb-4">
            Insights on in-store audio, digital signage, and creating unforgettable retail experiences.
          </p>
          <p className="text-white/30 text-xs">
            <Link to="/" className="text-white/50 hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Blog</span>
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={featuredRef} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden hover:border-white/[0.15] transition-all duration-500">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 feat-image relative overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full min-h-[300px] lg:min-h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full gradient-bg text-white text-xs font-semibold">Featured</span>
                </div>
              </div>
              <div className="lg:w-1/2 feat-content p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-white/40 text-xs mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {featured.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    By Moojic
                  </span>
                </div>
                <h2 className="font-poppins font-bold text-2xl lg:text-3xl text-white mb-4 leading-tight">{featured.title}</h2>
                <p className="text-white/50 leading-relaxed mb-8">{featured.excerpt}</p>
                <Link to={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 text-sm text-[#e91e63] font-semibold hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regular Posts Grid */}
      <section className="py-12 pb-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="blog-card group bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-500 block"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="w-9 h-9 rounded-full bg-[#e91e63] flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-white/30 text-xs mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-poppins font-semibold text-white text-base mb-2 line-clamp-2 group-hover:text-[#e91e63] transition-colors">{post.title}</h3>
                  <p className="text-sm text-white/40 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
