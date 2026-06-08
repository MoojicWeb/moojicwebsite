import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';

// Home is loaded eagerly (highest-traffic + prerender entry); others lazy-load
// so each route only ships the JS it needs. Cuts initial bundle ~50%.
const SamplePlayerPage = lazy(() => import('@/pages/SamplePlayerPage'));
const InStoreRadioPage = lazy(() => import('@/pages/InStoreRadioPage'));
const DigitalSignagePage = lazy(() => import('@/pages/DigitalSignagePage'));
const AVHardwarePage = lazy(() => import('@/pages/AVHardwarePage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const IndustriesPage = lazy(() => import('@/pages/IndustriesPage'));
const GamesPage = lazy(() => import('@/pages/GamesPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

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

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#0a0a1a]">
      <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#e91e63] animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sample-player" element={<SamplePlayerPage />} />
            <Route path="/service/in-store-radio" element={<InStoreRadioPage />} />
            <Route path="/service/digital-signage" element={<DigitalSignagePage />} />
            <Route path="/service/av-hardware" element={<AVHardwarePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toaster theme="dark" position="top-right" richColors />
    </>
  );
}
