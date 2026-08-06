'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Feather, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export const Experience: React.FC = () => {
  const t = useTranslations('Experience');

  const pillars = [
    { title: t('pillar1Title'), desc: t('pillar1Desc'), icon: Feather },
    { title: t('pillar2Title'), desc: t('pillar2Desc'), icon: Flame },
    { title: t('pillar3Title'), desc: t('pillar3Desc'), icon: Sparkles },
  ];

  return (
    <section id="experience" className="relative py-20 bg-[#0A0B0A] text-[#EFE7D2] px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* ── MAIN EXPERIENCE CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-[#1E1E1E] border border-[#2A2A27] p-8 sm:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Ambient Gold Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[rgba(207,190,145,0.04)] rounded-full blur-[120px] pointer-events-none" />

          {/* Card Header */}
          <div className="flex flex-col items-start mb-12">
            <span className="qitchen-badge mb-5">{t('tagline')}</span>
            <h2 className="font-forum text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#EFE7D2] max-w-3xl leading-tight">
              {t('title')}
            </h2>
          </div>

          {/* Split Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 md:mb-14">

            {/* Left: Narrative Copy */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="font-forum text-2xl sm:text-3xl text-[rgba(245,242,234,0.8)] tracking-wider font-normal">
                Yakisugi & Wabi-Sabi{' '}
                <span className="italic text-[#CFBE91]">Omakase Sanctuary</span>
              </h3>

              <p className="text-[rgba(245,242,234,0.55)] font-inter text-base leading-relaxed">
                {t('paragraph1')}
              </p>

              <p className="text-[rgba(245,242,234,0.55)] font-inter text-base leading-relaxed">
                {t('paragraph2')}
              </p>

              <div className="pt-5 flex items-center gap-8 border-t border-[#2A2A27]">
                <div>
                  <span className="block font-forum text-2xl text-[#EFE7D2] font-normal">旬 (Shun)</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#4E4C47] font-inter">Micro-Seasonality</span>
                </div>
                <div className="w-[1px] h-10 bg-[#2A2A27]" />
                <div>
                  <span className="block font-forum text-2xl text-[#EFE7D2] font-normal">匠 (Takumi)</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#4E4C47] font-inter">Master Artistry</span>
                </div>
              </div>
            </div>

            {/* Right: Dual Editorial Image Cards */}
            <div className="lg:col-span-6 grid grid-cols-12 gap-4">
              <div className="col-span-7 relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#2A2A27] shadow-2xl group">
                <Image
                  src="/images/restaurant/item-2.jpg"
                  alt="HAJUNG Chef Crafting Edomae Nigiri"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0A]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#CFBE91] font-semibold font-inter block">Craftsmanship</span>
                  <span className="text-xs text-[rgba(245,242,234,0.7)] font-forum">Precision Knife Technique</span>
                </div>
              </div>

              <div className="col-span-5 relative h-64 sm:h-80 my-auto rounded-2xl overflow-hidden border border-[#2A2A27] shadow-2xl group -ml-2 z-10">
                <Image
                  src="/images/restaurant/item-3.jpg"
                  alt="Charcoal Robata Grill at HAJUNG"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0A]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#CFBE91] font-semibold font-inter block">Binchotan</span>
                  <span className="text-xs text-[rgba(245,242,234,0.7)] font-forum">Oak Charcoal Fire</span>
                </div>
              </div>
            </div>

          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 pt-8 border-t border-[#2A2A27]">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[rgba(10,11,10,0.5)] border border-[#2A2A27] hover:border-[rgba(207,190,145,0.3)] rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(207,190,145,0.05)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[rgba(207,190,145,0.08)] border border-[rgba(207,190,145,0.15)] flex items-center justify-center text-[#CFBE91] mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-forum text-lg text-[#EFE7D2] mb-2 group-hover:text-[#CFBE91] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-[rgba(245,242,234,0.45)] font-inter text-xs leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
