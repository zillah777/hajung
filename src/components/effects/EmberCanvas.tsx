'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  maxOpacity: number;
  color: string;
  glowColor: string;
  wobbleSpeed: number;
  wobbleAngle: number;
}

export const EmberCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Authentic Binchotan ember palette: glowing gold, warm amber, fiery copper & champagne core
    const emberPalette = [
      { fill: 'rgba(255, 178, 86,', glow: 'rgba(255, 130, 45, 0.8)' },   // Fiery Amber
      { fill: 'rgba(207, 190, 145,', glow: 'rgba(207, 190, 145, 0.7)' },  // Hajung Gold
      { fill: 'rgba(239, 231, 210,', glow: 'rgba(239, 231, 210, 0.9)' },  // Hot Core White/Champagne
      { fill: 'rgba(255, 110, 50,', glow: 'rgba(230, 70, 20, 0.75)' },    // Binchotan Coal Spark
    ];

    // Particle density based on screen width
    const particleCount = width < 768 ? 28 : 55;
    const particles: Particle[] = [];

    const createParticle = (initialY?: number): Particle => {
      const palette = emberPalette[Math.floor(Math.random() * emberPalette.length)];
      const maxOpacity = 0.4 + Math.random() * 0.55;
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : height + 10 + Math.random() * 30,
        size: 1.0 + Math.random() * 2.4,
        speedY: -(0.4 + Math.random() * 0.9), // Upward thermal draft
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * maxOpacity,
        fadeSpeed: 0.004 + Math.random() * 0.008,
        maxOpacity,
        color: palette.fill,
        glowColor: palette.glow,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAngle: Math.random() * Math.PI * 2,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(Math.random() * height));
    }

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Thermal drift physics with oscillating wobble
          p.wobbleAngle += p.wobbleSpeed;
          p.y += p.speedY;
          p.x += p.speedX + Math.sin(p.wobbleAngle) * 0.6;
          p.opacity += p.fadeSpeed;

          // Glowing pulse
          if (p.opacity > p.maxOpacity || p.opacity < 0.08) {
            p.fadeSpeed = -p.fadeSpeed;
          }

          // Reset when particle leaves top or sides
          if (p.y < -15 || p.x < -20 || p.x > width + 20) {
            particles[i] = createParticle();
          }

          // Draw Glowing Ember Core
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color} ${Math.max(0, p.opacity)})`;
          ctx.shadowBlur = p.size * 5;
          ctx.shadowColor = p.glowColor;
          ctx.fill();

          // Subtle brighter micro-center for intense heat effect
          if (p.size > 1.6) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, p.opacity * 1.3)})`;
            ctx.fill();
          }
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[12] mix-blend-screen"
    />
  );
};

