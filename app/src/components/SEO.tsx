import { useEffect, useState } from 'react';
import { fetchPageSeo } from '@/data/sanity';

// Per-route SEO metadata. React 19 hoists <title>, <meta>, and <link>
// from any component up to <head> automatically — no helmet/provider needed.

const SITE_URL = 'https://moojic.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/ai_curation_visual.jpg`;

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  canonicalUrl?: string;
}

export default function SEO({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
  canonicalUrl,
}: SEOProps) {
  const [cmsSeo, setCmsSeo] = useState<{ title?: string; description?: string; image?: string; canonicalUrl?: string }>();
  useEffect(() => {
    let active = true;
    setCmsSeo(undefined);
    fetchPageSeo(path)
      .then((seo) => { if (active && seo) setCmsSeo(seo); })
      .catch(() => {})
      .finally(() => {
        if (active) document.documentElement.dataset.sanitySeoReadyPath = path;
      });
    return () => { active = false; };
  }, [path]);

  const finalTitle = cmsSeo?.title || title;
  const finalDescription = cmsSeo?.description || description;
  const finalImage = cmsSeo?.image || image;
  const canonical = canonicalUrl || cmsSeo?.canonicalUrl || `${SITE_URL}${path}`;
  const ogImage = finalImage ? (finalImage.startsWith('http') ? finalImage : `${SITE_URL}${finalImage}`) : DEFAULT_OG_IMAGE;
  const fullTitle = finalTitle.includes('Moojic') ? finalTitle : `${finalTitle} | Moojic`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Moojic" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@MoojicR" />
    </>
  );
}

// JSON-LD structured data component. Pass a JSON-LD object;
// it renders as a script tag in <head>.
interface JsonLdProps {
  data: object | object[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

