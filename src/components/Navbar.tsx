'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { useLocale } from 'next-intl';
import { Menu, X, Globe, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Scroll spy: highlights nav link of the section currently in view ──
  useEffect(() => {
    const sections = ['menu', 'story', 'reservation'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const changeLanguage = (newLocale: 'es' | 'en' | 'ko') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <>
      {/* ── Qitchen Floating Navbar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-0 right-0 z-50 px-3 sm:px-5 flex items-start"
      >
        <div
          className={`inline-flex items-center gap-1 rounded-2xl px-2.5 sm:px-3 py-2 sm:py-2.5 transition-all duration-500 max-w-full ${
            isScrolled
              ? 'bg-[#0D0D0C]/98 backdrop-blur-2xl border border-[#2A2A27] shadow-[0_8px_40px_rgba(0,0,0,0.7)]'
              : 'bg-[#111110]/90 backdrop-blur-xl border border-[#222220]'
          }`}
        >
          {/* Hamburger */}
          <button
            id="nav-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-[#EFE7D2] hover:text-[#CFBE91] hover:bg-[rgba(207,190,145,0.06)] transition-all"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 px-2 group">
            <div className="w-6 h-6 rounded-full bg-[#CFBE91] text-[#0A0B0A] font-serif text-[10px] flex items-center justify-center font-medium flex-shrink-0">
              하
            </div>
            <span className="font-serif text-sm tracking-[0.22em] text-[#EFE7D2] group-hover:text-[#CFBE91] transition-colors whitespace-nowrap">
              HAJUNG
            </span>
          </a>

          {/* Separator */}
          <div className="w-[1px] h-5 bg-[#2A2A27] mx-1 hidden sm:block" />

          {/* Desktop Nav Links */}
          <nav className="hidden sm:flex items-center">
            {[
              { href: '#menu', id: 'menu', label: t('menu') },
              { href: '#story', id: 'story', label: t('about') },
            ].map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] transition-colors font-medium whitespace-nowrap ${
                  activeSection === link.id
                    ? 'text-[#CFBE91]'
                    : 'text-[rgba(245,242,234,0.80)] hover:text-[#EFE7D2]'
                }`}
              >
                {link.label}
                {/* Active underline indicator */}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-[1px] bg-[#CFBE91]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Separator */}
          <div className="w-[1px] h-5 bg-[#2A2A27] mx-1 hidden sm:block" />

          {/* Lang Switcher */}
          <div className="hidden sm:flex items-center gap-0.5 text-[10px]">
            <Globe className="w-3 h-3 text-[#9E9A90] mr-1" />
            {(['es', 'en', 'ko'] as const).map((lang, i, arr) => (
              <React.Fragment key={lang}>
                <button
                  onClick={() => changeLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded transition-colors font-medium ${
                    currentLocale === lang
                      ? 'text-[#CFBE91]'
                      : 'text-[#9E9A90] hover:text-[#EFE7D2]'
                  }`}
                >
                  {lang === 'ko' ? '한' : lang.toUpperCase()}
                </button>
                {i < arr.length - 1 && <span className="text-[#2A2A27]">|</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Book CTA */}
          <button
            id="nav-book-btn"
            onClick={onOpenReservation}
            className="ml-2 group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[rgba(207,190,145,0.5)] text-[#EFE7D2] hover:bg-[#CFBE91] hover:border-[#CFBE91] hover:text-[#0A0B0A] text-[10px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 whitespace-nowrap"
          >
            <span>{t('bookTable')}</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0A0B0A]/99 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24"
          >
            <div className="flex flex-col gap-8">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#CFBE91] font-semibold">
                HAJUNG SEOUL
              </span>
              {[
                { href: '#menu', label: t('menu') },
                { href: '#story', label: t('about') },
                { href: '#reservation', label: t('bookTable') },
              ].map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.07 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-4xl text-[#EFE7D2] hover:text-[#CFBE91] py-2 border-b border-[#1E1E1E] flex items-center justify-between transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#CFBE91]" />
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 border border-[#2A2A27] rounded-full px-3 py-2 w-fit">
                {(['es', 'en', 'ko'] as const).map((lang, i, arr) => (
                  <React.Fragment key={lang}>
                    <button
                      onClick={() => { changeLanguage(lang); setMobileMenuOpen(false); }}
                      className={`text-[10px] font-semibold ${currentLocale === lang ? 'text-[#CFBE91]' : 'text-[#9E9A90]'}`}
                    >
                      {lang === 'ko' ? '한' : lang.toUpperCase()}
                    </button>
                    {i < arr.length - 1 && <span className="text-[#2A2A27]">|</span>}
                  </React.Fragment>
                ))}
              </div>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenReservation(); }}
                className="w-full py-4 rounded-2xl bg-[#CFBE91] hover:bg-[#EFE7D2] text-[#0A0B0A] text-[10px] tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-2"
              >
                <span>{t('bookTable')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
