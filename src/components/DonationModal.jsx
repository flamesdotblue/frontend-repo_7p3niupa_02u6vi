import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ChevronDown, Truck, MapPin, Calendar, Clock, Phone, User } from 'lucide-react';

const categoriesSeed = [
  { key: 'tops', label: 'Tops', items: ['T-shirts', 'Shirts', 'Sweaters'] },
  { key: 'bottoms', label: 'Bottoms', items: ['Jeans', 'Trousers', 'Shorts'] },
  { key: 'full', label: 'Full', items: ['Dresses', 'Jumpsuits'] },
  { key: 'outer', label: 'Outerwear', items: ['Jackets', 'Coats'] },
];

function isValidPhone(v) {
  return /^\+\d{6,15}$/.test(v.trim());
}

export default function DonationModal({ open, onClose }) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const firstFocusable = useRef(null);
  const lastFocusable = useRef(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('pickup');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('Morning');
  const [notes, setNotes] = useState('');
  const [expanded, setExpanded] = useState(['tops']);
  const [items, setItems] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState('');

  useEffect(() => {
    if (open) {
      const handler = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'Tab') {
          const focusable = dialogRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }
  }, [open, onClose]);

  useEffect(() => {
    if (open) setTimeout(() => dialogRef.current?.focus(), 50);
  }, [open]);

  const totalCount = useMemo(() => Object.values(items).reduce((a, b) => a + b, 0), [items]);

  const summary = useMemo(() => {
    const list = [];
    for (const cat of categoriesSeed) {
      for (const label of cat.items) {
        const key = `${cat.key}:${label}`;
        const qty = items[key] || 0;
        if (qty > 0) list.push({ label, qty, cat: cat.label });
      }
    }
    return list;
  }, [items]);

  function mutateItem(key, delta) {
    setItems((prev) => {
      const next = { ...prev };
      const val = Math.max(0, (next[key] || 0) + delta);
      if (val === 0) delete next[key];
      else next[key] = val;
      return next;
    });
  }

  function validate() {
    const errors = {};
    if (!name.trim()) errors.name = 'Full name is required';
    if (!isValidPhone(phone)) errors.phone = 'Enter WhatsApp in international format, e.g. +14155552671';
    if (method === 'pickup') {
      if (!address.trim()) errors.address = 'Address required for pickup';
      if (!date) errors.date = 'Select a preferred date';
    }
    if (totalCount === 0) errors.items = 'Add at least one item';
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      // Let browser show :invalid hints as well
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const ref = `DD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setSuccessId(ref);
    setSubmitting(false);
  }

  const whatsappShare = successId
    ? `https://wa.me/?text=${encodeURIComponent(
        `I just scheduled a DevDonations pickup. Ref ${successId}. Items: ${totalCount}`
      )}`
    : '#';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-neutral-900/20 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Donation Modal"
            tabIndex={-1}
            ref={dialogRef}
            className="relative z-10 w-[92%] sm:w-[640px] max-h-[86vh] overflow-hidden rounded-2xl bg-white shadow-xl border border-neutral-200"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.18, ease: 'easeOut' } }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
              <div className="text-sm text-neutral-600">Clothes Donation</div>
              <button aria-label="Close" onClick={onClose} className="h-8 w-8 grid place-items-center rounded-full hover:bg-neutral-100">
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-6">
                {/* Your Information */}
                <section>
                  <h3 className="text-sm font-medium text-neutral-900">Your Information</h3>
                  <div className="mt-3 grid gap-3">
                    <div className="relative">
                      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"><User size={16} /></div>
                      <input aria-label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full name" className="h-11 w-full rounded-xl border border-neutral-300 pl-9 pr-3 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" />
                    </div>
                    <div className="relative">
                      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"><Phone size={16} /></div>
                      <input aria-label="WhatsApp Number" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="WhatsApp (e.g. +14155552671)" className="h-11 w-full rounded-xl border border-neutral-300 pl-9 pr-3 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" />
                      <p className="mt-1 text-xs text-neutral-500">Use international format with +country code.</p>
                    </div>
                  </div>
                </section>

                {/* Donation Method */}
                <section>
                  <h3 className="text-sm font-medium text-neutral-900">Donation Method</h3>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setMethod('pickup')} aria-pressed={method==='pickup'} className={`rounded-xl border p-3 text-left transition-all ${method==='pickup' ? 'border-neutral-900 shadow-sm' : 'border-neutral-300 hover:border-neutral-400'}`}>
                      <div className="flex items-center gap-2">
                        <Truck size={16} className="text-[var(--accent)]" />
                        <span className="font-medium">Home Pickup</span>
                      </div>
                      <p className="mt-1 text-xs text-neutral-600">We come to you.</p>
                    </button>
                    <button type="button" onClick={() => setMethod('dropoff')} aria-pressed={method==='dropoff'} className={`rounded-xl border p-3 text-left transition-all ${method==='dropoff' ? 'border-neutral-900 shadow-sm' : 'border-neutral-300 hover:border-neutral-400'}`}>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[var(--accent)]" />
                        <span className="font-medium">Drop-off at Center</span>
                      </div>
                      <p className="mt-1 text-xs text-neutral-600">Visit a partner center.</p>
                    </button>
                  </div>
                </section>

                {/* Pickup Details */}
                <section>
                  <h3 className="text-sm font-medium text-neutral-900">Pickup Details</h3>
                  {method === 'pickup' ? (
                    <div className="mt-3 grid gap-3">
                      <input aria-label="Address" value={address} onChange={(e)=>setAddress(e.target.value)} required={method==='pickup'} placeholder="Address" className="h-11 w-full rounded-xl border border-neutral-300 px-3 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"><Calendar size={16} /></div>
                          <input aria-label="Preferred Date" type="date" value={date} onChange={(e)=>setDate(e.target.value)} required={method==='pickup'} className="h-11 w-full rounded-xl border border-neutral-300 pl-9 pr-3 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" />
                        </div>
                        <div className="relative">
                          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"><Clock size={16} /></div>
                          <select aria-label="Time Slot" value={slot} onChange={(e)=>setSlot(e.target.value)} className="h-11 w-full rounded-xl border border-neutral-300 pl-9 pr-3 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent">
                            {['Morning','Afternoon','Evening'].map(s=> <option key={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <textarea aria-label="Notes" value={notes} onChange={(e)=>setNotes(e.target.value)} rows={3} placeholder="Notes (optional)" className="rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" />
                    </div>
                  ) : (
                    <div className="mt-3 text-sm text-neutral-600 rounded-xl border border-neutral-200 p-3">
                      Preferred Center: 21 Minimal Ave, District 3. Open 10:00–18:00.
                    </div>
                  )}
                </section>

                {/* Clothing Selection */}
                <section>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-medium text-neutral-900">Clothing Selection</h3>
                    <div className="text-xs text-neutral-600">Total items: <span className="font-medium text-neutral-900">{totalCount}</span></div>
                  </div>
                  <div className="mt-3 space-y-2">
                    {categoriesSeed.map((cat) => {
                      const openRow = expanded.includes(cat.key);
                      return (
                        <div key={cat.key} className="rounded-xl border border-neutral-200">
                          <button type="button" onClick={() => setExpanded((prev)=> prev.includes(cat.key) ? prev.filter(k=>k!==cat.key) : [...prev, cat.key])} className="w-full flex items-center justify-between px-3 py-2">
                            <div className="font-medium">{cat.label}</div>
                            <ChevronDown size={16} className={`transition-transform ${openRow ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence initial={false}>
                            {openRow && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-neutral-200">
                                <div className="p-2 grid gap-2">
                                  {cat.items.map((label) => {
                                    const key = `${cat.key}:${label}`;
                                    const qty = items[key] || 0;
                                    return (
                                      <div key={key} className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2">
                                        <div className="text-sm">{label}</div>
                                        <div role="spinbutton" aria-label={`${label} quantity`} aria-valuenow={qty} aria-valuemin={0} tabIndex={0} className="inline-flex items-center gap-2">
                                          <button type="button" onClick={() => mutateItem(key, -1)} className="h-8 w-8 grid place-items-center rounded-full border border-neutral-300 text-neutral-700 aria-disabled:opacity-40" aria-disabled={qty===0} disabled={qty===0}><Minus size={14} /></button>
                                          <span className="w-6 text-center font-medium">{qty}</span>
                                          <button type="button" onClick={() => mutateItem(key, 1)} className="h-8 w-8 grid place-items-center rounded-full bg-neutral-900 text-white"><Plus size={14} /></button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {summary.length > 0 && (
                    <div className="mt-3 rounded-xl border border-neutral-200 p-3 text-sm">
                      <div className="font-medium mb-1">Summary</div>
                      <ul className="space-y-1 text-neutral-700">
                        {summary.map((s, i) => (
                          <li key={`${s.label}-${i}`} className="flex justify-between"><span>{s.cat} — {s.label}</span><span className="font-medium">×{s.qty}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>

                {/* Review & Submit */}
                <section>
                  <h3 className="text-sm font-medium text-neutral-900">Review & Submit</h3>
                  <p className="mt-2 text-xs text-neutral-600">Please review your details. You can edit above before submitting.</p>
                </section>
              </div>

              {/* Sticky footer */}
              <div className="sticky bottom-0 border-t border-neutral-200 bg-white px-4 sm:px-5 py-3 flex items-center justify-between gap-2">
                {successId ? (
                  <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                    <div className="text-sm text-neutral-700">Success! Reference <span className="font-medium">{successId}</span></div>
                    <div className="ml-auto flex items-center gap-2 w-full sm:w-auto">
                      <a href={whatsappShare} target="_blank" rel="noreferrer" className="h-10 px-4 rounded-full border border-neutral-300 hover:border-neutral-400 text-neutral-700">Share on WhatsApp</a>
                      <button type="button" onClick={onClose} className="h-10 px-5 rounded-full bg-neutral-900 text-white">Close</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button type="button" onClick={onClose} className="h-10 px-4 rounded-full border border-neutral-300 text-neutral-700 hover:border-neutral-400">Cancel</button>
                    <button type="submit" disabled={submitting} className="h-10 px-5 rounded-full bg-[var(--accent)] text-white disabled:opacity-50 min-w-[120px]">
                      {submitting ? 'Submitting…' : 'Submit'}
                    </button>
                  </>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
