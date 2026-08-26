'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { MenuSection } from '@/components/MenuSection';
import { ReservationSection } from '@/components/ReservationSection';
import { ChefStory } from '@/components/ChefStory';
import { LocationSection } from '@/components/LocationSection';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { EmberCanvas } from '@/components/effects/EmberCanvas';
import { AudioAmbience } from '@/components/effects/AudioAmbience';

export default function HomePage() {
  const scrollToReservation = () => {
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-[#0A0B0A] text-[#EFE7D2] overflow-x-hidden relative">
      {/* Golden Scroll Reading Progress Bar */}
      <ScrollProgress />

      {/* Subtle Floating Binchotan Charcoal Embers Canvas */}
      <EmberCanvas />

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

      {/* Optional Zen Dining Soundscape Controller */}
      <AudioAmbience />
    </main>
  );
}
