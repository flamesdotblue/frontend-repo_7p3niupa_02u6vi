import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PageView from './components/PageView';
import Footer from './components/Footer';
import DonationModal from './components/DonationModal';

export default function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Design tokens
    const style = document.createElement('style');
    style.innerHTML = `:root{--bg:#F8F8F7;--ink:#111111;--muted:#6b7280;--accent:#FF7A59;--elev:0 8px 24px rgba(0,0,0,0.06);--radius-1:8px;--radius-2:16px;--radius-3:24px}`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-inter">
      <Header onDonate={() => setOpen(true)} />
      <PageView onDonate={() => setOpen(true)} />

      {/* Floating Donate CTA */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-4 sm:right-6 h-12 px-6 rounded-full bg-[var(--accent)] text-white shadow-lg hover:opacity-90 active:opacity-80"
        aria-label="Donate"
      >
        Donate
      </button>

      <Footer />

      <DonationModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
