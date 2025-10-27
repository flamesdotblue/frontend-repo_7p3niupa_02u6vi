import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-[1100px] px-4 py-8 text-sm text-neutral-600 flex items-center justify-between">
        <p>© {new Date().getFullYear()} DevDonations. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#about" className="hover:text-neutral-900">About</a>
          <a href="#volunteer" className="hover:text-neutral-900">Volunteer</a>
          <a href="#contact" className="hover:text-neutral-900">Contact</a>
        </div>
      </div>
    </footer>
  );
}
