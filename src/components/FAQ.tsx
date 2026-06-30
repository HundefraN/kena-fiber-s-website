import React, { useState, useRef } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// Reusing the ambient particle system for consistent environmental depth
function FloatingParticle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-brand via-accent-blue to-transparent pointer-events-none z-0"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 5, 0],
        opacity: [0.05, 0.2, 0.05, 0.3, 0.05],
        scale: [1, 1.3, 0.8, 1.2, 1],
      }}
      transition={{
        duration: 10 + Math.random() * 8,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

const faqItems = [
  {
    id: 'faq-1',
    question: 'What types of fiberglass materials do you work with?',
    answer: 'We work with a wide range of fiberglass composites including E-glass, S-glass, carbon fiber reinforced polymers (CFRP), and aramid composites. We use polyester, vinyl ester, and epoxy resin systems depending on the application requirements for chemical resistance, strength, and temperature tolerance.',
  },
  {
    id: 'faq-2',
    question: 'How long does a typical custom mold project take?',
    answer: 'Project timelines vary by complexity. A simple one-piece mold can be completed in 2-3 weeks, while multi-part production molds with CNC-machined plugs typically take 4-8 weeks. We provide a detailed timeline during the consultation phase and keep you updated at every milestone.',
  },
  {
    id: 'faq-3',
    question: 'What is your pricing structure?',
    answer: 'Pricing is project-based and depends on material specifications, mold complexity, production volume, and delivery requirements. We provide detailed, transparent quotes after an initial consultation. For standard services like hull repairs, we can typically provide a ballpark estimate within 24 hours.',
  },
  {
    id: 'faq-4',
    question: 'Do you provide warranties on your work?',
    answer: 'Yes, all our fabrication work comes with a comprehensive warranty. Custom molds carry a 2-year structural warranty, marine repairs include a 1-year warranty against re-cracking under normal use, and architectural installations are warranted for 5 years. Extended warranty options are available.',
  },
  {
    id: 'faq-5',
    question: 'Can you handle large-scale architectural projects?',
    answer: 'Absolutely. We have completed facade cladding for buildings up to 15 stories, manufactured dome shells spanning 12 meters, and produced hundreds of decorative columns for commercial developments. Our facility and team are equipped for industrial-scale production volumes.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacityY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const particles = Array.from({ length: 12 }, (_, i) => ({
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
      <div className="absolute inset-0 bg-surface-2 z-0" />
      <div className="absolute inset-0 grid-bg opacity-20 z-0" />

      {/* Ambient Pulsing Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[130px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent-amber/3 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating Particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
      ))}

      <div className="max-w-4xl mx-auto relative z-10 w-full">

        {/* Header */}
        <motion.div
          style={{ y: parallaxY, opacity: opacityY }}
          className="text-center mb-12 sm:mb-20 flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-brand" />
            <span className="text-sm font-semibold text-brand tracking-wide">Knowledge Base</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.1]"
          >
            Frequently Asked{' '}
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-brand via-accent-blue to-accent-amber">
              Questions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm sm:text-lg text-text-secondary mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to know about our engineering processes, material specifications, and working with our fabrication team.
          </motion.p>
        </motion.div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {faqItems.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`glass-card relative rounded-2xl overflow-hidden transition-all duration-500 border backdrop-blur-md bg-surface-2/40 group ${isOpen
                    ? 'border-brand/40 bg-surface-3/60 shadow-[0_8px_30px_rgba(0,139,155,0.08)]'
                    : 'border-border/50 hover:border-brand/30 hover:bg-surface-3/40'
                  }`}
              >
                {/* Active Indicator Line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand to-accent-blue transition-all duration-500 ${isOpen ? 'opacity-100 shadow-[0_0_10px_rgba(0,139,155,0.5)]' : 'opacity-0'
                    }`}
                />

                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 md:p-8 text-left cursor-pointer outline-none"
                >
                  <h3 className={`font-display font-bold text-sm sm:text-base md:text-lg pr-4 sm:pr-6 leading-snug transition-colors duration-300 ${isOpen ? 'text-brand' : 'text-text-primary group-hover:text-brand'
                    }`}>
                    {item.question}
                  </h3>

                  {/* Premium Rotating Icon Box */}
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 border ${isOpen
                      ? 'bg-brand/10 border-brand/30 text-brand shadow-[inset_0_0_15px_rgba(0,139,155,0.2)] rotate-180'
                      : 'bg-surface-3 border-border/50 text-text-muted group-hover:border-brand/30 group-hover:text-brand'
                    }`}>
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-0">
                        <div className="h-px w-full bg-gradient-to-r from-brand/20 via-border/50 to-transparent mb-4 sm:mb-6" />
                        <motion.p
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="font-sans text-[11px] sm:text-sm md:text-base text-text-secondary leading-relaxed"
                        >
                          {item.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Subtle top/bottom gradients for section blending */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none" />

      {/* Section divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}