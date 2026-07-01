import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
  blurColor?: string;
  containerClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  blurColor = 'rgba(255, 255, 255, 0.05)',
  containerClassName = '',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If priority is true, we assume it's loaded immediately to prevent flicker on above-the-fold content
  useEffect(() => {
    if (priority && src) {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        setIsLoaded(true);
      }
    }
  }, [src, priority]);

  return (
    <div className={`relative overflow-hidden w-full h-full ${containerClassName}`}>
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
            style={{ backgroundColor: blurColor }}
          />
        )}
      </AnimatePresence>

      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        initial={{ opacity: priority ? 1 : 0 }}
        animate={{ opacity: isLoaded ? 1 : priority ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`w-full h-full object-cover ${className || ''}`}
        style={!isLoaded ? { visibility: 'hidden' } : {}}
        {...(priority ? { fetchpriority: 'high' } as any : {})}
        {...props}
      />
    </div>
  );
}
