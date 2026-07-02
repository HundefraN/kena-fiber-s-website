import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, Clock, Award, ChevronDown, Sparkles, Zap, Star } from 'lucide-react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { OptimizedImage } from './OptimizedImage';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function FloatingParticle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-brand via-accent-blue to-brand/40"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 5, 0],
        opacity: [0.1, 0.4, 0.2, 0.5, 0.1],
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

function GlowingOrb({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-brand"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        boxShadow: [
          '0 0 0px rgba(0, 139, 155, 0)',
          '0 0 20px rgba(0, 139, 155, 0.6)',
          '0 0 0px rgba(0, 139, 155, 0)',
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

function AnimatedGradientBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand via-accent-blue to-accent-amber opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10 animate-pulse" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand via-accent-blue to-accent-amber opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
      {children}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const titleY = useTransform(scrollY, [0, 300], [0, 50]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Updated to the newly requested Cloudinary Links
  const heroImages = [
    {
      id: 'hero-1',
      src: 'https://res.cloudinary.com/dqosuzul4/image/upload/v1782974054/image16_cetnrv.jpg',
      alt: 'Architectural geometric planters',
      badge: 'Premium',
    },
    {
      id: 'hero-2',
      src: 'https://res.cloudinary.com/dqosuzul4/image/upload/v1782974052/image2_nws2rg.jpg',
      alt: 'Premium fiberglass fabrication',
      badge: 'Bespoke',
    },
    {
      id: 'hero-3',
      src: 'https://res.cloudinary.com/dqosuzul4/image/upload/v1782974054/image15_ycqsdz.jpg',
      alt: 'Custom branded commercial pots',
      badge: 'Custom',
    },
    {
      id: 'hero-4',
      src: 'https://res.cloudinary.com/dqosuzul4/image/upload/v1782974056/image22_lqz8vv.jpg',
      alt: 'High-end sculptural planter designs',
      badge: 'Sculptural',
    },
  ];

  const clientLogos = [
    'https://res.cloudinary.com/dqosuzul4/image/upload/v1782975373/Tsedey_Bank_logo_uqkps7.png',
    'https://res.cloudinary.com/dqosuzul4/image/upload/v1782975373/Global_Bank_Ethiopia_va2u38.png',
    'https://res.cloudinary.com/dqosuzul4/image/upload/v1782975373/Ethiopian_Economic_Association_mtc25g.jpg',
  ];

  const stats = [
    { icon: Clock, label: 'Years Experience', value: 10, suffix: '+', color: 'text-brand' },
    { icon: Award, label: 'Projects Delivered', value: 1000, suffix: '+', color: 'text-accent-amber' },
    { icon: Shield, label: 'Quality Guaranteed', value: 100, suffix: '%', color: 'text-accent-emerald' },
  ];

  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 5,
  }));

  const glowingOrbs = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    delay: Math.random() * 8,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-16 pt-24 sm:pt-32 pb-20 sm:pb-24 overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-surface via-surface-2 to-surface" />

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-brand/8 rounded-full blur-[130px] animate-pulse-slow" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent-amber/6 rounded-full blur-[110px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-accent-blue/7 rounded-full blur-[110px] animate-pulse-slow" style={{ animationDelay: '6s' }} />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-brand/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <FloatingParticle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {glowingOrbs.map((orb) => (
          <GlowingOrb key={orb.id} delay={orb.delay} x={orb.x} y={orb.y} />
        ))}
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 grid-bg opacity-40" />

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent z-10"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">

        {/* Left: Content */}
        <div className="lg:col-span-6 flex flex-col items-start gap-8 mt-4">

          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="flex flex-col gap-5"
          >
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-text-primary tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Precision
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="block gradient-text bg-clip-text"
              >
                Fiberglass
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Solutions
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="relative mt-2"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-brand via-accent-blue to-transparent rounded-full" />
              <p className="font-sans text-sm sm:text-base md:text-lg text-text-secondary font-medium leading-relaxed max-w-lg md:max-w-2xl lg:max-w-lg pl-0">
                High-performance commercial fiberglass planters built with precision. From bespoke branded corporate containers to sleek architectural pots — paired with a thriving plant nursery to bring your spaces to life.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap items-center gap-4"
          >
            <AnimatedGradientBorder>
              <button
                onClick={() => handleScroll('contact')}
                className="relative px-6 py-3 sm:px-8 sm:py-4 bg-brand hover:bg-brand-hover text-surface font-bold rounded-2xl shadow-[0_0_30px_rgba(0,139,155,0.2)] hover:shadow-[0_0_50px_rgba(0,139,155,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center gap-2.5 group text-xs sm:text-sm overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  <Zap className="w-4 h-4" />
                  Request a Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-blue to-brand opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </button>
            </AnimatedGradientBorder>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScroll('services')}
              className="px-5 py-3 sm:px-7 sm:py-4 bg-surface-3/80 hover:bg-surface-4 text-text-secondary hover:text-text-primary font-semibold rounded-2xl border border-border hover:border-brand/30 transition-all duration-300 flex items-center gap-2 cursor-pointer text-xs sm:text-sm group"
            >
              Our Services
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-4 h-4 group-hover:text-brand transition-colors" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Trust indicators - STRICTLY SIZED CONTAINERS FOR LOGOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-border/50 w-full max-w-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 sm:-space-x-3">
                {clientLogos.map((src, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-surface bg-white relative overflow-hidden flex items-center justify-center shrink-0 shadow-sm"
                    style={{ zIndex: 3 - i }}
                  >
                    <OptimizedImage
                      src={src}
                      alt={`Trusted Client ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-contain p-1"
                    />
                  </div>
                ))}
              </div>
              <span className="text-[11px] sm:text-sm text-text-secondary font-medium whitespace-nowrap">1000+ happy clients</span>
            </div>
            <div className="hidden sm:block h-5 w-px bg-border" />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-brand text-[10px] sm:text-xs"
                >
                  ★
                </motion.div>
              ))}
              <span className="text-[11px] sm:text-sm text-text-secondary font-medium ml-1 sm:ml-2">5.0 Rating</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Enhanced Image Grid */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 h-[320px] sm:h-[520px] md:h-[450px] lg:h-[520px] perspective mt-8 md:mt-12 lg:mt-0">
          {heroImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 50, rotateY: -20 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.4 + idx * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
                rotateZ: idx % 2 === 0 ? 1 : -1,
              }}
              className={`relative rounded-2xl overflow-hidden border border-border group cursor-pointer transition-all duration-500 ${idx === 0 ? 'row-span-2' : ''
                }`}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-brand/20 backdrop-blur-md border border-brand/40 text-[9px] sm:text-xs font-bold text-brand pointer-events-none"
              >
                {img.badge}
              </motion.div>

              <OptimizedImage
                priority
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-115 transition-transform duration-1200"
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-surface/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand/0 via-transparent to-accent-blue/0 group-hover:from-brand/10 group-hover:via-brand/5 group-hover:to-accent-blue/10 transition-all duration-500" />

              {/* Glowing border on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand/40 shadow-[inset_0_0_40px_rgba(0,139,155,0.08)] pointer-events-none"
              />

              {/* Corner accents */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-brand/30 rounded-tl-2xl"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-brand/30 rounded-br-2xl"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Stats Row */}
      <div className="max-w-7xl mx-auto mt-10 sm:mt-20 md:mt-24 grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 relative z-10 w-full">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="glass-card p-3 sm:p-5 md:p-8 rounded-xl sm:rounded-2xl flex flex-col md:flex-row items-center text-center md:text-left gap-2 sm:gap-4 md:gap-5 hover:border-brand/20 hover:shadow-[0_0_40px_rgba(0,139,155,0.1)] transition-all duration-500 group border border-border/50 backdrop-blur-sm w-full"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-8 h-8 sm:w-16 sm:h-16 rounded-lg sm:rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br from-surface-3 to-surface-2 border border-border/50 group-hover:border-brand/30 transition-all duration-300 ${stat.color}`}
              >
                <Icon className="w-4 h-4 sm:w-7 sm:h-7" />
              </motion.div>
              <div className="flex-1 w-full">
                <span className="block text-[8px] sm:text-xs text-text-muted font-bold uppercase font-mono tracking-tighter sm:tracking-widest leading-tight">
                  {stat.label}
                </span>
                <h4 className="text-base sm:text-3xl font-black text-text-primary font-display mt-0.5 sm:mt-1 leading-none">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </h4>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[11px] font-mono font-bold text-text-muted tracking-widest uppercase">
          Discover More
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 blur-sm text-brand"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
          <ChevronDown className="w-5 h-5 text-brand relative z-10" />
        </motion.div>
      </motion.div>
    </section>
  );
}