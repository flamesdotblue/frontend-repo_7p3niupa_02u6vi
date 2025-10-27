import React from 'react';
import { Heart, Phone, Menu } from 'lucide-react';

export default function Header({ onDonate }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-neutral-200">
      <div className="mx-auto max-w-[1100px] px-4 py-3 flex items-center justify-between">
        <a href="#/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-neutral-900 text-white grid place-items-center font-semibold">D</div>
          <span className="font-semibold tracking-tight text-neutral-900">DevDonations</span>
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-neutral-600">
          <a href="#/" className="hover:text-neutral-900 transition-colors">Home</a>
          <a href="#/about" className="hover:text-neutral-900 transition-colors">About</a>
          <a href="#/volunteer" className="hover:text-neutral-900 transition-colors">Volunteer</a>
          <a href="#/contact" className="hover:text-neutral-900 transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="https://wa.me/" target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-2 px-3 h-9 rounded-full border border-neutral-300 hover:border-neutral-400 text-neutral-700 hover:text-neutral-900 transition-colors">
            <Phone size={16} /> WhatsApp
          </a>
          <button onClick={onDonate} className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[var(--accent)] text-white hover:opacity-90 active:opacity-80 transition-opacity shadow-sm">
            <Heart size={16} /> Donate
          </button>
          <button className="sm:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-neutral-300 text-neutral-700">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
