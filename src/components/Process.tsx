import React, { useRef } from 'react';
import { MessageSquare, Pencil, Factory, Truck, Sparkles, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

// Reusing the ambient particle system for consistency
function FloatingParticle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-brand via-accent-blue to-brand/40 pointer-events-none"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 5, 0],
        opacity: [0.1, 0.3, 0.1, 0.4, 0.1],
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

const steps = [
  {
    id: 'step-1',
    step: '01',
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We discuss your project requirements, timeline, and budget to establish a clear scope of work.',
    color: 'text-brand',
    borderColor: 'border-brand/30',
    hoverBorder: 'group-hover:border-brand/50',
    bgColor: 'bg-brand/10',
    glowColor: 'rgba(0, 139, 155, 0.3)',
    gradient: 'from-brand/20 to-transparent',
  },
  {
    id: 'step-2',
    step: '02',
    icon: Pencil,
    title: 'Design',
    description: 'Our engineering team creates detailed CAD drawings and material specifications for your approval.',
    color: 'text-accent-blue',
    borderColor: 'border-accent-blue/30',
    hoverBorder: 'group-hover:border-accent-blue/50',
    bgColor: 'bg-accent-blue/10',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    gradient: 'from-accent-blue/20 to-transparent',
  },
  {
    id: 'step-3',
    step: '03',
    icon: Factory,
    title: 'Fabrication',
    description: 'Precision fabrication in our state-of-the-art facility using advanced hand lay-up and vacuum infusion.',
    color: 'text-accent-amber',
    borderColor: 'border-accent-amber/30',
    hoverBorder: 'group-hover:border-accent-amber/50',
    bgColor: 'bg-accent-amber/10',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    gradient: 'from-accent-amber/20 to-transparent',
  },
  {
    id: 'step-4',
    step: '04',
    icon: Truck,
    title: 'Delivery',
    description: 'Quality-inspected products delivered on schedule with full installation support and documentation.',
    color: 'text-accent-emerald',
    borderColor: 'border-accent-emerald/30',
    hoverBorder: 'group-hover:border-accent-emerald/50',
    bgColor: 'bg-accent-emerald/10',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    gradient: 'from-accent-emerald/20 to-transparent',
  },
];

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacityY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const particles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
  }));

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative py-16 sm:py-32 px-4 sm:px-6 lg:px-16 overflow-hidden min-h-screen flex items-center"
    >
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 bg-surface-2 z-0" />
      <div className="absolute inset-0 grid-bg opacity-30 z-0" />

      {/* Ambient Pulsing Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[130px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <FloatingParticle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header Section */}
        <motion.div
          style={{ y: parallaxY, opacity: opacityY }}
          className="text-center mb-16 sm:mb-28 flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-brand" />
            <span className="text-sm font-semibold text-brand tracking-wide">Streamlined Workflow</span>
          </motion.div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight">
            How We{' '}
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-brand via-accent-blue to-accent-amber">
              Work
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm sm:text-lg text-text-secondary mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            A precision-engineered four-step process that takes your project from architectural concept to high-performance reality.
          </motion.p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="relative mt-12">
          {/* Connecting Line — Desktop (Runs precisely through the center of the hovering icons) */}
          <div className="hidden lg:block absolute top-0 left-[12.5%] right-[12.5%] h-px -translate-y-1/2 z-0">
            {/* Background track */}
            <div className="absolute inset-0 bg-border/40" />

            {/* Animated drawing line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="absolute inset-0 bg-gradient-to-r from-brand via-accent-blue via-accent-amber to-accent-emerald origin-left shadow-[0_0_15px_rgba(0,139,155,0.4)]"
            />

            {/* Traveling energy pulse */}
            <motion.div
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 -translate-y-1/2 left-0 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent blur-[2px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-6 relative z-10 pt-8 lg:pt-0">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={s.id} className="relative pt-6 sm:pt-8 lg:pt-0">
                  {/* Icon Badge - Overlaps the card top on desktop, acts as timeline node on mobile */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.15, type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute top-0 left-1/2 lg:-top-8 -translate-x-1/2 lg:-translate-y-0 z-20"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 bg-surface-3 ${s.borderColor} ${s.color} transition-all duration-300 shadow-xl backdrop-blur-md`}
                      style={{ boxShadow: `0 0 20px ${s.glowColor}` }}
                    >
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                    </motion.div>
                  </motion.div>

                  {/* Glassmorphism Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7, delay: 0.3 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -8 }}
                    className="glass-card h-full pt-10 pb-6 px-6 sm:pt-14 sm:pb-8 sm:px-8 rounded-[1.5rem] sm:rounded-3xl border border-border/50 backdrop-blur-sm relative group overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                  >
                    {/* Animated Hover Background */}
                    <div className="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0 pointer-events-none" />
                    <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${s.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0 pointer-events-none`} />

                    <div className="relative z-10 flex flex-col items-center text-center h-full">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-widest mb-4 text-text-muted">
                        Phase {s.step}
                      </span>

                      <h3 className={`font-display font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 sm:mb-4 transition-colors duration-300 ${s.color.replace('text-', 'group-hover:text-')}`}>
                        {s.title}
                      </h3>

                      <p className="font-sans text-[11px] sm:text-sm text-text-secondary leading-relaxed mb-4 sm:mb-6 flex-grow">
                        {s.description}
                      </p>

                      {/* Small visual indicator */}
                      <motion.div
                        className={`w-8 h-1 rounded-full ${s.bgColor} ${s.borderColor} border mt-auto`}
                        whileHover={{ width: 48 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Animated glowing border effect */}
                    <div className={`absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-500 ${s.hoverBorder} pointer-events-none z-20`} />
                  </motion.div>

                  {/* Mobile vertical connector */}
                  {idx < steps.length - 1 && (
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: 48 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + idx * 0.15 }}
                      className="lg:hidden absolute left-1/2 -translate-x-1/2 bottom-[-3rem] w-px bg-gradient-to-b from-brand/40 to-transparent z-0"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subtle top/bottom gradients for blending into other sections */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none" />
    </section>
  );
}