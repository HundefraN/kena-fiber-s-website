import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShoppingBag, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoSrc from '../assets/logo.png';
import { OptimizedImage } from './OptimizedImage';
import { useApp } from '../context/AppContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Garden', href: '#garden' },
  { name: 'Process', href: '#process' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { cartItemCount, setIsCartOpen } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
            ? 'py-3 bg-[#1E2D5A]/95 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
            : 'py-5 bg-transparent border-b border-transparent'
          }`}
      >
        {/* Animated glowing line at the bottom of the header when scrolled */}
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between relative z-10">

          {/* 1. Enhanced Logo Interaction */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-2 sm:gap-3 select-none group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center relative transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(0,139,155,0.6)]"
            >
              {/* Glowing aura behind logo */}
              <div className="absolute inset-0 bg-brand/10 rounded-xl blur-md group-hover:bg-brand/30 transition-colors duration-500" />
              <OptimizedImage priority src={logoSrc} alt="Kena Fiber Logo" className="w-full h-full object-contain relative z-10" />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-base sm:text-lg text-text-primary tracking-wider group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand group-hover:to-accent-blue transition-all duration-300">
                KENA FIBER
              </span>
              <span className="text-[7px] sm:text-[9px] font-mono font-bold text-brand tracking-widest uppercase mt-0.5">
                Fiberglass Solutions
              </span>
            </div>
          </a>

          {/* 2. Premium Desktop Nav with Glowing Indicator */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface-2/30 px-2 py-1.5 rounded-full border border-border/50 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="relative px-5 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer group"
                >
                  <span className={`relative z-10 transition-colors duration-300 ${isActive
                      ? 'text-brand drop-shadow-[0_0_8px_rgba(0,139,155,0.4)]'
                      : 'text-text-secondary group-hover:text-text-primary'
                    }`}>
                    {link.name}
                  </span>

                  {/* Active Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-brand/10 rounded-full border border-brand/20 shadow-[inset_0_0_12px_rgba(0,139,155,0.1)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* 3. Upgraded Actions (Cart & CTA) */}
          <div className="flex items-center gap-4">

            {/* Cart Button with Pop Animation on item add */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-surface-2 border border-border hover:border-brand/40 hover:bg-brand/5 text-text-secondary hover:text-brand shadow-lg hover:shadow-[0_0_20px_rgba(0,139,155,0.15)] transition-all duration-300 cursor-pointer group"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.span
                    key={cartItemCount} // Re-animates when count changes
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-gradient-to-r from-brand to-accent-blue text-surface text-[10px] font-bold flex items-center justify-center shadow-[0_0_12px_rgba(0,139,155,0.6)] border border-surface"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Glowing Hover CTA */}
            <div className="hidden sm:block relative p-[1px] rounded-full bg-gradient-to-r from-brand/40 via-accent-blue/40 to-brand/40 overflow-hidden group/btn cursor-pointer">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className="relative flex items-center gap-2 px-6 py-2.5 bg-surface hover:bg-brand text-brand hover:text-surface text-sm font-bold rounded-full transition-all duration-500 z-10"
              >
                <Zap className="w-3.5 h-3.5" />
                Request a Quote
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
              {/* Inner glowing effect that sweeps across on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-blue to-brand opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-full bg-surface-2 border border-border text-text-secondary hover:text-brand hover:border-brand/40 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 4. Cinematic Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[#1E2D5A]/95 overflow-hidden"
          >
            {/* Ambient Background Glows inside Mobile Menu */}
            <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-brand/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-accent-blue/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex justify-end p-6 relative z-10">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-3 rounded-full bg-surface-2 border border-border text-text-secondary hover:text-brand hover:border-brand/50 hover:shadow-[0_0_15px_rgba(0,139,155,0.2)] transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center gap-4 px-8 pt-10 h-[70vh] relative z-10">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.1 + idx * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                    className={`text-lg sm:text-2xl font-display font-black py-3 px-6 sm:py-4 sm:px-8 rounded-3xl transition-all w-full text-center border ${isActive
                        ? 'text-brand bg-brand/10 border-brand/30 shadow-[0_0_30px_rgba(0,139,155,0.15)]'
                        : 'text-text-secondary bg-surface-2/50 border-border/50 hover:text-text-primary hover:border-brand/30 hover:bg-surface-3'
                      }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}

              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 sm:mt-8 relative flex items-center justify-center gap-2 sm:gap-3 px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-r from-brand to-accent-blue text-surface text-base sm:text-lg font-bold rounded-3xl w-full shadow-[0_0_40px_rgba(0,139,155,0.3)] hover:shadow-[0_0_60px_rgba(0,139,155,0.5)] transition-shadow"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                Request a Quote
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}