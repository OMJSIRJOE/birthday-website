"use client";

import { motion } from "framer-motion";
import { PERSONAL } from "@/content/personal";
import GoldButton from "./GoldButton";
import GoldParticles from "./GoldParticles";
import FloatingHearts from "./FloatingHearts";

interface HeroPageProps {
  onBegin: () => void;
}

export default function HeroPage({ onBegin }: HeroPageProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24">
      <GoldParticles count={40} />
      <FloatingHearts count={6} />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="luxury-heading mb-6 text-luxury-gold text-shadow-gold"
            initial={{ letterSpacing: "0.15em" }}
            animate={{ letterSpacing: "0.05em" }}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            Happy Birthday {PERSONAL.herName}❤️
          </motion.h1>

          <motion.p
            className="luxury-subheading mb-8"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            My Beautiful {PERSONAL.herName}
          </motion.p>

          <motion.p
            className="mx-auto mb-12 max-w-xl font-body text-base leading-relaxed text-white/75 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {PERSONAL.heroGiftMessage}
          </motion.p>

          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <GoldButton onClick={onBegin} className="text-base sm:px-12 sm:py-5">
              Begin Our Journey
            </GoldButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-8 w-5 rounded-full border border-luxury-gold/30 p-1">
          <motion.div
            className="mx-auto h-2 w-1 rounded-full bg-luxury-gold"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
