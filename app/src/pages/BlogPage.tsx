import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollEntrance } from '@/hooks/useScrollEntrance';

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    title: 'The Science Behind Music and Retail',
    date: 'December 5, 2022',
    excerpt: 'Understanding the psychology of sound and its profound influence on shopping behavior, customer dwell time, and purchase decisions. Dive into the research that powers Moojic\'s approach to in-store audio.',
    image: '/assets/blog_thumb_4.jpg',
    featured: true,
  },
  {
    title: 'From Boring to Astounding',
    date: 'December 1, 2022',
    excerpt: 'How the right in-store music transforms customer experience from mundane to memorable. The difference between background noise and brand-defining audio.',
    image: '/assets/blog_thumb_1.jpg',
    featured: false,
  },
  {
    title: 'How In-Store Radio Adds Value',
    date: 'December 2, 2022',
    excerpt: 'The measurable impact of curated audio on dwell time, customer satisfaction, and sales. Real data from real deployments across 20,000 locations.',
    image: '/assets/blog_thumb_2.jpg',
    featured: false,
  },
  {
    title: 'The Magic of Digital Signage',
    date: 'December 3, 2022',
    excerpt: 'What digital signage can do for retail stores — the truth about in-store marketing that most brands are missing out on.',
    image: '/assets/blog_thumb_3.jpg',
    featured: false,
  },
];

export default function BlogPage() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const { ref: gridRef } = useScrollEntrance();
  const { ref: newsletterRef } = useScrollEntrance();

  useEffect(() => {
    const el = featuredRef.current;
    if (!el) return;
    gsap.from(el.querySelector('.feat-image'), { x: -40, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    gsap.from(el.querySelector('.feat-content'), { x: 40, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  const featured = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-[#1a0a3e]">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0" style={{ animation: 'mesh-blob-1 22s ease-in-out infinite alternate', background: 'radial-gradient(ellipse 50% 40% at 40% 50%, rgba(233,30,99,0.2), transparent)' }} />
        </div>
        <div className="relative z-10 text-center py-24 px-4">
          <h1 className="font-poppins font-bold text-white text-[clamp(2rem,4vw,3rem)] mb-3">Blogs — Moojic</h1>
          <p className="text-white/70 text-lg max-w-[560px] mx-auto mb-4">
            Insights on in-store audio, digital signage, and creating unforgettable retail experiences.
          </p>
          <p className="text-white/50 text-xs">
            <Link to="/" className="text-white/70 hover:text-white hover:underline transition-colors">Home</Link> / Blog
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-[#f8f7fb]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          <div ref={featuredRef} className="bg-white rounded-2xl overflow-hidden shadow-lg mb-12">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 feat-image">
                <img src={featured.image} alt={featured.title} className="w-full h-full min-h-[250px] object-cover" />
              </div>
              <div className="lg:w-1/2 feat-content p-8 flex flex-col justify-center">
                <span className="inline-block self-start px-3 py-1 rounded-full gradient-bg text-white text-xs font-medium mb-4">Featured</span>
                <p className="text-xs text-[#9e9eb5] mb-2">{featured.date}</p>
                <h2 className="font-poppins font-bold text-2xl text-[#1a1a5e] mb-4">{featured.title}</h2>
                <p className="text-[#6b6b8d] leading-relaxed mb-6">{featured.excerpt}</p>
                <span className="text-sm text-[#e91e63] font-medium">Read Article →</span>
              </div>
            </div>
          </div>

          {/* Regular Posts */}
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <div key={post.title} className="animate-item group bg-white rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(45,27,105,0.08)] hover:shadow-[0_8px_40px_rgba(45,27,105,0.12)] transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-[#9e9eb5] mb-2">{post.date}</p>
                  <h3 className="font-poppins font-semibold text-[#1a1a5e] text-base mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-[#6b6b8d] line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#9e9eb5]">By Moojic</span>
                    <span className="text-xs text-[#e91e63] font-medium">Read More →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section ref={newsletterRef} className="py-16 bg-gradient-to-r from-[#e91e63] to-[#ff9800]">
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <h3 className="animate-item font-poppins font-semibold text-white text-xl mb-3">Stay in the Loop</h3>
          <p className="animate-item text-white/85 text-sm mb-6">
            Get the latest insights on in-store audio, digital signage, and retail innovation delivered to your inbox.
          </p>
          <div className="animate-item flex max-w-[480px] mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-sm outline-none"
            />
            <button className="px-6 py-3 bg-[#1a0a3e] text-white text-sm font-medium rounded-r-lg hover:bg-[#2d1b69] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
