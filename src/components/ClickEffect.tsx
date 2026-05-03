import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function ClickEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation completes (roughly 1s)
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999999] overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute"
            style={{ left: ripple.x, top: ripple.y }}
          >
            {/* Primary Pulse Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-cyber-green rounded-full shadow-[0_0_15px_#00ff9d]"
            />
            
            {/* Rapid Secondary Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-cyber-green rounded-full shadow-[0_0_10px_#00ff9d]"
            />

            {/* Neural Glitch Lines (4 directions) */}
            {[0, 90, 180, 270].map((angle) => (
              <motion.div
                key={angle}
                initial={{ width: 0, opacity: 1 }}
                animate={{ width: 40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                style={{ 
                  rotate: angle,
                  transformOrigin: 'left center'
                }}
                className="absolute left-0 top-0 h-px bg-cyber-green shadow-[0_0_8px_#00ff9d]"
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
