'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

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
    '/images/restaurant/item-6.jpg',
    '/images/restaurant/item-16.jpg',
  ],
  drinks: [
    '/images/restaurant/item-16.jpg',
    '/images/restaurant/item-6.jpg',
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

  // Retrieve raw items array from locale json
  const rawItems = (t.raw(`items.${activeTab}`) as MenuItem[]) || [];

  return (
    <section id="menu" className="flex flex-col md:flex-row h-auto md:h-screen overflow-hidden">

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
              {tabs.find((t) => t.id === activeTab)?.label}
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
                      className="group flex items-center gap-4 py-3.5 border-b border-[#161614] last:border-b-0 hover:bg-[rgba(207,190,145,0.025)] transition-colors -mx-1 px-1 rounded-lg"
                    >
                      {/* Thumbnail Photo */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-[#222220]">
                        <Image
                          src={imgSrc}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          style={{ filter: 'brightness(0.95)' }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        {/* Name + Badge row */}
                        <div className="flex items-start gap-2 mb-1 flex-wrap">
                          <span className="font-serif text-[13.5px] text-[#EFE7D2] tracking-[0.04em] group-hover:text-[#CFBE91] transition-colors leading-snug">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="text-[7.5px] px-2 py-0.5 rounded-full border border-[rgba(207,190,145,0.3)] bg-[rgba(207,190,145,0.07)] text-[#CFBE91] tracking-wider uppercase font-medium flex-shrink-0 mt-0.5">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-[11px] text-[#EFE7D2]/78 leading-relaxed line-clamp-1">
                          {item.description}
                        </p>
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
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#CFBE91] hover:bg-[#EFE7D2] text-[#0A0B0A] text-[10px] uppercase tracking-[0.22em] font-semibold transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] shadow-[0_4px_24px_rgba(207,190,145,0.18)]"
          >
            <span>{tNav('bookTable')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
