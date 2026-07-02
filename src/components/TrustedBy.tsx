import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

const logos = [
  {
    id: 'logo-1',
    name: 'Ethiopian Economic Association',
    src: 'https://res.cloudinary.com/dqosuzul4/image/upload/v1782975373/Ethiopian_Economic_Association_mtc25g.jpg',
  },
  {
    id: 'logo-2',
    name: 'Global Bank Ethiopia',
    src: 'https://res.cloudinary.com/dqosuzul4/image/upload/v1782975373/Global_Bank_Ethiopia_va2u38.png',
  },
  {
    id: 'logo-3',
    name: 'Tsedey Bank',
    src: 'https://res.cloudinary.com/dqosuzul4/image/upload/v1782975373/Tsedey_Bank_logo_uqkps7.png',
  },
];

export default function TrustedBy() {
  // Quadruple the logos to ensure the marquee fills even ultrawide screens smoothly
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="relative py-12 sm:py-24 px-4 sm:px-6 lg:px-0 overflow-hidden border-y border-border/30">

      {/* Deep Background Layers */}
      <div className="absolute inset-0 bg-surface-2 z-0" />
      <div className="absolute inset-0 grid-bg opacity-20 z-0" />

      {/* Ambient Pulsing Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-10 sm:mb-14"
        >
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-brand/50" />
          <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-surface-3/50 border border-border backdrop-blur-md">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-brand" />
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-mono font-bold text-text-muted">
              Trusted By Industry Leaders
            </span>
          </div>
          <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-brand/50" />
        </motion.div>

        {/* Infinite Marquee Container */}
        <div className="relative w-full max-w-[100vw] overflow-hidden flex items-center">

          {/* Glowing horizontal track line */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent z-0" />

          {/* Gradient fade edges for seamless entering/exiting */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 md:w-64 bg-gradient-to-r from-surface-2 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 md:w-64 bg-gradient-to-l from-surface-2 to-transparent z-20 pointer-events-none" />

          {/* Scrolling Track */}
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30, // Adjust speed here
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex w-max gap-3 sm:gap-5 md:gap-6 px-4 relative z-10 hover:[animation-play-state:paused]"
          >
            {marqueeLogos.map((logo, idx) => (
              <motion.div
                key={`${logo.id}-${idx}`}
                whileHover={{ y: -3 }}
                className="group relative flex-shrink-0"
                title={logo.name}
              >
                {/* Logo Glass Card - Reduced padding to hug the smaller images */}
                <div className="glass-card px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl border border-border/50 bg-surface-3/30 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-500 group-hover:border-brand/40 group-hover:bg-surface-3/80 group-hover:shadow-[0_0_20px_rgba(0,139,155,0.15)]">

                  {/* Significantly smaller image sizes: h-6 to h-8 (24px-32px tall) */}
                  <OptimizedImage
                    src={logo.src}
                    alt={logo.name}
                    className="h-6 sm:h-8 w-auto max-w-[100px] sm:max-w-[140px] object-contain filter grayscale opacity-60 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  />

                  {/* Internal Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Hover Tooltip / Name */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none w-max z-30">
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-brand tracking-widest uppercase bg-surface-2 border border-brand/20 px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(0,139,155,0.2)]">
                    {logo.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}