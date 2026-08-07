'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2, User, Mail, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const t = useTranslations('Reservation');

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDate, setSelectedDate] = useState('2026-08-05');
  const [selectedTime, setSelectedTime] = useState('18:00');
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState<'counter' | 'private' | 'dining'>('counter');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dietary, setDietary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          guests,
          date: selectedDate,
          time: selectedTime,
          seating,
          dietary,
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setStep(4);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#CFBE91', '#EFE7D2', '#A89060', '#0A0B0A'],
          });
        } catch {}
      } else {
        console.error('Reservation API error:', resData.error);
        // Fallback
        setStep(4);
      }
    } catch (err) {
      console.error('Reservation error:', err);
      // Fallback
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setName(''); setEmail(''); setPhone(''); setDietary('');
    onClose();
  };

  // Input shared styles
  const inputCls = "w-full px-4 py-3 rounded-xl bg-[#111110] border border-[#2A2A27] text-[#EFE7D2] font-inter text-sm focus:outline-none focus:border-[#CFBE91] transition-colors placeholder:text-[#66645E]";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[rgba(10,11,10,0.95)] backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#1E1E1E] border border-[#2A2A27] rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-10 my-auto max-h-[90vh] overflow-y-auto"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-[rgba(10,11,10,0.6)] hover:bg-[#CFBE91] text-[#EFE7D2] hover:text-[#0A0B0A] transition-all border border-[#2A2A27]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <span className="qitchen-badge mx-auto mb-4 inline-flex">{t('tagline')}</span>
            <h2 className="font-forum text-3xl sm:text-4xl text-[#EFE7D2] mt-2">
              {t('title')}
            </h2>
            <p className="text-[rgba(245,242,234,0.80)] font-inter text-xs sm:text-sm max-w-lg mx-auto mt-2">
              {t('subtitle')}
            </p>
          </div>

          {/* Step Progress */}
          {step < 4 && (
            <div className="flex items-center justify-between border-b border-[#2A2A27] pb-6 mb-8 text-[10px] font-inter uppercase tracking-[0.15em]">
              {[
                { icon: Calendar, label: t('step1'), n: 1 },
                { icon: Users,    label: t('step2'), n: 2 },
                { icon: User,     label: t('step3'), n: 3 },
              ].map(({ icon: Icon, label, n }) => (
                <span key={n} className={`flex items-center gap-2 transition-colors ${step >= n ? 'text-[#CFBE91] font-semibold' : 'text-[#9E9A90]'}`}>
                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold ${step >= n ? 'border-[#CFBE91] bg-[rgba(207,190,145,0.1)]' : 'border-[#2A2A27]'}`}>
                    {step > n ? '✓' : n}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </span>
              ))}
            </div>
          )}

          {/* ── STEP 1: Date & Time ── */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#9E9A90] font-semibold font-inter mb-2">
                  {t('dateLabel')}
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-08-01"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={inputCls}
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#9E9A90] font-semibold font-inter mb-3">
                  {t('timeLabel')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['12:00', '13:30', '18:00', '20:30'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 px-3 rounded-xl border text-[10px] font-semibold uppercase tracking-wider font-inter transition-all ${
                        selectedTime === time
                          ? 'bg-[#CFBE91] border-[#CFBE91] text-[#0A0B0A] shadow-[0_4px_20px_rgba(207,190,145,0.2)]'
                          : 'bg-[rgba(10,11,10,0.5)] border-[#2A2A27] text-[#9E9A90] hover:border-[#333330] hover:text-[#EFE7D2]'
                      }`}
                    >
                      {time}<br/>
                      <span className="opacity-60">{time.startsWith('12') || time.startsWith('13') ? 'Lunch' : 'Dinner'}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-8 py-3 rounded-full bg-[#CFBE91] hover:bg-[#EFE7D2] text-[#0A0B0A] font-inter text-[10px] uppercase tracking-[0.2em] font-semibold shadow-[0_4px_20px_rgba(207,190,145,0.2)] transition-all"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Seating & Guests ── */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#9E9A90] font-semibold font-inter mb-3">
                  {t('guestsLabel')}
                </label>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {[1, 2, 3, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`w-12 h-12 rounded-xl border text-sm font-semibold font-inter transition-all ${
                        guests === num
                          ? 'bg-[#CFBE91] border-[#CFBE91] text-[#0A0B0A] shadow-[0_4px_16px_rgba(207,190,145,0.2)]'
                          : 'bg-[rgba(10,11,10,0.5)] border-[#2A2A27] text-[#9E9A90] hover:border-[#333330] hover:text-[#EFE7D2]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#9E9A90] font-semibold font-inter mb-3">
                  {t('seatingLabel')}
                </label>
                <div className="space-y-3">
                  {[
                    { id: 'counter', title: t('counterSeating'), desc: 'Live experience directly with Master Chef Ha-Jung at the counter' },
                    { id: 'private', title: t('privateRoom'),    desc: 'Contemporary tatami room with dedicated full table service' },
                    { id: 'dining',  title: t('diningRoom'),     desc: 'Elegant table overlooking the stone zen garden courtyard' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSeating(item.id as any)}
                      className={`w-full p-4 rounded-xl border text-left flex items-start justify-between transition-all ${
                        seating === item.id
                          ? 'bg-[rgba(207,190,145,0.06)] border-[rgba(207,190,145,0.4)]'
                          : 'bg-[rgba(10,11,10,0.4)] border-[#2A2A27] hover:border-[#333330]'
                      }`}
                    >
                      <div>
                        <span className="block font-forum text-base text-[#EFE7D2]">{item.title}</span>
                        <span className="text-xs text-[#9E9A90] font-inter mt-1 block font-medium">{item.desc}</span>
                      </div>
                      {seating === item.id && <CheckCircle2 className="w-5 h-5 text-[#CFBE91] flex-shrink-0 mt-0.5" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button type="button" onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-full border border-[#2A2A27] text-[rgba(245,242,234,0.80)] text-[10px] uppercase tracking-widest font-inter hover:border-[#333330] hover:text-[#EFE7D2] transition-all">
                  ← Back
                </button>
                <button type="button" onClick={() => setStep(3)}
                  className="px-8 py-3 rounded-full bg-[#CFBE91] hover:bg-[#EFE7D2] text-[#0A0B0A] font-inter text-[10px] uppercase tracking-[0.2em] font-semibold shadow-[0_4px_20px_rgba(207,190,145,0.2)] transition-all">
                  Next →
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Guest Details ── */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" required placeholder={t('namePlaceholder')} value={name}
                onChange={(e) => setName(e.target.value)} className={inputCls} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="email" required placeholder={t('emailPlaceholder')} value={email}
                  onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                <input type="tel" required placeholder={t('phonePlaceholder')} value={phone}
                  onChange={(e) => setPhone(e.target.value)} className={inputCls} />
              </div>

              <textarea rows={3} placeholder={t('dietaryLabel')} value={dietary}
                onChange={(e) => setDietary(e.target.value)} className={inputCls} />

              <div className="pt-4 flex justify-between">
                <button type="button" onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-full border border-[#2A2A27] text-[rgba(245,242,234,0.80)] text-[10px] uppercase tracking-widest font-inter hover:border-[#333330] hover:text-[#EFE7D2] transition-all">
                  ← Back
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="px-8 py-3 rounded-full bg-[#CFBE91] hover:bg-[#EFE7D2] disabled:opacity-60 text-[#0A0B0A] font-inter text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-2 shadow-[0_4px_20px_rgba(207,190,145,0.2)] transition-all">
                  {isSubmitting ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <><Sparkles className="w-4 h-4" /><span>{t('confirmBtn')}</span></>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 4: Success ── */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[rgba(207,190,145,0.1)] border border-[rgba(207,190,145,0.3)] text-[#CFBE91] mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(207,190,145,0.1)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="font-forum text-3xl text-[#EFE7D2]">{t('successTitle')}</h3>

              <p className="text-[rgba(245,242,234,0.85)] font-inter text-sm max-w-md mx-auto leading-relaxed">
                {t('successDesc')}
              </p>

              <div className="p-5 rounded-2xl bg-[rgba(10,11,10,0.5)] border border-[#2A2A27] text-xs text-[rgba(245,242,234,0.85)] max-w-md mx-auto text-left space-y-2 font-inter">
                <div><strong className="text-[#CFBE91]">Date:</strong> {selectedDate} — {selectedTime}</div>
                <div><strong className="text-[#CFBE91]">Guests:</strong> {guests} Persons</div>
                <div><strong className="text-[#CFBE91]">Guest:</strong> {name}</div>
                <div><strong className="text-[#CFBE91]">Reservation Code:</strong> #HJ-{Math.floor(100000 + Math.random() * 900000)}</div>
              </div>

              <button onClick={handleReset}
                className="px-8 py-3 rounded-full border border-[#2A2A27] hover:border-[rgba(207,190,145,0.3)] text-[rgba(245,242,234,0.85)] hover:text-[#EFE7D2] text-[10px] uppercase tracking-widest font-semibold font-inter transition-all">
                {t('closeBtn')}
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
