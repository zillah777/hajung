'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, X, Maximize2, Sparkles, Utensils } from 'lucide-react';

interface MenuSectionProps {
  onOpenReservation: () => void;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price?: string;
  badge?: string;
  image?: string;
}

const categoryImages: Record<string, string[]> = {
  mains: [
    '/images/restaurant/item-2.jpg',
    '/images/restaurant/item-4.jpg',
    '/images/restaurant/item-8.jpg',
    '/images/restaurant/item-9.jpg',
    '/images/restaurant/item-11.jpg',
    '/images/restaurant/item-12.jpg',
    '/images/restaurant/item-13.jpg',
    '/images/restaurant/item-14.jpg',
  ],
  sides: [
    '/images/restaurant/item-3.jpg',
    '/images/restaurant/item-14.jpg',
    '/images/restaurant/item-15.jpg',
    '/images/restaurant/item-9.jpg',
  ],
  liquors: [
    '/images/hajung/drinks-2.jpeg',
    '/images/hajung/drinks-3.jpeg',
    '/images/hajung/drinks-4.jpeg',
  ],
  drinks: [
    '/images/hajung/drinks-4.jpeg',
    '/images/hajung/drinks-2.jpeg',
    '/images/hajung/drinks-3.jpeg',
  ],
};

const DiamondTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4 justify-center my-5">
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#CFBE91]/40" />
    <span className="w-1.5 h-1.5 rounded-full bg-[#CFBE91]/50 flex-shrink-0" />
    <h2 className="font-serif text-lg md:text-xl tracking-[0.22em] text-[#EFE7D2] uppercase">
      {children}
    </h2>
    <span className="w-1.5 h-1.5 rounded-full bg-[#CFBE91]/50 flex-shrink-0" />
    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#CFBE91]/40" />
  </div>
);

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenReservation }) => {
  const t = useTranslations('Menu');
  const tNav = useTranslations('Navigation');

  const tabs = [
    { id: 'mains', label: t('tabs.mains') },
    { id: 'sides', label: t('tabs.sides') },
    { id: 'liquors', label: t('tabs.liquors') },
    { id: 'drinks', label: t('tabs.drinks') },
  ];

  const [activeTab, setActiveTab] = useState('mains');
  const [selectedDish, setSelectedDish] = useState<(MenuItem & { image: string; categoryName: string }) | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDish(null);
      }
    };
    if (selectedDish) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDish]);

  // Retrieve raw items array from locale json
  const rawItems = (t.raw(`items.${activeTab}`) as MenuItem[]) || [];
  const currentCategoryLabel = tabs.find((t) => t.id === activeTab)?.label || '';

  return (
    <section id="menu" className="flex flex-col md:flex-row h-auto md:h-screen overflow-hidden relative">

      {/* ── LEFT PANEL: Atmospheric Image + MENU title ── */}
      <div className="relative flex-shrink-0 w-full md:w-[44%] h-[38vh] md:h-full">
        <Image
          src="/images/hajung/upload_1fc1fc67c6c3757b2b1321fb38bed9ca.jpg"
          alt="HAJUNG Menu"
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.92) contrast(1.04) saturate(0.98)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080908]/45 via-[#080908]/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080908]/15 to-transparent" />

        {/* Large MENU label at bottom-left */}
        <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10">
          <span className="text-[10px] text-[#CFBE91] tracking-[0.3em] uppercase block mb-2 font-sans font-medium">
            {t('tagline')}
          </span>
          <h1
            className="font-serif text-[#EFE7D2] leading-[0.88] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(52px, 7vw, 100px)' }}
          >
            {tNav('menu').toUpperCase()}
          </h1>
        </div>
      </div>

      {/* ── RIGHT PANEL: Tabs + Menu List ── */}
      <div className="flex-1 bg-[#0D0D0C] flex flex-col h-auto md:h-full overflow-hidden">

        {/* ── Category tabs — sticky header ── */}
        <div className="flex-shrink-0 sticky top-0 z-10 bg-[#0D0D0C]/98 backdrop-blur-md border-b border-[#1A1A18]">
          {/* Scrollable tabs row */}
          <div className="flex items-center gap-2 px-5 pt-5 pb-4 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex-shrink-0 px-5 py-2.5 rounded-full
                  text-[10px] tracking-[0.16em] uppercase font-semibold
                  transition-all duration-300 border
                  ${activeTab === tab.id
                    ? 'border-[#EFE7D2] text-[#0A0B0A] bg-[#EFE7D2] shadow-[0_2px_14px_rgba(239,231,210,0.12)]'
                    : 'border-[#2A2A27] text-[#EFE7D2]/75 hover:text-[#EFE7D2] hover:border-[#3A3A37] hover:bg-[rgba(239,231,210,0.03)]'
                  }
                `}
              >
                {tab.label}
                {/* Active underline dot */}
                {activeTab === tab.id && (
                  <span className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#CFBE91]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Scrollable content area ── */}
        <div className="flex-1 overflow-y-auto">

          {/* Diamond title */}
          <div className="px-6 pt-1">
            <DiamondTitle>
              {currentCategoryLabel}
            </DiamondTitle>
          </div>

          {/* Menu items list */}
          <div className="px-5 pb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                {rawItems.map((item, idx) => {
                  const imgPool = categoryImages[activeTab] || categoryImages.mains;
                  const imgSrc = item.image || imgPool[idx % imgPool.length];

                  return (
                    <div
                      key={item.id || idx}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedDish({ ...item, image: imgSrc, categoryName: currentCategoryLabel })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedDish({ ...item, image: imgSrc, categoryName: currentCategoryLabel });
                        }
                      }}
                      className="group relative flex items-center gap-4 py-3.5 border-b border-[#161614] last:border-b-0 hover:bg-[rgba(207,190,145,0.04)] transition-all duration-300 -mx-2 px-2 rounded-xl cursor-pointer"
                    >
                      {/* Thumbnail Photo with expand indicator */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-[#222220] group-hover:border-[#CFBE91]/60 group-hover:shadow-[0_0_15px_rgba(207,190,145,0.25)] transition-all duration-500">
                        <Image
                          src={imgSrc}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          style={{ filter: 'brightness(0.95)' }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Maximize2 className="w-3.5 h-3.5 text-[#CFBE91]" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        {/* Name + Badge row */}
                        <div className="flex items-start gap-2 mb-1 flex-wrap">
                          <span className="font-serif text-[13.5px] text-[#EFE7D2] tracking-[0.04em] group-hover:text-[#CFBE91] transition-colors leading-snug">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="text-[7.5px] px-2 py-0.5 rounded-full border border-[rgba(207,190,145,0.3)] bg-[rgba(207,190,145,0.07)] text-[#CFBE91] tracking-wider uppercase font-medium flex-shrink-0 mt-0.5 group-hover:border-[#CFBE91]/70">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-[11px] text-[#EFE7D2]/78 leading-relaxed line-clamp-1 group-hover:text-[#EFE7D2]/95 transition-colors">
                          {item.description}
                        </p>
                      </div>

                      {/* Subtle hover arrow hint */}
                      <div className="text-[#CFBE91] opacity-0 group-hover:opacity-80 transition-all duration-300 group-hover:translate-x-0.5 pr-1 hidden sm:block">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Reserve CTA — sticky footer ── */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-[#1A1A18] bg-[#0D0D0C]/98 backdrop-blur-md">
          <button
            onClick={onOpenReservation}
            className="group relative w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#CFBE91] hover:bg-[#EFE7D2] text-[#0A0B0A] text-[10px] uppercase tracking-[0.22em] font-semibold transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] shadow-[0_4px_24px_rgba(207,190,145,0.18)] hover:shadow-[0_4px_30px_rgba(207,190,145,0.4)] overflow-hidden"
          >
            <span className="relative z-10">{tNav('bookTable')}</span>
            <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <div className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        </div>
      </div>

      {/* ── DISH DETAIL MODAL / LIGHTBOX ── */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedDish(null)}
            className="fixed inset-0 z-50 bg-[#0A0B0A]/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#141413] border border-[#2A2A27] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDish(null)}
                aria-label="Cerrar detalle"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#1F1F1E]/80 border border-[#333330] text-[#EFE7D2] hover:bg-[#CFBE91] hover:text-[#0A0B0A] hover:border-[#CFBE91] transition-all duration-300 flex items-center justify-center backdrop-blur-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Enlarged Dish Photo */}
              <div className="relative w-full md:w-[50%] h-64 md:h-auto min-h-[260px] bg-[#0A0B0A] overflow-hidden">
                <Image
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  fill
                  priority
                  className="object-cover"
                  style={{ filter: 'brightness(0.96) contrast(1.04)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#141413]/80 pointer-events-none" />
              </div>

              {/* Dish Info Panel */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  {/* Category & Badge */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[8.5px] uppercase tracking-[0.25em] text-[#CFBE91] font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      {selectedDish.categoryName}
                    </span>
                    {selectedDish.badge && (
                      <span className="text-[8px] px-2.5 py-0.5 rounded-full border border-[rgba(207,190,145,0.4)] bg-[rgba(207,190,145,0.08)] text-[#CFBE91] tracking-wider uppercase font-medium">
                        {selectedDish.badge}
                      </span>
                    )}
                  </div>

                  {/* Dish Title */}
                  <h3
                    className="font-serif text-[#EFE7D2] leading-tight tracking-[-0.01em]"
                    style={{ fontSize: 'clamp(20px, 2.4vw, 28px)' }}
                  >
                    {selectedDish.name}
                  </h3>

                  {/* Divider line */}
                  <div className="w-12 h-[1px] bg-gradient-to-r from-[#CFBE91] to-transparent" />

                  {/* Description */}
                  <p className="text-[13px] text-[#EFE7D2]/85 leading-relaxed font-sans">
                    {selectedDish.description}
                  </p>
                </div>

                {/* Booking CTA button inside modal */}
                <div className="pt-6 mt-6 border-t border-[#222220]">
                  <button
                    onClick={() => {
                      setSelectedDish(null);
                      onOpenReservation();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#CFBE91] hover:bg-[#EFE7D2] text-[#0A0B0A] text-[10.5px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] shadow-[0_4px_20px_rgba(207,190,145,0.2)]"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>{t('modalBookThis')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

