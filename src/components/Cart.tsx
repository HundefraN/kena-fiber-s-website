import React, { useState, useRef } from 'react';
import { X, Minus, Plus, Trash2, Send, ShoppingBag, CheckCircle, AlertCircle, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

// ── Telegram Bot API credentials ──
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID';

type OrderStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen } = useApp();
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('idle');
  const [contactInfo, setContactInfo] = useState('');
  const [contactError, setContactError] = useState(false);
  const contactInputRef = useRef<HTMLInputElement>(null);

  const handleOrderNow = async () => {
    if (cart.length === 0) return;
    if (!contactInfo.trim()) {
      setContactError(true);
      contactInputRef.current?.focus();
      setTimeout(() => setContactError(false), 2500);
      return;
    }

    setOrderStatus('sending');

    try {
      const timestamp = new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
      });

      // 1. Send Summary Message
      const summaryMessage = `🛒 *NEW ORDER REQUEST*\n━━━━━━━━━━━━━━━━━━━━\n👤 *From:* ${contactInfo}\n📅 ${timestamp}\n\n📊 *Total Items:* ${cart.reduce((sum, i) => sum + i.quantity, 0)}\n📋 *Unique Products:* ${cart.length}`;

      const textUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      await fetch(textUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: summaryMessage,
          parse_mode: 'Markdown',
        }),
      });

      // 2. Send Each Image as a Photo
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        try {
          const imageRes = await fetch(item.project.image);
          const blob = await imageRes.blob();

          const formData = new FormData();
          formData.append('chat_id', TELEGRAM_CHAT_ID);
          formData.append('photo', blob, 'product.png');

          const caption = `*Item ${i + 1}*\n📦 *Amount:* ${item.quantity}\n🏷️ *Category:* ${item.project.category.replace('-', ' ')}\n👤 *User:* ${contactInfo}`;
          formData.append('caption', caption);
          formData.append('parse_mode', 'Markdown');

          const photoUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
          await fetch(photoUrl, {
            method: 'POST',
            body: formData,
          });
        } catch (err) {
          console.error("Failed to send photo for item", item, err);
        }
      }

      setOrderStatus('success');
      setTimeout(() => {
        clearCart();
        setContactInfo('');
        setOrderStatus('idle');
        setIsCartOpen(false);
      }, 2500);
    } catch {
      setOrderStatus('error');
      setTimeout(() => setOrderStatus('idle'), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* 1. Enhanced Backdrop with deeper blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-surface/80"
            onClick={() => setIsCartOpen(false)}
          />

          {/* 2. Deep Glassmorphism Slide-out Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[95] w-full max-w-md flex flex-col bg-surface-2/60 backdrop-blur-2xl border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Ambient Inner Glows */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6 bg-surface-2/40 border-b border-border/50">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-surface-3 to-surface-2 border border-border/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,139,155,0.1)] group">
                  <div className="absolute inset-0 bg-brand/20 rounded-xl sm:rounded-2xl blur-md opacity-50" />
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-brand relative z-10" />
                </div>
                <div>
                  {/* Gradient Typography */}
                  <h2 className="font-display font-black text-lg sm:text-xl bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary tracking-wide">
                    Your Cart
                  </h2>
                  <p className="text-[10px] sm:text-xs text-brand font-mono font-bold uppercase tracking-widest mt-0.5">
                    {cart.length} {cart.length === 1 ? 'Item' : 'Items'} Selected
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-surface-3 flex items-center justify-center text-text-muted hover:text-brand border border-border/50 hover:border-brand/40 shadow-lg hover:shadow-[0_0_15px_rgba(0,139,155,0.2)] transition-all cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              {/* Glowing header accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 relative z-10 custom-scrollbar">
              {cart.length === 0 ? (
                // 3. Animated Empty State
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center gap-4 sm:gap-5"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] sm:rounded-3xl bg-surface-3/30 border border-border/50 flex items-center justify-center shadow-inner backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-brand/5 rounded-3xl blur-xl" />
                    <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-text-faint relative z-10" />
                  </motion.div>
                  <div>
                    <p className="font-display font-bold text-text-primary text-base sm:text-lg">Your cart is empty</p>
                    <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-[200px] mx-auto leading-relaxed">
                      Discover our premium fiberglass solutions and add them here.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-3 sm:gap-4">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item, idx) => (
                      // 4. Staggered Item Entrance & Hover Effects
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 40, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -40, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: idx * 0.1, type: "spring", stiffness: 250, damping: 25 }}
                        className="group relative flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-2xl bg-surface-3/30 border border-border/50 hover:border-brand/40 hover:bg-surface-3/80 transition-all duration-300 overflow-hidden"
                      >
                        {/* Hover Inner Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Thumbnail */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-border/80 relative z-10">
                          <img
                            src={item.project.image}
                            alt={item.project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 relative z-10">
                          <h4 className="font-display font-bold text-[13px] sm:text-sm text-text-primary truncate group-hover:text-brand transition-colors">
                            {item.project.title}
                          </h4>
                          <span className="text-[8px] sm:text-[9px] uppercase font-mono font-bold tracking-widest text-text-muted mt-1 block">
                            {item.project.category.replace('-', ' ')}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 flex-shrink-0 relative z-10 bg-surface-4/40 p-1 rounded-xl border border-border/50">
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center text-text-muted hover:text-brand hover:shadow-[0_0_10px_rgba(0,139,155,0.2)] transition-all cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </motion.button>
                          <span className="font-mono text-xs font-bold text-text-primary w-4 text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center text-text-muted hover:text-brand hover:shadow-[0_0_10px_rgba(0,139,155,0.2)] transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center text-text-faint hover:text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all cursor-pointer flex-shrink-0 relative z-10"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer — Order Now */}
            {cart.length > 0 && (
              <div className="px-4 sm:px-6 py-4 sm:py-6 bg-surface-2/80 border-t border-border/50 relative z-10 backdrop-blur-md">

                {/* Glowing footer accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

                {/* Contact Info Input — Prominent at Top */}
                <motion.div
                  className="mb-4 relative"
                  animate={contactError ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <label className="text-[10px] uppercase font-mono font-bold tracking-widest text-text-muted mb-1.5 block flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    How we Can Contact You
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      ref={contactInputRef}
                      type="text"
                      placeholder="Phone, or @Telegram username..."
                      value={contactInfo}
                      onChange={(e) => {
                        setContactInfo(e.target.value);
                        if (contactError) setContactError(false);
                      }}
                      className={`w-full bg-surface-3/40 text-text-primary text-sm rounded-xl block p-3.5 pr-10 transition-all duration-300 outline-none placeholder:text-text-muted/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] border ${contactError
                          ? 'border-red-500/80 ring-1 ring-red-500/40 shadow-[inset_0_0_15px_rgba(239,68,68,0.1)]'
                          : contactInfo.trim()
                            ? 'border-accent-emerald/50 ring-1 ring-accent-emerald/20'
                            : 'border-border/50 focus:ring-1 focus:ring-brand focus:border-brand'
                        }`}
                    />
                    {contactInfo.trim() && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none"
                      >
                        <CheckCircle className="w-4 h-4 text-accent-emerald" />
                      </motion.div>
                    )}
                  </div>
                  <AnimatePresence>
                    {contactError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1 font-medium"
                      >
                        <AlertCircle className="w-3 h-3" />
                        Please provide your contact info so we can reach you.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Summary */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <span className="text-sm font-semibold text-text-secondary">Total Quantity</span>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-2xl text-text-primary">
                      {cart.reduce((sum, i) => sum + i.quantity, 0)}
                    </span>
                    <span className="text-xs text-brand font-mono uppercase font-bold tracking-widest bg-brand/10 px-2 py-1 rounded-md border border-brand/20">
                      Units
                    </span>
                  </div>
                </div>

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="w-full text-center text-[10px] uppercase font-bold tracking-widest text-text-faint hover:text-red-400 transition-colors mb-4 cursor-pointer font-mono"
                >
                  Clear All Items
                </button>

                {/* 5. Advanced Interactive Button */}
                <div className="relative group/btn">
                  {/* Button Outer Glow */}
                  <div className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 opacity-50 ${orderStatus === 'success' ? 'bg-accent-emerald/40' :
                    orderStatus === 'error' ? 'bg-red-500/40' :
                      'bg-brand/40 group-hover/btn:opacity-100'
                    }`} />

                  <button
                    onClick={handleOrderNow}
                    disabled={orderStatus === 'sending' || orderStatus === 'success'}
                    className={`
                      relative w-full py-4.5 rounded-2xl font-display font-bold text-sm sm:text-base
                      flex items-center justify-center gap-2.5 overflow-hidden
                      transition-all duration-300 cursor-pointer border
                      ${orderStatus === 'success'
                        ? 'bg-surface border-accent-emerald text-accent-emerald shadow-[inset_0_0_20px_rgba(0,230,118,0.2)]'
                        : orderStatus === 'error'
                          ? 'bg-surface border-red-500 text-red-400 shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]'
                          : orderStatus === 'sending'
                            ? 'bg-surface-3 border-brand/50 text-brand'
                            : 'bg-surface border-brand/50 text-text-primary hover:text-surface hover:bg-brand hover:border-brand shadow-[inset_0_0_20px_rgba(0,139,155,0.1)] hover:shadow-[0_0_40px_rgba(0,139,155,0.4)] hover:-translate-y-0.5 active:translate-y-0'
                      }
                      disabled:opacity-80 disabled:cursor-not-allowed
                    `}
                  >
                    {/* Inner glowing effect for Idle state */}
                    {orderStatus === 'idle' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent-blue to-brand opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-2.5">
                      {orderStatus === 'idle' && (
                        <>
                          <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          Order Now via Telegram
                        </>
                      )}
                      {orderStatus === 'sending' && (
                        <>
                          <div className="w-4 h-4 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
                          Processing Order...
                        </>
                      )}
                      {orderStatus === 'success' && (
                        <>
                          <CheckCircle className="w-5 h-5 animate-bounce" />
                          Request Sent Successfully!
                        </>
                      )}
                      {orderStatus === 'error' && (
                        <>
                          <AlertCircle className="w-5 h-5 animate-pulse" />
                          Failed — Try Again
                        </>
                      )}
                    </span>
                  </button>
                </div>

                <p className="text-[10px] text-text-muted text-center mt-4 font-mono flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-brand" />
                  End-to-end encrypted order dispatch
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}