export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  featured?: boolean;
  slug: string;
  content?: string;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const blogPosts: BlogPost[] = [
  {
    title: 'The Science Behind Music and Retail',
    date: 'December 5, 2022',
    excerpt: 'Understanding the psychology of sound and its profound influence on shopping behavior, customer dwell time, and purchase decisions. Dive into the research that powers Moojic\'s approach to in-store audio.',
    image: '/assets/ai_curation_visual.jpg',
    featured: true,
    slug: slugify('The Science Behind Music and Retail'),
    content: `Music has a profound effect on human psychology, and retailers have been harnessing this power for decades. Studies show that the right background music can increase customer dwell time by up to 40% and boost sales by as much as 15%.

## The Psychology of Sound

When customers enter a store, their brains are constantly processing environmental cues. Music affects mood, energy levels, and even perception of time. Slow-tempo music encourages shoppers to browse longer, while upbeat tracks create a sense of urgency during sales events.

## Tempo and Purchase Behavior

Research from the Journal of Marketing found that:
- Slow music = longer dwell time, higher average spend
- Fast music = faster movement, impulse purchases
- Familiar music = comfort and trust
- Novel music = curiosity and exploration

## The Moojic Approach

At Moojic, we don't just play songs — we craft sonic experiences. Our AI analyzes your brand identity, customer demographics, and even time-of-day patterns to deliver the perfect soundtrack for every moment.

## Conclusion

The science is clear: music isn't just background noise. It's a powerful tool that, when wielded correctly, transforms ordinary shopping trips into memorable brand experiences.`,
  },
  {
    title: 'From Boring to Astounding',
    date: 'December 1, 2022',
    excerpt: 'How the right in-store music transforms customer experience from mundane to memorable. The difference between background noise and brand-defining audio.',
    image: '/assets/industry_cafe.jpg',
    featured: false,
    slug: slugify('From Boring to Astounding'),
    content: `Every brand has a story. The question is: are you telling yours through sound? In this post, we explore how leading retailers have transformed their in-store atmosphere from forgettable to unforgettable using strategic audio curation.

## The Problem: Sonic Wallpaper

Too many stores treat music as an afterthought — a generic playlist running on loop. The result? Customers tune it out, along with your brand. This "sonic wallpaper" approach wastes one of your most powerful sensory tools.

## The Solution: Brand-Defining Audio

Think of Apple Store's clean, minimal soundscapes or Starbucks' carefully curated coffeehouse vibes. These aren't accidents — they're intentional sonic branding decisions that:
- Reinforce brand identity
- Create emotional connections
- Differentiate from competitors
- Encourage social sharing

## Real Results

Retailers who switched from generic playlists to Moojic's curated experiences reported:
- 25% increase in customer satisfaction scores
- 18% longer average visit duration
- 12% uplift in repeat visits

Your store's soundtrack should be as carefully designed as your visual merchandising.`,
  },
  {
    title: 'How In-Store Radio Adds Value',
    date: 'December 2, 2022',
    excerpt: 'The measurable impact of curated audio on dwell time, customer satisfaction, and sales. Real data from real deployments across 20,000 locations.',
    image: '/assets/service_radio.jpg',
    featured: false,
    slug: slugify('How In-Store Radio Adds Value'),
    content: `With over 20,000 locations powered by Moojic, we've gathered compelling data on how in-store radio directly impacts business metrics. Here's what the numbers tell us.

## Dwell Time: The Hidden Metric

Dwell time — how long customers spend in your store — is one of the strongest predictors of purchase likelihood. Our data shows:
- Locations with curated audio see 22% longer dwell times
- Each additional minute in-store increases purchase probability by 8%
- Peak engagement occurs when music matches the time of day

## Customer Satisfaction

Post-visit surveys reveal that 73% of customers notice the music in stores with Moojic's curated playlists, and 68% report a more positive shopping experience compared to stores with generic background music.

## Sales Impact

The bottom line? Stores using Moojic's in-store radio see an average revenue uplift of 11-15% within the first three months of deployment.

## Beyond the Numbers

Perhaps most importantly, staff report higher job satisfaction and energy levels when working with curated audio — a benefit that's harder to quantify but equally valuable.`,
  },
  {
    title: 'The Magic of Digital Signage',
    date: 'December 3, 2022',
    excerpt: 'What digital signage can do for retail stores — the truth about in-store marketing that most brands are missing out on.',
    image: '/assets/service_signage.jpg',
    featured: false,
    slug: slugify('The Magic of Digital Signage'),
    content: `While in-store audio sets the mood, digital signage captures the eye. Together, they create a multi-sensory experience that drives engagement and sales. Let's explore why digital signage is no longer optional for modern retail.

## Visual Impact in a Digital Age

Today's consumers are visually oriented. Digital signage captures 400% more views than static displays and has a 47.7% effectiveness on brand awareness. When combined with audio, the impact multiplies.

## Dynamic Content = Dynamic Results

Unlike printed posters, digital signage lets you:
- Update promotions instantly
- Schedule different content for different times
- A/B test messaging in real-time
- Integrate social media and user-generated content

## The Audio-Visual Synergy

The most successful retail environments don't treat audio and visual as separate channels. When your signage messaging aligns with your soundtrack, you create a cohesive brand narrative that customers feel, not just see.

Moojic's integrated approach ensures your digital signage and in-store audio work in harmony — because a symphony needs more than one instrument.`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
