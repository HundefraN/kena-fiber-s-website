import React, { useMemo, useState } from 'react';
import { Layers, Anchor, Building2, ArrowRight, Sparkles, X, Factory, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const services = [
  {
    id: 'custom-molds',
    icon: Layers,
    gradient: 'from-brand/10 via-brand/5 to-transparent',
    hoverGradient: 'group-hover:from-brand/20 group-hover:via-brand/10',
    iconBg: 'bg-brand/10 border-brand/20 text-brand',
    glowColor: 'group-hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]',
    cornerColor: 'group-hover:border-brand/40',
    title: 'Custom Molds',
    description: 'Precision-engineered fiberglass molds for any application. From prototyping to production-ready tooling, we deliver molds that perform.',
    features: ['Plug & mold fabrication', 'CNC-assisted patterns', 'Multi-part mold systems', 'Heat-resistant composites'],
  },
  {
    id: 'industrial-components',
    icon: Factory,
    gradient: 'from-accent-blue/10 via-accent-blue/5 to-transparent',
    hoverGradient: 'group-hover:from-accent-blue/20 group-hover:via-accent-blue/10',
    iconBg: 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue',
    glowColor: 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]',
    cornerColor: 'group-hover:border-accent-blue/40',
    title: 'Industrial Components',
    description: 'High-quality, heavy-duty fiberglass components built with absolute precision. Beautifully finished, durable solutions designed to withstand harsh industrial environments.',
    features: ['Enclosures & protective casings', 'Custom automotive & transport parts', 'Heavy-duty storage tanks & liners', 'Corrosion-resistant custom fabrications'],
  },
  {
    id: 'architectural',
    icon: Building2,
    gradient: 'from-accent-amber/10 via-accent-amber/5 to-transparent',
    hoverGradient: 'group-hover:from-accent-amber/20 group-hover:via-accent-amber/10',
    iconBg: 'bg-accent-amber/10 border-accent-amber/20 text-accent-amber',
    glowColor: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]',
    cornerColor: 'group-hover:border-accent-amber/40',
    title: 'Architectural Fiberglass',
    description: 'Lightweight, durable architectural panels, cornices, and decorative elements. Transform building facades with custom fiberglass solutions.',
    features: ['Facade cladding panels', 'Decorative cornices & columns', 'Dome & canopy shells', 'UV-stable gel coats'],
  },
  {
    id: 'plant-nursery',
    icon: Leaf,
    gradient: 'from-accent-green/10 via-accent-green/5 to-transparent',
    hoverGradient: 'group-hover:from-accent-green/20 group-hover:via-accent-green/10',
    iconBg: 'bg-accent-green/10 border-accent-green/20 text-accent-green',
    glowColor: 'group-hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]',
    cornerColor: 'group-hover:border-accent-green/40',
    title: 'Plant Nursery & Garden',
    description: 'Thriving ornamental plants, exotic tropicals, and flowering varieties grown with care to perfectly complement our premium fiberglass planters.',
    features: ['Ornamental & flowering plants', 'Indoor & outdoor varieties', 'Tropical & decorative foliage', 'Bulk orders for landscaping'],
  },
];

// Reusable Hardware-Accelerated Ambient Elements
function FloatingParticle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-brand/40 via-accent-blue/20 to-transparent pointer-events-none"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -35, 15, -15, 0],
        x: [0, 15, -15, 10, 0],
        opacity: [0.05, 0.3, 0.1, 0.4, 0.05],
        scale: [1, 1.3, 0.8, 1.2, 1],
      }}
      transition={{
        duration: 12 + Math.random() * 8,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function Services() {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveServiceId(null); // close bottom sheet if open
  };

  // Stable ambient coordinates
  const ambientParticles = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: Math.random() * 6,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 5,
  })), []);

  const activeService = services.find(s => s.id === activeServiceId);

  return (
    <section id="services" className="relative py-16 sm:py-28 px-4 sm:px-6 lg:px-16 overflow-hidden">
      {/* Background & Textures */}
      <div className="absolute inset-0 bg-surface-2 z-0" />
      <div className="absolute inset-0 dot-bg opacity-40 z-0 pointer-events-none" />

      {/* Hardware-Accelerated Ambient Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {ambientParticles.map((p) => (
          <FloatingParticle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
        ))}
      </div>

      {/* Decorative Radial Soft Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-amber/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span className="text-[9px] sm:text-[11px] uppercase tracking-widest font-mono font-extrabold text-brand">
              What We Do
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-3xl sm:text-4xl lg:text-6xl text-text-primary tracking-tight mt-3 sm:mt-5"
          >
            Services{' '}
            <span className="gradient-text bg-clip-text">Overview</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-text-secondary mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            10+ years of expertise distilled into world-class fiberglass fabrication and a thriving plant nursery for marine, industrial, architectural, and landscaping applications.
          </motion.p>
        </div>

        {/* 3D Perspective Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 perspective">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.01 }}
                // md:h-full allows it to stretch naturally on desktop
                className={`relative glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col items-start text-left bg-gradient-to-br ${service.gradient} ${service.hoverGradient} border border-border/50 hover:border-border-hover ${service.glowColor} transition-all duration-500 group overflow-hidden md:cursor-pointer backdrop-blur-md`}
              >
                {/* Structural Corner Brackets (Reveals on hover) */}
                <div className={`absolute top-0 left-0 w-8 h-8 sm:w-10 sm:h-10 border-l-2 border-t-2 border-transparent ${service.cornerColor} rounded-tl-2xl sm:rounded-tl-3xl transition-all duration-500 pointer-events-none z-20`} />
                <div className={`absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 border-r-2 border-b-2 border-transparent ${service.cornerColor} rounded-br-2xl sm:rounded-br-3xl transition-all duration-500 pointer-events-none z-20`} />

                {/* Sweeping Light Animation (Hardware Accelerated) */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 skew-x-[-20deg] pointer-events-none"
                  animate={{ x: ['-150%', '250%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                />

                {/* Subtle glow orb inside the card */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand/5 rounded-full blur-[60px] group-hover:bg-brand/10 transition-all duration-700 pointer-events-none" />

                <div className={`relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center border ${service.iconBg} mb-4 sm:mb-7 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-lg`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                <h3 className="relative z-10 font-display font-bold sm:font-extrabold text-lg sm:text-xl text-text-primary tracking-tight mb-2 sm:mb-3 group-hover:text-brand transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description: line-clamp-1 on mobile, full text on md and up */}
                <p className="relative z-10 font-sans text-[13px] sm:text-sm text-text-secondary leading-relaxed mb-4 sm:mb-6 line-clamp-1 md:line-clamp-none">
                  {service.description}
                </p>

                {/* Features list: Hidden on mobile, visible on md and up */}
                <ul className="relative z-10 space-y-3 mb-8 flex-1 w-full hidden md:block">
                  {service.features.map((feat, featIdx) => (
                    <motion.li
                      key={feat}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (featIdx * 0.1), ease: 'easeOut' }}
                      className="flex items-center gap-2 sm:gap-3 text-sm font-medium text-text-muted group-hover:text-text-secondary transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand shrink-0 group-hover:shadow-[0_0_8px_rgba(0,139,155,0.6)] transition-all duration-300" />
                      {feat}
                    </motion.li>
                  ))}
                </ul>

                {/* "Learn More" Trigger: Visible ONLY on mobile */}
                <button
                  onClick={() => setActiveServiceId(service.id)}
                  className="relative z-10 md:hidden flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand transition-colors mt-auto w-full group/btn"
                >
                  <span className="flex items-center gap-1.5">
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Sheet Overlay for expanded details */}
      <AnimatePresence>
        {activeService && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveServiceId(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 p-6 glass-card bg-surface/95 border-t border-brand/20 rounded-t-3xl md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col max-h-[85vh]"
            >
              {/* Drag Handle Indicator */}
              <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-6 shrink-0" />

              {/* Close Button */}
              <button
                onClick={() => setActiveServiceId(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-surface-3 border border-border text-text-secondary hover:text-brand transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Scrollable Content inside Sheet */}
              <div className="overflow-y-auto pb-4 custom-scrollbar">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${activeService.iconBg} mb-4`}>
                  <activeService.icon className="w-6 h-6" />
                </div>

                <h3 className="font-display font-black text-xl text-text-primary mb-3">
                  {activeService.title}
                </h3>

                <p className="font-sans text-sm text-text-secondary leading-relaxed mb-6">
                  {activeService.description}
                </p>

                <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand mb-3">
                  Key Features
                </h4>

                <ul className="space-y-3 mb-8">
                  {activeService.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm font-medium text-text-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 shadow-[0_0_8px_rgba(0,139,155,0.6)]" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA locked to bottom of sheet */}
              <div className="mt-auto pt-2 shrink-0">
                <button
                  onClick={() => handleScroll('contact')}
                  className="w-full flex justify-center items-center gap-2 py-3.5 bg-brand hover:bg-brand-hover text-background font-bold text-sm rounded-xl shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-colors"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Section divider */}
      <div className="section-divider absolute bottom-0 left-0 right-0 z-20" />
    </section>
  );
}