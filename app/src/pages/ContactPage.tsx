import { useSearchParams } from 'react-router-dom';
import ContactSection from '@/components/ContactSection';
import SEO, { JsonLd } from '@/components/SEO';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const defaultType = type === 'customer-care' ? 'customer-care' : 'enquiry';

  return (
    <>
      <SEO
        title="Contact Moojic — Get In Touch With Our Team"
        description="Speak to Moojic about in-store audio, digital signage, AV hardware, or partnerships. Call +91-8452999066 / +91-9167633544 or email info@moojic.com."
        path="/contact"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Moojic',
          url: 'https://moojicwebsite.vercel.app/contact',
          mainEntity: {
            '@type': 'Organization',
            name: 'Moojic',
            telephone: ['+91-8452999066', '+91-9167633544'],
            email: 'info@moojic.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '4th Floor – 32, Aditya Villa, Waman Wadi Rd, Sindhi Society, Chembur',
              addressLocality: 'Mumbai',
              addressRegion: 'Maharashtra',
              postalCode: '400071',
              addressCountry: 'IN',
            },
          },
        }}
      />
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
