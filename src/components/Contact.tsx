import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Sparkles, User, MessageSquare, Zap } from 'lucide-react';
import { motion } from 'motion/react';

// --- Premium UI Sub-Components --- //

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
      transition={{ duration: 10 + Math.random() * 8, repeat: Infinity, delay, ease: 'easeInOut' }}
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
        scale: [0, 1.5, 0],
        boxShadow: [
          '0 0 0px rgba(0, 139, 155, 0)',
          '0 0 30px rgba(0, 139, 155, 0.8)',
          '0 0 0px rgba(0, 139, 155, 0)',
        ],
      }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

// --- Main Component --- //

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', details: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Quote Request from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nProject Details:\n${form.details}`
    );
    window.location.href = `mailto:Jemsnati182@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Visit Us',
      value: 'Bishoftu, Oromia, Ethiopia',
      color: 'text-brand',
      href: 'https://maps.google.com/?q=Bishoftu,Oromia,Ethiopia'
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: '+251 945 828 734',
      color: 'text-accent-amber',
      href: 'tel:+251945828734'
    },
    {
      icon: Mail,
      label: 'Email Us',
      value: 'Jemsnati182@gmail.com',
      color: 'text-accent-emerald',
      href: 'mailto:Jemsnati182@gmail.com'
    },
  ];

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i, delay: Math.random() * 5, x: Math.random() * 100, y: Math.random() * 100, size: 2 + Math.random() * 4,
  }));

  const glowingOrbs = Array.from({ length: 8 }, (_, i) => ({
    id: i, delay: Math.random() * 8, x: Math.random() * 100, y: Math.random() * 100,
  }));

  return (
    <section id="contact" className="relative py-16 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-surface">

      {/* Ambient Glow Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-10 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }} />

        {particles.map((p) => <FloatingParticle key={`p-${p.id}`} {...p} />)}
        {glowingOrbs.map((orb) => <GlowingOrb key={`o-${orb.id}`} {...orb} />)}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 backdrop-blur-sm mb-6"
          >
            <Zap className="w-4 h-4 text-brand" />
            <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-brand">
              Get In Touch
            </span>
          </motion.div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl text-text-primary tracking-tight">
            Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-accent-blue">Us</span>
          </h2>
          <p className="font-sans text-sm sm:text-lg text-text-secondary mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed">
            Ready to start your next project? Send us your requirements and our engineering team will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Left Column: Form & Contacts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between space-y-8"
          >
            {/* Form */}
            <form onSubmit={handleSubmit} className="relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-6 bg-surface-2/40 backdrop-blur-md border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] group overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="space-y-2 relative z-10">
                <label className="block text-[11px] font-mono font-bold text-text-muted uppercase tracking-wider">
                  Full Name
                </label>
                <div className={`relative flex items-center rounded-xl transition-all duration-300 bg-surface-3/80 border ${focusedField === 'name' ? 'border-brand/50 shadow-[0_0_20px_rgba(0,139,155,0.15)]' : 'border-border'}`}>
                  <User className={`w-4 h-4 ml-4 shrink-0 transition-colors ${focusedField === 'name' ? 'text-brand' : 'text-text-faint'}`} />
                  <input
                    type="text" name="name" required placeholder="Abebe Kebede"
                    value={form.name} onChange={handleChange}
                    onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                    className="w-full px-3 py-3 sm:py-4 bg-transparent border-0 rounded-xl text-xs sm:text-sm font-medium text-text-primary placeholder:text-text-faint focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label className="block text-[11px] font-mono font-bold text-text-muted uppercase tracking-wider">
                  Email Address
                </label>
                <div className={`relative flex items-center rounded-xl transition-all duration-300 bg-surface-3/80 border ${focusedField === 'email' ? 'border-brand/50 shadow-[0_0_20px_rgba(0,139,155,0.15)]' : 'border-border'}`}>
                  <Mail className={`w-4 h-4 ml-4 shrink-0 transition-colors ${focusedField === 'email' ? 'text-brand' : 'text-text-faint'}`} />
                  <input
                    type="email" name="email" required placeholder="abebe@gmail.com"
                    value={form.email} onChange={handleChange}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    className="w-full px-3 py-3 sm:py-4 bg-transparent border-0 rounded-xl text-xs sm:text-sm font-medium text-text-primary placeholder:text-text-faint focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label className="block text-[11px] font-mono font-bold text-text-muted uppercase tracking-wider">
                  Project Details
                </label>
                <div className={`relative flex items-start rounded-xl transition-all duration-300 bg-surface-3/80 border ${focusedField === 'details' ? 'border-brand/50 shadow-[0_0_20px_rgba(0,139,155,0.15)]' : 'border-border'}`}>
                  <MessageSquare className={`w-4 h-4 ml-4 mt-5 shrink-0 transition-colors ${focusedField === 'details' ? 'text-brand' : 'text-text-faint'}`} />
                  <textarea
                    name="details" required rows={4} placeholder="Describe your project, timeline, material specs, etc..."
                    value={form.details} onChange={handleChange}
                    onFocus={() => setFocusedField('details')} onBlur={() => setFocusedField(null)}
                    className="w-full px-3 py-3 sm:py-4 bg-transparent border-0 rounded-xl text-xs sm:text-sm font-medium text-text-primary placeholder:text-text-faint focus:outline-none focus:ring-0 resize-none min-h-[100px] sm:min-h-[120px]"
                  />
                </div>
              </div>

              <div className="pt-2 relative z-10">
                <div className="relative rounded-2xl bg-gradient-to-r from-brand via-accent-blue to-brand p-[1px] overflow-hidden group/btn">
                  <button
                    type="submit"
                    className="relative w-full px-6 sm:px-8 py-3 sm:py-4 bg-surface hover:bg-brand text-text-primary hover:text-surface font-bold rounded-2xl shadow-[0_0_20px_rgba(0,139,155,0.1)] hover:shadow-[0_0_40px_rgba(0,139,155,0.4)] transition-all duration-500 cursor-pointer flex items-center justify-center gap-2.5 text-xs sm:text-sm z-10 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-blue to-brand opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -z-10"
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {submitted ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        Opening Email Client...
                      </>
                    ) : (
                      <>
                        Send Quote Request
                        <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Glassmorphism Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon;

                // FIX: Comment moved outside of the return statement
                // Changed from motion.div to motion.a to support the href properly
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'Visit Us' ? "_blank" : undefined}
                    rel={item.label === 'Visit Us' ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (idx * 0.15), duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="p-5 rounded-2xl flex flex-col gap-3 bg-surface-2/30 backdrop-blur-sm border border-border/50 hover:border-brand/30 hover:shadow-[0_0_30px_rgba(0,139,155,0.05)] transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-surface-3 flex items-center justify-center shrink-0 border border-border/50 group-hover:border-brand/30 transition-colors duration-300">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block mb-1">
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-text-primary truncate block group-hover:text-brand transition-colors duration-300">
                        {item.value}
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 h-[300px] sm:h-[450px] lg:h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] relative rounded-3xl p-1 bg-surface-2/40 border border-border/50 group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700" />

            <div className="relative w-full h-full rounded-[1.3rem] overflow-hidden bg-surface z-10 border border-surface-3">
              <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-brand/50 rounded-tl-[1.3rem] z-20 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-brand/50 rounded-br-[1.3rem] z-20 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-0 bg-surface/40 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
                <span className="px-4 py-2 bg-surface-2/80 rounded-full text-xs font-mono font-bold text-text-primary border border-border flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-brand" /> Interactive Map
                </span>
              </div>

              <iframe
                title="Location"
                src="https://maps.google.com/maps?q=8.787063,38.936875&output=embed"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"
      />
    </section>
  );
}