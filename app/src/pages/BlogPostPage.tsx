import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { getBlogPostBySlug } from '@/data/blog';
import SEO, { JsonLd } from '@/components/SEO';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const paragraphs = post.content?.split('\n\n') || [];
  const postUrl = `https://moojicwebsite.vercel.app/blog/${post.slug}`;
  const imageUrl = `https://moojicwebsite.vercel.app${post.image}`;

  return (
    <div className="bg-[#0a0a1a] min-h-screen">
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: imageUrl,
          datePublished: post.date,
          author: { '@type': 'Organization', name: 'Moojic', url: 'https://moojicwebsite.vercel.app' },
          publisher: {
            '@type': 'Organization',
            name: 'Moojic',
            logo: { '@type': 'ImageObject', url: 'https://moojicwebsite.vercel.app/logo.png' },
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
          url: postUrl,
        }}
      />
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-[#0a0a1a]">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/70 to-[#0a0a1a]/30" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 30% 60%, rgba(233,30,99,0.12), transparent)' }} />
        </div>

        <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-[#e91e63] text-sm mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 text-white/40 text-xs mb-5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              By Moojic
            </span>
          </div>

          <h1 className="font-poppins font-bold text-white text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 lg:py-20 relative">
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.06), transparent)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-1/4 -right-24 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(233,30,99,0.05), transparent)', filter: 'blur(80px)' }} />

        <div className="relative z-10 max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 sm:p-12 lg:p-14">
            <p className="text-base lg:text-lg text-white/70 leading-relaxed mb-10 font-medium border-l-2 border-[#e91e63]/40 pl-5">
              {post.excerpt}
            </p>

            <div className="space-y-6">
              {paragraphs.map((para, i) => {
                if (para.startsWith('## ')) {
                  return (
                    <h2 key={i} className="font-poppins font-bold text-white text-xl lg:text-2xl mt-10 mb-4 leading-tight">
                      {para.replace('## ', '')}
                    </h2>
                  );
                }
                if (para.startsWith('- ')) {
                  return (
                    <ul key={i} className="space-y-2.5 text-white/55 leading-relaxed">
                      {para.split('\n').map((item, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-[#e91e63] shrink-0">•</span>
                          <span>{item.replace('- ', '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-white/55 leading-relaxed text-[15px] lg:text-base">
                    {para}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Back to Blog footer link */}
          <div className="mt-10 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white hover:border-[#e91e63]/30 hover:bg-white/[0.06] text-sm font-medium transition-all">
              <ArrowLeft className="w-4 h-4" />
              All articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
