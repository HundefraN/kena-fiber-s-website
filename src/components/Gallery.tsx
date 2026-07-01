import React, { useState, useMemo, useEffect } from 'react';
import { X, ZoomIn, ShoppingCart, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

// Contextually relevant planter categories
type Category = 'all' | 'custom-branded' | 'geometric-minimalist' | 'sculptural-textured';

interface Project {
  id: string;
  title: string;
  category: Exclude<Category, 'all'>;
  image: string;
  description: string;
}

const productImagePath = (n: number) =>
  new URL(`../assets/product_images/image${n}.png`, import.meta.url).href;

const categories: Category[] = ['custom-branded', 'geometric-minimalist', 'sculptural-textured'];

const categoryLabels: Record<Category, string> = {
  all: 'All Works',
  'custom-branded': 'Custom Branded',
  'geometric-minimalist': 'Geometric & Minimalist',
  'sculptural-textured': 'Sculptural & Textured',
};

const productNames: string[] = [
  'Geometric Gold-Accented Fiberglass Planter',
  'Modern Sculptural Fiberglass Planter Assortment',
  'Custom Branded Fiberglass Planters - Ethiopian Economics Association',
  'Tsedey Bank Branded Geometric Fiberglass Planters',
  'Matte Finish Minimalist Fiberglass Planters',
  'Modern Matte Cylinder Fiberglass Planter Series',
  'Black Tapered Square Fiberglass Floor Planter',
  'White Tapered Square Fiberglass Floor Planter',
  'Metallic Gold Fluted Fiberglass Accent Pot',
  'Two-Tone Gold-Band Forest Green Fiberglass Planter',
  'White Branch-Texture Cylinder Fiberglass Planter',
  'Organic Modern White Fiberglass Planter Set',
  'Mixed Modern Fiberglass Planter Trio',
  'Contemporary Minimalist Fiberglass Planter Assortment',
  'Custom Global Bank Ethiopia Branded Fiberglass Planters',
  'Modern White Architectural Fiberglass Planter Set',
  'Matte Black Geometric Sculptural Planter',
  'Sage Green Minimalist Fiberglass Planter Series',
  'Vibrant Orange Spherical Fiberglass Planter',
  'Handheld White Geometric Fiberglass Succulent Pot',
  'Minimalist Fluted Gradient Planter Set',
  'Coastal Terrace Contemporary Planter Ensemble',
  'Geometric Base Modern Pot Trio',
  'Architectural Indoor Plant and Succulent Collection',
  'Minimalist Monochromatic Rectangular and Cylinder Set',
  'Large Sculptural Organic Minimalist Planters',
  'Metallic Gold Spherical Accent Planters',
  'Modern White Architectural Cylinder Planter Set',
  'Contemporary Fluted and Geometric Planter Ensemble',
];

const productDescriptions: string[] = [
  'Engineered from high-impact fiberglass, this contemporary planter balances bold geometry with premium durability, ideal for luxury commercial interiors.',
  'An elegant collection of premium-grade sculptural planters. Designed for high-end hospitality and corporate spaces seeking versatile, weather-resistant structural accents.',
  'Professional-grade institutional planters featuring precise logo integration and UV-stable gel coats, built to withstand high-traffic corporate environments.',
  'Heavy-duty corporate branding planters manufactured with custom-matched gel coats, offering excellent impact resistance for commercial bank branches.',
  'Industrial-grade matte planters designed for architectural landscaping. Features a non-porous, fade-resistant surface ideal for indoor and outdoor plazas.',
  'Architectural cylinder planters offering deep root capacity and extreme weather resilience, crafted for professional interior decorators and landscape designs.',
  'Stately tapered square column planter engineered with a heavy-duty reinforced base to resist warping and cracking in high-traffic commercial entryways.',
  'Sleek, UV-protected white square planter featuring a structural pedestal base that delivers a sophisticated, low-maintenance aesthetic for corporate lobbies.',
  'Premium metallic-finished fluted planter featuring an ultra-durable gel coat. Designed to elevate reception desks, executive suites, and luxury tabletop displays.',
  'Elegant multi-textured planter duo crafted with automotive-grade pigmented finishes, providing a durable and lasting focal point for upscale interiors.',
  'Custom-molded textured cylinder planter combining organic branch patterns with structural fiberglass durability, ideal for boutique retail and hospitality projects.',
  'Ovoid fiberglass planters designed to provide a minimalist, architectural accent for upscale gardens, patios, and modern exterior landscapes.',
  'An elite multi-shape planter set designed for architectural staging, featuring a scratch-resistant finish and structural reinforcement for versatile cluster layouts.',
  'A curated professional bundle of high-durability minimalist planters, engineered to offer uniform aesthetic consistency across large-scale developments.',
  'Custom corporate-branded planters featuring precise logo application and structural fiberglass construction, designed for high-visibility corporate placements.',
  'Architectural-grade white planter collection featuring reinforced structures and optimal drainage paths, built for large corporate interiors and public spaces.',
  'High-impact geometric planter with multifaceted structural lines and premium-grade resins to prevent chipping in busy commercial or retail environments.',
  'Fade-resistant sage green planter collection designed for commercial staging. Highly lightweight yet structurally rigid to ensure long-term, low-maintenance utility.',
  'High-gloss spherical accent planter finished with a protective, UV-stable topcoat to maintain vibrant color in high-exposure outdoor hotel patios and terraces.',
  'Precision-molded desktop geometric planter demonstrating KENA Fiber\'s high-tolerance custom tooling, perfect for premium corporate gifting.',
  'Fluted gradient planter series offering graded architectural sizing. Seamlessly molded to offer chemical-resistant and weather-resistant durability.',
  'Heavy-duty coastal-grade planters designed to withstand salty air, high humidity, and intense sun on luxury resort balconies and open patios.',
  'Architectural planter system featuring modular bases and interlocking geometric profiles, ideal for modern art hotels and premium commercial lobbies.',
  'Premium selection of commercial interior planters engineered with high strength-to-weight ratios for easy transport and plant-scaping reconfiguration.',
  'Commercial rectangular and cylindrical staging planter set built with reinforced corners and structural joints for ultimate industrial durability.',
  'Large-format sculptural white planters crafted using hand lay-up laminate techniques to deliver unmatched structural durability in luxury entryways.',
  'A pair of premium metallic-finished spherical planters, designed to elevate reception areas, executive suites, or sophisticated home interiors with their high-gloss, ultra-durable finish.',
  'An architectural-grade white planter collection featuring sleek, minimalist profiles, reinforced structures, and optimal drainage paths, perfectly suited for large-scale corporate interiors and public spaces.',
  'A curated assembly of high-durability fiberglass planters, showcasing a striking gold geometric pot alongside elegant white fluted cylinders, engineered for versatile and stylish commercial staging.',
];

const productCategories: Exclude<Category, 'all'>[] = [
  'geometric-minimalist', 'sculptural-textured', 'custom-branded', 'custom-branded',
  'geometric-minimalist', 'geometric-minimalist', 'geometric-minimalist', 'geometric-minimalist',
  'sculptural-textured', 'sculptural-textured', 'sculptural-textured', 'sculptural-textured',
  'geometric-minimalist', 'geometric-minimalist', 'custom-branded', 'geometric-minimalist',
  'sculptural-textured', 'geometric-minimalist', 'geometric-minimalist', 'geometric-minimalist',
  'sculptural-textured', 'geometric-minimalist', 'geometric-minimalist', 'geometric-minimalist',
  'geometric-minimalist', 'sculptural-textured',
  'sculptural-textured', 'geometric-minimalist', 'sculptural-textured'
];

const projects: Project[] = Array.from({ length: 29 }, (_, i) => ({
  id: `p${i + 1}`,
  title: productNames[i],
  category: productCategories[i],
  image: productImagePath(i + 1),
  description: productDescriptions[i],
}));

const ITEMS_PER_PAGE = 8;

// Reusable micro-animation helpers
function FloatingParticle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-brand via-accent-blue/30 to-transparent"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -40, 20, -20, 0],
        x: [0, 20, -10, 10, 0],
        opacity: [0.05, 0.25, 0.1, 0.3, 0.05],
        scale: [1, 1.2, 0.9, 1.1, 1],
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

function GlowingOrb({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-brand"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0, 1.1, 0],
        boxShadow: [
          '0 0 0px rgba(0, 139, 155, 0)',
          '0 0 15px rgba(0, 139, 155, 0.4)',
          '0 0 0px rgba(0, 139, 155, 0)',
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function Gallery() {
  const { addToCart, cart } = useApp();
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [lightbox, setLightbox] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightbox]);

  const filtered = useMemo(
    () => (activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)),
    [activeFilter]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(
    () => filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filtered, currentPage]
  );

  const handleFilterChange = (value: Category) => {
    setActiveFilter(value);
    setCurrentPage(1);
  };

  const handleAddToCart = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    addToCart(project as any);
    setAddedIds((prev) => new Set(prev).add(project.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(project.id);
        return next;
      });
    }, 1500);
  };

  const isInCart = (id: string) => cart.some((item) => item.id === id);

  const getCartQuantity = (id: string) => {
    const item = cart.find(c => c.id === id);
    return item ? item.quantity : 0;
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const el = document.getElementById('gallery');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const paginationNumbers = useMemo(() => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  // Stable ambient coordinates initialized once
  const ambientParticles = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
  })), []);

  const ambientOrbs = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: Math.random() * 8,
    x: Math.random() * 100,
    y: Math.random() * 100,
  })), []);

  return (
    <section id="gallery" className="relative py-16 sm:py-28 px-2 sm:px-6 lg:px-16 overflow-hidden">
      {/* Background & Gradients */}
      <div className="absolute inset-0 bg-surface z-0" />
      <div className="absolute inset-0 grid-bg opacity-35 z-0 pointer-events-none" />

      {/* Hardware-Accelerated Ambient Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {ambientParticles.map((p) => (
          <FloatingParticle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
        ))}
        {ambientOrbs.map((orb) => (
          <GlowingOrb key={orb.id} delay={orb.delay} x={orb.x} y={orb.y} />
        ))}
      </div>

      {/* Decorative Radial Soft Glows */}
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-accent-blue/4 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[550px] h-[550px] bg-brand/4 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Block */}
        <div className="text-center mb-14 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span className="text-[11px] uppercase tracking-widest font-mono font-extrabold text-brand">
              Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-3xl sm:text-4xl lg:text-6xl text-text-primary tracking-tight mt-5"
          >
            Our Works{' '}
            <span className="gradient-text bg-clip-text">Gallery</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-base text-text-secondary mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Browse our completed projects across custom molds, geometric minimalism, and bespoke commercial fiberglass branding.
          </motion.p>
        </div>

        {/* Sliding Filter Indicator Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-14 max-w-3xl mx-auto">
          {(['all', ...categories] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className="relative px-3 sm:px-5 py-1.5 sm:py-3 rounded-full text-[9px] sm:text-xs font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer overflow-hidden group select-none"
            >
              <span className={`relative z-10 transition-colors duration-300 ${activeFilter === cat ? 'text-surface' : 'text-text-secondary group-hover:text-text-primary'
                }`}>
                {categoryLabels[cat]}
              </span>
              {activeFilter === cat ? (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-gradient-to-r from-brand to-accent-blue rounded-full -z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full border border-border group-hover:border-brand/40 transition-colors duration-300 -z-0" />
              )}
            </button>
          ))}
        </div>

        {/* Grid Setup with 3D Depth Entry */}
        <motion.div layout className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-5 md:gap-6 perspective">
          <AnimatePresence mode="popLayout">
            {paginatedItems.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{
                  duration: 0.6,
                  delay: (idx % 4) * 0.05,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="group relative rounded-2xl overflow-hidden border border-border bg-surface-2/30 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:border-brand/30 hover:shadow-[0_0_30px_rgba(0,139,155,0.12)]"
                onClick={() => setLightbox(project)}
              >
                {/* Visual Corner Brackets that reveal on Hover */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-brand/0 group-hover:border-brand/30 rounded-tl-2xl transition-all duration-500 pointer-events-none z-20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-brand/0 group-hover:border-brand/30 rounded-br-2xl transition-all duration-500 pointer-events-none z-20" />

                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Glassmorph zoom icon wrapper */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-surface-2/40 backdrop-blur-md border border-border/40 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ZoomIn className="w-4 h-4 text-brand" />
                  </div>

                  {isInCart(project.id) && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-accent-emerald/20 border border-accent-emerald/30 backdrop-blur-md z-10">
                      <span className="text-[9px] font-mono font-bold text-accent-emerald uppercase tracking-wider">In Cart</span>
                    </div>
                  )}
                </div>

                <div className="p-2 sm:p-4 relative">
                  <span className="text-[8px] sm:text-[10px] uppercase font-mono font-bold tracking-widest text-brand mb-1 sm:mb-1.5 block truncate">
                    {categoryLabels[project.category]}
                  </span>
                  <h3 className="font-display font-bold text-[10px] sm:text-sm leading-tight text-text-primary mb-1 sm:mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-[9px] sm:text-xs text-text-muted leading-relaxed line-clamp-2 mb-2 sm:mb-3 hidden sm:block">
                    {project.description}
                  </p>

                  <button
                    onClick={(e) => handleAddToCart(e, project)}
                    className={`
                      relative overflow-hidden w-full py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-semibold
                      flex items-center justify-center gap-1 sm:gap-2
                      transition-all duration-300 cursor-pointer
                      ${addedIds.has(project.id)
                        ? 'bg-accent-emerald/15 border border-accent-emerald/30 text-accent-emerald'
                        : 'bg-brand/10 border border-brand/20 text-brand hover:bg-brand/20 hover:border-brand/40 hover:shadow-[0_0_15px_rgba(0,139,155,0.15)]'
                      }
                    `}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {addedIds.has(project.id) ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Added ({getCartQuantity(project.id)})
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          {getCartQuantity(project.id) > 0 ? `Add to Cart (${getCartQuantity(project.id)})` : 'Add to Cart'}
                        </>
                      )}
                    </span>
                    {!addedIds.has(project.id) && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent-blue to-brand opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Improved Pagination Elements */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-2 mt-14"
          >
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-xl bg-surface-3/30 border border-border flex items-center justify-center text-text-muted hover:text-brand hover:border-brand/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {paginationNumbers.map((page, idx) =>
              page === '...' ? (
                <span key={`dots-${idx}`} className="px-1 text-text-faint font-mono text-sm">
                  ···
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`
                    w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer
                    ${currentPage === page
                      ? 'bg-brand/15 text-brand border border-brand/30 shadow-[0_0_20px_rgba(0,139,155,0.1)]'
                      : 'bg-surface-3/30 text-text-muted border border-border hover:text-text-secondary hover:border-border-hover'
                    }
                  `}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-xl bg-surface-3/30 border border-border flex items-center justify-center text-text-muted hover:text-brand hover:border-brand/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="ml-3 text-xs font-mono text-text-faint">
              {currentPage}/{totalPages}
            </span>
          </motion.div>
        )}
      </div>

      {/* Lightbox Component with Soft Spring Transitions */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 15, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="bg-surface border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row relative shadow-2xl my-auto max-h-[90vh] md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 z-[110] p-2 bg-black/50 hover:bg-brand text-white rounded-full backdrop-blur-md border border-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Segment */}
              <div className="w-full md:w-3/5 bg-black/10 flex items-center justify-center relative min-h-[220px] sm:min-h-[300px] md:min-h-[450px] max-h-[35vh] md:max-h-none overflow-hidden">
                <img
                  src={lightbox.image}
                  alt={lightbox.title}
                  className="w-full h-full object-contain p-4 md:p-6"
                />
              </div>

              {/* Content Block */}
              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-none relative">
                {/* Background ambient detail inside Lightbox */}
                <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-brand/5 rounded-full blur-[40px] pointer-events-none" />

                <div className="mb-6 relative z-10">
                  <span className="text-[10px] sm:text-xs uppercase font-mono font-bold tracking-widest text-brand mb-2 block">
                    {categoryLabels[lightbox.category]}
                  </span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-display font-black text-white mb-3 sm:mb-4 leading-tight">
                    {lightbox.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-brand to-accent-blue mb-4 sm:mb-5 rounded-full" />
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                    {lightbox.description}
                  </p>
                </div>

                {/* Lightbox Call-To-Action with continuous light sweep on hover */}
                <div className="space-y-3 mt-auto relative z-10">
                  <button
                    onClick={(e) => handleAddToCart(e, lightbox)}
                    className={`
                      group relative overflow-hidden w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-widest
                      flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer
                      ${addedIds.has(lightbox.id)
                        ? 'bg-accent-emerald text-white shadow-lg shadow-accent-emerald/20'
                        : 'bg-brand text-white hover:bg-brand-hover shadow-lg shadow-brand/20'
                      }
                    `}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {addedIds.has(lightbox.id) ? (
                        <>
                          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                          Added ({getCartQuantity(lightbox.id)})
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                          {getCartQuantity(lightbox.id) > 0 ? `Add to Cart (${getCartQuantity(lightbox.id)})` : 'Add to Cart'}
                        </>
                      )}
                    </span>
                    {!addedIds.has(lightbox.id) && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent-blue to-brand opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </button>
                  <p className="text-center text-[9px] sm:text-[10px] text-text-faint uppercase tracking-tighter">
                    Custom sizes and finishes tailored to spec
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}