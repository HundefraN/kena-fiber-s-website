import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import your local assets
import pp1 from '../assets/testimonial_images/pp1.png';
import pp2 from '../assets/testimonial_images/pp2.png';
import pp3 from '../assets/testimonial_images/pp3.png';
import pp4 from '../assets/testimonial_images/pp4.png';
import pp5 from '../assets/testimonial_images/pp5.png';

const testimonials = [
  { id: 'test-1', name: 'Abebe Tadesse', role: 'Lead Landscape Architect', company: 'Ethio-Urban Landscaping', avatar: pp1, feedback: 'Kena Fiber’s custom molds are unparalleled. We commissioned a series of unique spherical planters.', rating: 5 },
  { id: 'test-2', name: 'Tekalegn Mengistu', role: 'Project Architect', company: 'Addis Design Studio', avatar: pp2, feedback: 'The architectural planters they produced for our hotel project were exceptional. Lightweight and delivered with precision.', rating: 5 },
  { id: 'test-3', name: 'Daniel Bekele', role: 'Operations Director', company: 'Hawassa Industrial Park', avatar: pp3, feedback: 'We needed over 100 custom-branded, heavy-duty planters. Kena Fiber delivered exceptional quality on schedule.', rating: 5 },
  { id: 'test-4', name: 'Meron Hailu', role: 'Senior Interior Architect', company: 'Eagle Builders PLC', avatar: pp4, feedback: 'Their geometric matte-finish planters transformed our commercial lobbies. Durability in high-traffic areas is outstanding.', rating: 5 },
  { id: 'test-5', name: 'Helen Girma', role: 'CEO', company: 'Rift Valley Resorts', avatar: pp5, feedback: 'From custom fluted accent pots to massive outdoor terrace planters — Kena Fiber has been our trusted partner for five years.', rating: 5 },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-surface">
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 mb-4">
            <Sparkles className="w-3 h-3 text-brand" />
            <span className="text-[10px] font-bold text-brand uppercase tracking-widest">Client Success</span>
          </div>
          <h2 className="text-3xl font-black text-text-primary">What Clients Say</h2>
        </div>

        {/* Carousel Viewport */}
        <div className="relative flex items-center justify-center">
          <button onClick={prev} className="absolute left-0 z-20 p-2 rounded-full bg-surface-2 border border-border hover:border-brand transition-colors"><ChevronLeft className="w-5 h-5" /></button>

          <div className="w-full overflow-hidden px-8">
            <div className="flex gap-6 justify-center transition-all duration-500 ease-out">
              <AnimatePresence mode="popLayout">
                {/* Responsive Logic: Simple slider mapping */}
                {testimonials.map((t, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: isActive ? 1 : 0.4,
                        scale: isActive ? 1 : 0.9,
                        display: isActive ? 'block' : 'none'
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="w-full max-w-sm glass-card p-6 rounded-2xl border border-border/50 bg-surface-2/30"
                    >
                      <Quote className="w-6 h-6 text-brand/30 mb-4" />
                      <p className="text-sm text-text-secondary italic mb-6 leading-relaxed">"{t.feedback}"</p>

                      <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                        <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <h4 className="text-xs font-bold text-text-primary">{t.name}</h4>
                          <p className="text-[9px] text-text-muted font-mono uppercase">{t.company}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <button onClick={next} className="absolute right-0 z-20 p-2 rounded-full bg-surface-2 border border-border hover:border-brand transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-6 bg-brand' : 'w-1.5 bg-border'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}