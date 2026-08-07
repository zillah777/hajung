'use client';

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star, MapPin, Clock, Phone, ChevronRight, ChevronDown } from 'lucide-react';

// ── Carousel slides ─────────────────────────────────────────────────────────
// Slide 0 → Chef Koo Bonkwan cutting fish (chef photo restored)
// Slide 1 → Staff team in kitchen (staff photo restored)
// Slide 2 → Restaurant interior / ambience
const SLIDES = [
  {
    key: 'chef',
    leftBg: '/images/restaurant/chef-mastery.png',
    thumbnail: '/images/restaurant/staff-family.png',
    carouselImg: '/images/hajung/upload_cf4cb341d210dd03978a87b9cdddda3f.jpeg',
  },
  {
    key: 'team',
    leftBg: '/images/restaurant/staff-family.png',
    thumbnail: '/images/hajung/upload_cf4cb341d210dd03978a87b9cdddda3f.jpeg',
    carouselImg: '/images/restaurant/chef-mastery.png',
  },
  {
    key: 'ambience',
    leftBg: '/images/hajung/upload_cf4cb341d210dd03978a87b9cdddda3f.jpeg',
    thumbnail: '/images/restaurant/chef-mastery.png',
    carouselImg: '/images/restaurant/staff-family.png',
  },
] as const;

type SlideKey = typeof SLIDES[number]['key'];

// ── Rating cards ─────────────────────────────────────────────────────────────
const ratingCards = [
  { label: 'GOOGLE', sub: 'BEST KOREAN', rating: '4.9', color: '#4285F4' },
  { label: 'NAVER', sub: 'QUALITY FOOD', rating: '4.8', color: '#03C75A' },
  { label: 'INSTAGRAM', sub: '@hajung.kitchen', rating: '★★★★★', color: '#E1306C' },
];

// ── Restaurant info ───────────────────────────────────────────────────────────
const restaurantInfo = {
  address: '서울시 관악구 봉천동 보라매로22 1층',
  addressSub: 'Boramae-ro 22, Gwanak-gu, Seoul',
  phone: '+82 10-5100-3623',
  weekdays: '평일 17:30 – 01:00',
  saturday: '토요일 17:00 – 01:00',
};

// ── Value items ───────────────────────────────────────────────────────────────
const VALUE_KEYS = ['val1', 'val2', 'val3', 'val4'] as const;

export const ChefStory: React.FC = () => {
  const t = useTranslations('Story');
  const [slideIdx, setSlideIdx] = useState(0);

  const slide = SLIDES[slideIdx];
  const pillarKey = slide.key as SlideKey;

  const nextSlide = useCallback(() => {
    setSlideIdx((prev) => (prev + 1) % SLIDES.length);
  }, []);

  return (
    <section
      id="story"
      className="bg-[#0A0B0A] flex flex-col"
    >
      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT: split-screen  |  MOBILE: stacked
      ════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:h-screen md:overflow-hidden">

        {/* ── LEFT PANEL — big image, changes with slide ── */}
        <div className="relative w-full md:flex-shrink-0 md:w-[48%] overflow-hidden"
          style={{ height: 'clamp(260px, 55vw, 100vh)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.leftBg}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={slide.leftBg}
                alt={t(`pillars.${pillarKey}.title`)}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 48vw"
                className="object-cover object-center"
                style={{ filter: 'brightness(0.94) contrast(1.02) saturate(0.98)' }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradients (+15% contrast behind text) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080908]/45 via-[#080908]/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080908]/10 hidden md:block" />

          {/* Slide dots — mobile navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden z-20">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === slideIdx ? 'bg-[#CFBE91] scale-125' : 'bg-[#EFE7D2]/60'
                }`}
              />
            ))}
          </div>

          {/* "ABOUT" — bottom left, large serif */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
            <h2
              className="font-serif text-[#EFE7D2] leading-[0.85] tracking-[-0.02em] select-none"
              style={{ fontSize: 'clamp(48px, 10vw, 120px)' }}
            >
              ABOUT
            </h2>
          </div>

          {/* Next arrow — mobile: bottom-right corner */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute bottom-6 right-6 md:hidden z-20 w-10 h-10 rounded-full bg-[#EFE7D2]/10 border border-[#EFE7D2]/25 flex items-center justify-center text-[#EFE7D2]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ── RIGHT PANEL — 3 rows ── */}
        <div className="flex-1 flex flex-col bg-[#0D0D0C] divide-y divide-[#161614] md:overflow-hidden md:min-h-0">

          {/* ROW 1: Title + description  |  Thumbnail + arrow */}
          <div className="flex min-h-0" style={{ flex: '1 1 42%' }}>

            {/* Text — left side of top row */}
            <div className="flex-1 flex flex-col justify-center p-5 md:p-7 md:pr-4 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pillarKey}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="space-y-3"
                >
                  {/* Badge */}
                  <span className="text-[9px] uppercase tracking-[0.28em] text-[#CFBE91] font-semibold block">
                    {t(`pillars.${pillarKey}.badge`)}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-serif text-[#EFE7D2] leading-[1.0] tracking-[-0.01em]"
                    style={{ fontSize: 'clamp(20px, 2.8vw, 42px)' }}
                  >
                    {t(`pillars.${pillarKey}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-[11.5px] text-[#EFE7D2]/85 leading-relaxed max-w-sm">
                    {t(`pillars.${pillarKey}.desc`)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(['tag1', 'tag2', 'tag3'] as const).map((tk) => (
                      <span
                        key={tk}
                        className="text-[8px] px-2.5 py-1 rounded-full border border-[rgba(207,190,145,0.35)] bg-[rgba(207,190,145,0.08)] text-[#CFBE91] tracking-wider uppercase font-medium"
                      >
                        ✦ {t(`pillars.${pillarKey}.${tk}`)}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail — right side with next arrow (desktop only) */}
            <div className="relative hidden sm:block w-[38%] md:w-[42%] flex-shrink-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.thumbnail}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.thumbnail}
                    alt="Preview"
                    fill
                    sizes="42vw"
                    className="object-cover object-center"
                    style={{ filter: 'brightness(0.92) contrast(1.02)' }}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/45 via-[#0D0D0C]/15 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0D0D0C]/10" />

              {/* Next arrow button */}
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFE7D2]/10 border border-[#EFE7D2]/25 flex items-center justify-center text-[#EFE7D2] hover:bg-[#CFBE91] hover:border-[#CFBE91] hover:text-[#0A0B0A] transition-all duration-300 group"
              >
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* ROW 2: 3 rating cards */}
          <div
            className="grid grid-cols-3 divide-x divide-[#161614]"
            style={{ flex: '0 0 auto', minHeight: '80px' }}
          >
            {ratingCards.map((card, idx) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col items-center justify-center py-3 px-2 hover:bg-[rgba(207,190,145,0.03)] transition-colors text-center gap-1"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2 h-2 text-[#CFBE91] fill-[#CFBE91]" />
                  ))}
                </div>
                <span className="font-serif text-sm text-[#EFE7D2] leading-tight tracking-wide">
                  {card.label}
                </span>
                <span
                  className="text-[8px] tracking-[0.2em] uppercase font-medium"
                  style={{ color: card.color }}
                >
                  {card.sub}
                </span>
              </motion.div>
            ))}
          </div>

          {/* ROW 3: Carousel image  |  Story + values */}
          <div className="flex min-h-0" style={{ flex: '1 1 36%' }}>
            <div className="flex flex-1 min-h-0 divide-x divide-[#161614]">

              {/* Bottom-left: main carousel card */}
              <div className="relative w-1/2 overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.carouselImg}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slide.carouselImg}
                      alt={t(`pillars.${pillarKey}.title`)}
                      fill
                      sizes="25vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{ filter: 'brightness(0.92) contrast(1.04)' }}
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/45 via-[#0D0D0C]/15 to-transparent" />

                {/* Arrow */}
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#EFE7D2]/10 border border-[#EFE7D2]/25 flex items-center justify-center text-[#EFE7D2] hover:bg-[#CFBE91] hover:border-[#CFBE91] hover:text-[#0A0B0A] transition-all duration-300 group/btn"
                >
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                {/* Bottom label */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="text-[8px] uppercase tracking-[0.22em] text-[#CFBE91] block mb-0.5 font-medium">
                    {t(`pillars.${pillarKey}.badge`)}
                  </span>
                  <span className="font-serif text-[#EFE7D2] text-xs leading-tight">
                    {t(`pillars.${pillarKey}.title`)}
                  </span>
                </div>
              </div>

              {/* Bottom-right: Story text + values */}
              <div className="w-1/2 flex flex-col justify-center p-4 md:p-5 bg-[#0A0B0A] overflow-y-auto">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-[1px] bg-[#CFBE91]/50" />
                  <span className="text-[8px] uppercase tracking-[0.28em] text-[#CFBE91] font-semibold">
                    {t('restaurantNameFull')}
                  </span>
                </div>

                <h4
                  className="font-serif text-[#EFE7D2] leading-tight mb-2"
                  style={{ fontSize: 'clamp(14px, 1.6vw, 22px)' }}
                >
                  {t('title')}
                </h4>

                <p className="text-[10.5px] text-[#EFE7D2]/82 leading-relaxed mb-3">
                  {t('desc1')}
                </p>

                {/* Values */}
                <div className="border-t border-[#181816] pt-3 space-y-2">
                  <span className="text-[7.5px] uppercase tracking-[0.28em] text-[#CFBE91]/85 font-semibold block mb-2">
                    {t('valuesLabel')}
                  </span>
                  {VALUE_KEYS.map((key) => (
                    <div key={key} className="flex items-start gap-2">
                      <span className="text-[#CFBE91]/75 text-[8px] mt-[2px] flex-shrink-0">◆</span>
                      <p className="text-[10px] text-[#EFE7D2]/78 leading-snug">{t(key)}</p>
                    </div>
                  ))}
                </div>

                {/* Compact info */}
                <div className="border-t border-[#181816] pt-3 mt-3 space-y-1.5">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-2.5 h-2.5 text-[#CFBE91]/80 flex-shrink-0 mt-[1px]" />
                    <p className="text-[9.5px] text-[#EFE7D2]/80 leading-snug">{restaurantInfo.address}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-2.5 h-2.5 text-[#CFBE91]/80 flex-shrink-0" />
                    <span className="text-[9.5px] text-[#EFE7D2]/80 tracking-wider">{restaurantInfo.phone}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Clock className="w-2.5 h-2.5 text-[#CFBE91]/80 flex-shrink-0 mt-[1px]" />
                    <div>
                      <p className="text-[9px] text-[#EFE7D2]/75">{restaurantInfo.weekdays}</p>
                      <p className="text-[9px] text-[#EFE7D2]/75">{restaurantInfo.saturday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE-ONLY VALUES SECTION
          (visible below the fold on phones, replaces the tiny right panel)
      ════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden bg-[#0D0D0C] border-t border-[#161614] px-5 py-6">

        {/* Chef & Team header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-[1px] bg-[#CFBE91]/50" />
          <span className="text-[8px] uppercase tracking-[0.3em] text-[#CFBE91] font-semibold">
            {t('restaurantNameFull')}
          </span>
        </div>

        <h3
          className="font-serif text-[#EFE7D2] leading-tight mb-3"
          style={{ fontSize: 'clamp(22px, 6vw, 34px)' }}
        >
          {t('title')}
        </h3>

        <p className="text-[12px] text-[#EFE7D2]/82 leading-relaxed mb-5">
          {t('desc1')}
        </p>

        {/* Chef photo — mobile dedicated block */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
          <Image
            src="/images/restaurant/chef-mastery.png"
            alt="Chef Koo Bonkwan"
            fill
            sizes="100vw"
            className="object-cover object-top"
            style={{ filter: 'brightness(0.94) contrast(1.04)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/45 via-[#0D0D0C]/15 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#CFBE91] block mb-0.5 font-medium">Chef</span>
            <span className="font-serif text-[#EFE7D2] text-base">{t('chefName')}</span>
            <p className="text-[10px] text-[#EFE7D2]/80 mt-0.5">{t('chefRole')}</p>
          </div>
        </div>

        {/* Staff photo — mobile dedicated block */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
          <Image
            src="/images/restaurant/staff-family.png"
            alt="Hajung Team"
            fill
            sizes="100vw"
            className="object-cover object-center"
            style={{ filter: 'brightness(0.94) contrast(1.04)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/45 via-[#0D0D0C]/15 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#CFBE91] block mb-0.5 font-medium">{t('pillars.team.badge')}</span>
            <span className="font-serif text-[#EFE7D2] text-base">{t('pillars.team.title')}</span>
          </div>
        </div>

        {/* Values grid — mobile */}
        <div className="space-y-3 mb-6">
          <span className="text-[8px] uppercase tracking-[0.3em] text-[#CFBE91]/85 font-semibold block">
            {t('valuesLabel')}
          </span>
          {VALUE_KEYS.map((key) => (
            <div key={key} className="flex items-start gap-3 py-3 border-b border-[#161614] last:border-0">
              <span className="text-[#CFBE91]/80 text-[10px] mt-[2px] flex-shrink-0">◆</span>
              <p className="text-[12px] text-[#EFE7D2]/85 leading-relaxed">{t(key)}</p>
            </div>
          ))}
        </div>

        {/* Rating cards — mobile */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {ratingCards.map((card) => (
            <div
              key={card.label}
              className="flex flex-col items-center py-3 px-2 bg-[#111110] rounded-xl border border-[#1E1E1C] gap-1 text-center"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2 h-2 text-[#CFBE91] fill-[#CFBE91]" />
                ))}
              </div>
              <span className="font-serif text-[11px] text-[#EFE7D2] leading-tight">
                {card.label}
              </span>
              <span
                className="text-[7.5px] tracking-[0.18em] uppercase font-medium"
                style={{ color: card.color }}
              >
                {card.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Contact info — mobile */}
        <div className="space-y-2.5 pt-4 border-t border-[#161614]">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#CFBE91] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] text-[#EFE7D2]/85 leading-snug">{restaurantInfo.address}</p>
              <p className="text-[9px] text-[#EFE7D2]/65 mt-0.5">{restaurantInfo.addressSub}</p>
            </div>
          </div>
          <a
            href={`tel:${restaurantInfo.phone.replace(/\./g, '-')}`}
            className="flex items-center gap-3 py-2"
          >
            <Phone className="w-4 h-4 text-[#CFBE91] flex-shrink-0" />
            <span className="text-[11px] text-[#EFE7D2]/85 tracking-wider">{restaurantInfo.phone}</span>
          </a>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#CFBE91] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] text-[#EFE7D2]/85">{restaurantInfo.weekdays}</p>
              <p className="text-[11px] text-[#EFE7D2]/85">{restaurantInfo.saturday}</p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-6">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 text-[#EFE7D2]/20"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
