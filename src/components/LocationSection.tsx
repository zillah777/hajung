'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Car, ExternalLink, Navigation } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const t = useTranslations('Location');

  return (
    <section id="location" className="relative py-20 bg-[#0A0B0A] text-[#EFE7D2] px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-5">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-[#1E1E1E] border border-[#2A2A27] p-8 sm:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[rgba(207,190,145,0.03)] rounded-full blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="qitchen-badge mb-5">{t('tagline')}</span>
            <h2 className="font-forum text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#EFE7D2]">
              {t('title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left: Information */}
            <div className="lg:col-span-6 space-y-5">

              {/* Address */}
              <div className="p-5 rounded-2xl bg-[rgba(10,11,10,0.5)] border border-[#2A2A27] flex items-start gap-4 hover:border-[rgba(207,190,145,0.2)] transition-all">
                <div className="w-10 h-10 rounded-xl bg-[rgba(207,190,145,0.08)] border border-[rgba(207,190,145,0.15)] flex items-center justify-center text-[#CFBE91] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-forum text-lg text-[#EFE7D2] mb-1">{t('addressTitle')}</h3>
                  <p className="text-[rgba(245,242,234,0.65)] font-inter text-sm">{t('addressLine1')}</p>
                  <p className="text-[#4E4C47] font-inter text-xs mt-0.5">{t('addressLine2')}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="p-5 rounded-2xl bg-[rgba(10,11,10,0.5)] border border-[#2A2A27] flex items-start gap-4 hover:border-[rgba(207,190,145,0.2)] transition-all">
                <div className="w-10 h-10 rounded-xl bg-[rgba(207,190,145,0.08)] border border-[rgba(207,190,145,0.15)] flex items-center justify-center text-[#CFBE91] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-forum text-lg text-[#EFE7D2] mb-1">{t('hoursTitle')}</h3>
                  <p className="text-[rgba(245,242,234,0.65)] font-inter text-sm">{t('lunchHours')}</p>
                  <p className="text-[rgba(245,242,234,0.65)] font-inter text-sm mt-1">{t('dinnerHours')}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="p-5 rounded-2xl bg-[rgba(10,11,10,0.5)] border border-[#2A2A27] space-y-4 hover:border-[rgba(207,190,145,0.2)] transition-all">
                <h3 className="font-forum text-lg text-[#EFE7D2]">{t('contactTitle')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`tel:${t('phone')}`}
                    className="flex items-center gap-3 text-xs text-[rgba(245,242,234,0.55)] hover:text-[#CFBE91] transition-colors p-3 rounded-xl bg-[#111110] border border-[#2A2A27] font-inter"
                  >
                    <Phone className="w-4 h-4 text-[#CFBE91]" />
                    <span>{t('phone')}</span>
                  </a>
                  <a
                    href={`mailto:${t('email')}`}
                    className="flex items-center gap-3 text-xs text-[rgba(245,242,234,0.55)] hover:text-[#CFBE91] transition-colors p-3 rounded-xl bg-[#111110] border border-[#2A2A27] font-inter"
                  >
                    <Mail className="w-4 h-4 text-[#CFBE91]" />
                    <span>{t('email')}</span>
                  </a>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#4E4C47] pt-2 border-t border-[#2A2A27] font-inter">
                  <Car className="w-4 h-4 text-[#CFBE91] flex-shrink-0" />
                  <span>{t('valet')}</span>
                </div>
              </div>

              {/* Map Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href="https://maps.google.com/?q=Gangnam+Seoul+Dosan-daero"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#CFBE91] hover:bg-[#EFE7D2] text-[#0A0B0A] text-[10px] font-inter font-semibold tracking-[0.18em] uppercase flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(207,190,145,0.2)]"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t('googleMapBtn')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://map.naver.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-transparent border border-[#2A2A27] hover:border-[rgba(207,190,145,0.3)] text-[rgba(245,242,234,0.6)] hover:text-[#EFE7D2] text-[10px] font-inter font-semibold tracking-[0.18em] uppercase flex items-center justify-center gap-2 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-[#3CB371]" />
                  <span>{t('naverMapBtn')}</span>
                  <ExternalLink className="w-3 h-3 text-[#4E4C47]" />
                </a>
              </div>
            </div>

            {/* Right: Map */}
            <div className="lg:col-span-6 relative h-[480px] rounded-2xl overflow-hidden border border-[#2A2A27] shadow-2xl bg-[#111110] group">
              <iframe
                title="HAJUNG Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.792823616616!2d127.0345!3d37.5255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3849767f781%3A0x6a0f443b749d7990!2sDosan-daero%2C%20Gangnam-gu%2C%20Seoul!5e0!3m2!1sen!2skr!4v1700000000000!5m2!1sen!2skr"
                width="100%"
                height="100%"
                style={{ filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) saturate(0.8)' }}
                loading="lazy"
                className="w-full h-full opacity-75 group-hover:opacity-95 transition-opacity"
              />

              {/* Map Pin Card */}
              <div className="absolute top-5 left-5 p-4 rounded-2xl bg-[rgba(10,11,10,0.92)] backdrop-blur-md border border-[#2A2A27] shadow-xl max-w-xs pointer-events-none">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#CFBE91] flex items-center justify-center text-[#0A0B0A] font-forum text-sm shadow-md">
                    하
                  </div>
                  <div>
                    <h4 className="font-forum text-sm text-[#EFE7D2]">HAJUNG (하정)</h4>
                    <span className="text-[10px] text-[#4E4C47] font-inter block">Dosan-daero 45-gil 24, Gangnam</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
