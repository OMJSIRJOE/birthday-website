"use client";

import { motion } from "framer-motion";
import { PERSONAL } from "@/content/personal";
import GoldButton from "./GoldButton";
import GlassCard from "./GlassCard";

interface LetterPageProps {
  onContinue: () => void;
}

export default function LetterPage({ onContinue }: LetterPageProps) {
  const paragraphs = PERSONAL.letter.split("\n\n");

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24 sm:px-6">
      <motion.h2
        className="luxury-heading mb-10 text-center gold-text-gradient"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        A Letter To My Love
      </motion.h2>

      <GlassCard className="relative mx-auto max-w-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 via-transparent to-luxury-gold/10" />
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-luxury-gold/60 via-luxury-gold/20 to-transparent" />

        <div className="relative space-y-6 font-display text-base leading-relaxed text-white/90 sm:text-lg">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
              className={index === 0 ? "text-xl text-luxury-gold sm:text-2xl" : ""}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="relative mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <GoldButton onClick={onContinue}>Continue</GoldButton>
        </motion.div>
      </GlassCard>
    </section>
  );
}
