import React from 'react';
import { Sparkles, ShieldCheck, Truck, Leaf } from 'lucide-react';

export default function Hero({ onDonate }) {
  return (
    <section id="home" className="bg-[var(--bg)] text-neutral-900">
      <div className="mx-auto max-w-[1100px] px-4 pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 shadow-sm">
            <Sparkles size={14} className="text-[var(--accent)]" />
            Minimal. Humane. Impactful.
          </div>
          <h1 className="mt-4 font-semibold tracking-tight text-4xl sm:text-5xl leading-tight">
            Give Warmth — Donate Clothes
          </h1>
          <p className="mt-3 text-neutral-600 leading-relaxed">
            An elevated, hyper-minimal platform to pass your clothes forward. Seamless scheduling, refined experience, and real impact.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button onClick={onDonate} className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[var(--accent)] text-white shadow-sm hover:opacity-90 active:opacity-80 transition-opacity">
              Start Donation
            </button>
            <a href="#about" className="inline-flex h-11 items-center px-4 rounded-full border border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:border-neutral-400 transition-colors">Learn more</a>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Truck, title: '3-step pickup', text: 'Home pickup or drop-off — your call.' },
            { icon: ShieldCheck, title: 'Verified partners', text: 'Trusted centers and transparent routing.' },
            { icon: Leaf, title: 'Sustainable impact', text: 'Keep clothes in circulation longer.' },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <c.icon size={18} className="text-[var(--accent)]" />
                <span className="font-medium">{c.title}</span>
              </div>
              <p className="mt-2 text-sm text-neutral-600">{c.text}</p>
            </div>
          ))}
        </div>

        <div id="about" className="mt-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="mt-2 text-neutral-600">DevDonations is a design-first platform enabling effortless clothes donation with modern UX and mindful motion. Minimal by design, maximal by impact.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm" id="volunteer">
            <h2 className="text-xl font-semibold">Volunteer</h2>
            <p className="mt-2 text-neutral-600">Join our volunteer network for sorting, pickups, or community events. Sign up and we’ll reach out.</p>
            <form className="mt-3 grid gap-3">
              <input type="text" placeholder="Full name" className="h-11 rounded-xl border border-neutral-300 px-3 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" />
              <input type="email" placeholder="Email" className="h-11 rounded-xl border border-neutral-300 px-3 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" />
              <button type="button" className="h-11 rounded-xl bg-neutral-900 text-white hover:opacity-90">Sign up</button>
            </form>
          </div>
        </div>

        <div id="contact" className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-neutral-600">Questions? Reach us directly on WhatsApp. We reply within a day.</p>
          <a href="https://wa.me/" target="_blank" rel="noreferrer" className="mt-3 inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-300 px-4 text-neutral-700 hover:text-neutral-900 hover:border-neutral-400">
            <Sparkles size={16} className="text-[var(--accent)]" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
