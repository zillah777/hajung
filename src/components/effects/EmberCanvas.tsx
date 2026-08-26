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

    // Ember palette: warm gold, amber, subtle champagne
    const colors = [
      'rgba(207, 190, 145,', // Primary gold #CFBE91
      'rgba(239, 231, 210,', // Champagne #EFE7D2
      'rgba(168, 144, 96,',  // Amber bronze #A89060
    ];

    // Particle density based on screen size
    const particleCount = width < 768 ? 20 : 40;
    const particles: Particle[] = [];

    const createParticle = (initialY?: number): Particle => {
      const maxOpacity = 0.15 + Math.random() * 0.45;
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : height + Math.random() * 20,
        size: 0.8 + Math.random() * 2.2,
        speedY: -(0.25 + Math.random() * 0.55),
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * maxOpacity,
        fadeSpeed: 0.003 + Math.random() * 0.006,
        maxOpacity,
        color: colors[Math.floor(Math.random() * colors.length)],
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

          p.y += p.speedY;
          p.x += p.speedX + Math.sin(p.y * 0.01) * 0.15;
          p.opacity += p.fadeSpeed;

          if (p.opacity > p.maxOpacity || p.opacity < 0.05) {
            p.fadeSpeed = -p.fadeSpeed;
          }

          // Reset when particle floats off top or fades out
          if (p.y < -10 || p.x < -10 || p.x > width + 10) {
            particles[i] = createParticle();
          }

          // Draw ember with soft glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color} ${Math.max(0, p.opacity)})`;
          ctx.shadowBlur = p.size * 3;
          ctx.shadowColor = 'rgba(207, 190, 145, 0.4)';
          ctx.fill();
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
      className="fixed inset-0 pointer-events-none z-[1] opacity-70"
    />
  );
};
