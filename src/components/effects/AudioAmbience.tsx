'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AudioAmbience: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const noiseSourceRef = useRef<AudioNode | null>(null);

  const startAmbience = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Harmonic frequencies for zen dining atmosphere (Pentatonic warm chords: D, F#, A, E)
      const freqs = [146.83, 220.0, 293.66, 440.0];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle undulating LFO for warmth
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.1 + idx * 0.05;
        lfoGain.gain.value = 0.02;
        lfo.connect(gain.gain);
        lfo.start();

        gain.gain.setValueAtTime(0.015 / (idx + 1), ctx.currentTime);

        if (panner) {
          panner.pan.value = (idx % 2 === 0 ? -0.4 : 0.4);
          osc.connect(gain).connect(panner).connect(masterGain);
        } else {
          osc.connect(gain).connect(masterGain);
        }

        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
      setIsPlaying(true);
    } catch (err) {
      console.warn('Web Audio not supported or blocked:', err);
    }
  };

  const stopAmbience = () => {
    if (audioCtxRef.current && masterGainRef.current) {
      const ctx = audioCtxRef.current;
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
      setTimeout(() => {
        try {
          ctx.close();
        } catch {}
        audioCtxRef.current = null;
        masterGainRef.current = null;
        oscillatorsRef.current = [];
      }, 1600);
    }
    setIsPlaying(false);
  };

  const toggleAmbience = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 3, duration: 0.6 }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1A18]/90 border border-[#CFBE91]/30 backdrop-blur-md text-[10px] text-[#EFE7D2] tracking-wider font-sans uppercase shadow-lg pointer-events-none"
          >
            <Sparkles className="w-3 h-3 text-[#CFBE91] animate-pulse" />
            <span>Ambience</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleAmbience}
        aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
        title={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
        className={`group relative flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 backdrop-blur-xl ${
          isPlaying
            ? 'bg-[#CFBE91] border-[#CFBE91] text-[#0A0B0A] shadow-[0_0_20px_rgba(207,190,145,0.4)] scale-105'
            : 'bg-[#141413]/85 border-[#2A2A27] text-[#EFE7D2]/80 hover:text-[#CFBE91] hover:border-[#CFBE91]/60 shadow-lg'
        }`}
      >
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-3.5 px-0.5">
            <span className="w-[2.5px] bg-[#0A0B0A] rounded-full animate-[equalizer_0.8s_ease-in-out_infinite]" style={{ height: '70%' }} />
            <span className="w-[2.5px] bg-[#0A0B0A] rounded-full animate-[equalizer_1.1s_ease-in-out_infinite_0.2s]" style={{ height: '100%' }} />
            <span className="w-[2.5px] bg-[#0A0B0A] rounded-full animate-[equalizer_0.9s_ease-in-out_infinite_0.4s]" style={{ height: '50%' }} />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 transition-transform group-hover:scale-110" />
        )}
      </button>
    </div>
  );
};
