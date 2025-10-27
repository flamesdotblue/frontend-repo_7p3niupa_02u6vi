import React, { useEffect, useState } from 'react';
import { Sparkles, ShieldCheck, Truck, Leaf } from 'lucide-react';

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || '/');
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return [route, (to) => { window.location.hash = to; }];
}

function Container({ children }) {
  return <div className="mx-auto max-w-[1100px] px-4">{children}</div>;
}

function Home({ onDonate }) {
  return (
    <section className="bg-[var(--bg)] text-neutral-900">
      <Container>
        <div className="pt-10 pb-16 sm:pt-16 sm:pb-24">
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
              <a href="#/about" className="inline-flex h-11 items-center px-4 rounded-full border border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:border-neutral-400 transition-colors">Learn more</a>
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
        </div>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section>
      <Container>
        <div className="py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">About</h1>
          <p className="mt-3 max-w-2xl text-neutral-600">
            DevDonations is a design-first, minimalist clothes-donation platform. We focus on accessibility, refined motion, and transparent impact.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { k: 'Garments Recirculated', v: '120K+' },
              { k: 'Partner Centers', v: '48' },
              { k: 'Avg. Pickup Time', v: '24–48h' },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="text-sm text-neutral-600">{s.k}</div>
                <div className="mt-1 text-2xl font-semibold">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Volunteer() {
  return (
    <section>
      <Container>
        <div className="py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Volunteer</h1>
          <p className="mt-3 max-w-2xl text-neutral-600">Join our network for sorting, pickups, and community events. Sign up and we’ll reach out.</p>
          <form className="mt-6 grid gap-3 max-w-md">
            <input type="text" placeholder="Full name" className="h-11 rounded-xl border border-neutral-300 px-3 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" />
            <input type="email" placeholder="Email" className="h-11 rounded-xl border border-neutral-300 px-3 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" />
            <textarea placeholder="How would you like to help?" rows={4} className="rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" />
            <button type="button" className="h-11 rounded-xl bg-neutral-900 text-white hover:opacity-90">Sign up</button>
          </form>
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section>
      <Container>
        <div className="py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Contact</h1>
          <p className="mt-3 max-w-2xl text-neutral-600">Questions? Reach us directly on WhatsApp. We reply within a day.</p>
          <a href="https://wa.me/" target="_blank" rel="noreferrer" className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-300 px-4 text-neutral-700 hover:text-neutral-900 hover:border-neutral-400">
            <Sparkles size={16} className="text-[var(--accent)]" /> Chat on WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}

export default function PageView({ onDonate }) {
  const [route] = useHashRoute();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [route]);

  if (route === '/about') return <About />;
  if (route === '/volunteer') return <Volunteer />;
  if (route === '/contact') return <Contact />;
  return <Home onDonate={onDonate} />;
}
