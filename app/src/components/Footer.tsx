import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const serviceLinks = [
  { name: 'Interactive In-store Radio', path: '/service/in-store-radio' },
  { name: 'Digital Signage', path: '/service/digital-signage' },
  { name: 'AV Hardware Integration', path: '/service/av-hardware' },
  { name: 'AI Music Curation', path: '/sample-player' },
];

const companyLinks = [
  { name: 'About Us', path: '/#about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a1a] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <ParticleCanvas particleCount={25} connectionDistance={120} />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          <div>
            <Link to="/" className="inline-block mb-5">
              <img src="/logo.png" alt="Moojic" className="h-8 w-auto" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Transforming in-store experiences with intelligent audio and visual solutions. Trusted by 20,000+ locations worldwide.
            </p>
            <div className="flex gap-3">
              {['LinkedIn', 'Twitter', 'Instagram', 'Facebook'].map((social) => (
                <span key={social} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-[#e91e63] hover:bg-white/10 transition-all cursor-pointer text-xs font-medium">
                  {social.charAt(0)}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white/30 text-xs font-semibold uppercase tracking-[0.1em] mb-5">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/50 hover:text-[#e91e63] text-sm transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/30 text-xs font-semibold uppercase tracking-[0.1em] mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/50 hover:text-[#e91e63] text-sm transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/30 text-xs font-semibold uppercase tracking-[0.1em] mb-5">Contact</h4>
            <div className="space-y-3 text-white/50 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#e91e63]" />
                <div><p>+91-8452999066</p><p>+91-9167633544</p></div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-[#e91e63]" />
                <p>info@moojic.com</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#e91e63]" />
                <p className="leading-relaxed">Adonta Mobility Solutions Pvt Ltd<br />4th Floor – 32, Aditya Villa, Waman Wadi Rd, Sindhi Society, Chembur, Mumbai, Maharashtra 400071</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">Copyright © 2025 Moojic. All rights reserved.</p>
          <p className="text-white/20 text-xs">Powered by Adonta Mobility Solutions</p>
        </div>
      </div>
    </footer>
  );
}
