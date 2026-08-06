'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { MenuSection } from '@/components/MenuSection';
import { ReservationSection } from '@/components/ReservationSection';
import { ChefStory } from '@/components/ChefStory';
import { LocationSection } from '@/components/LocationSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const scrollToReservation = () => {
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-[#0A0B0A] text-[#EFE7D2] overflow-x-hidden">
      {/* Floating Navbar */}
      <Navbar onOpenReservation={scrollToReservation} />

      {/* Hero — Split screen */}
      <HeroSection onOpenReservation={scrollToReservation} />

      {/* Menu — Split with live item photos */}
      <MenuSection onOpenReservation={scrollToReservation} />

      {/* Reservation — Full-section booking form */}
      <ReservationSection />

      {/* About — Chef Koo Bonkwan & Team story */}
      <ChefStory />

      {/* Location — Contact, hours, map */}
      <LocationSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
