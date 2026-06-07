import { useSearchParams } from 'react-router-dom';
import ContactSection from '@/components/ContactSection';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const defaultType = type === 'customer-care' ? 'customer-care' : 'enquiry';

  return (
    <>
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 25%, #0f0f23 50%, #1a0d2e 75%, #0d0d1a 100%)', backgroundSize: '400% 400%', animation: 'gradient-shift 12s ease infinite' }}
      />
      <div className="pt-24 sm:pt-32">
        <ContactSection defaultType={defaultType} />
      </div>
    </>
  );
}
