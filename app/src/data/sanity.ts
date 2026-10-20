const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'oudkj47x';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2025-01-01';

export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  content: string;
  date: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
}

export interface PageSeo {
  path: string;
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
}

interface SanityPostRecord {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  image?: string;
  content?: unknown;
  publishedAt?: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
}

interface PortableTextBlock {
  _type?: string;
  children?: Array<{ text?: string }>;
  style?: string;
  listItem?: string;
  url?: string;
  alt?: string;
  caption?: string;
}

function queryUrl(query: string, params: Record<string, string> = {}) {
  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set('query', query);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(`$${key}`, JSON.stringify(value)));
  return url.toString();
}

function portableTextToMarkdown(blocks: unknown): string {
  if (!Array.isArray(blocks)) return '';
  return (blocks as PortableTextBlock[]).map((block) => {
    if (block?._type === 'image' && block.url) {
      const alt = (block.alt || '').replace(/[\]]/g, '');
      return `![${alt}](${block.url})${block.caption ? `\n${block.caption}` : ''}`;
    }
    if (block?._type !== 'block' || !Array.isArray(block.children)) return '';
    const text = block.children.map((child) => child.text || '').join('');
    if (block.style === 'h2') return `## ${text}`;
    if (block.style === 'h3') return `### ${text}`;
    if (block.listItem) return `- ${text}`;
    return text;
  }).filter(Boolean).join('\n\n');
}

export async function sanityQuery<T>(query: string, params?: Record<string, string>): Promise<T> {
  const response = await fetch(queryUrl(query, params), { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Sanity query failed (${response.status})`);
  const result = await response.json();
  return result.result as T;
}

const postProjection = `{
  _id, title, "slug": slug.current, excerpt,
  "image": coverImage.asset->url,
  "content": content[]{ ..., _type == "image" => {alt, caption, "url": asset->url} }, publishedAt, featured,
  seoTitle, seoDescription, canonicalUrl
}`;

export async function fetchSanityPosts(): Promise<SanityBlogPost[]> {
  const rows = await sanityQuery<SanityPostRecord[]>(`*[_type == "blogPost" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) ${postProjection}`);
  return rows.map((row) => ({
    _id: row._id,
    title: row.title || '',
    slug: row.slug || '',
    excerpt: row.excerpt || '',
    image: row.image || '/assets/ai_curation_visual.jpg',
    content: portableTextToMarkdown(row.content),
    date: row.publishedAt || '',
    featured: Boolean(row.featured),
    seoTitle: row.seoTitle || undefined,
    seoDescription: row.seoDescription || undefined,
    canonicalUrl: row.canonicalUrl || undefined,
  }));
}

export async function fetchSanityPost(slug: string): Promise<SanityBlogPost | undefined> {
  const rows = await sanityQuery<SanityPostRecord[]>(`*[_type == "blogPost" && slug.current == $slug && !(_id in path("drafts.**"))][0...1] ${postProjection}`, { slug });
  const row = rows[0];
  if (!row) return undefined;
  return {
    _id: row._id,
    title: row.title || '',
    slug: row.slug || '',
    excerpt: row.excerpt || '',
    image: row.image || '/assets/ai_curation_visual.jpg',
    content: portableTextToMarkdown(row.content),
    date: row.publishedAt || '',
    featured: Boolean(row.featured),
    seoTitle: row.seoTitle || undefined,
    seoDescription: row.seoDescription || undefined,
    canonicalUrl: row.canonicalUrl || undefined,
  };
}

export async function fetchPageSeo(path: string): Promise<PageSeo | undefined> {
  const rows = await sanityQuery<PageSeo[]>(`*[_type == "pageSeoSettings" && !(_id in path("drafts.**"))][0].pages[path == $path][0...1] { path, title, description, "image": socialImage.asset->url, canonicalUrl }`, { path });
  return rows[0];
}

export function isSanityConfigured() {
  return Boolean(projectId && dataset);
}
