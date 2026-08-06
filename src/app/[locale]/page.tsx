'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { MenuSection } from '@/components/MenuSection';
import { ReservationSection } from '@/components/ReservationSection';
import { ChefStory } from '@/components/ChefStory';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const scrollToReservation = () => {
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-[#0A0B0A] text-[#EFE7D2] overflow-x-hidden">
      {/* Floating Qitchen Navbar */}
      <Navbar onOpenReservation={scrollToReservation} />

      {/* Home — Split hero */}
      <HeroSection onOpenReservation={scrollToReservation} />

      {/* Menu — Split menu */}
      <MenuSection onOpenReservation={scrollToReservation} />

      {/* Reservation — Full-section booking form */}
      <ReservationSection />

      {/* About — Split about / chef story */}
      <ChefStory />

      {/* Footer */}
      <Footer />
    </main>
  );
}
