// Per-route SEO metadata. React 19 hoists <title>, <meta>, and <link>
// from any component up to <head> automatically — no helmet/provider needed.

const SITE_URL = 'https://moojicwebsite.vercel.app';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/ai_curation_visual.jpg`;

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

export default function SEO({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
}: SEOProps) {
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_OG_IMAGE;
  const fullTitle = title.includes('Moojic') ? title : `${title} | Moojic`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Moojic" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
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
