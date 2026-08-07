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
  const [showTitle, setShowTitle] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hasEndedOnce = React.useRef(false);

  React.useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.defaultMuted = true;
    vid.muted = true;
    vid.loop = true;
    vid.setAttribute('muted', '');
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', 'true');
    vid.setAttribute('loop', '');

    const safePlay = () => {
      vid.muted = true;
      const p = vid.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    };

    safePlay();

    vid.addEventListener('loadedmetadata', safePlay);
    vid.addEventListener('canplay', safePlay);

    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      setShowTitle(true);
    } else {
      let lastTime = 0;
      const onTimeUpdate = () => {
        const current = vid.currentTime;
        if (vid.duration && (current < lastTime || current >= vid.duration - 0.5)) {
          if (!hasEndedOnce.current) {
            hasEndedOnce.current = true;
            setShowTitle(true);
          }
        }
        lastTime = current;
      };
      vid.addEventListener('timeupdate', onTimeUpdate);

      const fallbackTimer = setTimeout(() => {
        if (!hasEndedOnce.current) {
          hasEndedOnce.current = true;
          setShowTitle(true);
        }
      }, 4000);

      return () => {
        vid.removeEventListener('loadedmetadata', safePlay);
        vid.removeEventListener('canplay', safePlay);
        vid.removeEventListener('timeupdate', onTimeUpdate);
        clearTimeout(fallbackTimer);
      };
    }

    return () => {
      vid.removeEventListener('loadedmetadata', safePlay);
      vid.removeEventListener('canplay', safePlay);
    };
  }, []);

  const rightCards = [
    {
      id: 'menu',
      label: tNav('menu').toUpperCase(),
      href: '#menu',
      image: '/images/hajung/image7.png',
      isButton: false,
    },
    {
      id: 'reservation',
      label: tNav('bookTable').toUpperCase(),
      href: '#reservation',
      image: '/images/hajung/peopleambient.png',
      isButton: true,
    },
    {
      id: 'story',
      label: tNav('about').toUpperCase(),
      href: '#story',
      image: '/images/hajung/about.jpeg',
      isButton: false,
    },
  ];

  return (
    <section className="relative flex flex-col md:flex-row h-[100dvh] overflow-hidden gap-1.5 md:gap-3 bg-[#0A0B0A] p-0 md:p-1.5">

      {/* ── LEFT PANEL ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative flex-shrink-0 w-full md:w-[57.5%] h-[48dvh] md:h-full rounded-none md:rounded-r-2xl overflow-hidden"
      >
        {/* ── Video Background (portada.mp4) ── */}
        <video
          ref={videoRef}
          src="/videos/portada.mp4"
          autoPlay
          muted
          loop
          playsInline
          // @ts-ignore
          webkit-playsinline="true"
          // @ts-ignore
          x5-playsinline="true"
          preload="auto"
          // @ts-ignore
          disablePictureInPicture
          // @ts-ignore
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ filter: 'brightness(0.92) contrast(1.04) saturate(0.98)' }}
        >
          <source src="/videos/portada.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080908]/50 via-[#080908]/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080908]/20 via-transparent to-transparent" />

        {/* Main headline — fades in after video first play ends */}
        <div
          className="absolute bottom-6 md:bottom-10 left-6 md:left-8 pr-6 md:pr-12 transition-all duration-[1500ms] ease-out"
          style={{ opacity: showTitle ? 1 : 0, transform: showTitle ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <h1
            className="font-serif text-[#EFE7D2] leading-[0.88] tracking-[-0.01em] select-none"
            style={{ fontSize: 'clamp(42px, 6.5vw, 96px)' }}
          >
            {t('titleLine1')}<br />
            <span className="text-[#CFBE91] italic">{t('titleHighlight')}</span>
          </h1>
        </div>

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
            className="text-[#EFE7D2]/75 hover:text-[#CFBE91] transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#EFE7D2]/75 hover:text-[#CFBE91] transition-colors"
            aria-label="X / Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <span className="text-[9px] text-[#EFE7D2]/65 tracking-[0.3em] uppercase font-medium">
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
          <ChevronDown className="w-4 h-4 text-[#EFE7D2]/65 animate-bounce" />
        </motion.div>
      </motion.div>

      {/* ── RIGHT PANEL: 3 stacked image cards ── */}
      <div className="flex-1 flex flex-col h-[52dvh] md:h-full bg-[#0D0D0C] rounded-none md:rounded-l-2xl overflow-hidden gap-1.5">
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
                    filter: hovered === card.id ? 'brightness(0.98)' : 'brightness(0.90)',
                    transition: 'filter 0.5s ease, transform 0.7s ease',
                  }}
                />

                {/* Gradient overlay focused on text side (+15% contrast behind text) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0A]/85 via-[#0A0B0A]/35 to-transparent pointer-events-none" />

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
