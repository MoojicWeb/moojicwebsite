import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX,
  Coffee, ShoppingBag, UtensilsCrossed, Scissors, Dumbbell, Hotel,
  Popcorn, Building2, BookOpen, Briefcase, Car, Heart, ListMusic,
  Sparkles, Wand2, Zap, Crown, Sun, Headphones,
} from 'lucide-react';
import { useSamplePlayer, type BrandMood } from '@/hooks/useSamplePlayer';

const industryIcons: Record<string, React.ElementType> = {
  cafe: Coffee, retail: ShoppingBag, restaurant: UtensilsCrossed, salon: Scissors,
  gym: Dumbbell, hotel: Hotel, cinema: Popcorn, mall: Building2,
  supermarket: ShoppingBag, bookstore: BookOpen, workspace: Briefcase, automotive: Car,
};

const brandMoods: { value: BrandMood; label: string; icon: React.ElementType; color: string }[] = [
  { value: 'relaxed', label: 'Relaxed', icon: Headphones, color: '#7c4dff' },
  { value: 'energetic', label: 'Energetic', icon: Zap, color: '#e91e63' },
  { value: 'sophisticated', label: 'Sophisticated', icon: Crown, color: '#ff9800' },
  { value: 'upbeat', label: 'Upbeat', icon: Sun, color: '#00bcd4' },
  { value: 'chill', label: 'Chill', icon: Headphones, color: '#4caf50' },
  { value: 'premium', label: 'Premium', icon: Sparkles, color: '#ff5722' },
];

const coverGradients = [
  'from-[#e91e63] to-[#ff9800]', 'from-[#7c4dff] to-[#00bcd4]', 'from-[#ff9800] to-[#e91e63]',
  'from-[#00bcd4] to-[#4caf50]', 'from-[#4caf50] to-[#8bc34a]', 'from-[#ff5722] to-[#ff9800]',
  'from-[#2196f3] to-[#7c4dff]', 'from-[#9c27b0] to-[#e91e63]',
];

const storeVideos: Record<string, string> = {
  cafe: '/assets/video-cafe.mp4', retail: '/assets/video-retail.mp4', restaurant: '/assets/video-restaurant.mp4',
  salon: '/assets/video-salon.mp4', gym: '/assets/video-gym.mp4', hotel: '/assets/video-hotel.mp4',
  cinema: '/assets/video-cinema.mp4', mall: '/assets/video-mall.mp4', supermarket: '/assets/video-supermarket.mp4',
  bookstore: '/assets/video-bookstore.mp4', workspace: '/assets/video-workspace.mp4', automotive: '/assets/video-automotive.mp4',
};

const moodOverlayColors: Record<string, string> = {
  relaxed: 'rgba(124,77,255,0.35)', energetic: 'rgba(233,30,99,0.4)', sophisticated: 'rgba(255,152,0,0.35)',
  upbeat: 'rgba(0,188,212,0.35)', chill: 'rgba(76,175,80,0.3)', premium: 'rgba(255,87,34,0.35)',
};

export default function SamplePlayerPage() {
  const {
    storeType, brandMood, moodTag, sonicProfile, activeTrackIndex, isPlaying,
    progress, currentTime, duration, volume, isShuffle, isRepeat, currentTrack,
    moodOrderedTracks, selectStoreType, selectTrack, togglePlay, nextTrack,
    prevTrack, seek, setVolume, setBrandMood, toggleShuffle, toggleRepeat,
  } = useSamplePlayer();
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleLike = (id: string) => {
    setLiked((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const storeTypes = [
    { id: 'cafe', name: 'Cafe' }, { id: 'retail', name: 'Retail' }, { id: 'restaurant', name: 'Restaurant' },
    { id: 'salon', name: 'Salon' }, { id: 'gym', name: 'Gym' }, { id: 'hotel', name: 'Hotel' },
    { id: 'cinema', name: 'Cinema' }, { id: 'mall', name: 'Mall' }, { id: 'supermarket', name: 'Supermarket' },
    { id: 'bookstore', name: 'Bookstore' }, { id: 'workspace', name: 'Workspace' }, { id: 'automotive', name: 'Automotive' },
  ];

  const activeMood = brandMoods.find((m) => m.value === brandMood);
  const Icon = industryIcons[storeType] || Coffee;
  const formatTime = (s: number) => {
    if (!Number.isFinite(s) || s < 0) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s) % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };
  const curSec = Math.floor(currentTime);
  const totalLabel = duration > 0 ? formatTime(duration) : '—';

  return (
    <div className="h-[calc(100vh-72px)] mt-[72px] bg-[#0a0a1a] flex flex-col text-white overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#0a0a1a]/80 backdrop-blur-md border-b border-white/5 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowSidebar(!showSidebar)} className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10">
            <ListMusic className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div>
              <h1 className="font-poppins font-bold text-sm text-white">AI Curated Sample Player</h1>
              <p className="text-[9px] text-white/30">Brand-curated playlists</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xs font-medium text-white/40 hover:text-white transition-colors">Back to Home</Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 absolute lg:relative z-10 w-72 h-full bg-[#0f0f1a] border-r border-white/5 p-4 overflow-y-auto transition-transform`}>
          <div className="mb-4">
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-2 px-2">Brand Mood</p>
            <div className="grid grid-cols-3 gap-1.5">
              {brandMoods.map((m) => {
                const MIcon = m.icon;
                return (
                  <button
                    key={m.value}
                    onClick={() => setBrandMood(m.value)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-medium transition-all ${brandMood === m.value ? 'text-white shadow-lg scale-105' : 'bg-white/[0.03] text-white/40 hover:bg-white/[0.06]'}`}
                    style={brandMood === m.value ? { background: `linear-gradient(135deg, ${m.color}30, ${m.color}10)`, border: `1px solid ${m.color}40` } : {}}
                  >
                    <MIcon className="w-4 h-4" style={{ color: brandMood === m.value ? m.color : undefined }} />
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sonic Profile */}
          <div className="mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-2">
              <Wand2 className="w-3.5 h-3.5" style={{ color: activeMood?.color }} />
              <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Sonic Profile</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Mood</span>
                <span className="font-medium" style={{ color: activeMood?.color }}>{moodTag}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Genre</span>
                <span className="text-white/70">{sonicProfile.genre}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Tempo</span>
                <span className="text-white/70">{sonicProfile.bpm} BPM</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Vibe</span>
                <span className="text-white/70">{sonicProfile.vibe}</span>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-2 px-2">Store Type</p>
            <div className="space-y-0.5">
              {storeTypes.map((s) => {
                const SIcon = industryIcons[s.id] || Coffee;
                return (
                  <button
                    key={s.id}
                    onClick={() => { selectStoreType(s.id as any); setShowSidebar(false); }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${storeType === s.id ? 'bg-white/10 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white/70'}`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${storeType === s.id ? 'bg-gradient-to-br from-[#e91e63] to-[#7c4dff]' : 'bg-white/5'}`}>
                      <SIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                    {s.name}
                    {storeType === s.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e91e63]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {showSidebar && <div className="lg:hidden fixed inset-0 bg-black/50 z-[5]" onClick={() => setShowSidebar(false)} />}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a1a]">
          {/* Hero Banner with Dynamic Store Video + Mood Overlay */}
          <div className="relative h-[280px] overflow-hidden">
            {/* Store Type Background Video */}
            <video
              key={storeType}
              autoPlay muted loop playsInline preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 1, filter: 'brightness(0.55)' }}
            >
              <source src={storeVideos[storeType] || storeVideos.cafe} type="video/mp4" />
            </video>

            {/* Brand Mood Color Overlay */}
            <div
              className="absolute inset-0 transition-colors duration-700"
              style={{ zIndex: 2, backgroundColor: moodOverlayColors[brandMood] || moodOverlayColors.relaxed }}
            />

            {/* Dark gradient for readability */}
            <div className="absolute inset-0" style={{ zIndex: 3, background: 'linear-gradient(to top, #0a0a1a 0%, rgba(10,10,26,0.5) 50%, rgba(10,10,26,0.25) 100%)' }} />
            <div className="absolute inset-0" style={{ zIndex: 3, background: 'linear-gradient(to right, rgba(10,10,26,0.55) 0%, transparent 60%)' }} />

            {/* AI Curated Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4caf50] animate-pulse" />
              <span className="text-[10px] text-white/60">AI Curated</span>
            </div>

            {/* Banner Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#e91e63] to-[#7c4dff] flex items-center justify-center shadow-2xl shrink-0">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 pb-1 min-w-0">
                  <p className="text-xs text-white/60 mb-1">Curated for</p>
                  <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-white mb-1 capitalize">{storeType} Vibes</h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: `${activeMood?.color}25`, color: activeMood?.color, border: `1px solid ${activeMood?.color}40` }}>{moodTag}</span>
                    <span className="text-[10px] text-white/30">{moodOrderedTracks.length} tracks</span>
                    <span className="text-[10px] text-white/30">{formatTime(curSec)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Play Controls */}
          <div className="px-6 py-4 flex items-center gap-4">
            <button onClick={togglePlay} className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-[#e91e63]/30 hover:scale-105 transition-transform">
              {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
            </button>
            <button onClick={() => toggleLike(String(currentTrack?.id ?? ''))} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Heart className={`w-5 h-5 ${liked.has(String(currentTrack?.id ?? '')) ? 'text-[#e91e63] fill-[#e91e63]' : 'text-white/40'}`} />
            </button>
          </div>

          {/* Track List */}
          <div className="px-4 pb-32">
            <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 px-4 py-2 text-[10px] text-white/30 uppercase tracking-wider border-b border-white/5">
              <span>#</span><span>Title</span><span>Plays</span><span>Time</span>
            </div>
            {moodOrderedTracks.map((track, index) => {
              const isCurrent = index === activeTrackIndex;
              return (
                <div
                  key={track.id}
                  onClick={() => selectTrack(index)}
                  className={`grid grid-cols-[auto_1fr_auto_auto] gap-2 px-4 py-2.5 rounded-lg items-center cursor-pointer transition-all group ${isCurrent ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  <div className="w-6 text-right">
                    {isCurrent && isPlaying ? (
                      <div className="flex items-end gap-[2px] h-3 justify-center">
                        {[3, 6, 4, 7, 5].map((h, i) => (
                          <div key={i} className="w-[2px] rounded-full bg-[#e91e63]" style={{ height: `${h}px`, animation: `visualizer-bar 0.6s ease-in-out ${i * 0.1}s infinite alternate` }} />
                        ))}
                      </div>
                    ) : (
                      <span className={`text-xs ${isCurrent ? 'text-[#e91e63]' : 'text-white/30 group-hover:text-white/60'}`}>{index + 1}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${coverGradients[track.id % coverGradients.length]} flex items-center justify-center shrink-0`}>
                      <span className="text-[10px] font-bold text-white/80">{track.title.charAt(0)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-medium truncate ${isCurrent ? 'text-[#e91e63]' : 'text-white'}`}>{track.title}</p>
                      <p className="text-[10px] text-white/40 truncate">{track.artist}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-white/20">{(track.id * 1234).toLocaleString()}</span>
                  <span className="text-[10px] text-white/30">{track.duration}</span>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* Player Bar */}
      <footer className="bg-[#181818] border-t border-white/5 px-4 py-3 z-20 shrink-0">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          {/* Track Info */}
          <div className="w-[30%] flex items-center gap-3">
            {currentTrack && (
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${coverGradients[currentTrack.id % coverGradients.length]} flex items-center justify-center shrink-0`}>
                <span className="text-lg font-bold text-white/80">{currentTrack.title.charAt(0)}</span>
              </div>
            )}
            <div className="min-w-0 hidden sm:block">
              <p className="text-xs font-medium text-white truncate">{currentTrack?.title}</p>
              <p className="text-[10px] text-white/40">{currentTrack?.artist}</p>
            </div>
            <button onClick={() => toggleLike(String(currentTrack?.id ?? ''))} className="hidden sm:block">
              <Heart className={`w-4 h-4 ${liked.has(String(currentTrack?.id ?? '')) ? 'text-[#e91e63] fill-[#e91e63]' : 'text-white/30'}`} />
            </button>
          </div>

          {/* Controls */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-center gap-4">
              <button onClick={toggleShuffle} className={`transition-colors ${isShuffle ? 'text-[#e91e63]' : 'text-white/30 hover:text-white'}`}><Shuffle className="w-4 h-4" /></button>
              <button onClick={prevTrack} className="text-white/60 hover:text-white"><SkipBack className="w-5 h-5" /></button>
              <button onClick={togglePlay} className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
                {isPlaying ? <Pause className="w-4 h-4 text-black" /> : <Play className="w-4 h-4 text-black ml-0.5" />}
              </button>
              <button onClick={nextTrack} className="text-white/60 hover:text-white"><SkipForward className="w-5 h-5" /></button>
              <button onClick={toggleRepeat} className={`transition-colors ${isRepeat ? 'text-[#e91e63]' : 'text-white/30 hover:text-white'}`}><Repeat className="w-4 h-4" /></button>
            </div>
            <div className="w-full max-w-md flex items-center gap-2">
              <span className="text-[10px] text-white/30 w-8 text-right">{formatTime(curSec)}</span>
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); seek(((e.clientX - r.left) / r.width) * 100); }}>
                <div className="h-full rounded-full bg-gradient-to-r from-[#e91e63] to-[#7c4dff] transition-all" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[10px] text-white/30 w-10">{totalLabel}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="w-[30%] flex items-center justify-end gap-2">
            <button onClick={() => setVolume(volume === 0 ? 70 : 0)} className="text-white/30 hover:text-white">
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setVolume(((e.clientX - r.left) / r.width) * 100); }}>
              <div className="h-full rounded-full bg-white/50" style={{ width: `${volume}%` }} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
