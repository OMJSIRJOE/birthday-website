"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FloatingHearts from "./FloatingHearts";

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function LoadingScreen({
  onComplete,
  duration = 4000,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      if (elapsed >= duration) {
        clearInterval(interval);
        onComplete();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-luxury-black">
      <FloatingHearts count={8} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-8 px-6"
      >
        <motion.p
          className="font-display text-2xl tracking-[0.3em] text-luxury-gold sm:text-3xl md:text-4xl"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Memories…
        </motion.p>

        <div className="relative h-1 w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light"
            style={{ width: `${progress}%` }}
          />
          <motion.div
            className="absolute inset-0 bg-gold-shimmer bg-[length:200%_100%] animate-shimmer"
          />
        </div>

        <div className="relative h-16 w-16">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-luxury-gold/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-1 rounded-full border-2 border-transparent border-t-luxury-gold border-r-luxury-gold/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-3 rounded-full bg-luxury-gold/20 shadow-gold"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
