import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { X, ZoomIn, Leaf, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OptimizedImage } from './OptimizedImage';

// Garden images data
const gardenImages = [
  {
    id: 'garden-1',
    src: new URL('../assets/product_images/garden1.jpg', import.meta.url).href,
    title: 'Dracaena Collection',
    description: 'Vibrant variegated Dracaena plants — striking golden-green foliage ready for interior and landscape design projects.',
    tag: 'Ornamental',
  },
  {
    id: 'garden-2',
    src: new URL('../assets/product_images/garden2.jpg', import.meta.url).href,
    title: 'Tropical Paradise',
    description: 'Lush palms, yuccas, and flowering Crown of Thorns creating a vibrant tropical display at our nursery.',
    tag: 'Tropical',
  },
  {
    id: 'garden-3',
    src: new URL('../assets/product_images/garden3.jpg', import.meta.url).href,
    title: 'Exotic Foliage Mix',
    description: 'An abundant collection of Monstera, fiddle leaf figs, dracaena, and mixed tropical varieties — perfect for indoor greenscaping.',
    tag: 'Indoor Plants',
  },
  {
    id: 'garden-4',
    src: new URL('../assets/product_images/garden4.jpg', import.meta.url).href,
    title: 'Banana & Tropical Grove',
    description: 'Towering banana plants and lush greenery — our nursery grows large-format tropical specimens for landscaping projects.',
    tag: 'Landscaping',
  },
];

// Floating botanical particle
function FloatingLeaf({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-accent-green/30 via-accent-emerald/20 to-transparent pointer-events-none"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 15, -20, 0],
        x: [0, 12, -8, 10, 0],
        opacity: [0.05, 0.35, 0.1, 0.4, 0.05],
        scale: [1, 1.2, 0.85, 1.15, 1],
        rotate: [0, 15, -10, 5, 0],
      }}
      transition={{
        duration: 14 + Math.random() * 6,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function GardenGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Derive the active image safely
  const activeLightboxImage = lightboxIndex !== null ? gardenImages[lightboxIndex] : null;

  const navigateLightbox = useCallback((dir: 'prev' | 'next') => {
    setLightboxIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return dir === 'next'
        ? (prevIndex + 1) % gardenImages.length
        : (prevIndex - 1 + gardenImages.length) % gardenImages.length;
    });
  }, []);

  // Keyboard controls & Body scroll locking
  useEffect(() => {
    if (lightboxIndex === null) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, navigateLightbox]);

  const ambientLeaves = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        id: i,
        delay: Math.random() * 6,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 6,
      })),
    []
  );

  return (
    <section id="garden" className="relative py-16 sm:py-28 px-4 sm:px-6 lg:px-16 overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-surface-2 z-0" />
      <div className="absolute inset-0 dot-bg opacity-30 z-0 pointer-events-none" />

      {/* Ambient glowing blurs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-accent-green/4 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-accent-emerald/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Ambient leaves */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {ambientLeaves.map((p) => (
          <FloatingLeaf key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/20 backdrop-blur-sm"
          >
            <Leaf className="w-3.5 h-3.5 text-accent-green" />
            <span className="text-[9px] sm:text-[11px] uppercase tracking-widest font-mono font-extrabold text-accent-green">
              Plant Nursery
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-3xl sm:text-4xl lg:text-6xl text-text-primary tracking-tight mt-3 sm:mt-5"
          >
            Our{' '}
            <span className="bg-gradient-to-r from-accent-green via-accent-emerald to-accent-green bg-clip-text text-transparent">
              Garden
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-sm sm:text-base text-text-secondary mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Step into our thriving nursery — where ornamental plants, exotic tropicals, and flowering beauties are grown with care.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[260px]">
          {gardenImages.map((img, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setLightboxIndex(idx)}
                className={`relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group border border-border/50 hover:border-accent-green/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.12)] ${isLarge ? 'row-span-2' : 'row-span-1'
                  }`}
              >
                <OptimizedImage
                  src={img.src}
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent" />

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                  <span className="px-2.5 py-1 rounded-full bg-accent-green/20 backdrop-blur-md border border-accent-green/30 text-[9px] sm:text-[10px] font-mono font-bold text-accent-green uppercase tracking-wider">
                    {img.tag}
                  </span>
                </div>

                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-surface-2/40 backdrop-blur-md border border-border/40 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-green" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-10">
                  <h3 className="font-display font-bold text-sm sm:text-lg text-text-primary mb-0.5 sm:mb-1 group-hover:text-accent-green transition-colors duration-300">
                    {img.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-text-muted leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xs">
                    {img.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-16 glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-accent-green/10 bg-gradient-to-r from-accent-green/5 via-transparent to-accent-emerald/5"
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-accent-green" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-xl text-text-primary">
                Visit Our Nursery
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-0.5 sm:mt-1 max-w-md">
                Explore hundreds of plant varieties at our Bishoftu nursery. Bulk orders available.
              </p>
            </div>
          </div>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="shrink-0 px-6 py-3 sm:px-8 sm:py-3.5 bg-accent-green hover:bg-accent-green-dark text-surface font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.2)] hover:shadow-[0_0_40px_rgba(34,197,94,0.35)] transition-all duration-300 flex items-center gap-2 group"
          >
            <Sparkles className="w-4 h-4" />
            Get in Touch
          </button>
        </motion.div>
      </div>

      {/* Lightbox - Fixed Aspect Ratio Overflow View */}
      <AnimatePresence>
        {activeLightboxImage && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-neutral-950/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 select-none h-[100dvh] w-screen overflow-hidden"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Direct Close Action Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-[140] p-3 bg-neutral-900/80 hover:bg-red-500 text-white rounded-full border border-white/10 transition-all duration-200 cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
              aria-label="Close presentation view"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Viewport Floating Navigation Arrows */}
            <div className="absolute inset-x-4 sm:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none z-[130]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('prev');
                }}
                className="pointer-events-auto p-3.5 bg-neutral-900/80 hover:bg-accent-green hover:text-black text-white rounded-full border border-white/10 backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('next');
                }}
                className="pointer-events-auto p-3.5 bg-neutral-900/80 hover:bg-accent-green hover:text-black text-white rounded-full border border-white/10 backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 shadow-lg"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Completely Fluid Structural Blueprint wrapper (No bounding aspect box ratios) */}
            <motion.div
              key={activeLightboxImage.id}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 32 }}
              className="w-full max-w-5xl h-full flex flex-col justify-center items-center gap-4 sm:gap-6 z-10 pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Unconstrained Image Stage Frame */}
              <div className="w-full flex-1 min-h-0 flex items-center justify-center pointer-events-auto">
                <OptimizedImage
                  src={activeLightboxImage.src}
                  alt={activeLightboxImage.title}
                  className="max-h-[65dvh] sm:max-h-[72dvh] max-w-full w-auto h-auto object-contain rounded-xl sm:rounded-2xl select-none shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/5"
                />
              </div>

              {/* Minimal Float Info Banner Block */}
              <div className="w-full max-w-2xl text-center bg-neutral-900/60 border border-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 pointer-events-auto shrink-0 mx-auto shadow-xl">
                <div className="flex items-center justify-center gap-2.5 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent-green/10 border border-accent-green/20 text-[10px] font-mono font-bold text-accent-green uppercase tracking-wider">
                    {activeLightboxImage.tag}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {lightboxIndex + 1} / {gardenImages.length}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base sm:text-xl text-white tracking-tight mb-1">
                  {activeLightboxImage.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-h-[10dvh] overflow-y-auto custom-scrollbar px-2">
                  {activeLightboxImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-divider absolute bottom-0 left-0 right-0 z-20" />
    </section>
  );
}