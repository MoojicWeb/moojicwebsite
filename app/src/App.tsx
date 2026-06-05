import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import SamplePlayerPage from '@/pages/SamplePlayerPage';
import InStoreRadioPage from '@/pages/InStoreRadioPage';
import DigitalSignagePage from '@/pages/DigitalSignagePage';
import AVHardwarePage from '@/pages/AVHardwarePage';
import BlogPage from '@/pages/BlogPage';
import IndustriesPage from '@/pages/IndustriesPage';
import GamesPage from '@/pages/GamesPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);
  return null;
}

function ContactRedirect() {
  if (typeof window !== 'undefined') {
    window.location.href = '/#contact';
  }
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sample-player" element={<SamplePlayerPage />} />
          <Route path="/service/in-store-radio" element={<InStoreRadioPage />} />
          <Route path="/service/digital-signage" element={<DigitalSignagePage />} />
          <Route path="/service/av-hardware" element={<AVHardwarePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/contact" element={<ContactRedirect />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
