'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Maximize2, X, MapPin } from 'lucide-react';
import Image from 'next/image';

export const GalleryGrid: React.FC = () => {
  const t = useTranslations('Gallery');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const galleryImages = [
    { src: '/images/restaurant/item-1.jpg', title: 'Entrance Sanctuary', span: 'col-span-12 md:col-span-6 row-span-2' },
    { src: '/images/restaurant/item-2.jpg', title: 'Edomae Nigiri Craft', span: 'col-span-6 md:col-span-3' },
    { src: '/images/restaurant/item-3.jpg', title: 'Binchotan Oak Grill', span: 'col-span-6 md:col-span-3' },
    { src: '/images/restaurant/item-4.jpg', title: 'Grand Omakase Course', span: 'col-span-6 md:col-span-3' },
    { src: '/images/restaurant/item-5.jpg', title: 'Seasonal Kaiseki Starter', span: 'col-span-6 md:col-span-3' },
    { src: '/images/restaurant/item-6.jpg', title: 'Otoro Caviar Creation', span: 'col-span-12 md:col-span-6' },
    { src: '/images/restaurant/item-7.jpg', title: 'Hokkaido Uni Gunkan', span: 'col-span-6 md:col-span-3' },
    { src: '/images/restaurant/item-8.jpg', title: 'Shima-Aji Ponzu', span: 'col-span-6 md:col-span-3' },
    { src: '/images/restaurant/item-9.jpg', title: 'Hanwoo A5 Binchotan', span: 'col-span-6 md:col-span-3' },
    { src: '/images/restaurant/item-10.jpg', title: 'Saikyo Miso Gindara', span: 'col-span-6 md:col-span-3' },
    { src: '/images/restaurant/item-11.jpg', title: 'Dassai 23 Reserve', span: 'col-span-6 md:col-span-4' },
    { src: '/images/restaurant/item-12.jpg', title: 'Artisanal Pottery', span: 'col-span-6 md:col-span-4' },
    { src: '/images/restaurant/item-13.jpg', title: 'Zen Dining Interior', span: 'col-span-12 md:col-span-4' },
    { src: '/images/restaurant/item-14.jpg', title: 'Private Room Table', span: 'col-span-6 md:col-span-6' },
    { src: '/images/restaurant/item-15.jpg', title: 'Seasonal Matcha Dessert', span: 'col-span-6 md:col-span-3' },
    { src: '/images/restaurant/item-16.jpg', title: 'Evening Ambiance', span: 'col-span-12 md:col-span-3' },
  ];

  return (
    <section id="gallery" className="relative py-20 bg-[#0A0B0A] text-[#EFE7D2] px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* ── GALLERY CARD CONTAINER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-[#1E1E1E] border border-[#2A2A27] p-5 sm:p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="qitchen-badge mb-5 gap-1.5">
              <Instagram className="w-3 h-3" />
              <span>@HAJUNG_SEOUL</span>
            </div>
            <h2 className="font-forum text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#EFE7D2]">
              {t('title')}
            </h2>
            <p className="text-[rgba(245,242,234,0.85)] font-inter text-sm sm:text-base max-w-xl mt-3">
              {t('subtitle')}
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.07 }}
                onClick={() => setLightboxImage(img.src)}
                className={`${img.span} relative min-h-[200px] sm:min-h-[240px] rounded-2xl overflow-hidden cursor-pointer group border border-[#2A2A27] bg-[#111110]`}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 filter brightness-[0.95] group-hover:brightness-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0A]/95 via-[#0A0B0A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                  <div className="self-end p-2 rounded-full bg-[rgba(10,11,10,0.7)] backdrop-blur-md border border-[rgba(207,190,145,0.2)] text-[#CFBE91]">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#CFBE91] font-semibold mb-1 font-inter">
                      <MapPin className="w-3 h-3" />
                      Gwanak-gu, Seoul
                    </span>
                    <h4 className="font-forum text-lg text-[#EFE7D2]">
                      {img.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[rgba(10,11,10,0.97)] backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-[#1E1E1E] border border-[#2A2A27] text-[#EFE7D2] hover:bg-[#CFBE91] hover:text-[#0A0B0A] transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-5xl max-h-[85vh] w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={lightboxImage}
                alt="HAJUNG Editorial Lightbox"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
