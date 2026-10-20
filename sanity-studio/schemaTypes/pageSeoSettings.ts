import { defineField, defineType } from 'sanity';

const paths = [
  '/', '/sample-player', '/service/in-store-radio', '/service/digital-signage',
  '/service/av-hardware', '/industries', '/games', '/blog', '/contact',
];

const initialPages = [
  { path: '/', title: 'Moojic | In-Store Audio, Digital Signage & AV', description: 'Moojic helps brands sound, look, and feel exactly the way they were meant to. AI-curated in-store radio, digital signage, and AV hardware across 20,000+ locations in 12 countries.' },
  { path: '/sample-player', title: 'AI Curated Sample Player | Moojic', description: 'Pick your store type and brand mood and hear AI-curated playlists Moojic builds for retail brands.' },
  { path: '/service/in-store-radio', title: 'In-Store Radio | Moojic', description: 'AI-powered playlists shaped by your brand identity, audience, and store mood. Trusted across 20,000+ locations.' },
  { path: '/service/digital-signage', title: 'Digital Signage | Moojic', description: 'Centralized digital signage with real-time updates, smart scheduling, brand-aligned content, and proof of play.' },
  { path: '/service/av-hardware', title: 'AV Hardware | Moojic', description: 'Acoustic design, speaker systems, professional installation, signage displays, and space planning.' },
  { path: '/industries', title: 'Industries We Serve | Moojic', description: 'Tailored in-store audio, signage, and AV hardware for retail, restaurants, cafes, salons, gyms, hotels, and more.' },
  { path: '/games', title: 'Interactive Retail Games | Moojic', description: 'Spin the Wheel, scratch a card, or try the Slot Machine. Every play ends with a reward that brings customers back.' },
  { path: '/blog', title: 'Moojic Blog | Insights & Stories', description: 'Articles on in-store audio, digital signage, AV hardware, and creating unforgettable retail experiences.' },
  { path: '/contact', title: 'Contact Moojic', description: 'Speak to Moojic about in-store audio, digital signage, AV hardware, or partnerships.' },
];

export const pageSeoSettings = defineType({
  name: 'pageSeoSettings',
  title: 'Page SEO settings',
  type: 'document',
  initialValue: { pages: initialPages },
  fields: [
    defineField({
      name: 'pages', title: 'Page metadata', type: 'array',
      of: [{
        type: 'object', name: 'pageSeo', title: 'Page SEO', fields: [
          defineField({ name: 'path', title: 'Website page', type: 'string', options: { list: paths.map((value) => ({ title: value === '/' ? 'Home page ( / )' : value, value })) }, validation: (rule) => rule.required() }),
          defineField({ name: 'title', title: 'SEO title', type: 'string', validation: (rule) => rule.max(65) }),
          defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 2, validation: (rule) => rule.max(160) }),
          defineField({ name: 'socialImage', title: 'Social sharing image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'canonicalUrl', title: 'Canonical URL (optional)', type: 'url' }),
        ],
        preview: { select: { title: 'path', subtitle: 'title' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'SEO for website pages', subtitle: 'Edit titles, descriptions, and social images' }) },
});
