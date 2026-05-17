import { useEffect, useRef } from 'react';
import { X, Check, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Industry } from '@/data/industries';

interface IndustryModalProps {
  industry: Industry | null;
  onClose: () => void;
}

export default function IndustryModal({ industry, onClose }: IndustryModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (industry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [industry]);

  if (!industry) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(10, 10, 26, 0.9)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="bg-[#181818] border border-white/10 rounded-3xl max-w-[600px] w-full overflow-hidden shadow-2xl"
        style={{ animation: 'modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
      >
        <div className="relative h-[200px] overflow-hidden">
          <img src={industry.image} alt={industry.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="font-poppins font-bold text-2xl text-white mb-3">{industry.name}</h3>
          <p className="text-white/50 leading-relaxed mb-5">{industry.description}</p>

          <div className="space-y-3 mb-6">
            {industry.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-white/70">{benefit}</span>
              </div>
            ))}
          </div>

          <Link
            to="/sample-player"
            onClick={onClose}
            className="inline-flex items-center gap-2 font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white px-6 py-3 rounded-xl gradient-bg hover:shadow-[0_8px_24px_rgba(233,30,99,0.3)] transition-all"
          >
            <Play className="w-4 h-4" /> Hear Sample Playlist
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
