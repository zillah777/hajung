'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Instagram, Twitter, ArrowUpRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface HeroSectionProps {
  onOpenReservation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenReservation }) => {
  const t = useTranslations('Hero');
  const tNav = useTranslations('Navigation');
  const [hovered, setHovered] = useState<string | null>(null);

  const rightCards = [
    {
      id: 'menu',
      label: tNav('menu').toUpperCase(),
      href: '#menu',
      image: '/images/hajung/20250329_181930.jpg',
      isButton: false,
    },
    {
      id: 'reservation',
      label: tNav('bookTable').toUpperCase(),
      href: '#reservation',
      image: '/images/hajung/upload_ed5a0e3cb8430995e0af77bd8208e407.jpg',
      isButton: true,
    },
    {
      id: 'story',
      label: tNav('about').toUpperCase(),
      href: '#story',
      image: '/images/hajung/997eafe3-6a84-4711-9806-ddfa02f0fa6f.jpeg',
      isButton: false,
    },
  ];

  return (
    <section className="relative flex flex-col md:flex-row h-screen overflow-hidden">

      {/* ── LEFT PANEL ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative flex-shrink-0 w-full md:w-[58%] h-[50vh] md:h-full"
      >
        {/* ── Video Background (portada.mp4) ── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.38) contrast(1.1) saturate(0.85)' }}
        >
          <source src="/videos/portada.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080908]/90 via-[#080908]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080908]/30 via-transparent to-transparent" />

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-24 left-8 md:top-8 md:left-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(207,190,145,0.25)] bg-[rgba(207,190,145,0.06)] text-[9px] font-medium tracking-[0.28em] text-[#CFBE91] uppercase">
            {t('badge')}
          </span>
        </motion.div>

        {/* Main headline — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-16 md:bottom-10 left-8 pr-8 md:pr-12"
        >
          <h1
            className="font-serif text-[#EFE7D2] leading-[0.88] tracking-[-0.01em] select-none"
            style={{ fontSize: 'clamp(42px, 6.5vw, 96px)' }}
          >
            {t('titleLine1')}<br />
            <span className="text-[#CFBE91] italic">{t('titleHighlight')}</span>
          </h1>
        </motion.div>

        {/* Social icons — bottom left below title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-6 left-8 flex items-center gap-5"
        >
          <a
            href="https://www.instagram.com/hajung.kitchen/"
            target="_blank"
            rel="noreferrer"
            className="text-[#EFE7D2]/30 hover:text-[#CFBE91] transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#EFE7D2]/30 hover:text-[#CFBE91] transition-colors"
            aria-label="X / Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <span className="text-[9px] text-[#EFE7D2]/20 tracking-[0.3em] uppercase">
            @hajung.kitchen
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-6 right-6 hidden md:flex flex-col items-center gap-1.5"
        >
          <ChevronDown className="w-4 h-4 text-[#EFE7D2]/20 animate-bounce" />
        </motion.div>
      </motion.div>

      {/* ── RIGHT PANEL: 3 stacked image cards ── */}
      <div className="flex-1 flex flex-col h-[50vh] md:h-full bg-[#0D0D0C]">
        {rightCards.map((card, idx) => {
          const CardTag = card.isButton ? 'button' : 'a';
          const cardProps = card.isButton
            ? { onClick: onOpenReservation, type: 'button' as const }
            : { href: card.href };

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 relative overflow-hidden"
              style={{ borderTop: idx > 0 ? '1px solid #1A1A18' : 'none' }}
            >
              {/* @ts-ignore */}
              <CardTag
                {...cardProps}
                className="block w-full h-full relative cursor-pointer group"
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Image */}
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
                  style={{
                    filter: hovered === card.id ? 'brightness(0.55)' : 'brightness(0.42)',
                    transition: 'filter 0.5s ease, transform 0.7s ease',
                  }}
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/90 via-[#0D0D0C]/10 to-transparent" />

                {/* Label + Arrow */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 flex items-end justify-between">
                  <span className="font-serif text-[clamp(14px,1.4vw,20px)] tracking-[0.2em] text-[#EFE7D2] group-hover:text-[#CFBE91] transition-colors">
                    {card.label}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[#EFE7D2]/30 flex items-center justify-center group-hover:bg-[#CFBE91] group-hover:border-[#CFBE91] transition-all duration-300 flex-shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#EFE7D2] group-hover:text-[#0A0B0A] transition-colors" />
                  </div>
                </div>
              </CardTag>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
