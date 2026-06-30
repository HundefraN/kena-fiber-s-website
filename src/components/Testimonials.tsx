import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// Reusing the ambient particle system for consistent environmental depth
function FloatingParticle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-accent-amber via-brand to-transparent pointer-events-none z-0"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -40, 20, -10, 0],
        x: [0, 20, -15, 10, 0],
        opacity: [0.05, 0.2, 0.05, 0.25, 0.05],
        scale: [1, 1.4, 0.8, 1.2, 1],
      }}
      transition={{
        duration: 12 + Math.random() * 10,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

const testimonials = [
  {
    id: 'test-1',
    name: 'Abebe Tadesse',
    role: 'Lead Landscape Architect',
    company: 'Ethio-Urban Landscaping',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    feedback: 'Kena Fiber’s custom molds are unparalleled. We commissioned a series of unique spherical planters for a city plaza, and the finish is absolutely flawless.',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Sara Mengistu',
    role: 'Project Architect',
    company: 'Addis Design Studio',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    feedback: 'The architectural planters they produced for our hotel project were exceptional. Lightweight, UV-stable, and delivered with millimeter precision.',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Daniel Bekele',
    role: 'Operations Director',
    company: 'Hawassa Industrial Park',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    feedback: 'We needed over 100 custom-branded, heavy-duty planters for our corporate offices on a tight deadline. Kena Fiber delivered exceptional structural quality and crisp logo replication, completely on schedule.',
    rating: 5,
  },
  {
    id: 'test-4',
    name: 'Meron Hailu',
    role: 'Senior Interior Architect',
    company: 'Eagle Builders PLC',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    feedback: 'Their geometric matte-finish planters transformed our commercial lobbies. The lightweight design makes relocation simple, and the durability in high-traffic areas has been outstanding.',
    rating: 5,
  },
  {
    id: 'test-5',
    name: 'Yohannes Girma',
    role: 'CEO',
    company: 'Rift Valley Resorts',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
    feedback: 'From custom fluted accent pots to massive outdoor terrace planters — Kena Fiber has been our trusted partner for five years. Their products withstand intense sun and weather beautifully.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacityY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= testimonials.length ? 0 : prev + 1));
    setAutoplay(false);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? testimonials.length - 1 : prev - 1));
    setAutoplay(false);
  };

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= testimonials.length ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const particles = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
  }));

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-32 px-4 sm:px-6 lg:px-16 overflow-hidden min-h-screen flex items-center"
    >
      {/* Deep Background Layers */}
      <div className="absolute inset-0 bg-surface z-0" />
      <div className="absolute inset-0 dot-bg opacity-30 z-0" />

      {/* Ambient Pulsing Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-accent-amber/5 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-blue/3 rounded-full blur-[150px]" />
      </div>

      {/* Floating Particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
      ))}

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header & Controls */}
        <motion.div
          style={{ y: parallaxY, opacity: opacityY }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-20"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-brand" />
              <span className="text-sm font-semibold text-brand tracking-wide">Client Success Stories</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.1]"
            >
              What Our Clients<br className="hidden sm:inline" />{' '}
              <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-accent-amber via-brand to-accent-blue">
                Say About Us
              </span>
            </motion.h2>
          </div>

          {/* Premium Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4"
          >
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-text-secondary hover:text-brand bg-surface-2/50 border border-border/50 hover:border-brand/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(0,139,155,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-text-secondary hover:text-brand bg-surface-2/50 border border-border/50 hover:border-brand/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(0,139,155,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        {/* Testimonial Cards Carousel */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 relative">
          {Array.from({ length: 3 }).map((_, step) => {
            const idx = (currentIndex + step) % testimonials.length;
            const t = testimonials[idx];
            return (
              <AnimatePresence mode="popLayout" key={step}>
                <motion.div
                  key={`${t.id}-${currentIndex}`}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(5px)" }}
                  transition={{ duration: 0.6, delay: step * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-4 sm:p-10 rounded-2xl sm:rounded-[2rem] flex flex-col justify-between min-h-[220px] sm:min-h-[340px] border border-border/50 bg-surface-2/40 backdrop-blur-md group hover:border-brand/30 transition-all duration-500 relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedTestimonial(t)}
                >
                  {/* Internal Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2 sm:mb-6">
                      <Quote className="w-5 h-5 sm:w-10 sm:h-10 text-brand/20 group-hover:text-brand/40 group-hover:scale-110 transition-all duration-500" />
                      <div className="flex gap-1">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                          >
                            <Star className="w-2.5 h-2.5 sm:w-4 sm:h-4 fill-accent-amber text-accent-amber drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <p className="font-sans text-[10px] sm:text-base text-text-secondary italic leading-relaxed group-hover:text-text-primary transition-colors duration-300 line-clamp-3">
                      "{t.feedback}"
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-4 sm:mt-10 border-t border-border/50 pt-3 sm:pt-6 relative z-10 group-hover:border-brand/20 transition-colors duration-500">
                    {/* Glowing Avatar Wrap */}
                    <div className="relative w-8 h-8 sm:w-14 sm:h-14 shrink-0">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand to-accent-blue animate-spin-slow opacity-0 group-hover:opacity-100 blur-[6px] transition-opacity duration-500" />
                      <div className="absolute inset-0 rounded-full border-2 border-brand/20 group-hover:border-transparent transition-colors duration-500 z-10" />
                      <img
                        src={t.avatar}
                        alt={t.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-full relative z-20 bg-surface-3"
                      />
                    </div>

                    <div>
                      <h4 className="font-display font-black text-[10px] sm:text-base text-text-primary leading-tight group-hover:text-brand transition-colors duration-300">
                        {t.name}
                      </h4>
                      <span className="text-[8px] sm:text-[11px] text-text-muted font-bold font-mono tracking-wider block mt-0.5 sm:mt-1 uppercase truncate">
                        {t.company}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })}
        </div>

        {/* Interactive Dots Pagination */}
        <div className="flex justify-center gap-3 mt-16">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentIndex(idx); setAutoplay(false); }}
              aria-label={`Go to testimonial ${idx + 1}`}
              className="relative py-2 group cursor-pointer"
            >
              <motion.div
                layout
                className={`h-2 rounded-full transition-all duration-500 ease-[0.16,1,0.3,1] ${currentIndex === idx
                  ? 'w-10 bg-brand shadow-[0_0_15px_rgba(0,139,155,0.4)]'
                  : 'w-2 bg-surface-4 group-hover:bg-brand/50'
                  }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Sheet for Details */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-md bg-surface-2 border border-border/50 rounded-t-[2rem] sm:rounded-3xl p-6 sm:p-8 relative pb-10 sm:pb-8 shadow-[0_-10px_40px_rgba(0,139,155,0.15)]"
            >
              <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6 sm:hidden" />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedTestimonial.avatar}
                  alt={selectedTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-brand/30"
                />
                <div>
                  <h4 className="font-display font-black text-xl text-text-primary">
                    {selectedTestimonial.name}
                  </h4>
                  <span className="text-xs text-brand font-bold font-mono uppercase tracking-wider block mt-1">
                    {selectedTestimonial.role}
                  </span>
                  <span className="text-xs text-text-muted block">
                    {selectedTestimonial.company}
                  </span>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: selectedTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-amber text-accent-amber" />
                ))}
              </div>

              <p className="font-sans text-sm sm:text-base text-text-secondary italic leading-relaxed">
                "{selectedTestimonial.feedback}"
              </p>

              <button
                onClick={() => setSelectedTestimonial(null)}
                className="mt-8 w-full py-3 rounded-xl bg-brand/10 text-brand font-semibold hover:bg-brand/20 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle top/bottom gradients for section blending */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none" />

      {/* Section divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}