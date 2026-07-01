import React from 'react';
import { ArrowRight, ArrowUp, Zap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import logoSrc from '../assets/logo.png';
import { OptimizedImage } from './OptimizedImage';

// --- Premium UI Sub-Components --- //
function FloatingParticle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-brand via-accent-blue to-brand/40"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -20, 10, -15, 0],
        x: [0, 10, -5, 8, 0],
        opacity: [0.1, 0.3, 0.1, 0.4, 0.1],
      }}
      transition={{ duration: 10 + Math.random() * 8, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

export default function Footer() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Framer Motion Variants for Staggered Reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i, delay: Math.random() * 5, x: Math.random() * 100, y: Math.random() * 100, size: 2 + Math.random() * 3,
  }));

  return (
    <footer className="relative bg-surface text-text-secondary pt-16 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-16 overflow-hidden">

      {/* 1. Ambient Background Glows & Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-accent-blue/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        {particles.map((p) => <FloatingParticle key={p.id} {...p} />)}
      </div>

      {/* 2. Top Animated Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-brand to-transparent w-[200%]"
          animate={{ x: ['-100%', '50%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ opacity: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10"
      >
        {/* Brand Column */}
        <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col items-start gap-6">
          <div className="flex items-center gap-3 select-none py-1 group cursor-pointer" onClick={scrollToTop}>
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-10 h-10 flex items-center justify-center relative transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(0,139,155,0.6)]"
            >
              <div className="absolute inset-0 bg-brand/10 rounded-xl blur-md group-hover:bg-brand/30 transition-colors duration-500" />
              <OptimizedImage src={logoSrc} alt="Kena Fiber Logo" className="w-full h-full object-contain relative z-10" />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-xl text-text-primary tracking-wider group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand group-hover:to-accent-blue transition-all duration-300">
                KENA FIBER
              </span>
              <span className="text-[9px] font-mono font-bold text-brand tracking-widest uppercase mt-1">
                Excellence in Engineering
              </span>
            </div>
          </div>

          <p className="font-sans text-sm text-text-muted leading-relaxed max-w-sm">
            Ethiopia's premier fiberglass fabrication company and plant nursery, delivering high-quality commercial molds and flourishing greenery.
          </p>

          <button
            onClick={() => handleScroll('contact')}
            className="group relative inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-surface-2/50 border border-brand/20 hover:border-brand/50 rounded-full text-xs sm:text-sm font-semibold text-text-primary overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,139,155,0.15)]"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <Zap className="w-4 h-4 text-brand group-hover:text-accent-blue transition-colors" />
            <span className="relative z-10">Start a Project</span>
            <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 relative z-10 transition-transform" />
          </button>
        </motion.div>

        {/* Navigation Links */}
        <motion.div variants={itemVariants} className="md:col-span-4 grid grid-cols-2 gap-8 text-sm">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] text-brand font-extrabold tracking-widest uppercase mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Company
            </span>
            {[
              { name: 'Home', id: 'home' },
              { name: 'Services', id: 'services' },
              { name: 'Gallery', id: 'gallery' },
              { name: 'Garden', id: 'garden' },
              { name: 'Contact', id: 'contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleScroll(item.id); }}
                className="font-medium text-text-muted hover:text-text-primary transition-colors cursor-pointer relative group w-fit flex items-center gap-2"
              >
                <span className="w-0 h-px bg-brand group-hover:w-3 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100" />
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] text-brand font-extrabold tracking-widest uppercase mb-1">
              Resources
            </span>
            {['Terms of Service', 'Privacy Policy', 'Careers'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-medium text-text-muted hover:text-text-primary transition-colors cursor-pointer relative group w-fit flex items-center gap-2"
              >
                <span className="w-0 h-px bg-brand group-hover:w-3 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100" />
                {item}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Business Info + Back to Top */}
        <motion.div variants={itemVariants} className="md:col-span-3 flex flex-col items-start md:items-end gap-5 text-sm md:text-right">
          <div className="glass-card p-5 rounded-2xl border border-border/50 bg-surface-2/30 backdrop-blur-sm group hover:border-brand/30 transition-colors w-full md:w-auto">
            <span className="font-mono text-[10px] text-text-faint font-extrabold tracking-wider uppercase">
              Business Info
            </span>
            <p className="font-display font-bold text-text-primary mt-2 text-base sm:text-lg group-hover:text-brand transition-colors">
              Kena Fiber
            </p>
            <p className="text-xs text-text-muted font-mono mt-1">
              Bishoftu, Oromia, Ethiopia
            </p>
          </div>

          {/* 3. Advanced Back to Top Button */}
          <motion.button
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="mt-2 group relative w-12 h-12 rounded-2xl bg-surface-3 flex items-center justify-center text-text-muted hover:text-brand border border-border/50 hover:border-brand/40 shadow-lg hover:shadow-[0_0_20px_rgba(0,139,155,0.2)] transition-all duration-300 cursor-pointer overflow-hidden"
            aria-label="Back to top"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ArrowUp className="w-5 h-5 relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />

            {/* Infinite arrow animation hidden underneath */}
            <ArrowUp className="w-5 h-5 absolute z-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 text-brand" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 4. Glassmorphism Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
        className="max-w-7xl mx-auto mt-20 pt-6 border-t border-border/50 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left">
          <span className="font-mono text-[10px] text-text-faint font-bold uppercase tracking-wider block">
            © {new Date().getFullYear()} Kena Fiber. All rights reserved.
          </span>
          <span className="hidden md:inline text-border font-mono text-[10px]">|</span>
          <a
            href="https://hundefran.github.io/Eben-Dev-solutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-text-muted font-bold uppercase tracking-wider hover:text-text-primary transition-colors group flex items-center gap-1"
          >
            Powered by
            <span className="text-brand group-hover:text-accent-blue transition-colors">
              Eben Dev Solutions
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
          <span className="font-mono text-[10px] text-text-muted font-bold uppercase tracking-wider">
            All Systems Operational
          </span>
        </div>
      </motion.div>
    </footer>
  );
}