'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Instagram, Twitter, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#0A0B0A] border-t border-[#161614]">
      <div className="flex flex-col md:flex-row items-stretch">

        {/* Brand column */}
        <div className="flex-shrink-0 md:w-[48%] px-8 md:px-12 py-10 border-b md:border-b-0 md:border-r border-[#161614] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-[#CFBE91] text-[#0A0B0A] font-serif text-xs flex items-center justify-center">
                하
              </div>
              <span className="font-serif text-lg tracking-[0.25em] text-[#EFE7D2]">HAJUNG</span>
            </div>
            <p className="text-[11px] text-[#EFE7D2]/30 leading-relaxed max-w-xs mb-5">
              {t('brandTagline')}
            </p>
            <div className="text-[10px] text-[#EFE7D2]/20 tracking-[0.15em] uppercase">
              {t('address')}
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://www.instagram.com/hajung.kitchen/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full border border-[#2A2A27] flex items-center justify-center text-[#EFE7D2]/30 hover:text-[#CFBE91] hover:border-[rgba(207,190,145,0.4)] transition-all"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X / Twitter"
              className="w-8 h-8 rounded-full border border-[#2A2A27] flex items-center justify-center text-[#EFE7D2]/30 hover:text-[#CFBE91] hover:border-[rgba(207,190,145,0.4)] transition-all"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Links + Hours column */}
        <div className="flex-1 px-8 md:px-12 py-10 flex flex-col justify-between min-w-0">
          <div className="grid grid-cols-2 gap-6">
            {/* Navigation */}
            <div>
              <h5 className="text-[9px] uppercase tracking-[0.28em] text-[#CFBE91]/60 font-medium mb-4">
                {t('navTitle')}
              </h5>
              <ul className="space-y-2.5">
                {[
                  { href: '#', label: t('home') },
                  { href: '#menu', label: tNav('menu') },
                  { href: '#reservation', label: tNav('bookTable') },
                  { href: '#story', label: tNav('about') },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[11px] text-[#EFE7D2]/30 hover:text-[#CFBE91] transition-colors tracking-wider flex items-center gap-1.5 group"
                    >
                      <span className="w-0 h-[1px] bg-[#CFBE91] group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h5 className="text-[9px] uppercase tracking-[0.28em] text-[#CFBE91]/60 font-medium mb-4">
                {t('hoursTitle')}
              </h5>
              <div className="space-y-2">
                <div className="text-[11px] text-[#EFE7D2]/30">
                  {t('weekdayHours')}
                </div>
                <div className="text-[11px] text-[#EFE7D2]/30">
                  {t('saturdayHours')}
                </div>
                <div className="text-[11px] text-[#3A3A37]">
                  {t('sundayNote')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#161614] px-8 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-[10px] text-[#3A3A37] tracking-wider">
          © {new Date().getFullYear()} {t('rights')}
        </div>

        <div className="flex items-center gap-5">
          <a href="#" className="text-[10px] text-[#3A3A37] hover:text-[#EFE7D2]/50 transition-colors tracking-wider">
            {t('privacy')}
          </a>
          <a href="#" className="text-[10px] text-[#3A3A37] hover:text-[#EFE7D2]/50 transition-colors tracking-wider">
            {t('terms')}
          </a>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-8 h-8 rounded-full border border-[#1E1E1E] hover:border-[rgba(207,190,145,0.3)] text-[#3A3A37] hover:text-[#CFBE91] flex items-center justify-center transition-all ml-1"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
