export interface Industry {
  id: string;
  name: string;
  image: string;
  description: string;
  benefits: string[];
}

export const industries: Industry[] = [
  {
    id: 'retail',
    name: 'Retail',
    image: '/assets/industry_retail.jpg',
    description: 'Drive sales and extend dwell time with strategically curated music that matches your brand personality and appeals to your target shopper demographics.',
    benefits: ['Increased dwell time and sales', 'Genre-aligned to brand identity', 'Seasonal playlist updates']
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    image: '/assets/industry_restaurant.jpg',
    description: 'Create the perfect dining atmosphere with curated playlists that complement your cuisine and elevate the customer experience. From ambient lunch vibes to sophisticated dinner settings.',
    benefits: ['Genre-matched playlists for cuisine type', 'Time-of-day mood transitions', 'Reduced perceived wait times']
  },
  {
    id: 'salon',
    name: 'Salon',
    image: '/assets/industry_salon.jpg',
    description: 'Set the right tone for your salon with music that helps clients relax during treatments and energizes stylists during busy hours.',
    benefits: ['Relaxing ambiance for treatments', 'Energetic tracks for peak hours', 'Brand-consistent sound identity']
  },
  {
    id: 'cafe',
    name: 'Cafe',
    image: '/assets/industry_cafe.jpg',
    description: 'Curated for a relaxed, welcoming atmosphere. Acoustic melodies, soft jazz, and ambient tones that complement conversations and coffee aromas.',
    benefits: ['Acoustic and jazz-focused curation', 'Conversation-friendly volume profiles', 'Morning-to-evening flow']
  },
  {
    id: 'cinema',
    name: 'Cinema',
    image: '/assets/industry_cinema.jpg',
    description: 'Build anticipation and enhance the moviegoing experience with epic orchestral scores in lobbies and upbeat tracks at concession areas.',
    benefits: ['Epic orchestral lobby ambiance', 'Concession area energy boost', 'Genre-matched to featured films']
  },
  {
    id: 'mall',
    name: 'Mall',
    image: '/assets/industry_mall.jpg',
    description: 'Keep shoppers engaged and energized with feel-good playlists that encourage browsing, socializing, and spending more time in your mall.',
    benefits: ['Feel-good pop and top 40 curation', 'Zone-specific audio programming', 'High-energy weekend programming']
  },
  {
    id: 'gym',
    name: 'Gymnasium',
    image: '/assets/industry_gym.jpg',
    description: 'Fuel workouts with high-energy EDM, hip-hop, and motivational tracks that keep members pushing through every rep and set.',
    benefits: ['High-BPM workout playlists', 'Cardio vs strength training splits', 'Peak hour energy programming']
  },
  {
    id: 'hotel',
    name: 'Hotel',
    image: '/assets/industry_hotel.jpg',
    description: 'Create a luxurious and welcoming atmosphere across lobbies, restaurants, spas, and pool areas with sophisticated world music and jazz.',
    benefits: ['Sophisticated lobby ambiance', 'Pool and spa relaxation zones', 'Restaurant-specific curation']
  },
  {
    id: 'supermarket',
    name: 'Supermarket',
    image: '/assets/industry_supermarket.jpg',
    description: 'Keep shoppers relaxed and focused with easy listening and soft pop that creates a pleasant shopping environment without distraction.',
    benefits: ['Easy listening background music', 'Time-optimized tempo programming', 'Seasonal and promotional audio']
  },
  {
    id: 'bookstore',
    name: 'Bookstore',
    image: '/assets/industry_bookstore.jpg',
    description: 'Foster a contemplative atmosphere with gentle folk, acoustic instrumentals, and soft classical that encourages browsing and reading.',
    benefits: ['Acoustic and folk-focused curation', 'Quiet, contemplative ambiance', 'Coffee corner energy boost']
  },
  {
    id: 'workspace',
    name: 'Work Space',
    image: '/assets/industry_workspace.jpg',
    description: 'Boost productivity and focus with ambient electronic, lo-fi beats, and instrumental tracks designed for deep work and creative flow.',
    benefits: ['Focus-enhancing instrumental music', 'Lo-fi and ambient programming', 'Collaboration vs solo work modes']
  },
  {
    id: 'automotive',
    name: 'Automotive',
    image: '/assets/industry_automotive.jpg',
    description: 'Create an upscale showroom experience with classic rock, blues, and contemporary tracks that match the aspirational nature of your vehicles.',
    benefits: ['Classic rock and blues curation', 'Upscale showroom ambiance', 'Brand-aligned sonic identity']
  }
];
