import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPinned, Headphones, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  defaultType?: 'customer-care' | 'enquiry';
}

export default function ContactSection({ defaultType = 'enquiry' }: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [contactType, setContactType] = useState<'customer-care' | 'enquiry'>(defaultType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    platform: '',
    message: '',
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const fields = el.querySelectorAll('.form-field');
      if (fields.length) {
        gsap.from(fields, { y: 15, duration: 0.4, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in your full name, email, and message.');
      return;
    }
    if (contactType === 'customer-care' && !form.platform) {
      toast.error('Please select a platform.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: contactType,
          companyName: form.companyName,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          platform: form.platform,
          message: form.message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setForm({ companyName: '', fullName: '', email: '', phone: '', platform: '', message: '' });
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(233,30,99,0.03), transparent)', filter: 'blur(80px)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-[#e91e63] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Contact Us</p>
          <h2 className="font-poppins font-bold text-white text-[clamp(2rem,4vw,3rem)]">Get In Touch</h2>
          <p className="text-white/40 text-base mt-3">Ready to transform your in-store experience?</p>
        </div>
        <div className="max-w-[800px] mx-auto">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl">
            <form className="grid sm:grid-cols-2 gap-5" onSubmit={handleSubmit}>
              <div className="form-field sm:col-span-2 flex p-1 rounded-xl bg-white/5 border border-white/10 mb-1">
                <button
                  type="button"
                  onClick={() => setContactType('enquiry')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                    contactType === 'enquiry'
                      ? 'bg-[#e91e63] text-white shadow-lg'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Enquiry
                </button>
                <button
                  type="button"
                  onClick={() => setContactType('customer-care')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                    contactType === 'customer-care'
                      ? 'bg-[#e91e63] text-white shadow-lg'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Headphones className="w-4 h-4" />
                  Customer Care
                </button>
              </div>

              {contactType === 'customer-care' && (
                <select
                  name="platform"
                  value={form.platform}
                  onChange={handleChange}
                  required
                  className="form-field sm:col-span-2 w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#e91e63] outline-none transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                >
                  <option value="" disabled className="bg-[#1a0d2e] text-white/30">Select Platform *</option>
                  <option value="Moojic Instore Radio" className="bg-[#1a0d2e] text-white">Moojic Instore Radio</option>
                  <option value="Moojic TV" className="bg-[#1a0d2e] text-white">Moojic TV</option>
                  <option value="Hardware" className="bg-[#1a0d2e] text-white">Hardware</option>
                </select>
              )}
              <input name="companyName" value={form.companyName} onChange={handleChange} type="text" placeholder="Company Name" className="form-field w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#e91e63] outline-none transition-all" />
              <input name="fullName" value={form.fullName} onChange={handleChange} type="text" placeholder="Full Name *" required className="form-field w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#e91e63] outline-none transition-all" />
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email Address *" required className="form-field w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#e91e63] outline-none transition-all" />
              <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Phone Number" className="form-field w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#e91e63] outline-none transition-all" />
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder={contactType === 'customer-care' ? 'Describe your issue... *' : 'Tell us about your requirements... *'} required className="form-field sm:col-span-2 w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-[#e91e63] outline-none transition-all resize-none" />
              <button type="submit" disabled={isSubmitting} className="form-field sm:col-span-2 w-full font-poppins text-sm font-semibold uppercase tracking-[0.04em] text-white py-4 rounded-xl gradient-bg hover:shadow-[0_8px_30px_rgba(233,30,99,0.4)] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 grid sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#e91e63] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Phone</p>
                  <p className="text-white/40 text-xs mt-1">+91-8452999066</p>
                  <p className="text-white/40 text-xs">+91-9167633544</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#e91e63] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Email</p>
                  <p className="text-white/40 text-xs mt-1">info@moojic.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinned className="w-5 h-5 text-[#e91e63] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Adonta Mobility Solutions Pvt Ltd</p>
                  <p className="text-white/40 text-xs mt-1 leading-relaxed">4th Floor – 32, Aditya Villa, Waman Wadi Rd,<br />Sindhi Society, Chembur, Mumbai, Maharashtra 400071</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
