"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import GoldButton from "./GoldButton";
import FloatingHearts from "./FloatingHearts";
import Fireworks from "./Fireworks";

interface CelebrationScreenProps {
  onUnlock: () => void;
}

export default function CelebrationScreen({ onUnlock }: CelebrationScreenProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-luxury-black/95 px-4">
      {windowSize.width > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle
          numberOfPieces={300}
          colors={["#D4AF37", "#E8C547", "#B8962E", "#FFFFFF", "#FF69B4"]}
        />
      )}
      <Fireworks />
      <FloatingHearts count={20} />

      <motion.div
        className="relative z-10 mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1
          className="luxury-heading gold-text-gradient text-shadow-gold mb-6"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Congratulations My Love ❤️
        </motion.h1>

        <motion.p
          className="mb-4 font-display text-xl text-white/90 sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          You passed the quiz!
        </motion.p>

        <motion.p
          className="mb-10 font-body text-base text-white/70 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Now enjoy the beautiful memories we&apos;ve shared together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <GoldButton onClick={onUnlock} className="sm:px-12">
            Unlock Gallery
          </GoldButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
