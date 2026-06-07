export interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  file?: string;
}

export interface IndustryPlaylist {
  id: string;
  name: string;
  description: string;
  genres: string[];
  tracks: Track[];
  gradient: string;
}

export const playlists: IndustryPlaylist[] = [
  {
    id: 'cafe',
    name: 'Cafe',
    description: 'Curated for a relaxed, welcoming atmosphere. Acoustic melodies, soft jazz, and ambient tones that complement conversations and coffee aromas.',
    genres: ['Acoustic', 'Jazz', 'Ambient'],
    gradient: 'from-amber-600 to-orange-400',
    tracks: [
      { id: 1, title: 'Morning Brew', artist: 'Acoustic Minds', duration: '3:42' },
      { id: 2, title: 'Coffee Shop Vibes', artist: 'Luna Tones', duration: '4:15' },
      { id: 3, title: 'Soft Sunrise', artist: 'The Wanderers', duration: '3:28' },
      { id: 4, title: 'Latte Art', artist: 'Jazz Collective', duration: '4:01' },
      { id: 5, title: 'Window Seat', artist: 'Ember Strings', duration: '3:55' },
      { id: 6, title: 'Rainy Day Roast', artist: 'Piano Dreams', duration: '4:22' },
      { id: 7, title: 'Vanilla Sky', artist: 'Acoustic Minds', duration: '3:18' },
      { id: 8, title: 'Cozy Corner', artist: 'Soft Frequencies', duration: '4:08' },
      { id: 9, title: 'Espresso Energy', artist: 'Luna Tones', duration: '3:33' },
      { id: 10, title: 'Afternoon Glow', artist: 'The Wanderers', duration: '4:14' },
      { id: 11, title: 'Evening Blend', artist: 'Jazz Collective', duration: '3:47' },
      { id: 12, title: 'Closing Time', artist: 'Piano Dreams', duration: '4:30' },
    ]
  },
  {
    id: 'retail',
    name: 'Retail',
    description: 'Upbeat and energizing tracks designed to keep shoppers engaged, extend dwell time, and create a memorable brand atmosphere.',
    genres: ['Pop', 'Upbeat', 'Electronic'],
    gradient: 'from-pink-600 to-rose-400',
    tracks: [
      { id: 1, title: 'Shopping Spree', artist: 'Neon Pulse', duration: '3:15' },
      { id: 2, title: 'Fashion Forward', artist: 'City Beats', duration: '3:48' },
      { id: 3, title: 'Trend Setter', artist: 'Electro Pop', duration: '3:22' },
      { id: 4, title: 'Boutique Vibes', artist: 'Style Studio', duration: '4:05' },
      { id: 5, title: 'Runway Ready', artist: 'Glam Squad', duration: '3:38' },
      { id: 6, title: 'Retail Therapy', artist: 'Neon Pulse', duration: '3:55' },
      { id: 7, title: 'Window Shopping', artist: 'City Beats', duration: '3:12' },
      { id: 8, title: 'Checkout Line', artist: 'Electro Pop', duration: '3:44' },
      { id: 9, title: 'New Arrivals', artist: 'Style Studio', duration: '4:01' },
      { id: 10, title: 'Sale Season', artist: 'Glam Squad', duration: '3:28' },
      { id: 11, title: 'Brand Anthem', artist: 'Neon Pulse', duration: '3:50' },
      { id: 12, title: 'Closing Deals', artist: 'City Beats', duration: '4:15' },
    ]
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Sophisticated lounge and world music that enhances the dining experience, encouraging guests to linger and savor every moment.',
    genres: ['Lounge', 'World', 'Classical'],
    gradient: 'from-red-700 to-amber-500',
    tracks: [
      { id: 1, title: 'Dinner by Candlelight', artist: 'Velvet Lounge', duration: '4:22' },
      { id: 2, title: 'Wine and Dine', artist: 'Global Grooves', duration: '3:55' },
      { id: 3, title: 'Chef\'s Table', artist: 'Classical Fusion', duration: '4:10' },
      { id: 4, title: 'Appetizer', artist: 'Velvet Lounge', duration: '3:38' },
      { id: 5, title: 'Main Course', artist: 'Global Grooves', duration: '4:25' },
      { id: 6, title: 'Sweet Ending', artist: 'Classical Fusion', duration: '3:48' },
      { id: 7, title: 'Sommelier Select', artist: 'Velvet Lounge', duration: '4:15' },
      { id: 8, title: 'Tasting Menu', artist: 'Global Grooves', duration: '4:02' },
      { id: 9, title: 'Midnight Feast', artist: 'Classical Fusion', duration: '3:50' },
      { id: 10, title: 'Reservation Only', artist: 'Velvet Lounge', duration: '4:30' },
      { id: 11, title: 'Gourmet Grooves', artist: 'Global Grooves', duration: '3:40' },
      { id: 12, title: 'Last Call', artist: 'Classical Fusion', duration: '4:18' },
    ]
  },
  {
    id: 'salon',
    name: 'Salon',
    description: 'Chill R&B and lo-fi beats that help clients relax during treatments while keeping stylists in a creative, productive zone.',
    genres: ['Chill', 'R&B', 'Lo-Fi'],
    gradient: 'from-purple-600 to-pink-400',
    tracks: [
      { id: 1, title: 'Mirror Mirror', artist: 'Chill Wave', duration: '3:35' },
      { id: 2, title: 'Styling Session', artist: 'Lo-Fi Lounge', duration: '3:48' },
      { id: 3, title: 'Blow Dry', artist: 'Smooth Beats', duration: '3:22' },
      { id: 4, title: 'Color Treatment', artist: 'Chill Wave', duration: '4:05' },
      { id: 5, title: 'Transformation', artist: 'Lo-Fi Lounge', duration: '3:55' },
      { id: 6, title: 'Head Massage', artist: 'Smooth Beats', duration: '4:12' },
      { id: 7, title: 'Fresh Cut', artist: 'Chill Wave', duration: '3:28' },
      { id: 8, title: 'Pamper Time', artist: 'Lo-Fi Lounge', duration: '4:00' },
      { id: 9, title: 'Manicure Mood', artist: 'Smooth Beats', duration: '3:45' },
      { id: 10, title: 'Before and After', artist: 'Chill Wave', duration: '3:58' },
      { id: 11, title: 'Glam Up', artist: 'Lo-Fi Lounge', duration: '3:30' },
      { id: 12, title: 'Reveal Day', artist: 'Smooth Beats', duration: '4:08' },
    ]
  },
  {
    id: 'hotel',
    name: 'Hotel',
    description: 'Sophisticated jazz, classical, and world music that creates a luxurious atmosphere across lobbies, restaurants, and lounge areas.',
    genres: ['Jazz', 'Classical', 'World'],
    gradient: 'from-indigo-700 to-blue-400',
    tracks: [
      { id: 1, title: 'Grand Entrance', artist: 'Luxury Lounge', duration: '4:15' },
      { id: 2, title: 'Lobby Jazz', artist: 'World Class', duration: '3:50' },
      { id: 3, title: 'Concierge', artist: 'Elegant Tones', duration: '4:05' },
      { id: 4, title: 'Room Service', artist: 'Luxury Lounge', duration: '3:42' },
      { id: 5, title: 'Poolside Chill', artist: 'World Class', duration: '4:20' },
      { id: 6, title: 'Spa Serenity', artist: 'Elegant Tones', duration: '4:45' },
      { id: 7, title: 'Sunset Bar', artist: 'Luxury Lounge', duration: '3:55' },
      { id: 8, title: 'Late Night Lounge', artist: 'World Class', duration: '4:10' },
      { id: 9, title: 'Breakfast Buffet', artist: 'Elegant Tones', duration: '3:35' },
      { id: 10, title: 'VIP Suite', artist: 'Luxury Lounge', duration: '4:25' },
      { id: 11, title: 'Business Center', artist: 'World Class', duration: '3:48' },
      { id: 12, title: 'Check Out', artist: 'Elegant Tones', duration: '4:00' },
    ]
  },
  {
    id: 'mall',
    name: 'Mall',
    description: 'Feel-good pop and top 40 hits that keep shoppers energized, encourage socializing, and extend time spent browsing.',
    genres: ['Pop', 'Top 40', 'Feel-Good'],
    gradient: 'from-cyan-600 to-teal-400',
    tracks: [
      { id: 1, title: 'Mall Walk', artist: 'Shop Stars', duration: '3:28' },
      { id: 2, title: 'Food Court Flow', artist: 'Weekend Vibes', duration: '3:42' },
      { id: 3, title: 'Window Display', artist: 'Trend Setters', duration: '3:15' },
      { id: 4, title: 'Escalator Energy', artist: 'Shop Stars', duration: '3:55' },
      { id: 5, title: 'Sale Rush', artist: 'Weekend Vibes', duration: '3:30' },
      { id: 6, title: 'Shopping Spree', artist: 'Trend Setters', duration: '4:02' },
      { id: 7, title: 'Brand Hunt', artist: 'Shop Stars', duration: '3:18' },
      { id: 8, title: 'Center Court', artist: 'Weekend Vibes', duration: '4:10' },
      { id: 9, title: 'Fountain Feels', artist: 'Trend Setters', duration: '3:45' },
      { id: 10, title: 'Weekend Warrior', artist: 'Shop Stars', duration: '3:50' },
      { id: 11, title: 'Gift Wrap', artist: 'Weekend Vibes', duration: '3:35' },
      { id: 12, title: 'Closing Time', artist: 'Trend Setters', duration: '4:08' },
    ]
  },
  {
    id: 'supermarket',
    name: 'Supermarket',
    description: 'Easy listening and soft pop that creates a pleasant, non-distracting shopping environment for focused grocery browsing.',
    genres: ['Easy Listening', 'Pop', 'Soft Rock'],
    gradient: 'from-yellow-600 to-amber-400',
    tracks: [
      { id: 1, title: 'Fresh Produce', artist: 'Grocery Grooves', duration: '3:35' },
      { id: 2, title: 'Aisle Five', artist: 'Daily Beats', duration: '3:42' },
      { id: 3, title: 'Checkout Line', artist: 'Soft Sounds', duration: '3:18' },
      { id: 4, title: 'Daily Special', artist: 'Grocery Grooves', duration: '4:05' },
      { id: 5, title: 'Cart Push', artist: 'Daily Beats', duration: '3:28' },
      { id: 6, title: 'Pantry Pick', artist: 'Soft Sounds', duration: '3:55' },
      { id: 7, title: 'Bakery Fresh', artist: 'Grocery Grooves', duration: '4:00' },
      { id: 8, title: 'Meat Counter', artist: 'Daily Beats', duration: '3:38' },
      { id: 9, title: 'Frozen Section', artist: 'Soft Sounds', duration: '3:48' },
      { id: 10, title: 'Sample Stand', artist: 'Grocery Grooves', duration: '3:55' },
      { id: 11, title: 'Express Lane', artist: 'Daily Beats', duration: '3:30' },
      { id: 12, title: 'Bag It Up', artist: 'Soft Sounds', duration: '3:42' },
    ]
  },
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Classic rock, blues, and contemporary tracks that match the aspirational energy of automotive showrooms and service centers.',
    genres: ['Rock', 'Classic Rock', 'Blues'],
    gradient: 'from-red-800 to-orange-600',
    tracks: [
      { id: 1, title: 'Test Drive', artist: 'Road Kings', duration: '3:42' },
      { id: 2, title: 'Showroom Shine', artist: 'Garage Band', duration: '4:05' },
      { id: 3, title: 'V8 Power', artist: 'Highway Heroes', duration: '3:55' },
      { id: 4, title: 'Chrome Dreams', artist: 'Road Kings', duration: '4:15' },
      { id: 5, title: 'Open Road', artist: 'Garage Band', duration: '4:00' },
      { id: 6, title: 'Engine Rev', artist: 'Highway Heroes', duration: '3:38' },
      { id: 7, title: 'Luxury Ride', artist: 'Road Kings', duration: '4:10' },
      { id: 8, title: 'Service Bay', artist: 'Garage Band', duration: '3:28' },
      { id: 9, title: 'New Model', artist: 'Highway Heroes', duration: '4:22' },
      { id: 10, title: 'Detailing Day', artist: 'Road Kings', duration: '3:45' },
      { id: 11, title: 'Deal Maker', artist: 'Garage Band', duration: '4:05' },
      { id: 12, title: 'Drive Home', artist: 'Highway Heroes', duration: '4:18' },
    ]
  }
];
