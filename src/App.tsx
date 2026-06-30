/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { AppProvider } from './context/AppContext';

import logoSrc from './assets/logo.png';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import TrustedBy from './components/TrustedBy';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';

/* ──────────────────────────────────────────────────────────────────────────
   Physics-based Cursor Glow 
   ────────────────────────────────────────────────────────────────────────── */
function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for a buttery smooth, weighty trailing effect
  const springConfig = { damping: 40, stiffness: 200, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse) to save performance
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
      const moveCursor = (e: MouseEvent) => {
        // Offset by 200px to center the 400px glow perfectly on the cursor
        cursorX.set(e.clientX - 200);
        cursorY.set(e.clientY - 200);
      };
      window.addEventListener('mousemove', moveCursor, { passive: true });
      return () => window.removeEventListener('mousemove', moveCursor);
    }
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-0 w-[400px] h-[400px] rounded-full mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        background: 'radial-gradient(circle, rgba(0, 139, 155, 0.05) 0%, rgba(0, 139, 155, 0.01) 40%, transparent 70%)',
      }}
    />
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Cinematic Loading Screen
   ────────────────────────────────────────────────────────────────────────── */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'logo' | 'text' | 'bar' | 'done'>('logo');

  useEffect(() => {
    // Premium staggered timeline
    const t1 = setTimeout(() => setPhase('text'), 600);
    const t2 = setTimeout(() => setPhase('bar'), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== 'bar') return;

    // Smooth progress counter
    let startTime = performance.now();
    const duration = 1500; // 1.5 seconds to fill

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);

      // Use an ease-out curve for the number counter
      const easedProgress = 100 - 100 * Math.pow(1 - currentProgress / 100, 3);
      setProgress(Math.floor(easedProgress));

      if (currentProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setPhase('done');
          setTimeout(onComplete, 800); // Wait for exit animation
        }, 400);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-surface flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient background glows */}
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

          {/* Grid background for loading screen */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Core Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated Logo - Scaled down for mobile (w-20 h-20), larger on sm and lg */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mb-4 sm:mb-8"
            >
              <motion.img
                src={logoSrc}
                alt="Kena Fiber Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,139,155,0.3)]"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Radial glow pulse behind the logo */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 -z-10 rounded-full bg-brand/20 blur-[50px]"
              />
            </motion.div>

            {/* Brand Text */}
            <div className="h-14 sm:h-16 flex flex-col items-center justify-center">
              <AnimatePresence>
                {(phase === 'text' || phase === 'bar') && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-1 sm:gap-1.5"
                  >
                    {/* Text smaller on mobile (text-lg) */}
                    <span className="font-display font-black text-lg sm:text-2xl lg:text-3xl text-text-primary tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
                      KENA FIBER
                    </span>
                    <span className="text-[8px] sm:text-[10px] font-mono font-semibold text-brand tracking-[0.35em] uppercase glow-pulse">
                      Fiberglass Solutions
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="h-16 sm:h-20 flex flex-col items-center justify-center mt-2 sm:mt-4">
              <AnimatePresence>
                {phase === 'bar' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center w-full"
                  >
                    {/* Progress bar narrower on mobile (w-44) */}
                    <div className="relative w-44 sm:w-56 h-[2px] bg-surface-4 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 bottom-0 rounded-full"
                        style={{
                          width: `${progress}%`,
                          background: 'linear-gradient(90deg, transparent, #008B9B, #4AB3C6)',
                          boxShadow: '0 0 10px rgba(0, 139, 155, 0.5)'
                        }}
                      />
                    </div>

                    {/* Progress text container matched to bar width */}
                    <div className="flex justify-between w-44 sm:w-56 mt-3 sm:mt-4 px-1">
                      <span className="font-mono text-[8px] sm:text-[10px] text-text-muted tracking-[0.2em] uppercase">
                        System Load
                      </span>
                      <span className="font-mono text-[8px] sm:text-[10px] text-brand tracking-widest font-bold">
                        {progress}%
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Main Application Layout
   ────────────────────────────────────────────────────────────────────────── */
export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <AppProvider>
      {/* Cinematic Loading Screen */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Main App Container */}
      <div
        className={`relative min-h-screen bg-surface text-text-primary antialiased font-sans transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'
          }`}
      >
        {/* Global Textures & Layers */}
        <div className="fixed inset-0 pointer-events-none z-50 noise-overlay mix-blend-overlay opacity-[0.4]" />
        <div className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-50" />

        {/* Ambient Cursor Light */}
        <CursorGlow />

        {/* Global Header & Cart */}
        <Header />
        <Cart />

        {/* Page Content */}
        <motion.main
          className="relative z-10 flex flex-col items-center w-full overflow-hidden"
          initial="hidden"
          animate={loaded ? 'show' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="w-full"><Hero /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="w-full"><Services /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="w-full"><Gallery /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="w-full"><Process /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="w-full"><Testimonials /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="w-full"><TrustedBy /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="w-full"><FAQ /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="w-full"><Contact /></motion.div>
        </motion.main>

        <Footer />
      </div>
    </AppProvider>
  );
}