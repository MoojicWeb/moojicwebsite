import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavScroll } from '@/hooks/useNavScroll';

const serviceLinks = [
  { name: 'Interactive In-store Radio', path: '/service/in-store-radio' },
  { name: 'Digital Signage', path: '/service/digital-signage' },
  { name: 'AV Hardware Integration', path: '/service/av-hardware' },
];

export default function Navigation() {
  const scrolled = useNavScroll(50);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a1a]/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
        style={{ height: 72 }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="Moojic" className="h-8 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`font-poppins text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors hover:text-[#e91e63] text-white ${location.pathname === '/' ? 'text-[#e91e63]' : ''}`}>
              Home
            </Link>

            <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
              <button className={`font-poppins text-[13px] font-semibold uppercase tracking-[0.06em] flex items-center gap-1 transition-colors hover:text-[#e91e63] text-white ${location.pathname.startsWith('/service') ? 'text-[#e91e63]' : ''}`}>
                Services <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                  <div className="bg-[#181818] border border-white/10 rounded-xl shadow-2xl p-2 min-w-[280px]">
                    {serviceLinks.map((link) => (
                      <Link key={link.path} to={link.path} className={`block px-4 py-3 rounded-lg transition-all hover:bg-white/5 border-l-[3px] border-transparent hover:border-[#e91e63] ${location.pathname === link.path ? 'bg-white/5 border-[#e91e63]' : ''}`}>
                        <span className="font-poppins text-sm font-semibold text-white">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/industries" className={`font-poppins text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors hover:text-[#e91e63] text-white ${location.pathname === '/industries' ? 'text-[#e91e63]' : ''}`}>
              Industries
            </Link>

            <Link to="/games" className={`font-poppins text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors hover:text-[#e91e63] text-white ${location.pathname === '/games' ? 'text-[#e91e63]' : ''}`}>
              Games
            </Link>

            <Link to="/sample-player" className={`font-poppins text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors hover:text-[#e91e63] text-white ${location.pathname === '/sample-player' ? 'text-[#e91e63]' : ''}`}>
              AI Playlists
            </Link>

            <Link to="/contact?type=customer-care" className={`font-poppins text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors hover:text-[#e91e63] text-white ${location.pathname === '/contact' && location.search.includes('type=customer-care') ? 'text-[#e91e63]' : ''}`}>
              Customer Care
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/contact" className="hidden lg:inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white px-6 py-2.5 rounded-lg gradient-bg hover:shadow-[0_8px_24px_rgba(233,30,99,0.3)] transition-all">
              Contact Us
            </Link>
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2">
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0a0a1a]">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-12">
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <img src="/logo.png" alt="Moojic" className="h-8 w-auto" />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <Link to="/" className="font-poppins text-xl font-semibold text-white" onClick={() => setMobileOpen(false)}>Home</Link>
              <div className="flex flex-col gap-3">
                <span className="font-poppins text-lg font-semibold text-white/40 uppercase tracking-wider">Services</span>
                {serviceLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="font-poppins text-base text-white/70 pl-4" onClick={() => setMobileOpen(false)}>{link.name}</Link>
                ))}
              </div>
              <Link to="/industries" className="font-poppins text-xl font-semibold text-white" onClick={() => setMobileOpen(false)}>Industries</Link>
              <Link to="/games" className="font-poppins text-xl font-semibold text-white" onClick={() => setMobileOpen(false)}>Games</Link>
              <Link to="/sample-player" className="font-poppins text-xl font-semibold text-white" onClick={() => setMobileOpen(false)}>AI Playlists</Link>
              <Link to="/contact?type=customer-care" className="font-poppins text-xl font-semibold text-white" onClick={() => setMobileOpen(false)}>Customer Care</Link>
              <Link to="/contact" className="font-poppins text-xl font-semibold text-white" onClick={() => setMobileOpen(false)}>Contact Us</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
